import React, { useState } from "react";
import { useQuery } from "react-query";
import { useMoralis, useNativeBalance } from "react-moralis";
import styled from "styled-components";
import OverviewWallet from "components/OverviewContainer/OverviewWallet";
import RealmTokens from "./RealmTokens";
import DepositTokens from "./DepositTokens";
import ClaimTokens from "./ClaimTokens";
import WebAppTier from "./WebAppTier";

import useGetUsdExchange from "utils/hooks/useGetUsdExchange";


const WalletContainer = () => { 
    const { user, isInitializing, isLoading: moralisLoading } = useMoralis();
	const [resOwned, setResOwned] = useState(0);
	const [xResOwned, setxResOwned] = useState(0);
	const [webAppTier, setWebAppTier] = useState('');
	const [showDepositContainer, setShowDepositContainer] = useState(false);
	const [showClaimContainer, setShowClaimContainer] = useState(false);
	const [tokenContainer, setTokenContainer] = useState('');
	const [tokenName, setTokenName] = useState('');

    const {
		data: balance,
		error,
		isLoading,
	} = useNativeBalance({ chain: process.env.NEXT_PUBLIC_CHAIN_ID });

	const getRES = useQuery(
		"res",
		() =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/currencies/getOwnedRES/${user.attributes.ethAddress}`
			),
		{
			onSuccess: async (res) => {
				const ownedRES = await res.json();
				setResOwned(ownedRES);
			},
			enabled: user && !isInitializing && !moralisLoading,
			retry: 0,
			refetchOnWindowFocus: false
		}
	);

	const getxRES = useQuery(
		"xRES",
		() =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/currencies/getOwnedxRESFromAddress/${user.attributes.ethAddress}`
			),
		{
			onSuccess: async (res) => {
				const ownedxRES = await res.json();
				setxResOwned(ownedxRES);
			},
			enabled: user && !isInitializing && !moralisLoading,
			retry: 0,
			refetchOnWindowFocus: false
		}
	)

	const getWebAppTier = useQuery(
		"webAppTier",
		() => 
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/tierSystem/getWebAppTier/${user.attributes.ethAddress}`
			),
		{
			onSuccess: async (res) => {
				const tier = await res.json();
				setWebAppTier(tier);
			},
			enabled: user && !isInitializing && !moralisLoading,
			retry: 0,
			refetchOnWindowFocus: false
		}
	)

    return (
        <Wrapper>
			{/* <OverviewWallet
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
			/> */}
			<WebAppTier loading={getWebAppTier.isLoading} tier={webAppTier}/>
			<RealmTokens
				loading={getRES.isLoading && getxRES.isLoading}
				resOwned={resOwned}
				xresOwned={xResOwned}
				tokenContainer={tokenContainer}
				setTokenContainer={setTokenContainer}
				showDepositContainer={showDepositContainer}
				showClaimContainer={showClaimContainer}
				setShowDepositContainer={setShowDepositContainer}
				setShowClaimContainer={setShowClaimContainer}
				tokenName={tokenName}
				setTokenName={setTokenName}
			/>

			{tokenContainer === "Deposit" && showDepositContainer && (
				<DepositTokens 
				tokenName={tokenName} 
				availableAmount={
					tokenName === "RES" ? resOwned : ""
					// : recOwned {NOT AVAILABLE YET}
				}
				/>
			)}

			{tokenContainer === "Claim" && showClaimContainer && (
				<ClaimTokens 
				tokenName={tokenName} 
				availableAmount={
					tokenName === "xRES" ? xResOwned : ""
					// : xrecOwned {NOT AVAILABLE YET}
				}
				/>
			)}
			{/* {showDepositTokens && (
				<DepositTokens 
					tokenName={tokenName} 
					availableAmount={
						tokenName === "RES" ? resOwned : ""
						// : recOwned {NOT AVAILABLE YET}
					}
				/>
			)}
			{showClaimTokens && (
				<ClaimTokens 
					tokenName={tokenName} 
					availableAmount={
						tokenName === "RES" ? resOwned : ""
						// : recOwned {NOT AVAILABLE YET}
					}
				/>
			)} */}

        </Wrapper>
    );
};

const Wrapper = styled.div`
	max-width: 820px;
	width: 100%;
	margin: 92px auto;
	padding: 0;
`;

export default WalletContainer;