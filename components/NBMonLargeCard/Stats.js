import React from "react";
import { HeadingSuperXXS } from "components/Typography/Headings";
import styled from "styled-components";
import Pill from "components/Pill";
const StyledHeadingSuperXXS = styled(HeadingSuperXXS)`
	font-size: 24px;
`;

const StatsContainer = styled.div`
	display: flex;
	border-bottom: 2px solid #808080;
	justify-content: space-between;
	width: 100%;
	padding-bottom: 16px;
	margin-top: 16px;
	align-items: center;

	& .male {
		color: #6597f8;
	}

	& .female {
		color: #ff8eed;
	}

	& svg {
		font-size: 24px;
	}
`;
const StatsHeading = styled(HeadingSuperXXS)`
	font-size: 18px;
`;

const StatsItem = styled(HeadingSuperXXS)`
	font-size: 18px;
	font-weight: 300;
`;
const Stats = ({ nbMon }) => {
	return (
		<div className="d-flex flex-column align-items-center p-4 pt-0">
			<StyledHeadingSuperXXS as="p" className="text-white mt-3">
				Types
			</StyledHeadingSuperXXS>

			<div className="d-flex justify-content-center my-3">
				<Pill content={nbMon.types[0]} types className="me-3" />
				<Pill content={nbMon.types[1]} types />
			</div>

			<StatsContainer className="mt-4">
				<StatsHeading as="p" className="text-white">
					Strong Against
				</StatsHeading>
				<StatsItem as="p" className="text-capitalize text-white">
					TODO
				</StatsItem>
			</StatsContainer>
			<StatsContainer className="mb-3">
				<StatsHeading as="p" className="text-white">
					Weak Against
				</StatsHeading>
				<StatsItem as="p" className="text-capitalize text-white">
					TODO
				</StatsItem>
			</StatsContainer>

			<StyledHeadingSuperXXS as="p" className="text-white mt-3">
				Fertility
			</StyledHeadingSuperXXS>
			<StatsContainer className="mt-3">
				<StatsHeading as="p" className="text-white">
					Fertility
				</StatsHeading>
				<StatsItem as="p" className="text-capitalize text-white">
					{nbMon.fertility}
				</StatsItem>
			</StatsContainer>

			<StatsContainer>
				<StatsHeading as="p" className="text-white">
					Rarity Deduction
				</StatsHeading>
				<StatsItem as="p" className="text-capitalize text-white">
					TODO
				</StatsItem>
			</StatsContainer>

			<StatsContainer>
				<StatsHeading as="p" className="text-white">
					Breed count
				</StatsHeading>
				<StatsItem as="p" className="text-capitalize text-white">
					TODO
				</StatsItem>
			</StatsContainer>
		</div>
	);
};

export default Stats;
