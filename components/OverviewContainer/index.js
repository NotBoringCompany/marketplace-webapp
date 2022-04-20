import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useMoralis, useNativeBalance } from "react-moralis";
import styled from "styled-components";
import OverviewInventory from "./OverviewInventory";
import OverviewWallet from "./OverviewWallet";
import OverviewActivies from "./OverviewActivies";
import { TextPrimary } from "components/Typography/Texts";

const OverviewContainer = () => {
	const { user, isInitializing, isLoading: moralisLoading } = useMoralis();
	const [usdPrice, setUsdPrice] = useState(1);
	const [totalNBMons, setTotalNBMons] = useState(0);
	const {
		data: balance,
		error,
		isLoading,
	} = useNativeBalance({ chain: "0x4" });

	const exchangeRates = useQuery(
		"exchangeRates",
		() => fetch(`https://api.coinbase.com/v2/exchange-rates?currency=ETH`),
		{
			onSuccess: async (res) => {
				const result = await res.json();
				if (balance.balance === undefined) {
					setUsdPrice("Please connect your metamask");
				} else {
					setUsdPrice(
						`$${(
							result.data.rates.USD *
							(balance.balance / Math.pow(10, 18))
						).toFixed(3)}`
					);
				}
			},
			enabled: !isLoading,
			retry: 0,
			refetchOnWindowFocus: false,
		}
	);

	const nbmons = useQuery(
		"nbmons",
		() =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/genesisNBMon/getOwnerGenesisNBmons/${user.attributes.ethAddress}`
			),
		{
			onSuccess: async (res) => {
				const supply = await res.json();
				console.log(supply.length);
				setTotalNBMons(supply.length);
			},
			enabled: !isInitializing && !moralisLoading,
			retry: 0,
			refetchOnWindowFocus: false,
		}
	);

	if (isLoading) return null;

	return (
		<Wrapper>
			<OverviewWallet
				addressEth={user && user.attributes.ethAddress}
				totalEth1={
					isLoading
						? ""
						: !error
						? balance.formatted
						: "Error in getting balance"
				}
				totalEthUsd1={
					exchangeRates.isLoading
						? ""
						: !exchangeRates.error
						? `${usdPrice}`
						: "Error in getting USD price"
				}
			/>

			<OverviewInventory loading={nbmons.isLoading} totalNBMons={totalNBMons} />

			{/* <OverviewActivies /> */}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	max-width: 820px;
	width: 100%;
	margin: 92px auto;
	padding: 0;
`;

export default OverviewContainer;
