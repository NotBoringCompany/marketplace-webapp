import React from "react";
import styled from "styled-components";
import Image from "next/image";
import MyButton from "components/Buttons/Button";
import { StatsText } from "./TabItemComponents";
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
	padding: 0 32px;
	height: 48px;

	p {
		color: ${(props) => (props.disabled ? `#afafaf` : `#fff`)} !important;
		font-size: 15px;
		font-weight: 500;
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

const ListingBox = ({ price = 0.4, usdValue = 2000, mine }) => {
	return (
		<div className="d-flex flex-column mt-5">
			<div className="d-flex justify-content-between w-100 mb-3">
				<StatsText className="text-white">
					Current Offer • Fixed Price
				</StatsText>

				{mine && <CancelBtn>Cancel</CancelBtn>}
			</div>
			<InnerContainer>
				<div className="d-flex justify-content-between w-100 align-items-center">
					<div className="d-flex flex-column">
						<LabelCurrentPrice className="ms-3 text-start">
							Current Price
						</LabelCurrentPrice>

						<div className="d-flex align-items-center mt-3">
							<Image
								alt="Eth Logo"
								src="/images/Ethereum.svg"
								width={28}
								height={28}
							/>

							<div className="d-flex flex-column ms-1  ">
								<PriceText className="text-start">{price} WETH</PriceText>
								<LabelCurrentPrice className="text-start mt-1">
									~${usdValue}
								</LabelCurrentPrice>
							</div>
						</div>
					</div>
					<StyledButton disabled={mine} text="Buy" pill />
				</div>
			</InnerContainer>
		</div>
	);
};

export default ListingBox;
