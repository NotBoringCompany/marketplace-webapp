import React, { useState } from "react";
import { useQuery } from "react-query";
import { useMoralis, useNativeBalance } from "react-moralis";
import styled from "styled-components";
import OverviewInventory from "./OverviewInventory";
import OverviewWallet from "./OverviewWallet";
import OverviewActivies from "./OverviewActivies";

import useGetUsdExchange from "utils/hooks/useGetUsdExchange";

const OverviewContainer = () => {
	const { user, isInitializing, isLoading: moralisLoading } = useMoralis();
	const [totalNBMons, setTotalNBMons] = useState(0);
	const {
		data: balance,
		error,
		isLoading,
	} = useNativeBalance({ chain: process.env.NEXT_PUBLIC_CHAIN_ID });

	const [activities, setActivities] = useState([]);

	const { usdPrice, exchangeLoading, exchangeError } = useGetUsdExchange(
		balance,
		isLoading,
		true
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
			enabled: user && !isInitializing && !moralisLoading,
			retry: 0,
			refetchOnWindowFocus: false,
		}
	);

	const userActivities = useQuery(
		"activities",
		() =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/activities/${user.attributes.ethAddress}`
			),
		{
			onSuccess: async (res) => {
				const result = await res.json();
				console.log(result);
				setActivities(result);
			},
			enabled: user && !isInitializing && !moralisLoading,
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
					exchangeLoading
						? ""
						: !exchangeError
						? usdPrice
						: "Error in getting USD price"
				}
			/>

			<OverviewInventory loading={nbmons.isLoading} totalNBMons={totalNBMons} />

			{userActivities.isLoading ? (
				"..."
			) : (
				<OverviewActivies activities={activities} />
			)}
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
