import NBMonMinting from "../../../abis/MintingGenesis.json";
import { MoralisProvider } from "react-moralis";
import Web3 from "web3";

export default async function isApprovedForAll(userAddress) {
	const web3 = new Web3(MoralisProvider);

	const contract = new web3.eth.Contract(
		NBMonMinting,
		process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT
	);
	console.log(userAddress);
	return await contract.methods
		.isApprovedForAll(userAddress, process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT)
		.call();
}
