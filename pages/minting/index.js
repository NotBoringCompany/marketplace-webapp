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

const MARKETPLACE_ABI = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "Paused",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address[]",
				name: "_addresses",
				type: "address[]",
			},
			{
				indexed: true,
				internalType: "uint256[]",
				name: "_values",
				type: "uint256[]",
			},
			{
				indexed: false,
				internalType: "enum GenesisMarketplace.SaleType",
				name: "_saleType",
				type: "uint8",
			},
		],
		name: "Sold",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "Unpaused",
		type: "event",
	},
	{
		inputs: [],
		name: "admin",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address[3]",
				name: "_addresses",
				type: "address[3]",
			},
			{
				internalType: "uint256[2]",
				name: "_values",
				type: "uint256[2]",
			},
			{
				internalType: "string",
				name: "_txSalt",
				type: "string",
			},
			{
				internalType: "enum GenesisMarketplace.SaleType",
				name: "_saleType",
				type: "uint8",
			},
			{
				internalType: "bytes",
				name: "_signature",
				type: "bytes",
			},
		],
		name: "atomicMatch",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "burner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "ceo",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "devCut",
		outputs: [
			{
				internalType: "uint16",
				name: "",
				type: "uint16",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address[3]",
				name: "_addresses",
				type: "address[3]",
			},
			{
				internalType: "uint256[2]",
				name: "_values",
				type: "uint256[2]",
			},
			{
				internalType: "string",
				name: "_txSalt",
				type: "string",
			},
			{
				internalType: "enum GenesisMarketplace.SaleType",
				name: "_saleType",
				type: "uint8",
			},
			{
				internalType: "bytes",
				name: "_signature",
				type: "bytes",
			},
		],
		name: "ignoreSignature",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_nftContract",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_tokenId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "_paymentToken",
				type: "address",
			},
			{
				internalType: "enum GenesisMarketplace.SaleType",
				name: "_saleType",
				type: "uint8",
			},
			{
				internalType: "address",
				name: "_seller",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_price",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "_txSalt",
				type: "string",
			},
		],
		name: "listingHash",
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
		inputs: [],
		name: "manager",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "minter",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "nbExchequer",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_newAdmin",
				type: "address",
			},
		],
		name: "newAdmin",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_newBurner",
				type: "address",
			},
		],
		name: "newBurner",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_newCEO",
				type: "address",
			},
		],
		name: "newCEO",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_newManager",
				type: "address",
			},
		],
		name: "newManager",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_newMinter",
				type: "address",
			},
		],
		name: "newMinter",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "pause",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "paused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		name: "paymentTokens",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "_paymentTokens",
				type: "address[]",
			},
		],
		name: "removePaymentTokens",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "salesFee",
		outputs: [
			{
				internalType: "uint16",
				name: "",
				type: "uint16",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint16",
				name: "_devCut",
				type: "uint16",
			},
		],
		name: "setDevCut",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_nbExchequer",
				type: "address",
			},
		],
		name: "setNBExchequer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address[]",
				name: "_paymentTokens",
				type: "address[]",
			},
		],
		name: "setPaymentTokens",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint16",
				name: "_salesFee",
				type: "uint16",
			},
		],
		name: "setSalesFee",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_teamWallet",
				type: "address",
			},
		],
		name: "setTeamWallet",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "teamWallet",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "unpause",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes",
				name: "",
				type: "bytes",
			},
		],
		name: "usedSignatures",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];

const BEP_20_ABI = [
	{
		inputs: [
			{
				internalType: "string",
				name: "name_",
				type: "string",
			},
			{
				internalType: "string",
				name: "symbol_",
				type: "string",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "Approval",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "_owner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "_spender",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "_oldValue",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "_value",
				type: "uint256",
			},
		],
		name: "Approved",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "by",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "Burnt",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "Minted",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "Paused",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256",
			},
		],
		name: "Transfer",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "_by",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "_from",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "_to",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "_value",
				type: "uint256",
			},
		],
		name: "Transferred",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "Unpaused",
		type: "event",
	},
	{
		inputs: [],
		name: "admin",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_owner",
				type: "address",
			},
			{
				internalType: "address",
				name: "spender",
				type: "address",
			},
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "burner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "ceo",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "subtractedValue",
				type: "uint256",
			},
		],
		name: "decreaseAllowance",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "addedValue",
				type: "uint256",
			},
		],
		name: "increaseAllowance",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "manager",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "minter",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_newAdmin",
				type: "address",
			},
		],
		name: "newAdmin",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_newBurner",
				type: "address",
			},
		],
		name: "newBurner",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_newCEO",
				type: "address",
			},
		],
		name: "newCEO",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_newManager",
				type: "address",
			},
		],
		name: "newManager",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_newMinter",
				type: "address",
			},
		],
		name: "newMinter",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "pause",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "paused",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "recipient",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "sender",
				type: "address",
			},
			{
				internalType: "address",
				name: "recipient",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "unpause",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];

