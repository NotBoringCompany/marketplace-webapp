import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import { useMoralis } from "react-moralis";
import AppContext from "context/AppContext";
import styled from "styled-components";
import RealmTokens from "./RealmTokens";
import ClaimTokens from "./ClaimTokens";
import WebAppTier from "./WebAppTier";
import Loading from "components/Loading";

const WalletContainer = () => {
	const { user, isInitializing, isLoading: moralisLoading } = useMoralis();
	const [webAppTier, setWebAppTier] = useState("");
	const [tokenContainer, setTokenContainer] = useState("");
	const [tokenName, setTokenName] = useState("");
	const [resAllowance, setResAllowance] = useState(0);
	const [playfabId, setPlayfabId] = useState(null);

	const [webAppData, setWebAppData] = useState({});

	const { ownedRES, ownedxRES, claimingInfo, claimCooldown } = webAppData;

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

	const getWalletData = useQuery(
		"walletData",
		() =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/currencies/getallwebappdata/${user.attributes.ethAddress}`
			),
		{
			onSuccess: async (res) => {
				const data = await res.json();
				console.log(data);
				setWebAppData(data);
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
			{getWalletData.isFetching && <Loading />}
			{!getWalletData.isLoading && (
				<>
					<WebAppTier loading={getWebAppTier.isLoading} tier={webAppTier} />
					<RealmTokens
						resOwned={ownedRES}
						xresOwned={ownedxRES}
						statesSwitchModal={statesSwitchModal}
						resAllowance={resAllowance}
						playfabId={playfabId}
						claimingInfo={claimingInfo}
						claimCooldown={claimCooldown}
					/>

					<ClaimTokens tokenName={"xRES"} availableAmount={ownedxRES} />
				</>
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
