import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import { useMoralis } from "react-moralis";
import AppContext from "context/AppContext";
import styled from "styled-components";
import RealmTokens from "./RealmTokens";
import WebAppTier from "./WebAppTier";
import Loading from "components/Loading";

const WalletContainer = () => {
	const { user, isInitializing, isLoading: moralisLoading } = useMoralis();
	const [playfabId, setPlayfabId] = useState(null);
	const [coolDownUntil, setCooldownUntil] = useState(0);

	const [webAppData, setWebAppData] = useState({
		resAllowance: null,
		ownedRes: null,
		ownedxRES: null,
		claimingInfo: null,
		claimCooldown: null,
		webAppTier: null,
	});

	const {
		ownedRES,
		ownedxRES,
		claimingInfo,
		claimCooldown,
		resAllowance,
		webAppTier,
	} = webAppData;

	const { statesSwitchModal } = useContext(AppContext);

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
				setCooldownUntil(Date.now() + data.claimCooldown.xRESCooldown * 1000);
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
			{(getWalletData.isLoading || getPlayfabId.isLoading) && <Loading />}
			{!getWalletData.isLoading && !getPlayfabId.isLoading && (
				<>
					<WebAppTier tier={webAppTier} />
					<RealmTokens
						resOwned={ownedRES}
						xresOwned={ownedxRES}
						statesSwitchModal={statesSwitchModal}
						resAllowance={resAllowance}
						playfabId={playfabId}
						claimingInfo={claimingInfo}
						claimCooldown={claimCooldown}
						coolDownUntil={coolDownUntil}
					/>
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
