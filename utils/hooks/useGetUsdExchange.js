import { useEffect, useState } from "react";
import useExchangeRate from "./useExchangeRate";
import exchangeRateDecoder from "utils/exchangeRateDecoder";

const useGetUsdExchange = (
	balance = null,
	isLoading = false,
	fromBalance = false
) => {
	const [usdPrice, setUsdPrice] = useState(0);
	const {
		data: exchangeData,
		isLoading: exchangeLoading,
		isSuccess: exchangeSuccess,
		error: exchangeError,
	} = useExchangeRate(isLoading);

	useEffect(() => {
		exchangeRateDecoder(balance, exchangeData, fromBalance).then((res) => {
			setUsdPrice(res);
		});
	}, [balance, exchangeData, fromBalance]);

	return { usdPrice, exchangeLoading, exchangeError, exchangeSuccess };
};

export default useGetUsdExchange;
