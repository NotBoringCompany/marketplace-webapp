import exchangeRateCalculator from "./exchangeRateCalculator";

export default async function exchanger(balance, res, fromBalance = true) {
	if (balance && balance.balance === undefined && fromBalance) {
		return "Please connect your metamask";
	} else {
		console.log("RES", res);
		if (res) {
			const result = await res.clone().json();
			console.log(result);

			const eth = !fromBalance
				? 1
				: balance && balance.balance / Math.pow(10, 18);
			return exchangeRateCalculator(result.data.rates.USD, eth);
		}
		return 0;
	}
}
