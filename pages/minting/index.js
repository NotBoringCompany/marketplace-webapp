import React, { useEffect } from "react";
import {
	useMoralis,
	useWeb3ExecuteFunction,
	// useApiContract,
	useWeb3Contract,
} from "react-moralis";
import Web3 from "web3";
import NBMonMinting from "../../abis/NBMonMinting.json";

//TODO: NEEDS TO BE REVISITED
//THIS IS JUST FOR TESTING PURPOSES...

const randomIntFromInterval = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const index = () => {
	const { Moralis, user, isAuthenticated } = useMoralis();

	console.log();

	const mintingAbi = NBMonMinting;

	// const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
	// 	abi: mintingAbi,
	// 	contractAddress: process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT,
	// 	functionName: "mintOrigin",
	// 	params: {
	// 		_randomNumber: randomIntFromInterval(0, 9007199254740900),
	// 		_owner: user && user.attributes.ethAddress,
	// 		_from: user && user.attributes.ethAddress,
	// 	},
	// });

	// const wx = () => {

	// 	runContractFunction();

	// 	console.log(data);
	// };

	const { fetch, data, error, isLoading, isFetching } = useWeb3ExecuteFunction({
		contractAddress: process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT,
		functionName: "mintOrigin",
		abi: mintingAbi,
		params: {
			_randomNumber: randomIntFromInterval(0, 9007199254740900),
			_owner: user && user.attributes.ethAddress,
			_from: user && user.attributes.ethAddress,
		},
	});

	useEffect(() => {
		if (data) {
			console.log(data);
			const x = data.wait();
			x.then((r) => {
				// const NBMonId =
				console.log("NBMID", parseInt(r.events[1].args._nbmonId._hex, 16) - 1);
			});
		}
	}, [data]);

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
	return (
		<div className="text-white">
			{isAuthenticated.toString()}
			<br />
			{user && user.attributes.ethAddress}
			<br />
			{/* {error && error} */}
			<button onClick={mintNBMon}>mint using web3</button>{" "}
			<button onClick={() => fetch()} disabled={isFetching || isLoading}>
				mint using moralis hook
			</button>{" "}
			<button onClick={update}>update</button>{" "}
			{/* {data && <pre>{JSON.stringify(data)}</pre>} */}
		</div>
	);
};

export default index;