const Index = () => {
	const { Moralis, user, isAuthenticated, enableWeb3 } = useMoralis();
	const web3 = new Web3(Moralis.provider);
	const [signature, setSignature] = useState(null);
	const [hash, setHash] = useState(null);

	// useEffect(() => {
	// 	if (signature) {
	// 		verify.runContractFunction().then((verified) => {
	// 			console.log("verified", verified);
	// 		});
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [signature]);
	const mintingAbi = NBMonMinting;

	const nbmon_id_sold = 2;

	const SELLER_ADDRESS = "0x6ef0f724e780E5D3aD66f2A4FCbEF64A774eA796";

	const PAYMENT_TOKEN_ADDRESS = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709";

	const MARKETPLACE_CONTRACT_ADDRESS =
		"0x8E71d31d525A298c2C065fCcf1eAd3D595c06A20";

	const SALT = 123213;

	const executeF = async () => {
		await setApprovalForAll.runContractFunction();
	};

	// const signatureContract = useWeb3Contract({
	// 	contractAddress: "0x0D42f72fF98DF201156D33A67a61274B73041A30",
	// 	functionName: "getMessageHash",
	// 	abi: TEST_ABI,
	// 	params: {
	// 		_nftAddress: NFT_ADDRESS,
	// 		_tokenId: 1,
	// 		_paymentTokenAddress: PAYMENT_TOKEN_ADDRESS,
	// 		_price: Web3.utils.toWei("2.5", "ether"),
	// 		_nonce: 1,
	// 	},
	// });

	// const verify = useWeb3Contract({
	// 	contractAddress: "0x0D42f72fF98DF201156D33A67a61274B73041A30",
	// 	functionName: "verify",
	// 	abi: TEST_ABI,
	// 	params: {
	// 		_signer: user && user.attributes.ethAddress,
	// 		_nftAddress: NFT_ADDRESS,
	// 		_tokenId: 1,
	// 		_paymentTokenAddress: PAYMENT_TOKEN_ADDRESS,
	// 		_price: Web3.utils.toWei("2.5", "ether"),
	// 		_nonce: 1,
	// 		signature:
	// 			"0x5bd04aa46832f6eb9a57dca0d33e91b24dfafc82da753fe8e4c36b9721341b704f6e930297a80f2b4ced548ed85a1c196d2f9be5b1a323370f5c19b0dbc588f41b",
	// 	},
	// });

	const setApprovalForAll = useWeb3Contract({
		contractAddress: process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT,
		functionName: "setApprovalForAll",
		abi: mintingAbi,
		params: {
			operator: MARKETPLACE_CONTRACT_ADDRESS,
			approved: true,
		},
	});

	const listingHash = useWeb3Contract({
		contractAddress: MARKETPLACE_CONTRACT_ADDRESS,
		functionName: "listingHash",
		abi: MARKETPLACE_ABI,
		params: {
			_nftContract: process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT,
			_tokenId: nbmon_id_sold,
			_paymentToken: PAYMENT_TOKEN_ADDRESS,
			_saleType: 0,
			_seller: user && user.attributes.ethAddress,
			_price: Web3.utils.toWei("0.005", "ether"),
			_txSalt: SALT,
		},
	});

	const setPaymentTokens = useWeb3Contract({
		contractAddress: MARKETPLACE_CONTRACT_ADDRESS,
		functionName: "setPaymentTokens",
		abi: MARKETPLACE_ABI,
		params: {
			_paymentTokens: [PAYMENT_TOKEN_ADDRESS],
		},
	});

	const atomicMatch = useWeb3Contract({
		contractAddress: MARKETPLACE_CONTRACT_ADDRESS,
		functionName: "atomicMatch",
		abi: MARKETPLACE_ABI,
		params: {
			_addresses: [
				process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT,
				PAYMENT_TOKEN_ADDRESS,
				SELLER_ADDRESS,
			],
			_values: [nbmon_id_sold, Web3.utils.toWei("0.005", "ether")],
			_txSalt: SALT,
			_saleType: 0,
			_signature:
				"0x5608b5938a9ffcec635e7f841a7b0c957a0ad210f707ccf714c7dec4ffb8f2b27bd409ba5819099cbaa28ed4d3fb20e36291d5db75f398f1b393147da743d8a21b",
		},
	});

	const buyerApproval = useWeb3Contract({
		contractAddress: PAYMENT_TOKEN_ADDRESS,
		functionName: "approve",
		abi: BEP_20_ABI,
		params: {
			spender: MARKETPLACE_CONTRACT_ADDRESS,
			amount: Web3.utils.toWei("100000000000000000000000000", "ether"),
		},
	});

	const ownerOf = useWeb3Contract({
		contractAddress: process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT,
		functionName: "ownerOf",
		abi: mintingAbi,
		params: {
			tokenId: 3,
		},
	});

	const changeOwnership = useWeb3Contract({
		contractAddress: process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT,
		functionName: "changeOwnership",
		abi: mintingAbi,
		params: {
			_nbmonId: 1,
		},
	});

	// useEffect(() => {
	// 	if (data) {
	// 		console.log(data);
	// 		console.log("waiting...");
	// 		const x = data.wait();
	// 		x.then((r) => {
	// 			// const NBMonId =
	// 			console.log("Hatched", r);
	// 		});
	// 	}
	// }, [data]);

	// useEffect(() => {
	// 	if (error) {
	// 		console.log("ERROR", error);
	// 	}
	// }, [error]);

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
			NBMON CONTRACT: {process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT}
			<br />
			{/* {isLoading && "loading"} */}
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
			{/* <button
				onClick={async () => {
					const hash = await signatureContract.runContractFunction();
					console.log("hash", hash);

					const sig = await web3.eth.personal.sign(
						hash,
						user && user.attributes.ethAddress
					);
					console.log("sig", sig);
					setSignature(sig);
					const verified = await verify.runContractFunction();
					console.log("verified", verified);
				}}
			>
				test
			</button> */}
			<button
				onClick={async () => {
					const h = await listingHash.runContractFunction();
					const sig = await web3.eth.personal.sign(
						h,
						user && user.attributes.ethAddress
					);
					console.log("sig", sig);
					console.log("Hash:", h);
					setHash(h === undefined ? "undefined" : h);
					setSignature(sig);
				}}
			>
				list item {nbmon_id_sold}
			</button>
			<button
				onClick={async () => {
					// const x = await checkToken.runContractFunction(
					// 	"0x01BE23585060835E02B77ef475b0Cc51aA1e0709"
					// );
					// console.log(x);

					const contract = new web3.eth.Contract(
						mintingAbi,
						process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT
					);
					const z = await contract.methods
						.isApprovedForAll(SELLER_ADDRESS, MARKETPLACE_CONTRACT_ADDRESS)
						.call();

					console.log(z);
				}}
			>
				isApprovedForAll
			</button>
			<p> Hash: {hash}</p>
			<p>Signature: {signature}</p>
			<button
				onClick={async () => {
					const approval = await buyerApproval.runContractFunction();
					console.log("Approval:", approval);
				}}
			>
				approve marketplace spending
			</button>
			<button
				onClick={async () => {
					// const approval = await buyerApproval.runContractFunction();
					// console.log("Approval:", approval);

					const buy = await atomicMatch.runContractFunction();
					console.log("Bought?", buy);
				}}
			>
				buy item {nbmon_id_sold}
			</button>
			{/* <button
				onClick={async () => {
					// const approval = await buyerApproval.runContractFunction();
					// console.log("Approval:", approval);

					const changeOwner = await changeOwnership.runContractFunction();
					console.log("changeOwner", changeOwner);
				}}
			>
				change ownership
			</button> */}
			<button
				onClick={async () => {
					const contract = new web3.eth.Contract(
						BEP_20_ABI,
						PAYMENT_TOKEN_ADDRESS
					);
					const z = await contract.methods
						.allowance(
							user && user.attributes.ethAddress,
							MARKETPLACE_CONTRACT_ADDRESS
						)
						.call();

					console.log(z);
				}}
			>
				Check allowance
			</button>
			<button
				onClick={async () => {
					const x = await ownerOf.runContractFunction();
					console.log(x);
				}}
			>
				Check owner of
			</button>
			<br />
			<button
				onClick={async () => {
					await setPaymentTokens.runContractFunction();
				}}
			>
				setPaymentToken
			</button>
			<button
				onClick={async () => {
					// const x = await checkToken.runContractFunction(
					// 	"0x01BE23585060835E02B77ef475b0Cc51aA1e0709"
					// );
					// console.log(x);

					const contract = new web3.eth.Contract(
						MARKETPLACE_ABI,
						MARKETPLACE_CONTRACT_ADDRESS
					);
					const z = await contract.methods
						.paymentTokens(PAYMENT_TOKEN_ADDRESS)
						.call();

					console.log(z);
				}}
			>
				checkPaymentToken
			</button>
		</div>
	);
};

export default Index;
