import React from "react";
import { useMoralis } from "react-moralis";
import Web3 from "web3";
import NBMonMinting from "../../abis/NBMonMinting.json";

//TODO: NEEDS TO BE REVISITED
//THIS IS JUST FOR TESTING PURPOSES...

const randomIntFromInterval = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const index = () => {
	const { Moralis } = useMoralis();

	const mintingAbi = NBMonMinting;

	const mintNBMon = async () => {
		// await Moralis.enableWeb3();
		const web3 = new Web3(Moralis.provider);

		const contract = new web3.eth.Contract(
			mintingAbi,
			process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT
		);
		// const randomEggInt = randomIntFromInterval(0, 9007199254740900);
		// const receipt = await contract.methods
		// 	.mintOrigin(randomEggInt, web3.currentProvider.selectedAddress)
		// 	.send({ from: web3.currentProvider.selectedAddress });
		// const NBMonId =
		// 	parseInt(receipt.events.NBMonMinted.returnValues._nbmonId) - 1;

		const nbMon = await contract.methods
			.getNBMon(39)
			.call({ from: web3.currentProvider.selectedAddress });
		console.log("data", nbMon);
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
		<div>
			<button onClick={mintNBMon}>get data</button>{" "}
			<button onClick={update}>update</button>{" "}
		</div>
	);
};

export default index;
