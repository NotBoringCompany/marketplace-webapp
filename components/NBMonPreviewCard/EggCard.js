import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { HeadingSuperXXS } from "components/Typography/Headings";
import { mediaBreakpoint } from "utils/breakpoints";
import Egg from "public/images/egg.svg";
import EthLogo from "public/images/eth_logo.svg";
import { TextSecondary } from "components/Typography/Texts";
import GenesisTag from "./GenesisTag";

const Card = styled.div`
	padding: 10px 16px;
	display: flex;
	flex-direction: column;
	border-radius: 16px;
	border: 0.2px solid transparent;
	transition: 0.35s all;
	height: 300px;
	p {
		margin: 0;
	}

	background: linear-gradient(0deg, #2c2d2d, #2c2d2d),
		linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01)),
		#000000;

	& .genusName {
		font-size: 18px;
	}

	@media ${mediaBreakpoint.down.xl} {
		& .genusName {
			font-size: 28px;
		}
	}
`;

const IDContainer = styled.div`
	background: red;
	width: 28px;
	height: 28px;
	border-radius: 80%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #242424;
`;

const EggCard = ({ nbMon, ...props }) => {
	const { className } = props;
	return (
		<Card
			className={`text-white align-items-center position-relative ${className}`}
		>
			<GenesisTag />
			<div className="d-flex w-100 justify-content-between">
				<Image src={EthLogo} width={16} height={21} alt="ETH Logo" />
				<IDContainer>
					<TextSecondary className="text-gray">#1</TextSecondary>
				</IDContainer>
			</div>
			<div className="d-flex flex-column mt-4">
				<Image src={Egg} alt="nbmon" width={107} height={120} />
				<div className="mt-4 justify-content-center d-flex align-items-center">
					<HeadingSuperXXS
						as="p"
						className="text-capitalize genusName text-center"
					>
						Genesis NBMon Egg
					</HeadingSuperXXS>
				</div>
			</div>
		</Card>
	);
};

export default EggCard;
