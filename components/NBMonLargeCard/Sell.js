import React, { useState, useContext, useEffect } from "react";
import { TextNormal } from "components/Typography/Texts";
import { useMoralis } from "react-moralis";
import { useMutation } from "react-query";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import styled from "styled-components";
import { mediaBreakpoint } from "utils/breakpoints";
import MyButton from "components/Buttons/Button";
import AppContext from "context/AppContext";
import delay from "utils/delay";
import isApprovedForAll from "utils/blockchain-services/marketplace/isApprovedForAll";

import FixedPrice from "components/SellerPOVComponents/FixedPrice";
import TimedAuction from "components/SellerPOVComponents/TimedAuction";
import Bidding from "components/SellerPOVComponents/Bidding";
import CryptoJS from "crypto-js";

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

const Sell = ({ setKey, nbMon, userAddress, onListed }) => {
	const currentDate = Date.now();

	const [listedPrices, setListedPrices] = useState({
		weth: 0,
		endPrice: 0,
		usd: 1300,
	});

	const [biddingPrices, setBiddingPrices] = useState({
		minAmount: 0,
		reservedAmount: 0,
	});

	const [listingType, setListingType] = useState("fixedPrice");

	const LISTING_TYPE_ENUM = {
		fixedPrice: 0,
		timedAuction: 1,
		bidding: 2,
	};

	const timePlusFiveMinutes = new Date(currentDate + 60 * 1000 * 5);

	const [activeKey, setActiveKey] = useState("fixedPrice");
	const { weth, usd, endPrice } = listedPrices;
	const { minAmount, reservedAmount } = biddingPrices;

	const [dateValue, setDateValue] = useState(new Date(currentDate));
	const [timeValue, setTimeValue] = useState(
		`${timePlusFiveMinutes.getHours()}:${
			timePlusFiveMinutes.getMinutes() < 10 ? `0` : ``
		}${timePlusFiveMinutes.getMinutes()}`
	);
	const [actualDateAndTime, setActualDateAndTime] = useState(0);

	const [btnDisabled, setBtnDisabled] = useState(true);

	const { statesSwitchModal } = useContext(AppContext);
	const txSalt = CryptoJS.lib.WordArray.random(256).toString();

	const listMutation = useMutation(
		(endingTime) =>
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
						startingPrice: Number(listedPrices.weth),
						endingPrice: Number(listedPrices.endPrice),
						endingTime: endingTime,
						minimumReserveBid: reservedAmount,
						txSalt,
						signature: "someSignature",
					}),
				}
			),
		{
			onSuccess: async (response) => {
				console.log("SUCCESS", response);
				setKey("info");
				onListed(true);
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
		}
	}, [actualDateAndTime, endPrice, weth]);

	useEffect(() => {
		if (listingType === "bidding") {
			console.log("asd");
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
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listingType]);

	const handleClick = async () => {
		// statesSwitchModal.setter({
		// 	show: true,
		// 	content: "listNBmon",
		// 	stage: 0,
		// 	price: weth,
		// });

		console.log(await isApprovedForAll(userAddress, Moralis.provider));

		// await delay(1500);

		// statesSwitchModal.setter({
		// 	show: true,
		// 	content: "listNBmon",
		// 	stage: 1,
		// 	price: weth,
		// });

		// await delay(1500);

		// statesSwitchModal.setter({
		// 	show: true,
		// 	content: "listNBmon",
		// 	stage: 2,
		// 	price: weth,
		// });
		// await delay(1500);

		// statesSwitchModal.setter({
		// 	show: true,
		// 	content: "listNBmon",
		// 	stage: 3,
		// 	price: weth,
		// });

		// // setListedPrices({ weth: price, usd: 99 });
		// setListingType(activeKey);
		// setListed(true);
		// setKey("info");

		// console.log("actualDateAndTime", actualDateAndTime);
		// listMutation.mutate(actualDateAndTime);
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
