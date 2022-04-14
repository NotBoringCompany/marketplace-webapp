import React, { useEffect, useContext } from "react";

import { useState } from "react";
import { useMoralis, useWeb3Transfer } from "react-moralis";
import { useQuery, useMutation } from "react-query";
import AppContext from "context/AppContext";

import Image from "react-bootstrap/Image";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

import styled from "styled-components";

import Loading from "components/Loading";

import {
	Heading18,
	HeadingMD,
	HeadingSuperXXS,
} from "components/Typography/Headings";
import { TextPrimary, TextSecondary } from "components/Typography/Texts";

import MetamaskButton from "components/Buttons/MetamaskButton";

import { BlurContainer } from "components/BlurContainer";

import MintButton from "./MintButton";
import MintingStats from "components/Mint/MintingStats";

import { mediaBreakpoint } from "utils/breakpoints";
import RealmHunterButton from "./RealmHunterButton";
import WhitelistTimer from "./WhitelistTimer";
import PublicTimer from "./PublicTimer";
import CloseMintingTimer from "./CloseMintingTimer";
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

	& .no-radius-top {
		border-top-right-radius: 0;
		border-top-left-radius: 0;
	}
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

const MintBtnContainer = styled.div`
	display: flex;
	max-width: 300px;
	flex-direction: column;
	justify-content: center;

	& p {
		max-width: 300%;
		line-break: anywhere;
		text-align: center;
	}
`;

