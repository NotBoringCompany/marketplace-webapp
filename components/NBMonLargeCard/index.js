import React from "react";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
import { images } from "configs";
import { HeadingMD, HeadingSuperXXS } from "components/Typography/Headings";
import { TextSecondary } from "components/Typography/Texts";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Pill from "components/Pill";
import { IoMdMale, IoMdFemale } from "react-icons/io";

const CardContainer = styled.div`
	padding: 16px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 480px;
	border: 2px solid rgba(176, 176, 176, 0.35);
	border-radius: 8px;
	margin-top: 90px;
	& .afterImage {
		position: relative;
		top: -89px;
	}
`;

const NBMonImage = styled(Image)`
	width: 240px;
	height: 240px;
	position: relative;
	top: -121px;
	margin-right: 8px;
`;

const Description = styled(TextSecondary)`
	max-width: 260px;
	font-weight: 600;
`;

const TabsContainer = styled.div`
	display: flex;
	flex-direction: column;
	background: #585858;
	width: 100%;
	padding: 16px 34px;
	align-items: center;
	border-radius: 8px;
	margin-top: -56px;

	& .tab-content {
		margin-top: 16px;
		width: 100%;
	}
`;

const StyledTabs = styled(Tabs)`
	border-bottom: none !important;
	display: flex;
	justify-content: center;
	width: 100%;
	& > li {
		margin-right: 8px;
		color: #fff;
		border-radius: 30%;
	}

	& > li:last-child {
		margin-right: 0;
	}

	& .nav-link {
		background: #363636;
		min-width: 120px;
		border-radius: 16px;
		border: none;
		color: #fff;
	}

	& .nav-link.active {
		border: none;
		color: #fff;
		background: #42ca9f;
	}
`;

const NBMonLargeCard = ({ nbMon }) => {
	console.log("NBM", nbMon);
	return (
		<div className="py-4 d-flex w-100 align-items-center justify-content-center">
			<CardContainer className="bg-primaryComplement">
				<NBMonImage src={images.genera[nbMon.genera].imageurl} alt="NBMon" />
				<div className="afterImage text-center w-100">
					<HeadingMD as="h1" className="text-white text-capitalize">
						{nbMon.genera}
					</HeadingMD>
					<Description className="mt-2 text-white mx-auto">
						A combination of a fox and a dog. Very loyal to their owners but
						does not like excessive physical touch.
					</Description>
				</div>
				<TabsContainer>
					<StyledTabs defaultActiveKey="basic_info">
						<Tab eventKey="basic_info" title="Basic Info">
							<BasicInfo nbMon={nbMon} />
						</Tab>
						<Tab eventKey="stats" title="Stats"></Tab>
						<Tab eventKey="game_stats" title="Game Stats"></Tab>
					</StyledTabs>
				</TabsContainer>
			</CardContainer>
		</div>
	);
};

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
		<BasicInfoContainer>
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

export default NBMonLargeCard;
