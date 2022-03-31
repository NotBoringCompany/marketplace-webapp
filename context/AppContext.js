import { createContext, useEffect, useState } from "react";
import { useMoralis, useChain } from "react-moralis";
import Moralis from "moralis";
import { useRouter } from "next/router";
import SetupModal from "components/Modal/SetupModal";
import WrongNetwork from "components/Modal/WrongNetwork";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const router = useRouter();
	const [showSetupModal, setShowSetupModal] = useState(false);
	const [showWrongNetworkModal, setShowWrongNetworkModal] = useState(false);

	const { isAuthenticated, isWeb3Enabled, enableWeb3, user } = useMoralis();
	const { chainId, chain } = useChain();

	const statesModalNoMM = { getter: showSetupModal, setter: setShowSetupModal }; // getter + setter
	const statesModalWrongNetwork = {
		getter: showWrongNetworkModal,
		setter: setShowWrongNetworkModal,
	};
	useEffect(() => {
		setTimeout(() => {
			// if (!isWeb3Enabled && isAuthenticated && !isAuthenticating) {
			// 	console.log("ASDAS");
			// }
			enableWeb3({ provider: "metamask" });
		}, 100);

		async function fetchMyAPI() {
			await Moralis.enableWeb3({ provider: "metamask" });
		}
	}, [isWeb3Enabled, isAuthenticated]);

	useEffect(() => {
		if (isAuthenticated && user && !user.attributes.email)
			setShowSetupModal(true);
	}, [isAuthenticated, router.pathname, chainId]);

	useEffect(() => {
		if (isWeb3Enabled) {
			console.log("CID", chainId);
			console.log("chain", chain);
		}
	}, [chainId, chain, isWeb3Enabled]);

	return (
		<AppContext.Provider
			value={{ showWrongNetworkModal, setShowWrongNetworkModal }}
		>
			<SetupModal stateUtils={statesModalNoMM} />
			<WrongNetwork stateUtils={statesModalWrongNetwork} />
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
