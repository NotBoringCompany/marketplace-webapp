import NBMonMinting from "../../../abis/MintingGenesis.json";
import Web3 from "web3";

export default async function isApprovedForAll(userAddress, moralisProvider) {
	const web3 = new Web3(moralisProvider);

	const contract = new web3.eth.Contract(
		NBMonMinting,
		process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT
	);
	return await contract.methods
		.isApprovedForAll(userAddress, process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT)
		.call();
}
