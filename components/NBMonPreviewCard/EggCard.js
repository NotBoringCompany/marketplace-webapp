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

const Card = styled.div`
	padding: 8px;
	padding-top: 0;
	display: flex;
	flex-direction: column;
	border-radius: 16px;
	width: 100%;
	width: 240px;
	border: 0.2px solid transparent;
	transition: 0.35s all;
	height: 300px;
	p {
		margin: 0;
	}

	background: linear-gradient(0deg, #2c2d2d, #2c2d2d),
		linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01)),
		#000000;
	border: ${(props) =>
		props.hatchready ? `3px solid #7B61FF` : `3px solid transparent`};
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
	padding: 4px 16px;
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

const EggCard = ({ nbMon, ...props }) => {
	const { className } = props;
	const { isHatchable, nbmonId } = nbMon;
	return (
		<Card
			hatchready={isHatchable ? 1 : 0}
			className={`text-white align-items-center position-relative ${className}`}
		>
			{isHatchable && <TopTag background={`#7B61FF`} text="Hatchable" />}
			<GenesisTag background={isHatchable ? `#7B61FF` : null} />
			<div className="d-flex w-100 justify-content-between">
				<Image src={EthLogo} width={12} height={12} alt="ETH Logo" />
				<IDContainer className="mt-2">
					<TextSecondary className="text-gray">#{nbmonId}</TextSecondary>
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
