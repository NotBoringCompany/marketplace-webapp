import React, { useState, useContext, useEffect } from "react";
import Web3 from "web3";

import { TextNormal } from "components/Typography/Texts";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useMutation } from "react-query";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styled from "styled-components";
import { mediaBreakpoint } from "utils/breakpoints";
import MyButton from "components/Buttons/Button";
import AppContext from "context/AppContext";
import isApprovedForAll from "utils/blockchain-services/marketplace/isApprovedForAll";

import FixedPrice from "components/SellerPOVComponents/FixedPrice";
import TimedAuction from "components/SellerPOVComponents/TimedAuction";
import Bidding from "components/SellerPOVComponents/Bidding";

import NBMonMinting from "../../abis/MintingGenesis.json";
import MarketplaceABI from "../../abis/Marketplace.json";

const InnerContainer = styled.div`
	background: #2c2d2d;
	padding: 16px;
	border-radius: 12px;
	min-height: 200px;
	width: 100%;
`;

const OuterContainer = styled.div`
	display: flex;
	padding: 0 24px;
	margin-top: 32px;
	@media ${mediaBreakpoint.down.lg} {
		padding: 0;
	}
`;

const OptionText = styled(TextNormal)`
	font-size: 14px;
	line-height: 20px;
	color: #e1e3e0;
`;

const StyledButton = styled(MyButton)`
	padding: 8px 40px;

	padding-bottom: 10px;
	font-size: 12px;
`;

const TabsContainer = styled.div`
	display: flex;
	flex-direction: column;
	background: transparent;
	width: 100%;
	align-items: center;
	& .tab-content {
		margin-top: 16px !important;
		width: 100%;
	}

	@media ${mediaBreakpoint.down.md} {
		padding: 0;
	}
`;

const StyledTabs = styled(Tabs)`
	border-bottom: none !important;
	display: flex;
	width: 100%;
	& > li {
		margin-right: 0;
		border-radius: 0%;
		width: calc(100% / 3);
	}

	& > li:first-child {
		margin-right: 0;
		border-radius: 0%;
		border-right: none;
	}

	& > li button {
		padding: 6px;
		font-weight: 600;
	}

	& .nav-link {
		background: #363636;
		padding: 8px 16px;
		border-radius: 0;
		border: none;
		color: #bfc9c2;
		width: 100%;
		font-size: 13px;
		font-weight: 400;
		line-height: 20px;
		color: #e1e3e0;

		border: 1.5px solid #89938d;
	}

	& .nav-link.active {
		color: #003827;
		background: #42ca9f;
		border: 1.5px solid #89938d;
	}

	& > li:first-child .nav-link {
		border-right: none;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}

	& > li:last-child .nav-link {
		border-left: none;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}

	& .nav-link:hover,
	& .nav-link:focus {
		border: 1.5px solid #89938d;
	}

	@media ${mediaBreakpoint.down.lg} {
		& > li {
			width: 100%;
			margin-right: 0;
			margin-bottom: 8px;
		}

		& > li:last-child {
			margin-bottom: 0;
		}

		& > li > button {
			width: 100%;
		}

		& .nav-link,
		& .nav-link.active {
			border: none;
		}

		& .nav-link:hover,
		& .nav-link:focus {
			border: none;
		}

		& > li:first-child .nav-link,
		& > li:last-child .nav-link {
			border-radius: 4px;
		}
	}
`;

