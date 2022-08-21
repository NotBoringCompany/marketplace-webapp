import React, { useContext, useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useMoralis, useWeb3Transfer, useWeb3Contract } from "react-moralis";
import Countdown from "react-countdown";
import HatchButton from "components/Buttons/HatchButton";
import { HeadingXXS } from "components/Typography/Headings";
import AppContext from "context/AppContext";
import MintingGenesis from "components/../abis/MintingGenesis.json";

const HatchButtonContainer = ({ mine, isHatchable, hatchesAt, nbmonId }) => {
	const { statesSwitchModal } = useContext(AppContext);
	const { user, Moralis } = useMoralis();
	const [getNBmon, setGetNBmon] = useState(0);
	const [hatchDataStates, setHatchDataStates] = useState(null);
	const [signature, setSignature] = useState(null);

	useEffect(() => {
		if (signature) {
			console.log("Now hatching with signature:", signature);
			handleHatch(signature);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [signature]);

	const { getter, setter } = statesSwitchModal;

	const [disableHatchBtn, setDisableHatchBtn] = useState(false);

	const abi = MintingGenesis;

	const hatchFromEgg = useWeb3Contract({
		abi,
		contractAddress: process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT,
		functionName: "hatchFromEgg",
		params: {
			_signature: signature,
		},
	});

	const trfHatchingFee = useWeb3Transfer({
		amount: Moralis.Units.ETH(process.env.NEXT_PUBLIC_GENESIS_HATCHING_PRICE),
		receiver: process.env.NEXT_PUBLIC_RECEIVER_WALLET,
		type: "native",
	});

	const generateSignatureMutation = useMutation(
		(hatchData) =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/genesisNBMonHatching/hatch`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(hatchData),
				}
			),
		{
			onSuccess: async (response) => {
				const res = await response.json();

				if (response.ok) {
					if (res.signature) {
						setSignature(res.signature);
						console.log("Hatching signature: ", res.signature);
					} else {
						console.log("Retrying due to error:", res.reason && res.reason);
						generateSignatureMutation.mutate(hatchDataStates);
					}
				} else {
					console.log("ERROR HATCHING", response);
					console.log("now refetching...");
					generateSignatureMutation.mutate(hatchDataStates);
				}
			},
			onError: (err) => {
				console.log("ERROR HATCHING!", err);
				setter({
					show: true,
					content: "txError",
					detail: {
						title: "Hatching Error",
						text: "We are sorry, there was a problem in getting your hatching signature. \n\n Please refresh this page \n and try again.",
					},
				});
			},
			retry: 0,
		}
	);

	const updateNBMon = useMutation(
		(id) =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/genesisnbmonhatching/updateHatchedNBMon`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ id }),
				}
			),
		{
			onSuccess: () => {
				uploadMetadataToS3.mutate(nbmonId);
				setGetNBmon(nbmonId); // starting the mechanism to show the video preview
				console.log("nbmon updated!");
			},
			onError: (e) => {
				console.log("error updating nbmon", e);
			},
			retry: 3,
		}
	);

	useQuery(
		"getHatchedNBmon",
		() =>
			fetch(
				`${
					process.env.NEXT_PUBLIC_NEW_REST_API_URL
				}/genesisNBMon/getGenesisNBMon/${parseInt(nbmonId)}`
			),
		{
			onSuccess: async (response) => {
				const nbMon = await response.json();

				if (response.ok) {
					console.log("hatchedNBmon", nbMon);
					setter({ content: "videoPreview", show: true, nbMon });
				} else {
					console.log("GET HATCHED NBMON ERROR", nbMon);
					setter({
						show: true,
						content: "txError",
						detail: {
							title: "Hatching Error",
							text: "We are sorry, there was a problem in displaying your hatched NBMon. \n \n Please refresh this page. (400)",
						},
					});
				}
			},
			onError: (_) => {
				setter({
					show: true,
					content: "txError",
					detail: {
						title: "Hatching Error",
						text: "We are sorry, there was a problem in displaying your hatched NBMon. \n \n Please refresh this page.",
					},
				});
			},

			enabled: getNBmon > 0,
			refetchOnWindowFocus: false,
			retry: 1,
		}
	);

	const addToActivity = useMutation(
		(hash) =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/activities/addHatchingActivity`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ hash }),
				}
			),
		{
			onSuccess: () => {
				console.log("added to activity!");
			},
			onError: (_) => {
				console.log("error adding to activity");
			},
			retry: 0,
		}
	);

	const uploadMetadataToS3 = useMutation(
		(nbmonId) =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/genesisNBMonHatching/uploadHatchedMetadata`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ nbmonId }),
				}
			),
		{
			onSuccess: () => {
				console.log("metadata uploaded...");
			},
			onError: (_) => {
				console.log("error uploading hatched metadata");
			},
			retry: 0,
		}
	);

	const handleGetHatchSignature = async () => {
		setter({
			...getter,
			show: true,
			content: "metamaskConfirmation",
			extraContent: "hatching fee",
		});

		await trfHatchingFee.fetch({
			onSuccess: async (tx) => {
				statesSwitchModal.setter({
					show: true,
					content: "waitTransaction",
				});
				const r = await tx.wait().catch((e) => {
					throw e;
				});

				console.log("trfHatchingFee", r);

				const hatchData = {
					purchaserAddress: user && user.attributes.ethAddress,
					txHash: r.transactionHash,
					txGasFee: 0,
					purchaseType: "genesisHatching",
					nbmonId,
				};
				setHatchDataStates(hatchData);
				generateSignatureMutation.mutate(hatchData);

				setter({
					show: true,
					content: "userConfirmation",
					loading: true,
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
					console.log({ e });
					console.log("Error paying hatching fee");
					statesSwitchModal.setter({
						show: true,
						content: "txError",
						detail: {
							title: "Transaction Error",
							text: "We are sorry, an unexpected \n error occured during transaction. \n \n Please contact us to let us know \n the details.",
						},
					});
				}
				setDisableHatchBtn(false);
			},
		});
	};

	const handleHatch = async (signature) => {
		if (signature) {
			setter({
				...getter,
				show: true,
				content: "metamaskConfirmation",
				extraContent: "hatching your egg",
			});
			await hatchFromEgg.runContractFunction({
				onSuccess: async (tx) => {
					console.log("tx", tx);
					setter({
						content: "waitHatching",
						show: true,
					});
					const awaited = await tx.wait().catch((e) => {
						throw e;
					});
					console.log("metamask trf done!", awaited);
					console.log("trx hash", awaited.transactionHash);

					updateNBMon.mutate(nbmonId);
					addToActivity.mutate(awaited.transactionHash);
				},
				onError: (e) => {
					setter({
						content: "txError",
						show: false,
					});
					if (e.code === "INSUFFICIENT_FUNDS") {
						setter({
							show: true,
							content: "txError",
							detail: {
								title: "Transaction Error",
								text: `You have insufficient funds to \n hatch this egg. \n\n Wallet address: ${user.attributes.ethAddress}`,
							},
						});
						// code 4001 is user cancellation
					} else if (e.code !== 4001) {
						console.log({ e });
						console.log("Error actual hatching egg");
						setter({
							show: true,
							content: "txError",
							detail: {
								title: "Transaction Error",
								text: "We are sorry, an unexpected \n error occured during transaction. \n \n Please contact us to let us know \n the details.",
							},
						});
					}
					setDisableHatchBtn(false);
				},
			});
		}
	};

	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			if (!isHatchable) window.location.reload();

			return <></>;
		} else {
			// Render a countdown
			return (
				<HatchButton
					disabled
					text={`Hatch available in ${days >= 1 ? `${days} day(s) and` : ``} ${
						hours > 9 ? hours : `0${hours}`
					}:${minutes > 9 ? minutes : `0${minutes}`}:${
						seconds > 9 ? seconds : `0${seconds}`
					}`}
				/>
			);
		}
	};

	const handleHatchButtonClick = () => {
		if (mine && isHatchable && !disableHatchBtn) {
			setter({
				show: true,
				content: "userConfirmation",
				setDisableHatchBtn,
				onClickHatchSignature: handleGetHatchSignature,
			});

			setDisableHatchBtn(true);
		}
	};

	return (
		<div className="afterImage text-center w-100 d-flex flex-column align-items-center">
			<HeadingXXS as="h1" className="text-white text-capitalize mb-3">
				Genesis NBMon Egg
			</HeadingXXS>{" "}
			{mine && !isHatchable && (
				<Countdown date={hatchesAt} renderer={renderer} />
			)}
			{mine && isHatchable && (
				<HatchButton
					disabled={disableHatchBtn}
					onClick={handleHatchButtonClick}
				/>
			)}
		</div>
	);
};

export default HatchButtonContainer;
