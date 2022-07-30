import React from "react";
import styled from "styled-components";
import { InputGroup, FormControl } from "react-bootstrap";
import Image from "next/image";
import MetamaskButton from "components/Buttons/MetamaskButton";
import { TextNormal } from "components/Typography/Texts";
import MyButton from "components/Buttons/Button";
import { StatsText } from "./TabItemComponents";
import { listings } from "configs/listingDetails";
import { mediaBreakpoint } from "utils/breakpoints";
const InnerContainer = styled.div`
	background: #2c2d2d;
	padding: 18px 14px;
	border-radius: 12px;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const LabelCurrentPrice = styled.p`
	font-family: "Lexend";
	font-style: normal;
	font-weight: 600;
	font-size: 12px;
	line-height: 12px;
	color: #afafaf;
	margin: 0;
`;

const PriceText = styled.p`
	font-family: "Lexend";
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 16px;
	color: #e1e3e0;
	margin: 0;
`;

const StyledButton = styled(MyButton)`
	color: red;
	min-width: 110px;
	padding: 0 32px;
	height: 48px;

	p {
		color: ${(props) => (props.disabled ? `#afafaf` : `#000`)} !important;
		font-size: 15px;
		line-height: 13px;
		font-weight: 400;
	}

	@media ${mediaBreakpoint.down.md} {
		min-width: 90px;
	}

	@media ${mediaBreakpoint.down.md} {
		p {
			font-size: 13px;
			line-size: 13px;
		}
	}
`;

const CancelBtn = styled.button`
	background: none;
	color: #ffb4a9;
	border: none;
	font-weight: 500;
	font-size: 16px;
	line-height: 24px;
`;

const OfferDetailContainer = styled.div`
	background: linear-gradient(
			0deg,
			rgba(255, 255, 255, 0.12),
			rgba(255, 255, 255, 0.12)
		),
		linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01)),
		#000000;
	padding: 16px 12px;
	border-radius: 12px;
	width: 100%;
	display: flex;
	align-items: center;
`;

const HeaderDetailText = styled.p`
	font-weight: 500;
	font-size: 13px;
	margin: 0;
	color: #e1e3e0;
	line-height: 13px;
	letter-spacing: 0.4px;
`;

const ValueDetailText = styled(HeaderDetailText)`
	font-weight: 400;
	color: #bfc9c2;
`;

const StyledInputGroup = styled(InputGroup)`
	& input {
		background: ${(props) => (props.variant === "light" ? `#fff` : `#181818`)};
		border: 2px solid rgba(176, 176, 176, 0.35);
		color: ${(props) => (props.variant === "light" ? `#181818` : `#fff`)};
		border-radius: 8px;
		padding: 10px 16px;
		&:focus {
			background: ${(props) => (props.variant === "light" ? `#fff` : `black`)};
			color: ${(props) => (props.variant === "light" ? `#212121` : `#fff`)};
		}
	}

	& .input-group-text {
		border: 2px solid rgba(176, 176, 176, 0.35);
		border-left: none;
		background: ${(props) => (props.variant === "light" ? `#fff` : `#181818`)};
		color: #fff;
	}
`;

const OfferInputLabel = styled(TextNormal)`
	font-size: 13px;
	line-height: 13px;
	color: #e1e3e0;
