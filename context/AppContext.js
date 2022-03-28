import { createContext, useEffect, useState } from "react";
import { useMoralis, useChain } from "react-moralis";
import Moralis from "moralis";
import { useRouter } from "next/router";
import SetupModal from "components/Modal/SetupModal";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const router = useRouter();
	const [showSetupModal, setShowSetupModal] = useState(false);
	const {
		isAuthenticated,
		isWeb3Enabled,
		enableWeb3,
		user,
		isAuthenticating,
		isWeb3EnableLoading,
	} = useMoralis();
	const { chainId, chain } = useChain();

	const statesModalNoMM = { getter: showSetupModal, setter: setShowSetupModal }; // getter + setter
	useEffect(() => {
		setTimeout(() => {
			if (!isWeb3Enabled && isAuthenticated && !isAuthenticating) {
				console.log("ASDAS");
				enableWeb3({ provider: "metamask" });
			}
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
		<AppContext.Provider value={{}}>
			<SetupModal stateUtils={statesModalNoMM} />
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
