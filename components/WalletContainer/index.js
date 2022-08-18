import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import { useMoralis } from "react-moralis";
import AppContext from "context/AppContext";
import styled from "styled-components";
import RealmTokens from "./RealmTokens";
import DepositTokens from "./DepositTokens";
import ClaimTokens from "./ClaimTokens";
import WebAppTier from "./WebAppTier";

const WalletContainer = () => {
	const { user, isInitializing, isLoading: moralisLoading } = useMoralis();
	const [resOwned, setResOwned] = useState(0);
	const [xResOwned, setxResOwned] = useState(0);
	const [webAppTier, setWebAppTier] = useState("");
	const [showDepositContainer, setShowDepositContainer] = useState(false);
	const [showClaimContainer, setShowClaimContainer] = useState(false);
	const [tokenContainer, setTokenContainer] = useState("");
	const [tokenName, setTokenName] = useState("");
	const [resAllowance, setResAllowance] = useState(0);
	const [playfabId, setPlayfabId] = useState(null);

	const { statesSwitchModal } = useContext(AppContext);

	const getRESAllowance = useQuery(
		"resAllowance",
		() =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/currencies/getRESAllowance/${user.attributes.ethAddress}`
			),
		{
			onSuccess: async (res) => {
				const allowance = await res.json();
				setResAllowance(allowance);
			},
			enabled: user && !isInitializing && !moralisLoading,
			retry: 0,
			refetchOnWindowFocus: false,
		}
	);

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
			refetchOnWindowFocus: false,
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
				console.log(ownedxRES);
				setxResOwned(ownedxRES);
			},
			enabled: user && !isInitializing && !moralisLoading,
			retry: 0,
			refetchOnWindowFocus: false,
		}
	);

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
			refetchOnWindowFocus: false,
		}
	);

	const getPlayfabId = useQuery(
		"playfabId",
		() =>
			fetch(
				`${
					process.env.NEXT_PUBLIC_NEW_REST_API_URL
				}/account/getPlayfabId/${user.attributes.ethAddress.toLowerCase()}`
			),
		{
			onSuccess: async (res) => {
				const playfabId = await res.json();

				//The format of API result above is irregular. Needs fixing.

				if (!playfabId.error) {
					// if it returns an error obj
					setPlayfabId(playfabId);
				}
			},
			enabled: user && !isInitializing && !moralisLoading,
			retry: 0,
			refetchOnWindowFocus: false,
		}
	);

	return (
		<Wrapper>
			<WebAppTier loading={getWebAppTier.isLoading} tier={webAppTier} />
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
				statesSwitchModal={statesSwitchModal}
				resAllowance={resAllowance}
				playfabId={playfabId}
			/>

			{tokenContainer === "Deposit" && showDepositContainer && (
				<DepositTokens
					tokenName={tokenName}
					availableAmount={tokenName === "RES" ? resOwned : ""}
					resAllowance={resAllowance}
				/>
			)}

			{tokenContainer === "Claim" && showClaimContainer && (
				<ClaimTokens
					tokenName={tokenName}
					availableAmount={tokenName === "xRES" ? xResOwned : ""}
				/>
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

export default WalletContainer;
