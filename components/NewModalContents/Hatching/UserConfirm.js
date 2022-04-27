import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useWeb3Contract } from "react-moralis";
import Image from "next/image";
import { Image as BsImage } from "react-bootstrap";
import { TextPrimary } from "components/Typography/Texts";
import { HeadingSuperXXS } from "components/Typography/Headings";
import Egg from "components/../public/images/egg.svg";
import styled from "styled-components";
import HatchButton from "components/Buttons/HatchButton";
import MintingGenesis from "components/../abis/MintingGenesis.json";

const Subtitle = styled(HeadingSuperXXS)`
	font-size: 16px;
`;

const CancelButton = styled.button`
	background: none;
	color: #67dbb1;
	border: none;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
`;

const UserConfirm = ({ stateUtils }) => {
	const { setter, getter } = stateUtils;
	const { nbmonId, setDisableHatchBtn } = getter;

	const [loading, setLoading] = useState(false);
	const [key, setKey] = useState(null);

	const abi = MintingGenesis;

	const [getNBmon, setGetNBmon] = useState(0);

	const handleClose = () => {
		setDisableHatchBtn(false);
		setter({ ...getter, show: false });
	};

	useEffect(() => {
		if (key) {
			console.log("useEf", key);
			handleHatch(key);
		}
	}, [key]);

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
					console.log(res.key);
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

	const handleGetHatchKey = () => {
		setLoading(true);
		statsRandomizer.mutate(); // gets key, and sends paired key:stats to blockchain.
	};

	const handleHatch = async (key) => {
		if (key) {
			console.log("KEY", key);
			hatchFromEgg.runContractFunction({
				onSuccess: async (tx) => {
					console.log("tx", tx);

					const awaited = await tx.wait().catch((e) => {
						throw e;
					});
					console.log("awaited done!!!", awaited);
					setGetNBmon(nbmonId);

					console.log("now adding to activities...");
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
						setter({
							show: true,
							content: "txError",
							detail: {
								title: "Transaction Error",
								text: "We are sorry, an unexpected \n error occured during transaction. \n \n Please contact us to let us know \n the details.",
							},
						});
					}
					setLoading(false);
				},
			});
		}
	};

	return (
		<div className="d-flex flex-column">
			<TextPrimary className="text-center mb-4">
				{loading
					? "Your Genesis NBMon is hatching"
					: "Are you sure you want to hatch?"}
			</TextPrimary>
			{loading ? (
				<BsImage
					src="/images/dummy_egg.gif"
					alt="Egg"
					width={66}
					height={77}
					className="mx-auto"
				/>
			) : (
				<>
					<Image src={Egg} width={60} height={77} alt="Egg" />
				</>
			)}
			{loading ? (
				<Subtitle className="text-center mt-3">What NBMon will it be?</Subtitle>
			) : (
				<>
					<HatchButton onClick={handleGetHatchKey} className="mt-3" />
					<CancelButton onClick={handleClose} className="mt-3">
						Cancel
					</CancelButton>
				</>
			)}
		</div>
	);
};

export default UserConfirm;
