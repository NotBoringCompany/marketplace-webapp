import React, { useState, useContext } from "react";
import AppContext from "context/AppContext";
import { useRouter } from "next/router";
import { useWeb3Contract } from "react-moralis";
import NBMonMintingABI from "../../abis/MintingGenesis.json";

const abi = NBMonMintingABI;

import MyButton from "./Button";

const RegisterProfileButton = ({
	big = false,
	addresses = [],
	className = "",
}) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const { statesSwitchModal } = useContext(AppContext);

	//Registers the user's profile
	const addMinters = useWeb3Contract({
		contractAddress: process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT,
		functionName: "addMinters",
		abi: abi,
		params: {
			_addrs: addresses,
		},
	});

	const authCrypto = async () => {
		setLoading(true);
		const addingMinter = await addMinters.runContractFunction({
			onSuccess: async (tx) => {
				await tx.wait().catch((e) => {
					throw e;
				});
				setLoading(false);
				router.reload();
			},
			onError: (e) => {
				statesSwitchModal.setter({
					content: "txError",
					show: false,
				});
				if (e.code === "INSUFFICIENT_FUNDS") {
					statesSwitchModal.setter({
						show: true,
						content: "txError",
						detail: {
							title: "Transaction Error",
							text: `You have insufficient funds to \n make this transaction. \n\n Wallet address: ${user.attributes.ethAddress}`,
						},
					});
					// code 4001 is user cancellation
				} else if (!e.code || (e.code && e.code !== 4001)) {
					statesSwitchModal.setter({
						show: true,
						content: "txError",
						detail: {
							title: "Transaction Error",
							text: "We are sorry, an unexpected \n error occured during transaction. \n \n Please contact us to let us know \n the details.",
						},
					});
				}
				setLoading(false);
			},
		});
		console.log(addingMinter, " added minter");
	};
	return (
		<MyButton
			big={big}
			className={`w-10 mb-lg-0 mb-3 ${className}`}
			pill
			onClick={authCrypto}
			disabled={
				addMinters.isLoading ||
				(addresses && !addresses.length) ||
				!addresses ||
				loading
			}
			text={
				addMinters.isLoading || loading ? "Registering..." : "Register Address"
			}
		/>
	);
};

export default RegisterProfileButton;
