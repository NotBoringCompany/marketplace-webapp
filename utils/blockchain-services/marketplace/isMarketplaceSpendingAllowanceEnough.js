import BEP_20_ABI from "components/../abis/BEP_20.json";

import Web3 from "web3";

export default async function isMarketplaceSpendingAllowanceEnough(
	userAddress,
	moralisProvider,
	allowanceAmount
) {
	const web3 = new Web3(moralisProvider);

	const contract = new web3.eth.Contract(
		BEP_20_ABI,
		process.env.NEXT_PUBLIC_PAYMENT_TOKEN_ADDRESS
	);
	const currentAllowance = await contract.methods
		.allowance(userAddress, process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT)
		.call();

	return currentAllowance >= allowanceAmount;
}
