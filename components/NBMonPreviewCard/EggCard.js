import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { HeadingSuperXXS } from "components/Typography/Headings";
import { mediaBreakpoint } from "utils/breakpoints";
import Egg from "public/images/egg.svg";
import EthLogo from "public/images/eth_logo.svg";
import { TextSecondary } from "components/Typography/Texts";
import GenesisTag from "./GenesisTag";
import TopTag from "./TopTag";
import exchangeRateCalculator from "utils/exchangeRateCalculator";

const Card = styled.div`
	padding: 8px 10px;
	padding-top: 0;
	padding-left: 12px;
	display: flex;
	flex-direction: column;
	border-radius: 16px;

	width: 240px;
	border: 0.2px solid transparent;
	transition: 0.35s all;
	min-height: 340px;
	height: 100%;
	p {
		margin: 0;
	}

	&:hover {
		cursor: pointer;
		transform: translate(2px, -5px);
	}

	background: linear-gradient(0deg, #2c2d2d, #2c2d2d),
		linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01)),
		#000000;
	border: ${(props) =>
		props.hatchready ? `2px solid #7B61FF` : `2px solid transparent`};
	& .genusName {
		font-size: 18px;
	}

	@media ${mediaBreakpoint.down.xl} {
		width: 240px;
	}
`;

const IDContainer = styled.div`
	background: red;
	min-width: 28px;
	min-height: 28px;
	padding: 2px 16px;
	border-radius: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #242424;

	p {
		font-size: 12px;
		font-weight: 500;
	}
`;

const ETHPriceText = styled.p`
	margin: 0;
	font-style: normal;
	font-weight: 600;
	font-size: 13px;
	line-height: 15px;
`;

const USDPriceText = styled.p`
	margin: 0;
	font-style: normal;
	font-weight: 600;
	font-size: 11px;
	line-height: 12px;
	color: #afafaf;
`;

const EggCard = ({ nbMon, showPriceIfOnSale = false, usdToEth, ...props }) => {
	const { className } = props;
	const { isHatchable, nbmonId } = nbMon;
	return (
		<Card
			hatchready={isHatchable ? 1 : 0}
			className={`text-white align-items-center position-relative ${className}`}
		>
			{isHatchable && <TopTag background={`#7B61FF`} text="Hatchable" />}
			<GenesisTag background={isHatchable ? `#7B61FF` : null} />
			<div className="d-flex w-100 justify-content-between items-center">
				<div
					style={{ width: "16px", height: "16px" }}
					className="position-relative mt-2"
				>
					<Image src="/images/cronos.svg" layout="fill" alt="Cronos Logo" />
				</div>

				<IDContainer className="mt-2">
					<TextSecondary className="text-gray">#{nbmonId}</TextSecondary>
				</IDContainer>
			</div>
			<div className="d-flex flex-column mt-4">
				<Image src={Egg} alt="nbmon" width={110} height={110} />
				<div className="mt-4 justify-content-center d-flex align-items-center">
					<HeadingSuperXXS
						as="p"
						className="text-capitalize genusName text-center"
					>
						Genesis NBMon Egg
					</HeadingSuperXXS>
				</div>

				{nbMon.listingData && nbMon.listingData.price && showPriceIfOnSale && (
					<div className="mx-auto d-flex mt-4 align-items-center">
						<Image
							alt="Cronos Logo"
							src="/images/cronos.svg"
							width={24}
							height={24}
						/>
						<div className="ms-2 d-flex flex-column">
							<ETHPriceText className="text-start mb-1">
								{nbMon.listingData.price}{" "}
								{process.env.NEXT_PUBLIC_CURRENCY_NAME}
							</ETHPriceText>
							<USDPriceText className="text-center">
								~ ${exchangeRateCalculator(usdToEth, nbMon.listingData.price)}
							</USDPriceText>
						</div>
					</div>
				)}
			</div>
		</Card>
	);
};

export default EggCard;