const MintingSection = () => {
	const { isAuthenticated, user, isInitializing, Moralis } = useMoralis();
	const [supplyData, setSupplyData] = useState({
		haveBeenMinted: 0,
		supplyLimit: 0,
	});
	const [userStatus, setUserStatus] = useState({
		canMint: false,
		isWhitelisted: false,
		hasMintedBefore: false,
	});
	const [timeStamps, setTimeStamps] = useState({
		now: 0,
		publicOpenAt: 0,
		whitelistOpenAt: 0,
		mintingCloseAt: 0,
		isWhitelistOpen: false,
		isPublicOpen: false,
		isMintingClose: false,
	});
	const [trxAndMintingLoading, setTrxAndMintingLoading] = useState(false);
	const [videoLoaded, setVideoLoaded] = useState(false);
	const { statesSwitchModal } = useContext(AppContext);

	const { getter } = statesSwitchModal;

	const { haveBeenMinted, supplyLimit } = supplyData;
	const { canMint, isWhitelisted, hasMintedBefore } = userStatus;
	const {
		now,
		publicOpenAt,
		mintingCloseAt,
		whitelistOpenAt,
		isWhitelistOpen,
		isPublicOpen,
		isMintingClose,
	} = timeStamps;

	// const router = useRouter();

	const userConfigs = useQuery(
		"userConfigs",
		() =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/genesisNBMon/config/${user.attributes.ethAddress}`
			),
		{
			onSuccess: async (res) => {
				const supply = await res.json();
				const { supplies, status, timeStamps } = supply;
				console.log(supply);
				setSupplyData({
					...supplyData,
					haveBeenMinted: supplies.haveBeenMinted,
					supplyLimit: supplies.supplyLimit,
				});

				setTimeStamps({
					publicOpenAt: parseInt(timeStamps.publicOpenAt * 1000),
					whitelistOpenAt: parseInt(timeStamps.whitelistOpenAt * 1000),
					mintingCloseAt: parseInt(timeStamps.mintingCloseAt * 1000),
					now: parseInt(timeStamps.now * 1000),
					isWhitelistOpen: timeStamps.isWhitelistOpen, // timeStamps.isWhitelistOpen
					isPublicOpen: timeStamps.isPublicOpen, //timeStamps.isPublicOpen,
					isMintingClose: timeStamps.isMintingClose,
				});
				setUserStatus({
					canMint: status.canMint,
					isWhitelisted: status.isWhitelisted,
					hasMintedBefore: status.hasMintedBefore,
				});
			},
			refetchOnWindowFocus: false,
			retry: 0,
			enabled: user && isAuthenticated && !isInitializing ? true : false,
		}
	);

	const generalConfigs = useQuery(
		"generalConfigs",
		() =>
			fetch(`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/genesisNBMon/config`),
		{
			onSuccess: async (res) => {
				const supply = await res.json();
				const { supplies, timeStamps } = supply;
				console.log(supply);
				setSupplyData({
					...supplyData,
					haveBeenMinted: supplies.haveBeenMinted, //supplies.haveBeenMinted,
					supplyLimit: supplies.supplyLimit,
				});

				setTimeStamps({
					publicOpenAt: parseInt(timeStamps.publicOpenAt * 1000),
					whitelistOpenAt: parseInt(timeStamps.whitelistOpenAt * 1000),
					mintingCloseAt: parseInt(timeStamps.mintingCloseAt * 1000),
					now: parseInt(timeStamps.now * 1000),
					isWhitelistOpen: timeStamps.isWhitelistOpen,
					isPublicOpen: timeStamps.isPublicOpen,
				});
			},
			refetchOnWindowFocus: false,
			retry: 0,
			enabled: !user && !isAuthenticated && !isInitializing ? true : false,
		}
	);

	const mintMutation = useMutation(
		(mintData) =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/genesisNBMonMinting/${
					isWhitelisted ? `whitelistedMint` : `publicMint`
				}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(mintData),
				}
			),
		{
			onSuccess: async (response) => {
				//step3

				if (response.ok) {
					const mutationResult = await response.json();
					console.log("MUTATION SUCCESSFUL", mutationResult);
					setSupplyData({
						...supplyData,
						haveBeenMinted: haveBeenMinted + 1,
					});
					setUserStatus({
						...userStatus,
						canMint: false,
						hasMintedBefore: true,
					});

					statesSwitchModal.setter({
						show: true,
						content: "successMinting",
					});
					return;
				} else {
					const error = new Error(response.statusText);
					error.response = response;
					throw error;
				}
			},
			onError: (_) => {
				statesSwitchModal.setter({
					show: true,
					content: "txError",
					detail: {
						title: "Minting Error",
						text: "We are sorry, an unexpected \n minting error occured. \n \n Please contact us to let us know \n the details.",
					},
				});
			},
			onSettled: () => {
				setTrxAndMintingLoading(false);
			},
			retry: 0,
		}
	);

	const trfEth = useWeb3Transfer({
		amount: Moralis.Units.ETH(0.01),
		receiver: "0x2713489e72c84c97fa0B64Bc103a06c1C9b8b56A",
		type: "native",
	});

	useEffect(() => {
		if (trfEth.data && !trfEth.error) {
			statesSwitchModal.setter({
				show: true,
				content: "waitTransaction",
			});
		}
	}, [trfEth.data, trfEth.error]);

	const handleMintButtonClicked = async () => {
		if (canMint) {
			setTrxAndMintingLoading(true);
			statesSwitchModal.setter({
				show: true,
				content: "metamaskConfirmation",
			});

			await trfEth.fetch({
				onSuccess: (tx) =>
					tx.wait().then((r) => {
						const mintData = {
							purchaserAddress: user.attributes.ethAddress,
							txHash: r.transactionHash,
						};
						mintMutation.mutate(mintData);

						statesSwitchModal.setter({
							show: true,
							content: "beingMinted",
						});
					}),
				onError: (e) => {
					statesSwitchModal.setter({
						content: "txError",
						show: false,
					});
					if (e.code === "INSUFFICIENT_FUNDS") {
						statesSwitchModal.setter({
							show: true,
							content: "txError",
							detail: {
								title: "Transaction Error",
								text: `You have insufficient funds to \n make this transaction. \n\n Wallet address: ${user.attributes.ethAddress}`,
							},
						});
						// code 4001 is user cancellation
					} else if (e.code !== 4001) {
						statesSwitchModal.setter({
							show: true,
							content: "txError",
							detail: {
								title: "Transaction Error",
								text: "We are sorry, an unexpected \n error occured during transaction error occured. \n \n Please contact us to let us know \n the details.",
							},
						});
					}
					setTrxAndMintingLoading(false);
				},
			});
		}
	};

	if (userConfigs.isFetching || generalConfigs.isFetching) return <Loading />;

	if (userConfigs.error || generalConfigs.error)
		return (
			<TextPrimary className="mt-4 text-white text-center">
				Oops, an unexpected error occured. Please refresh this page.
			</TextPrimary>
		);
	if (trfEth.error) {
		<TextPrimary className="mt-4 text-white text-center">
			Oops, trx error..
		</TextPrimary>;
	}

	return (
		<MainSection className="position-relative">
			{!isInitializing && (
				<StyledContainer
					autoPlay
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
						{!isWhitelistOpen && (
							<StyledHeadingMD className="text-white  mb-3 text-center">
								<span className="skinny">
									Genesis NBMon egg minting starts on
								</span>{" "}
								22nd April, 2PM UTC
							</StyledHeadingMD>
						)}

						<TimersContainer>
							{!isPublicOpen && !isWhitelistOpen && (
								<WhitelistTimer
									date={whitelistOpenAt}
									rn={now}
									timeStampsStates={{ timeStamps, setTimeStamps }}
								/>
							)}

							{!isPublicOpen && isWhitelistOpen && (
								<CloseMintingTimer dummyDisplay />
							)}
							<div className="separator"></div>

							{!isPublicOpen ? (
								<PublicTimer
									date={publicOpenAt}
									rn={now}
									timeStampsStates={{ timeStamps, setTimeStamps }}
								/>
							) : (
								<CloseMintingTimer date={mintingCloseAt} rn={now} />
							)}
						</TimersContainer>
						{!isAuthenticated ? (
							<MetamaskButton big className="mt-lg-5 mt-2 text-white" />
						) : (
							<>
								{!isWhitelistOpen &&
									!isPublicOpen &&
									!hasMintedBefore &&
									haveBeenMinted < supplyLimit && (
										<>
											<BlurContainer className="mt-lg-5 mt-2 text-white">
												<div className="d-flex align-items-center">
													<IoIosCheckmarkCircleOutline className="me-2 checkmark-icon" />
													<Heading18 as="p">You are logged in</Heading18>
												</div>
												<TextSecondary className="mt-1">
													{user &&
														user.attributes &&
														user.attributes.ethAddress}
												</TextSecondary>
											</BlurContainer>
										</>
									)}
								{!hasMintedBefore && haveBeenMinted === supplyLimit ? (
									<MintBtnContainer>
										<MintButton maxReached />
										<BlurContainer className="no-radius-top">
											<MintingStats
												haveBeenMinted={haveBeenMinted}
												supplyLimit={supplyLimit}
											/>
										</BlurContainer>
									</MintBtnContainer>
								) : (
									<>
										<MintBtnContainer>
											{!isWhitelisted && !isPublicOpen && isWhitelistOpen ? (
												<BlurContainer>
													<HeadingSuperXXS as="p" className="text-white mb-2">
														Your address:
													</HeadingSuperXXS>

													<HeadingSuperXXS as="p" className="text-white mb-2">
														{user && user.attributes.ethAddress}
													</HeadingSuperXXS>

													<HeadingSuperXXS as="p" className="text-white mb-3">
														is not whitelisted
													</HeadingSuperXXS>

													<MintingStats
														haveBeenMinted={haveBeenMinted}
														supplyLimit={supplyLimit}
													/>
												</BlurContainer>
											) : (
												<>
													{hasMintedBefore ? (
														<MintButton alreadyMint />
													) : (
														<>
															{((isWhitelistOpen && isWhitelisted) ||
																(isPublicOpen && !isWhitelisted)) && (
																<MintButton
																	absoluteDisabled={
																		// trfEth.isLoading ||
																		// trfEth.isFetching ||
																		// 				mintMutation.isLoading
																		trxAndMintingLoading
																	}
																	onClick={() => {
																		handleMintButtonClicked();
																	}}
																/>
															)}
														</>
													)}
													{(isWhitelistOpen ||
														isPublicOpen ||
														hasMintedBefore) && (
														<BlurContainer className="no-radius-top">
															<MintingStats
																haveBeenMinted={haveBeenMinted}
																supplyLimit={supplyLimit}
															/>
														</BlurContainer>
													)}
												</>
											)}
										</MintBtnContainer>
									</>
								)}
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
