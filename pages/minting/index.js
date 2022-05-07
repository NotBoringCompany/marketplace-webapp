import React, { useEffect, useState } from "react";
import {
	useMoralis,
	useWeb3ExecuteFunction,
	// useApiContract,
	useWeb3Contract,
} from "react-moralis";
import Web3 from "web3";
import NBMonMinting from "../../abis/MintingGenesis.json";

//TODO: NEEDS TO BE REVISITED
//THIS IS JUST FOR TESTING PURPOSES...

const randomIntFromInterval = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const TEST_ABI = [
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "_messageHash",
				type: "bytes32",
			},
		],
		name: "getEthSignedMessageHash",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "pure",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_nftAddress",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_tokenId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "_paymentTokenAddress",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_price",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_nonce",
				type: "uint256",
			},
		],
		name: "getMessageHash",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "pure",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "_ethSignedMessageHash",
				type: "bytes32",
			},
			{
				internalType: "bytes",
				name: "_signature",
				type: "bytes",
			},
		],
		name: "recoverSigner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "pure",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes",
				name: "sig",
				type: "bytes",
			},
		],
		name: "splitSignature",
		outputs: [
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32",
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32",
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8",
			},
		],
		stateMutability: "pure",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_signer",
				type: "address",
			},
			{
				internalType: "address",
				name: "_nftAddress",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_tokenId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "_paymentTokenAddress",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_price",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_nonce",
				type: "uint256",
			},
			{
				internalType: "bytes",
				name: "signature",
				type: "bytes",
			},
		],
		name: "verify",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "pure",
		type: "function",
	},
];
const NFT_ADDRESS = "0xc23f1BC9Ad2682A8659EA67c3b54BbB259FB5C38";
const PAYMENT_TOKEN_ADDRESS = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
const Index = () => {
	const { Moralis, user, isAuthenticated, enableWeb3 } = useMoralis();
	const web3 = new Web3(Moralis.provider);
	const [signature, setSignature] = useState(null);

	useEffect(() => {
		if (signature) {
			verify.runContractFunction().then((verified) => {
				console.log("verified", verified);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [signature]);
	const mintingAbi = NBMonMinting;

	const { runContractFunction, data, error, isLoading, isFetching } =
		useWeb3Contract({
			contractAddress: process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT,
			functionName: "setApprovalForAll",
			abi: mintingAbi,
			params: {
				operator: "0x460107fAB29D57a6926DddC603B7331F4D3bCA05",
				approved: true,
			},
		});

	const executeF = async () => {
		runContractFunction();
	};

	const signatureContract = useWeb3Contract({
		contractAddress: "0x0D42f72fF98DF201156D33A67a61274B73041A30",
		functionName: "getMessageHash",
		abi: TEST_ABI,
		params: {
			_nftAddress: NFT_ADDRESS,
			_tokenId: 1,
			_paymentTokenAddress: PAYMENT_TOKEN_ADDRESS,
			_price: Web3.utils.toWei("2.5", "ether"),
			_nonce: 1,
		},
	});

	const verify = useWeb3Contract({
		contractAddress: "0x0D42f72fF98DF201156D33A67a61274B73041A30",
		functionName: "verify",
		abi: TEST_ABI,
		params: {
			_signer: user && user.attributes.ethAddress,
			_nftAddress: NFT_ADDRESS,
			_tokenId: 1,
			_paymentTokenAddress: PAYMENT_TOKEN_ADDRESS,
			_price: Web3.utils.toWei("2.5", "ether"),
			_nonce: 1,
			signature:
				"0x5bd04aa46832f6eb9a57dca0d33e91b24dfafc82da753fe8e4c36b9721341b704f6e930297a80f2b4ced548ed85a1c196d2f9be5b1a323370f5c19b0dbc588f41b",
		},
	});

	useEffect(() => {
		if (data) {
			console.log(data);
			console.log("waiting...");
			const x = data.wait();
			x.then((r) => {
				// const NBMonId =
				console.log("Hatched", r);
			});
		}
	}, [data]);

	useEffect(() => {
		if (error) {
			console.log("ERROR", error);
		}
	}, [error]);

	// console.log(data && data);

	// console.log(error && error);

	const mintNBMon = async () => {
		await Moralis.enableWeb3();

		const web3 = new Web3(Moralis.provider);

		const contract = new web3.eth.Contract(
			mintingAbi,
			process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT
		);
		const randomEggInt = randomIntFromInterval(0, 9007199254740900);
		const receipt = await contract.methods
			.mintOrigin(randomEggInt, web3.currentProvider.selectedAddress)
			.send({ from: web3.currentProvider.selectedAddress });
		console.log("RECEIPT", receipt);
		const NBMonId =
			parseInt(receipt.events.NBMonMinted.returnValues._nbmonId) - 1;

		const nbMon = await contract.methods
			.getNBMon(NBMonId)
			.call({ from: user.attributes.ethAddresss });

		// const res = await fetch(
		// 	"https://sxcvpb1zwixk.usemoralis.com:2053/server/functions/getOwnerNBMons?_ApplicationId=VWnxCyrXVilvNWnBjdnaJJdQGu7QzN4lJeu1teyg&address=0x5fa5c1998d4c11f59c17FDE8b3f07588C23837D5"
		// );

		// const arrayOfIds = (await res.json()).result;

		// arrayOfIds.forEach(async (nbMonId) => {
		// 	const nbMon = await contract.methods
		// 		.getNBMon(nbMonId)
		// 		.call({ from: user.attributes.ethAddresss });
		// 	console.log("data", nbMon);
		// });
	};
	const update = () => {
		const Monster = Moralis.Object.extend("BscNFTOwners");
		const query = new Moralis.Query(Monster);

		query
			.get("aQo0cg6dhVgBHoxpKT7uzo8f")
			.then((r) => console.log(r))
			.catch((e) => console.log("err", e));
	};

	//hash: 0x2de8b69d7f168e10359c88e4a14ce6d2bcf19fc84c1c78d69afebebf53d0e02b
	return (
		<div className="text-white">
			Authenticated: {isAuthenticated.toString()}, as:{" "}
			{user && user.attributes.ethAddress}
			<br />
			{isLoading && "loading"}
			<br />
			{/* {error && error} */}
			{/* <button onClick={mintNBMon}>mint using web3</button>{" "}
			<button onClick={() => fetch()} disabled={isFetching || isLoading}>
				mint using moralis hook
			</button>{" "} */}
			{/* <button onClick={update}>update</button>{" "} */}
			{/* {data && <pre>{JSON.stringify(data)}</pre>} */}
			{/* <button onClick={() => executeF()}>HATCH THE EGG</button>{" "} */}
			<button onClick={() => executeF()}>setApprovalForAll</button>{" "}
			<button
				onClick={async () => {
					// const hash = await signatureContract.runContractFunction();
					// console.log("hash", hash);

					// const sig = await web3.eth.personal.sign(
					// 	hash,
					// 	user && user.attributes.ethAddress
					// );
					// console.log("sig", sig);
					// setSignature(sig);
					const verified = await verify.runContractFunction();

					console.log("verified", verified);
				}}
			>
				test
			</button>
		</div>
	);
};

export default Index;
