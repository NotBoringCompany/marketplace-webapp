import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { useMoralis, useWeb3Transfer } from "react-moralis";
import { useQuery, useMutation } from "react-query";
import styled from "styled-components";
import Image from "react-bootstrap/Image";

import { mediaBreakpoint } from "utils/breakpoints";
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
		hasMintedBefore: false,
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
	const { canMint, isWhitelisted, hasMintedBefore } = userStatus;
	const { isWhitelistOpen, isPublicOpen, isMintingEnded } = timeStamps;

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
					isMintingEnded: timeStamps.isMintingEnded,
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
		receiver: process.env.NEXT_PUBLIC_RECEIVER_ADDRESS,
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
		if (
			!hasMintedBefore &&
			haveBeenMinted < supplyLimit &&
			((isWhitelistOpen && isWhitelisted) || (isPublicOpen && !isWhitelisted))
		) {
			setUserStatus({ ...userStatus, canMint: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPublicOpen, isWhitelistOpen]);

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
								text: "We are sorry, an unexpected \n error occured during transaction. \n \n Please contact us to let us know \n the details.",
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
										22nd April, 2PM UTC
									</StyledHeadingMD>
								)}

								{(isWhitelistOpen || isPublicOpen) && (
									<StyledHeadingMD className="text-white  mb-3 text-center">
										<span className="skinny">
											GENESIS NBMON EGG MINTING OPEN
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
											!hasMintedBefore &&
											haveBeenMinted < supplyLimit && <AccountInfoBox />}
										{!hasMintedBefore && haveBeenMinted >= supplyLimit ? (
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
															{hasMintedBefore ? (
																<MintButton alreadyMint />
															) : (
																<>
																	{((isWhitelistOpen && isWhitelisted) ||
																		(isPublicOpen && !isWhitelisted)) && (
																		<MintButton
																			absoluteDisabled={trxAndMintingLoading}
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
