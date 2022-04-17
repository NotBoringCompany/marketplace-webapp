import React, { useEffect, useContext, useState } from "react";
import { useMoralis, useChain } from "react-moralis";
import AppContext from "context/AppContext";

import styled from "styled-components";

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
		}

		if (web3EnableError) {
			console.log("Errorxxx:", web3EnableError);
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

		await authenticate({ provider: "metamask" });
	};
	return (
		<ConnectButton
			onClick={authCrypto}
			disabled={isAuthenticating}
		>
			<TextButton>{!isAuthenticating ? "Log-in to Metamask" : "Connecting..."}</TextButton>
		</ConnectButton>
	);
};

const ConnectButton = styled.button`
	background: #42BA96;
	border-radius: 100px;
	padding: 15px 24px;
	text-align: center;
	border: none;
	max-width: 361px;
	width: 100%;
`

const TextButton = styled.span`
	font-family: 'Mada';
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: 0.1px;
	color: #FFFFFF;
`

export default MetamaskButton;
