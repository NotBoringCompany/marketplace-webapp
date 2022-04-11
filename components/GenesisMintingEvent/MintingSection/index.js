import React from "react";

import { useState } from "react";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import Image from "react-bootstrap/Image";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import styled from "styled-components";

import Loading from "components/Loading";

import { Heading18, HeadingMD } from "components/Typography/Headings";
import { TextPrimary, TextSecondary } from "components/Typography/Texts";

import MetamaskButton from "components/Buttons/MetamaskButton";
import { BlurContainer } from "components/BlurContainer";

import CountDownContainer from "components/CountDownContainer";
import MintingStats from "components/Mint/MintingStats";

import { mediaBreakpoint } from "utils/breakpoints";
import RealmHunterButton from "./RealmHunterButton";
import WhitelistTimer from "./WhitelistTimer";
import PublicTimer from "./PublicTimer";
import Shard from "./Shard";

const MainSection = styled.div`
	min-height: 100vh;

	@media ${mediaBreakpoint.down.lg} and (orientation: landscape) {
		min-height: calc(100vh + 380px);
	}

	@media (min-width: 820px) and (max-width: 1024px) and (orientation: portrait) {
		min-height: calc(60vh + 100px);
	}

	@media (max-height: 667px) and (orientation: portrait) {
		min-height: calc(100vh + 120px);
	}
`;

const StyledContainer = styled.video`
	position: absolute;
	right: 0;
	bottom: 0;
	min-width: 100%;
	min-height: 100%;
`;

const ContentContainer = styled.div`
	position: absolute;
	top: 0;
	display: flex;
	flex-direction: column;
	height: 100%;
	z-index: 2;
	width: 100%;
	align-items: center;
	padding: 20px;
`;

const StyledHeadingMD = styled(HeadingMD)`
	& span.skinny {
		font-weight: lighter;
	}
	font-size: 38px;

	@media ${mediaBreakpoint.down.xl} {
		margin-top: -24px;
		font-size: 24px;
		line-height: 28px;
	}
`;

const RHImage = styled(Image)`
	width: 360px;
	height: 260px;
	margin-top: -16px;

	@media ${mediaBreakpoint.down.lg} {
		margin-top: -48px;
		width: 300px;
		height: 230px;
	}
`;
const TimersContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 24px;

	& .separator {
		margin: 0 16px;
	}

	@media ${mediaBreakpoint.down.md} {
	}

	@media ${mediaBreakpoint.down.lg} {
		flex-direction: column;
		& .separator {
			margin: 8px 0;
		}
	}
`;

const MintingSection = () => {
	const { isAuthenticated, user, isInitializing } = useMoralis();
	const [supplyData, setSupplyData] = useState({
		haveBeenMinted: 0,
		supplyLimit: 0,
	});
	const [userStatus, setUserStatus] = useState({
		canMint: false,
		isWhitelisted: false,
	});
	const [timeStamps, setTimeStamps] = useState({
		now: 0,
		publicOpenAt: 0,
		whitelistOpenAt: 0,
		cock: 0,
	});
	const { haveBeenMinted, supplyLimit } = supplyData;
	const { canMint, isWhitelisted } = userStatus;
	const { now, publicOpenAt, whitelistOpenAt, cock } = timeStamps;

	// const router = useRouter();
	const [videoLoaded, setVideoLoaded] = useState(false);

	const { isFetching, error } = useQuery(
		"mintingSectionConfig",
		() =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/genesisNBMon/config/${user.attributes.ethAddress}`
			).then(async (res) => {
				const supply = await res.json();
				const { supplies, status, timeStamps } = supply;
				console.log(supply);
				setSupplyData({
					...supplyData,
					haveBeenMinted: supplies.haveBeenMinted,
					supplyLimit: supplies.supplyLimit,
				});
				setUserStatus({
					canMint: true,
					isWhitelisted: status.isWhitelisted,
				});

				setTimeStamps({
					publicOpenAt: parseInt(timeStamps.publicOpenAt * 1000),
					whitelistOpenAt: parseInt(timeStamps.whitelistOpenAt * 1000),
					now: parseInt(timeStamps.now * 1000),
				});
			}),
		{
			refetchOnWindowFocus: false,
			retry: 0,
			enabled: user && isAuthenticated && !isInitializing ? true : false,
		}
	);

	if (isFetching) return <Loading />;

	if (error)
		return (
			<TextPrimary className="mt-4 text-white text-center">
				Oops, an unexpected error occured. Please refresh this page.
			</TextPrimary>
		);

	return (
		<MainSection className="position-relative">
			{!isInitializing && (
				<StyledContainer
					autoPlay={false}
					loop
					muted
					playsInline
					onCanPlay={() => setVideoLoaded(true)}
				>
					<source src="./images/bg.mp4" type="video/mp4" />
				</StyledContainer>
			)}

			<ContentContainer>
				{!isInitializing && videoLoaded ? (
					<>
						<RHImage src={"./images/rh_logo2.png"} alt="logo" />

						<StyledHeadingMD className="text-white  mb-3 text-center">
							<span className="skinny">
								Genesis NBMon egg minting starts on
							</span>{" "}
							April 22, 4PM UTC
						</StyledHeadingMD>

						<TimersContainer>
							<WhitelistTimer date={whitelistOpenAt} rn={now} />
							<div className="separator"></div>
							<PublicTimer date={publicOpenAt} rn={now} />
						</TimersContainer>

						{isAuthenticated && canMint && (
							<MintingStats
								haveBeenMinted={haveBeenMinted}
								supplyLimit={supplyLimit}
							/>
						)}
						{!isAuthenticated && (
							<MetamaskButton big className="mt-lg-5 mt-2 text-white" />
						)}
						{isAuthenticated && !canMint && (
							<>
								<BlurContainer className="mt-lg-5 mt-2 text-white">
									<div className="d-flex align-items-center">
										<IoIosCheckmarkCircleOutline className="me-2 checkmark-icon" />
										<Heading18 as="p">You are logged in</Heading18>
									</div>
									<TextSecondary className="mt-1">
										{user &&
											user.attributes &&
											user.attributes.ethAddress.toUpperCase()}
									</TextSecondary>
								</BlurContainer>
							</>
						)}
						{!isInitializing && videoLoaded && <RealmHunterButton />}
					</>
				) : (
					<Loading />
				)}
			</ContentContainer>
			<Shard />
		</MainSection>
	);
};

export default MintingSection;
