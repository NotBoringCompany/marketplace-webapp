import React, { useEffect, useContext, useState } from "react";
import { useMoralis, useChain } from "react-moralis";
import AppContext from "context/AppContext";

import MyButton from "./Button";

const MetamaskButton = ({ big = false }) => {
	const [triedAuth, setTriedAuth] = useState(false);
	const [goAuth, setGoAuth] = useState(false);

	const {
		isWeb3Enabled,
		hasAuthError,
		authError,
		authenticate,
		isAuthenticating,
	} = useMoralis();

	const { chainId } = useChain();
	const { setShowWrongNetworkModal, setShowModalNoMM } = useContext(AppContext);

	useEffect(() => {
		console.log(authError);
		if (hasAuthError) {
			console.log("Error:", authError.message);

			//TODO, refactor the below...

			/*	alert(
					"Sorry, an unexpected error occured. Please try again, preferably with a different browser."
				);*/
		}
	}, [hasAuthError]);

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
		if (!chainId && !isWeb3Enabled) {
			setShowModalNoMM(true);
			return;
		}
		if (chainId !== process.env.NEXT_PUBLIC_CHAIN_ID) {
			setShowWrongNetworkModal(true);
			setTriedAuth(true);

			return;
		}
		await authenticate({ provider: "metamask" });
	};
	return (
		<MyButton
			big={big}
			className="w-10 mb-lg-0 mb-3"
			pill
			onClick={authCrypto}
			disabled={isAuthenticating}
			img={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/metamask.svg`}
			text={!isAuthenticating ? "Login with Metamask" : "Connecting..."}
		/>
	);
};

export default MetamaskButton;
