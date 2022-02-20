import { createContext, useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import SetupModal from "components/Modal/SetupModal";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const router = useRouter();
	const [showSetupModal, setShowSetupModal] = useState(false);
	const { isAuthenticated, isWeb3Enabled, enableWeb3, user } = useMoralis();

	const statesModalNoMM = { getter: showSetupModal, setter: setShowSetupModal }; // getter + setter
	useEffect(() => {
		if (!isWeb3Enabled && isAuthenticated) {
			enableWeb3({ provider: "metamask" });
		}
		console.log("Web3 enabled: ", isWeb3Enabled);
	}, [isWeb3Enabled, isAuthenticated]);

	useEffect(() => {
		if (isAuthenticated && user && !user.attributes.email)
			setShowSetupModal(true);
	}, [isAuthenticated, router.pathname]);

	return (
		<AppContext.Provider value={{}}>
			<SetupModal stateUtils={statesModalNoMM} />
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
