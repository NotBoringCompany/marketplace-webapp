import React, { useContext, useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useWeb3Contract } from "react-moralis";
import Countdown from "react-countdown";
import HatchButton from "components/Buttons/HatchButton";
import { HeadingXXS } from "components/Typography/Headings";
import AppContext from "context/AppContext";
import MintingGenesis from "components/../abis/MintingGenesis.json";

const HatchButtonContainer = ({ mine, isHatchable, hatchesAt, nbmonId }) => {
	const { statesSwitchModal } = useContext(AppContext);
	const [getNBmon, setGetNBmon] = useState(0);
	const [key, setKey] = useState(null);

	useEffect(() => {
		if (key) {
			handleHatch(key);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [key]);

	const { getter, setter } = statesSwitchModal;

	const [disableHatchBtn, setDisableHatchBtn] = useState(false);

	const abi = MintingGenesis;

	const hatchFromEgg = useWeb3Contract({
		abi,
		contractAddress: process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT,
		functionName: "hatchFromEgg",
		params: {
			_key: key,
			_nbmonId: nbmonId,
		},
	});

	const statsRandomizer = useMutation(
		() =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/genesisNBMonHatching/randomizeHatchingStats`,
				{
					method: "POST",
				}
			),
		{
			onSuccess: async (response) => {
				if (response.ok) {
					const res = await response.json();
					setKey(res.key);
					console.log("Hatching key: ", res.key);
				} else {
					const error = new Error(response.statusText);
					error.response = response;
					throw error;
				}
			},
			onError: (_) => {
				setter({
					show: true,
					content: "txError",
					detail: {
						title: "Hatching Error",
						text: "We are sorry, there was a problem in getting your hatching key. \n\n Please refresh this page \n and try again.",
					},
				});
			},
			retry: 0,
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
				if (response.ok) {
					const nbMon = await response.json();
					console.log("hatchedNBmon", nbMon);
					setter({ content: "videoPreview", show: true, nbMon });
				} else {
					const error = new Error(response.statusText);
					error.response = response;
					throw error;
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

	const handleGetHatchKey = () => {
		statsRandomizer.mutate(); // gets key from backend
	};

	const handleHatch = async (key) => {
		if (key) {
			setter({ ...getter, show: true, content: "metamaskConfirmation" });
			hatchFromEgg.runContractFunction({
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
					addToActivity.mutate(awaited.transactionHash);
					uploadMetadataToS3.mutate(nbmonId);
					setGetNBmon(nbmonId); // starting the mechanism to show the video preview
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
				nbmonId,
				setDisableHatchBtn,
				onClickHatchKey: handleGetHatchKey,
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
