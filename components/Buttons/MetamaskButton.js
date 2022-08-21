import React, { useEffect, useContext, useState } from "react";
import { useMutation } from "react-query";
import { useMoralis, useChain } from "react-moralis";
import AppContext from "context/AppContext";

import MyButton from "./Button";

const MetamaskButton = ({
	big = false,
	className,
	defaultText = "Log-in with Metamask",
}) => {
	const [triedAuth, setTriedAuth] = useState(false);
	const {
		isWeb3Enabled,
		hasAuthError,
		authError,
		authenticate,
		isAuthenticating,
		isAuthenticated,
		web3EnableError,
		enableWeb3,
		user,
	} = useMoralis();

	const { chainId } = useChain();
	const { setShowWrongNetworkModal, setShowModalNoMM, setShowModalMMLocked } =
		useContext(AppContext);

	useEffect(() => {
		console.log(authError);
		if (hasAuthError) {
			console.log("Error:", authError.message);
		}

		if (web3EnableError) {
			console.log("Error [Web3]:", web3EnableError);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasAuthError, web3EnableError]);

	useEffect(() => {
		async function auth() {
			await authenticate({ provider: "metamask" });
		}

		if (chainId === process.env.NEXT_PUBLIC_CHAIN_ID && triedAuth) {
			auth();
			setTriedAuth(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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

		await authenticate({
			provider: "metamask",
		});
	};
	return (
		<MyButton
			big={big}
			className={`w-10 mb-lg-0 mb-3 ${className}`}
			pill
			onClick={authCrypto}
			disabled={isAuthenticating}
			img={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/metamask.svg`}
			text={!isAuthenticating ? defaultText : "Connecting..."}
		/>
	);
};

export default MetamaskButton;
