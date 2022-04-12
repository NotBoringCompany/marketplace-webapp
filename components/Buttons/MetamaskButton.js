import React, { useEffect, useContext, useState } from "react";
import { useMoralis, useChain } from "react-moralis";
import AppContext from "context/AppContext";

import MyButton from "./Button";

const MetamaskButton = ({ big = false, className }) => {
	const [triedAuth, setTriedAuth] = useState(false);
	const {
		isWeb3Enabled,
		hasAuthError,
		authError,
		authenticate,
		isAuthenticating,
		web3EnableError,
		enableWeb3,
	} = useMoralis();

	const { chainId } = useChain();
	const { setShowWrongNetworkModal, setShowModalNoMM, setShowModalMMLocked } =
		useContext(AppContext);

	useEffect(() => {
		console.log(authError);
		if (hasAuthError) {
			console.log("Error:", authError.message);

			//TODO, refactor the below...

			/*	alert(
					"Sorry, an unexpected error occured. Please try again, preferably with a different browser."
				);*/
		}

		if (web3EnableError) {
			console.log("Errorxxx:", web3EnableError);
		}
	}, [hasAuthError, web3EnableError]);

	useEffect(() => {
		async function auth() {
			await authenticate({ provider: "metamask" });
		}

		if (chainId === process.env.NEXT_PUBLIC_CHAIN_ID && triedAuth) {
			auth();
			setTriedAuth(false);
		}
	}, [chainId, triedAuth]);

	const authCrypto = async () => {
		if (!chainId && !isWeb3Enabled && typeof window.ethereum === "undefined") {
			setShowModalNoMM(true);
			return;
		}

		if (chainId !== process.env.NEXT_PUBLIC_CHAIN_ID && chainId !== null) {
			setShowWrongNetworkModal(true);
			setTriedAuth(true);
			return;
		}

		if (typeof window.ethereum !== "undefined" && chainId === null) {
			await enableWeb3({ provider: "metamask" });
			return;
		}

		await authenticate({ provider: "metamask" });
	};
	return (
		<MyButton
			big={big}
			className={`w-10 mb-lg-0 mb-3 ${className}`}
			pill
			onClick={authCrypto}
			disabled={isAuthenticating}
			img={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/metamask.svg`}
			text={!isAuthenticating ? "Log-in with Metamask" : "Connecting..."}
		/>
	);
};

export default MetamaskButton;
