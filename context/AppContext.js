import { createContext, useEffect, useState } from "react";
import { useMoralis, useChain } from "react-moralis";
import Moralis from "moralis";
import { useRouter } from "next/router";
import SetupModal from "components/Modal/SetupModal";
import WrongNetwork from "components/Modal/WrongNetwork";
import NoMetaMask from "components/Modal/NoMetaMask";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const router = useRouter();
	const [showSetupModal, setShowSetupModal] = useState(false);
	const [showWrongNetworkModal, setShowWrongNetworkModal] = useState(false);
	const [showModalNoMM, setShowModalNoMM] = useState(false);

	const { isAuthenticated, isWeb3Enabled, enableWeb3, user } = useMoralis();
	const { chainId, chain } = useChain();

	const statesModalSetup = {
		getter: showSetupModal,
		setter: setShowSetupModal,
	}; // getter + setter
	const statesModalNoMM = { getter: showModalNoMM, setter: setShowModalNoMM }; // getter + setter

	const statesModalWrongNetwork = {
		getter: showWrongNetworkModal,
		setter: setShowWrongNetworkModal,
	};

	useEffect(() => {
		setTimeout(() => {
			enableWeb3({ provider: "metamask" });
		}, 100);
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
			value={{
				showWrongNetworkModal,
				setShowWrongNetworkModal,
				setShowModalNoMM,
			}}
		>
			<SetupModal stateUtils={statesModalSetup} />
			<WrongNetwork stateUtils={statesModalWrongNetwork} />
			<NoMetaMask stateUtils={statesModalNoMM} />

			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
