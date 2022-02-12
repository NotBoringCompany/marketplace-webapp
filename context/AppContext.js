import { createContext, useState, useEffect } from "react";
import { Moralis } from "moralis";
import Web3 from "web3";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [web3, setWeb3] = useState(null);
	const [web3Loading, setWeb3Loading] = useState(true);

	useEffect(() => {
		async function enableWeb3() {
			try {
				await Moralis.enableWeb3();
				const web3 = new Web3(Moralis.provider);

				console.log(web3);
				setWeb3(web3);
			} catch (e) {
				console.log("error moralis", e);
			}
			setWeb3Loading(false);
		}
		enableWeb3();
	}, []);

	return (
		<AppContext.Provider
			value={{
				web3,
				web3Loading,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
