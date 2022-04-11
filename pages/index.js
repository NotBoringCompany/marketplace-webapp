import { useState } from "react";
import { useMoralis, useWeb3Contract, useWeb3Transfer } from "react-moralis";
import { useRouter } from "next/router";
// import Web3 from "web3";

import Image from "react-bootstrap/Image";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineArrowRight } from "react-icons/ai";
import Countdown from "react-countdown";

import styled from "styled-components";

import Layout from "components/Layout";
import Loading from "components/Loading";

import {
	Heading18,
	HeadingMD,
	HeadingSuperXXS,
} from "components/Typography/Headings";
import { TextSecondary } from "components/Typography/Texts";

import MetamaskButton from "components/Buttons/MetamaskButton";
import { BlurContainer } from "components/BlurContainer";

import MyButton from "components/Buttons/Button";
import CountDownContainer from "components/CountDownContainer";
import MintingStats from "components/Mint/MintingStats";

import { mediaBreakpoint } from "utils/breakpoints";

// import MintingGenesis from "../abis/MintingGenesis.json";

// const GENESIS_CONTRACT_ADDRESS_ETH =
// 	"0xc62620D685e08BaEB324D6EBAfB3dba1d333932c";

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

const StyledHeadingSuperXXS = styled(HeadingSuperXXS)`
	font-size: 14px;
	font-weight: 500;
`;

const Shard = styled.div`
	width: 0;
	position: absolute;
	height: 0;
	bottom: 0;
	right: 0;
	border-bottom: 310px solid rgba(255, 255, 255, 0.16);
	border-left: 400px solid transparent;

	@media ${mediaBreakpoint.down.md} {
		border-bottom: 170px solid rgba(255, 255, 255, 0.16);
		border-left: 580px solid transparent;
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

const MintingSection = styled.div`
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

export default function Home() {
	const { isAuthenticated, user, isInitializing } = useMoralis();
	// const router = useRouter();
	const [videoLoaded, setVideoLoaded] = useState(false);

	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			// Render a complete state
			return <p>asd</p>;
		} else {
			// Render a countdown
			return (
				<CountDownContainer
					days={days}
					hours={hours}
					minutes={minutes}
					seconds={seconds}
				/>
			);
		}
	};

	return (
		<Layout>
			<MintingSection className="position-relative">
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
								<div className="d-flex flex-column justify-content-center align-items-center">
									<HeadingSuperXXS
										as="p"
										className="mb-2 text-white text-uppercase text-center"
									>
										Whitelist Mint opens at 2 pm utc
									</HeadingSuperXXS>
									<Countdown
										date={1650636000000}
										renderer={renderer}
										callback
									/>
								</div>
								<div className="separator"></div>
								<div className="d-flex flex-column justify-content-center align-items-center">
									<HeadingSuperXXS
										as="p"
										className="mb-2 text-white text-uppercase text-center"
									>
										Public Mint opens at 4 pm utc
									</HeadingSuperXXS>{" "}
									<Countdown date={1650643200000} renderer={renderer} />
								</div>
							</TimersContainer>
							{/* 
						{user && (
							<>
								<button
									onClick={() => {
										trf.fetch();
									}}
									disabled={trf.isFetching}
								>
									transfer
								</button>

								<button onClick={fn}>sign tx</button>
							</>
						)} */}
							{!isAuthenticated && (
								<MetamaskButton big className="mt-lg-5 mt-2 text-white" />
							)}
							{isAuthenticated && (
								<MintingStats haveBeenMinted={2500} totalSupply={3000} />
							)}
							{isAuthenticated && (
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
							{!isInitializing && videoLoaded && (
								<div className="d-flex flex-column mt-auto ms-auto me-3 mb-0">
									<MyButton
										icon={<AiOutlineArrowRight className="text-white me-2" />}
										pill
										thinText
										newTab
										isLink
										href="https://realmhunter.io"
										text="visit realmhunter.io"
									/>
									<StyledHeadingSuperXXS as="p" className="text-white mt-2">
										for more information about the game
									</StyledHeadingSuperXXS>
								</div>
							)}
						</>
					) : (
						<Loading />
					)}
				</ContentContainer>
				<Shard />
			</MintingSection>

			{/*Other sections live from here on*/}
		</Layout>
	);
}
