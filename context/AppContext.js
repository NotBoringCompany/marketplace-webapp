import { createContext, useEffect } from "react";
import { useMoralis } from "react-moralis";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const { isAuthenticated, isWeb3Enabled, enableWeb3 } = useMoralis();
	useEffect(() => {
		if (!isWeb3Enabled && isAuthenticated) {
			enableWeb3({ provider: "metamask" });
		}
		console.log("Web3 enabled: ", isWeb3Enabled);
	}, [isWeb3Enabled, isAuthenticated]);

	return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppContext;
