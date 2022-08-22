import { useQuery } from "react-query";

const useExchangeRate = (isLoading = false) => {
	const q = useQuery(
		"exchangeRates",
		() => fetch(`https://api.coinbase.com/v2/exchange-rates?currency=MATIC`),
		{
			enabled: !isLoading,
			retry: 0,
			refetchOnWindowFocus: false,
		}
	);

	return {
		data: q.data,
		isSuccess: q.isSuccess,
		isLoading: q.isLoading,
		error: q.error,
	};
};

export default useExchangeRate;
