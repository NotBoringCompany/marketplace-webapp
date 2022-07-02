import React, { useEffect, useState } from "react";
import {
	useMoralis,
	useWeb3ExecuteFunction,
	// useApiContract,
	useWeb3Contract,
} from "react-moralis";
import Web3 from "web3";
import NBMonMinting from "../../abis/MintingGenesis.json";
import MarketplaceABI from "../../abis/Marketplace.json";
import BEP_20_ABI from "../../abis/BEP_20.json";

//TODO: NEEDS TO BE REVISITED
//THIS IS JUST FOR TESTING PURPOSES...

const randomIntFromInterval = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const Index = () => {
	const { Moralis, user, isAuthenticated, enableWeb3 } = useMoralis();
	const web3 = new Web3(Moralis.provider);
	const [signature, setSignature] = useState(null);
	const [hash, setHash] = useState(null);

	const mintingAbi = NBMonMinting;

	const nbmon_id_sold = 2;

	const SELLER_ADDRESS = "0x43aC37241B9040a82D2b99334F9eD7dcd6c07fD1";

	const PAYMENT_TOKEN_ADDRESS = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"; // LINK ADDRESS

	const SALT = 123213;

	const executeF = async () => {
		await setApprovalForAll.runContractFunction();
	};

	const setApprovalForAll = useWeb3Contract({
		contractAddress: process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT,
		functionName: "setApprovalForAll",
		abi: mintingAbi,
		params: {
			operator: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
			approved: true,
		},
	});

	const listingHash = useWeb3Contract({
		contractAddress: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
		functionName: "listingHash",
		abi: MarketplaceABI,
		params: {
			_nftContract: process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT,
			_tokenId: nbmon_id_sold,
			_paymentToken: PAYMENT_TOKEN_ADDRESS,
			_saleType: 1,
			_seller: user && user.attributes.ethAddress,
			_price: 0,
			_startingPrice: Web3.utils.toWei("0.5", "ether"),
			_endingPrice: 0,
			_minimumReserveBid: 0,
			//Duration in seconds
			_duration: 10000,
			_txSalt: SALT,
		},
	});

	const setPaymentTokens = useWeb3Contract({
		contractAddress: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
		functionName: "setPaymentTokens",
		abi: MarketplaceABI,
		params: {
			_paymentTokens: [PAYMENT_TOKEN_ADDRESS],
		},
	});

	const atomicMatch = useWeb3Contract({
		contractAddress: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
		functionName: "atomicMatch",
		abi: MarketplaceABI,
		params: {
			addresses: [
				process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT,
				PAYMENT_TOKEN_ADDRESS,
				SELLER_ADDRESS,
			],
			_tokenId: nbmon_id_sold,
			_saleType: 1,
			//Price, Starting Price, Ending Price, Min. Res bid, Winning Bid
			uint88s: [0, Web3.utils.toWei("0.5", "ether"), 0, 0, 0],
			//Duration, Seconds passed (required for timed auction)
			uint24s: [10000, 300],
			_txSalt: SALT,
			_signature:
				"0x660e3dddf238e1d861854d5b7c9db82a8e4c338ebcab2d7ba49e46072b2b620d55d27c12b57378ee866a3948d604d4489b53dafb91554657d5fc02f5202598591b",
		},
	});

	const buyerApproval = useWeb3Contract({
		contractAddress: PAYMENT_TOKEN_ADDRESS,
		functionName: "approve",
		abi: BEP_20_ABI,
		params: {
			spender: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
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
			TESTING FOR TIMED AUCTION (MARKETPLACE).
			<br />
			<br />
			Authenticated: {isAuthenticated.toString()}, as:{" "}
			{user && user.attributes.ethAddress}
			<br />
			NBMON CONTRACT: {process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT}
			<br />
			MARKETPLACE CONTRACT: {process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT}
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
				list item NBMON ID:{nbmon_id_sold}
			</button>
			{/* <button
				onClick={async () => {
					const h =
						"0xc157712bb94583bac8ad4658621bd51994d81b83eaec074e38aa31105e54a7a9";
					const sig = await web3.eth.personal.sign(
						h,
						user && user.attributes.ethAddress
					);
					console.log("Hash:", h);
					console.log("sig", sig);
				}}
			>
				test sig hashhhh
			</button> */}
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
						.isApprovedForAll(
							user && user.attributes.ethAddress,
							process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT
						)
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
							process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT
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
						MarketplaceABI,
						process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT
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