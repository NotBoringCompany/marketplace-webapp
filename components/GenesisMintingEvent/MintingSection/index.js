import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { useMoralis, useWeb3Transfer } from "react-moralis";
import { useQuery, useMutation } from "react-query";
import styled from "styled-components";
import Image from "react-bootstrap/Image";

import { mediaBreakpoint } from "utils/breakpoints";
import { formatInTimeZone } from "date-fns-tz";
import AppContext from "context/AppContext";

import Loading from "components/Loading";
import { BlurContainer } from "components/BlurContainer";
import { HeadingMD } from "components/Typography/Headings";
import { TextPrimary } from "components/Typography/Texts";
import MetamaskButton from "components/Buttons/MetamaskButton";
import MintingStats from "components/Mint/MintingStats";

import {
	MainSection,
	StyledContainer,
	ContentContainer,
	MintBtnContainer,
} from "./Containers";
import MintButton from "./MintButton";
import AccountInfoBox from "./AccountInfoBox";
import RealmHunterButton from "./RealmHunterButton";
import Shard from "./Shard";
import NotWhitelistedBox from "./NotWhitelistedBox";
import Timers from "./Timers";
import BlurredStats from "./BlurredStats";
import Thankyou from "./Thankyou";

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
	width: 300px;
	height: 220px;
	margin-top: -16px;

	@media ${mediaBreakpoint.down.lg} {
		margin-top: -48px;
		width: 300px;
		height: 230px;
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
		amountMinted: 0,
		hasMintedFive: false,
		isProfileRegistered: false,
	});
	const [timeStamps, setTimeStamps] = useState({
		now: 0,
		publicOpenAt: 0,
		whitelistOpenAt: 0,
		mintingCloseAt: 0,
		isWhitelistOpen: false,
		isPublicOpen: false,
		isMintingEnded: false,
	});
	const [trxAndMintingLoading, setTrxAndMintingLoading] = useState(false);
	const [videoLoaded, setVideoLoaded] = useState(false);
	const { statesSwitchModal } = useContext(AppContext);
	const { haveBeenMinted, supplyLimit } = supplyData;
	const { canMint, isWhitelisted, amountMinted, hasMintedFive } = userStatus;
	const { isWhitelistOpen, isPublicOpen, isMintingEnded } = timeStamps;

	const { whitelistOpenAt } = timeStamps;

	const [antiRace, setAntiRace] = useState(true);

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
					isMintingEnded: timeStamps.isMintingEnded,
				});

				//prevents weird race condition
				setTimeout(() => {
					setUserStatus(status);
					setAntiRace(false);
				}, 50);
			},
			refetchOnWindowFocus: false,
			retry: 0,
			enabled: user && isAuthenticated && !isInitializing ? true : false,
		}
	);

	const { isLoading, isFetching } = userConfigs;

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
					isMintingEnded: timeStamps.isMintingEnded,
				});

				setTimeout(() => {
					setAntiRace(false);
				}, 150);
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
					isWhitelisted && amountMinted === 0 ? `whitelistedMint` : `publicMint`
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
				const res = await response.json();
				if (response.ok) {
					console.log("MUTATION SUCCESSFUL", res);
					setSupplyData({
						...supplyData,
						haveBeenMinted: haveBeenMinted + 1,
					});

					setUserStatus({ ...userStatus, amountMinted: amountMinted + 1 });

					console.log("nbmonId", res.nbmonId);
					statesSwitchModal.setter({
						show: true,
						content: "successMinting",
						nbmonId: res.nbmonId,
					});
					return;
				} else {
					console.log("ERROR MINTING", res);
					statesSwitchModal.setter({
						show: true,
						content: "txError",
						detail: {
							title: "Minting Error",
							text: "We are sorry, an unexpected \n minting error occured. \n \n Please contact us to let us know \n the details..",
						},
					});
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
		amount: Moralis.Units.ETH(
			parseFloat(process.env.NEXT_PUBLIC_MINTING_PRICE)
		),
		receiver: process.env.NEXT_PUBLIC_RECEIVER_WALLET,
		type: "native",
	});

	useEffect(() => {
		if (trfEth.data && !trfEth.error) {
			statesSwitchModal.setter({
				show: true,
				content: "waitTransaction",
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trfEth.data, trfEth.error]);

	useEffect(() => {
		if (!isLoading && !isFetching) {
			console.log(hasMintedFive);
			if (
				!hasMintedFive &&
				haveBeenMinted < supplyLimit &&
				((isWhitelistOpen && isWhitelisted) ||
					(isPublicOpen && !isWhitelisted)) &&
				isProfileRegistered
			) {
				setUserStatus({ ...userStatus, canMint: true });
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		hasMintedFive,
		isPublicOpen,
		isWhitelistOpen,
		isLoading,
		isFetching,
		isProfileRegistered,
	]);

	useEffect(() => {
		if (amountMinted === 5 || hasMintedFive) {
			// same thing
			setUserStatus({
				...userStatus,
				canMint: false,
				hasMintedFive: true,
			});
		} else {
			if (isWhitelisted && amountMinted >= 1 && !isPublicOpen) {
				// Actually amountMinted is only gonna be === 1 (since whitelist is only allowed to mint 1 before public is open)
				//. However, just in case.
				setUserStatus({
					...userStatus,
					canMint: false,
					hasMintedFive,
				});
			} else {
				setUserStatus({
					...userStatus,
					canMint: true,
					hasMintedFive,
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasMintedFive, amountMinted]);

	const handleMintButtonClicked = async () => {
		console.log("canMint", canMint);
		if (canMint) {
			setTrxAndMintingLoading(true);
			statesSwitchModal.setter({
				show: true,
				content: "metamaskConfirmation",
			});

			await trfEth.fetch({
				onSuccess: async (tx) => {
					const r = await tx.wait().catch((e) => {
						throw e;
					});

					const mintData = {
						purchaserAddress: user.attributes.ethAddress,
						txHash: r.transactionHash,
					};
					mintMutation.mutate(mintData);

					statesSwitchModal.setter({
						show: true,
						content: "beingMinted",
					});
				},
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
					} else if (!e.code || (e.code && e.code !== 4001)) {
						statesSwitchModal.setter({
							show: true,
							content: "txError",
							detail: {
								title: "Transaction Error",
								text: "We are sorry, an unexpected \n error occured during transaction. \n \n Please contact us to let us know \n the details.",
							},
						});
					}
					setTrxAndMintingLoading(false);
				},
			});
		}
	};

	if (userConfigs.isFetching || generalConfigs.isFetching || antiRace)
		return <Loading />;

	if (userConfigs.error || generalConfigs.error)
		return (
			<TextPrimary className="mt-4 text-white text-center">
				Oops, an unexpected error occured. Please refresh this page.
			</TextPrimary>
		);

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

						{!isMintingEnded ? (
							<>
								{!isWhitelistOpen && (
									<StyledHeadingMD className="text-white  mb-3 text-center">
										<span className="skinny">
											Genesis NBMon egg minting starts on
										</span>{" "}
										{formatInTimeZone(
											new Date(whitelistOpenAt),
											"utc",
											"MMMM do h a"
										)}{" "}
										UTC
									</StyledHeadingMD>
								)}

								{(isWhitelistOpen || isPublicOpen) && (
									<StyledHeadingMD className="text-white  mb-3 text-center">
										<span className="skinny">
											GENESIS NBMON EGG MINTING OPEN{" "}
										</span>
									</StyledHeadingMD>
								)}
							</>
						) : (
							<StyledHeadingMD className="text-white  mb-3 text-center">
								<span className="skinny">GENESIS NBMON EGG MINTING ENDED</span>
							</StyledHeadingMD>
						)}

						{!isMintingEnded ? (
							<>
								<Timers timeStampsStates={{ timeStamps, setTimeStamps }} />
								{!isAuthenticated ? (
									<MetamaskButton big className="mt-lg-5 mt-2 text-white" />
								) : (
									<>
										{!isWhitelistOpen &&
											!isPublicOpen &&
											!hasMintedFive &&
											haveBeenMinted < supplyLimit && (
												<AccountInfoBox user={user} />
											)}
										{!hasMintedFive && haveBeenMinted >= supplyLimit ? (
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
													{!isWhitelisted &&
													!isPublicOpen &&
													isWhitelistOpen ? (
														<NotWhitelistedBox
															address={user && user.attributes.ethAddress}
															supplyData={supplyData}
														/>
													) : (
														<>
															{hasMintedFive ? (
																<MintButton alreadyMint />
															) : (
																<>
																	{isWhitelisted &&
																	amountMinted >= 1 &&
																	// Actually amountMinted is only gonna be === 1
																	//(since whitelist is only allowed to mint 1 before public is open).
																	// However, just in case.
																	!isPublicOpen ? (
																		<MintButton
																			amountMinted={amountMinted}
																			waitPublicOpenForWhitelistedUsers
																			absoluteDisabled
																			onClick={() => {
																				handleMintButtonClicked();
																			}}
																		/>
																	) : (
																		<>
																			{((isWhitelistOpen && isWhitelisted) ||
																				(isPublicOpen && !isWhitelisted)) && (
																				<MintButton
																					amountMinted={amountMinted}
																					absoluteDisabled={
																						trxAndMintingLoading
																					}
																					onClick={() => {
																						handleMintButtonClicked();
																					}}
																				/>
																			)}
																		</>
																	)}
																</>
															)}
															{(isWhitelistOpen ||
																isPublicOpen ||
																hasMintedFive) && (
																<BlurredStats supplyData={supplyData} />
															)}
														</>
													)}
												</MintBtnContainer>
											</>
										)}
									</>
								)}
							</>
						) : (
							<Thankyou />
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