`;

const OfferDetail = ({
	endsIn = null,
	startPrice = 0,
	endPrice = 0,
	className,
}) => {
	const TextComponent = ({ text, value, className = "" }) => (
		<div className={`d-flex flex-column ${className}`}>
			<HeaderDetailText className="mb-1">{text}</HeaderDetailText>
			<ValueDetailText className="">{value}</ValueDetailText>
		</div>
	);

	return (
		<OfferDetailContainer
			className={`${className} text-start flex-md-row flex-lg-row flex-column justify-content-${
				startPrice || endPrice ? `between` : `center`
			}`}
		>
			{endsIn && (
				<TextComponent text="Ends:" value={endsIn} className="text-center" />
			)}
			{startPrice && (
				<TextComponent
					className={`mt-md-0 mt-3 ${!endPrice && `ms-md-auto`}`}
					text="Start price"
					value={`${startPrice} WETH`}
				/>
			)}
			{endPrice && (
				<TextComponent
					className="mt-md-0 mt-3 "
					text="End price"
					value={`${endPrice} WETH`}
				/>
			)}
		</OfferDetailContainer>
	);
};

const ListingBox = ({
	listingType = "absoluteBidding",
	price = 0.4,
	usdValue = 2000,
	onCancelListing,
	onBuy = () => {},
	endPrice = 0,
	startPrice = 0,
	endsIn = 0,
	biddingPrices,
	currentHighestBid,
	mine,
	userAddress,
}) => {
	const bidding = listingType.toLowerCase().includes("bidding");
	let minimumAmount = 0;
	let reservedAmount = 0;
	if (bidding) {
		minimumAmount = biddingPrices.minAmount;
		reservedAmount = biddingPrices.reservedAmount;
	}

	return (
		<div className="d-flex flex-column w-100">
			<div className="d-flex justify-content-between mb-3">
				<StatsText className="text-white">
					Current Offer • {listings[listingType].title}
				</StatsText>

				{mine && <CancelBtn onClick={onCancelListing}>Cancel</CancelBtn>}
			</div>
			<InnerContainer>
				<div className="d-flex flex-column">
					<div className="d-flex justify-content-between w-100 align-items-center flex-wrap">
						<div className="d-flex flex-column">
							<LabelCurrentPrice className="text-start">
								{listings[listingType].offerLabelText}
							</LabelCurrentPrice>

							<div className="d-flex align-items-center mt-3">
								<Image
									alt="Eth Logo"
									src="/images/Ethereum.svg"
									width={28}
									height={28}
								/>

								<div className="d-flex flex-column ms-1  ">
									<PriceText className="text-start">
										{bidding ? currentHighestBid : price} WETH
									</PriceText>
									<LabelCurrentPrice className="text-start mt-1">
										~${usdValue}
									</LabelCurrentPrice>
								</div>
							</div>
						</div>
						<div
							className={`d-flex ${
								listings[listingType].withOfferInput &&
								`mt-4 flex-md-row flex-column  w-100`
							}`}
						>
							{listings[listingType].withOfferInput && (
								<div className="d-flex flex-column me-md-3 me-0 mb-md-0 mb-3">
									<OfferInputLabel className="mb-2 text-start">
										Enter Offer
									</OfferInputLabel>
									<StyledInputGroup className="w-md-auto">
										<FormControl
											value={0}
											onChange={() => {}}
											onBlur={() => {}}
											placeholder="1"
											aria-label="1"
											type="number"
											aria-describedby="basic-addon2"
										/>
										<InputGroup.Text id="basic-addon2">WETH</InputGroup.Text>
									</StyledInputGroup>
								</div>
							)}

							{!userAddress ? (
								<MetamaskButton
									defaultText="Log-in to Buy"
									className="mt-3 mt-lg-0"
								/>
							) : (
								<StyledButton
									disabled={mine}
									onClick={async () => {
										if (userAddress) {
											if (!mine) {
												await onBuy();
											}
										}
									}}
									className={`${
										listings[listingType].withOfferInput && `mt-auto`
									} mt-3 mt-lg-0`}
									text={
										userAddress
											? listings[listingType].buyButtonText
											: "Log-in to buy"
									}
									pill
								/>
							)}
						</div>
					</div>

					<OfferDetail
						className="mt-4"
						endsIn={endsIn}
						endPrice={!bidding ? endPrice : 0}
						startPrice={!bidding ? 0 : minimumAmount}
					/>
				</div>
			</InnerContainer>
		</div>
	);
};

export default ListingBox;
