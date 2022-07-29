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
	const nbmon_id_sold = 10;

	const web3 = new Web3(Moralis.provider);
	const [signature, setSignature] = useState(null);
	const [hash, setHash] = useState(null);
	const DURATIOn = 10000000;

	const [nbmonId, setNBmonId] = useState(nbmon_id_sold);
	const [tit, titz] = useState("");

	// useEffect(() => {
	// 	if (tit === "aw") {
	// 		console.log("cahnging nbmon");
	// 		setNBmonId(4);
	// 	}
	// }, [tit]);

	// useEffect(() => {
	// 	if (signature) {
	// 		verify.runContractFunction().then((verified) => {
	// 			console.log("verified", verified);
	// 		});
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [signature]);
	const mintingAbi = NBMonMinting;

	const SELLER_ADDRESS = "0xa48BafFb6e6d09111a420Bfa00225B1f722c704b";

	const PAYMENT_TOKEN_ADDRESS = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"; // LINK ADDRESS

	const SALT = "1234";

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
			_paymentToken: process.env.NEXT_PUBLIC_PAYMENT_TOKEN_ADDRESS,
			_saleType: 0,
			_seller: SELLER_ADDRESS,
			_price: Web3.utils.toWei("0.05", "ether"),
			_startingPrice: 0,
			_endingPrice: 0,
			_minimumReserveBid: 0,
			_duration: DURATIOn,
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
				process.env.NEXT_PUBLIC_PAYMENT_TOKEN_ADDRESS,
				SELLER_ADDRESS,
			],
			_tokenId: nbmon_id_sold,
			_saleType: 0,
			/*0. Price, 
			1. Starting Price, 
			2. Ending Price, 
			3. Min. Res bid, 
			4. Winning Bid*/
			uint88s: [Web3.utils.toWei("0.05", "ether"), 0, 0, 0, 0],
			//Duration, Seconds passed (required for timed auction)
			uint24s: [DURATIOn, 0],
			_txSalt: SALT,
			_signature:
				"0x8e66150e4f4d1ec60286c2ccb737231aadf46b8c2ad45b672ea4321681a078d437982653fa54c3d3e39c9db1f37e3786ec963105a760d645e5ad66589516fc061b",
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
			tokenId: nbmonId,
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
				list item {nbmon_id_sold}
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
					console.log(
						"479f66b83f307812292a8d645b972408074fc3db9c4415fc09305a9e125541030bdc9e8c1af349437185545b2a2aaaf3029916b17dd0b7a4d5459fc5f9ed91d2ff4333ce87eb387f2b584aba96f3abe396c26aef00e4bb5c616bac3c041dc9f2cd02d458c9c73cdf8315509a2bc75c303defb4bf44de14df733f580be76ce5fd767a2929af9129cb7a08090dbb0f0040029bf514880200292ffb9796b29ced9213ff7444a7876ae7e112e62051ea7340c6dc6797287b4ba4cc34c9fddcd426c2e8d93974d372f7851c5641818f5fcfb9d684db1b3b30eef3746b0f58cf8be45d6ae0885f91b7fe2e0b6815ac28ea6f500fd0af04a97cfe1e0adee05b7ee48d42"
					);
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
			<button
				onClick={async () => {
					titz("aw");
				}}
			>
				chg nbmon
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