const Sell = ({
	setKey,
	nbMon,
	userAddress,
	onListed,
	listingType,
	setListingType,
	setEndingTime,
	listedPrices,
	setListedPrices,
	setBiddingPrices,
	biddingPrices,
	txSalt,
}) => {
	const currentDate = Date.now();

	const { Moralis } = useMoralis();

	const web3 = new Web3(Moralis.provider);

	const { statesSwitchModal } = useContext(AppContext);

	const LISTING_TYPE_ENUM = {
		fixedPrice: 0,
		timedAuction: 1,
		minimumBidding: 2,
		absoluteBidding: 2,
	};

	const timePlusFiveMinutes = new Date(currentDate + 60 * 1000 * 5);

	const handleMetaMaskError = (e) => {
		//Error
		if (!e.code || (e.code && e.code !== 4001)) {
			statesSwitchModal.setter({
				show: true,
				content: "txError",
				detail: {
					title: "Something went wrong",
					text: `We are sorry, an unexpected \n error occured during transaction. \n \n Please contact us to let us know \n the details. ${
						e.code && e.code
					}`,
				},
			});
		} else {
			statesSwitchModal.setter({
				show: false,
				content: "txError",
				detail: {},
			});
		}
	};

	const [activeKey, setActiveKey] = useState("fixedPrice");
	const { weth, usd, endPrice } = listedPrices;
	const { minAmount, reservedAmount } = biddingPrices;
	const [saleDuration, setSaleDuration] = useState(0);
	const [dateValue, setDateValue] = useState(new Date(currentDate));
	const [timeValue, setTimeValue] = useState(
		`${timePlusFiveMinutes.getHours()}:${
			timePlusFiveMinutes.getMinutes() < 10 ? `0` : ``
		}${timePlusFiveMinutes.getMinutes()}`
	);
	const [actualDateAndTime, setActualDateAndTime] = useState(0);

	const [btnDisabled, setBtnDisabled] = useState(true);

	const setApprovalForAll = useWeb3Contract({
		contractAddress: process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT,
		functionName: "setApprovalForAll",
		abi: NBMonMinting,
		params: {
			operator: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
			approved: true,
		},
	});

	const listingHash = useWeb3Contract({
		contractAddress: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
		functionName: "listingHash",
		abi: MarketplaceABI,
		params: {
			_nftContract: process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT,
			_tokenId: nbMon.nbmonId,
			_paymentToken: process.env.NEXT_PUBLIC_PAYMENT_TOKEN_ADDRESS,
			_saleType: LISTING_TYPE_ENUM[activeKey],
			_seller: userAddress,
			_price:
				isNaN(listedPrices.weth) || listedPrices.weth < 0 || !listedPrices.weth
					? 0
					: Web3.utils.toWei(listedPrices.weth.toString(), "ether"),
			_startingPrice: 0,
			_endingPrice: 0,
			_minimumReserveBid: 0,
			_duration: saleDuration,
			_txSalt: txSalt,
		},
	});

	const listMutation = useMutation(
		({ actualDateAndTime, signature }) =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/marketplace/listItem`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						nftContract: process.env.NEXT_PUBLIC_NBMON_MINTING_CONTRACT,
						tokenId: nbMon.nbmonId,
						paymentToken: process.env.NEXT_PUBLIC_PAYMENT_TOKEN_ADDRESS,
						saleType: LISTING_TYPE_ENUM[activeKey],
						seller: userAddress,
						price: activeKey === "fixedPrice" ? Number(listedPrices.weth) : 0,
						startingPrice:
							activeKey === "fixedPrice" ? 0 : Number(listedPrices.weth),
						endingPrice:
							activeKey === "fixedPrice" ? 0 : Number(listedPrices.endPrice),
						endingTime: actualDateAndTime,
						minimumReserveBid: reservedAmount,
						txSalt,
						duration: saleDuration,
						signature,
						listingType,
					}),
				}
			),
		{
			onSuccess: async (response) => {
				console.log("SUCCESS", response);
				statesSwitchModal.setter({
					show: true,
					content: "listNBmon",
					stage: 3,
					price: weth,
				});

				setKey("info");
				onListed(true);
				setEndingTime(actualDateAndTime);
				//step3
			},
			onError: (e) => {
				console.log("Listing error:", e);
				statesSwitchModal.setter({
					show: true,
					content: "txError",
					detail: {
						title: "Listing Error",
						text: "We are sorry, an unexpected \n minting error occured. \n \n Please contact us to let us know \n the details.",
					},
				});
			},
			onSettled: () => {},
			retry: 0,
		}
	);

	useEffect(() => {
		if (dateValue) {
			const formattedDateAndtime = `${
				dateValue.getMonth() + 1
			}/${dateValue.getDate()}/${dateValue.getFullYear()} ${timeValue}`;
			const parsed = Date.parse(new Date(formattedDateAndtime));
			setActualDateAndTime(parsed);
		} else {
			setBtnDisabled(true);
		}
	}, [dateValue, timeValue]);

	useEffect(() => {
		if (actualDateAndTime > 0) {
			if (actualDateAndTime < Date.now()) {
				//disable
				setBtnDisabled(true);
			} else {
				//allow to click btn
				setBtnDisabled(false);

				if (weth <= 0) {
					setBtnDisabled(true);
				} else {
					setBtnDisabled(false);
				}
			}
			const duration =
				Math.round(actualDateAndTime / 1000) - Math.round(Date.now() / 1000);
			setSaleDuration(duration);
		}
	}, [actualDateAndTime, endPrice, weth]);

	useEffect(() => {
		if (activeKey === "bidding") {
			if (parseFloat(minAmount) === 0 && parseFloat(reservedAmount) === 0) {
				setListingType("absoluteBidding");
			} else if (
				parseFloat(minAmount) > 0 &&
				parseFloat(reservedAmount) === 0
			) {
				setListingType("minimumBidding");
			} else {
				setListingType("reservedBidding");
			}
		} else {
			setListingType(activeKey);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeKey, minAmount, reservedAmount]);

	const generateListingSignature = async () => {
		try {
			const hash = await listingHash.runContractFunction({
				throwOnError: true,
			});

			const sig = await web3.eth.personal.sign(hash, userAddress);

			console.log(sig);

			return sig;
		} catch (e) {
			handleMetaMaskError(e);
		}
	};

	const confirmSetApproval = async () => {
		try {
			const setApproval = await setApprovalForAll.runContractFunction({
				throwOnError: true,
			});

			await setApproval.wait();
		} catch (e) {
			handleMetaMaskError(e);
		}
	};

	const handleClick = async () => {
		console.log(userAddress, "userAddress");
		console.log("listedPricesWeth", listedPrices.weth.toString());
		console.log("listingTypeEnum", LISTING_TYPE_ENUM[activeKey]);
		console.log("nbMon.nbmonId", nbMon.nbmonId);
		console.log("reservedAmount", reservedAmount);
		console.log("txSalt", txSalt);

		statesSwitchModal.setter({
			show: true,
			content: "listNBmon",
			stage: 0,
			price: weth,
		});

		const isApproved = await isApprovedForAll(userAddress, Moralis.provider);

		if (!isApproved) await confirmSetApproval();

		statesSwitchModal.setter({
			show: true,
			content: "listNBmon",
			stage: 1,
			price: weth,
		});

		const signature = await generateListingSignature();

		//If MetaMask request wasn't cancelled
		if (signature) {
			statesSwitchModal.setter({
				show: false,
				content: "listNBmon",
				stage: 1,
				price: weth,
			});
			statesSwitchModal.setter({
				show: true,
				content: "listNBmon",
				stage: 2,
				price: weth,
			});
			listMutation.mutate({ actualDateAndTime, signature });
		}
	};

	return (
		<OuterContainer>
			<InnerContainer className="d-flex flex-column ">
				<div className="d-flex flex-column">
					<OptionText className="mb-2">Option</OptionText>
					<TabsContainer>
						<StyledTabs onSelect={(k) => setActiveKey(k)} activeKey={activeKey}>
							<Tab eventKey="fixedPrice" title="Fixed">
								<FixedPrice
									onDateChange={setDateValue}
									onPriceChange={setListedPrices}
									onTimeValueChange={setTimeValue}
									timeValue={timeValue}
									price={listedPrices.weth}
									dateValue={dateValue}
									minDate={new Date(currentDate)}
								/>
							</Tab>
							<Tab eventKey="timedAuction" title="Timed Auction">
								<TimedAuction
									onDateChange={setDateValue}
									onPriceChange={setListedPrices}
									onTimeValueChange={setTimeValue}
									timeValue={timeValue}
									dateValue={dateValue}
									listedPrices={listedPrices}
									minDate={new Date(currentDate)}
								/>
							</Tab>
							<Tab eventKey="bidding" title="Bidding">
								<Bidding
									onDateChange={setDateValue}
									biddingPrices={biddingPrices}
									onPriceChange={setBiddingPrices}
									onTimeValueChange={setTimeValue}
									timeValue={timeValue}
									dateValue={dateValue}
									minDate={new Date(currentDate)}
								/>
							</Tab>
						</StyledTabs>
					</TabsContainer>{" "}
					<div className="mx-auto mt-4 mb-2">
						<StyledButton
							textColor={"text-black"}
							onClick={handleClick}
							text="Start listing item"
							pill
							disabled={btnDisabled || listMutation.isLoading}
							thinText
						/>
					</div>
				</div>
			</InnerContainer>
		</OuterContainer>
	);
};

export default Sell;
