import exchangeRateCalculator from "./exchangeRateCalculator";

export default async function exchanger(balance, res, fromBalance = true) {
	if (balance && balance.balance === undefined && fromBalance) {
		return "Please connect your metamask";
	} else {
		const result = await res.clone().json();
		const eth = !fromBalance
			? 1
			: balance && balance.balance / Math.pow(10, 18);
		return exchangeRateCalculator(result.data.rates.USD, eth);
	}
}
