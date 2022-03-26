import React from "react";
import styled from "styled-components";
import { HeadingSuperXXS } from "components/Typography/Headings";
import Pill from "components/Pill";
import { IoMdMale, IoMdFemale } from "react-icons/io";

const BasicInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
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

const BasicInfo = ({ nbMon }) => {
	const birthDate = () => {
		const properDate = parseInt(nbMon.hatchedAt) * 1000;
		const day = new Date(properDate).getDate();
		const month = new Date(properDate).getMonth() + 1;
		const year = new Date(properDate).getFullYear();
		return `${day}/${month}/${year}`;
	};
	return (
		<BasicInfoContainer className="p-4 pt-0">
			<StatsContainer>
				<StatsHeading as="p" className="text-white">
					Genus
				</StatsHeading>
				<StatsItem as="p" className="text-capitalize text-white">
					{nbMon.genera}
				</StatsItem>
			</StatsContainer>

			<StatsContainer>
				<StatsHeading as="p" className="text-white">
					Species
				</StatsHeading>
				<Pill content={nbMon.species} />
			</StatsContainer>

			<StatsContainer>
				<StatsHeading as="p" className="text-white">
					Rarity
				</StatsHeading>
				<Pill content={nbMon.rarity} />
			</StatsContainer>

			<StatsContainer>
				<StatsHeading as="p" className="text-white">
					Mutation
				</StatsHeading>
				<Pill content={nbMon.mutation} />
			</StatsContainer>

			<StatsContainer>
				<StatsHeading as="p" className="text-white">
					NBMonID
				</StatsHeading>
				<StatsItem as="p" className="text-white">
					{nbMon.nbmonId}
				</StatsItem>
			</StatsContainer>

			<StatsContainer>
				<StatsHeading as="p" className="text-white">
					Gender
				</StatsHeading>
				<div className="d-flex align-items-center">
					<StatsItem as="p" className="text-white text-capitalize">
						{nbMon.gender}
					</StatsItem>
					{nbMon.gender === "male" ? (
						<IoMdMale className="male ms-2" />
					) : (
						<IoMdFemale className="female ms-2" />
					)}
				</div>
			</StatsContainer>

			<StatsContainer>
				<StatsHeading as="p" className="text-white">
					Birthdate
				</StatsHeading>
				<StatsItem as="p" className="text-white">
					{birthDate()}
				</StatsItem>
			</StatsContainer>

			<StatsContainer>
				<StatsHeading as="p" className="text-white">
					Current owner
				</StatsHeading>
				<StatsItem as="p" className="text-white">
					{new Date(Date.now()).getFullYear()}
				</StatsItem>
			</StatsContainer>

			<StatsContainer>
				<StatsHeading as="p" className="text-white">
					Owner count
				</StatsHeading>
				<StatsItem as="p" className="text-white">
					- TODO -
				</StatsItem>
			</StatsContainer>
		</BasicInfoContainer>
	);
};
export default BasicInfo;
