import React from "react";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
import { images } from "configs";
import { HeadingMD } from "components/Typography/Headings";
import { TextSecondary } from "components/Typography/Texts";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import BasicInfo from "./BasicInfo";
import Stats from "./Stats";
import GameStats from "./GameStats";
import { mediaBreakpoint } from "utils/breakpoints";
const CardContainer = styled.div`
	padding: 16px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 560px;
	max-width: 80%;
	border: 2px solid rgba(176, 176, 176, 0.35);
	border-radius: 8px;
	margin-top: 90px;
	& .afterImage {
		position: relative;
		top: -89px;
	}
	margin-bottom: 24px;
`;

const NBMonImage = styled(Image)`
	width: 240px;
	height: 240px;
	position: relative;
	top: -121px;
	margin-right: 8px;

	@media ${mediaBreakpoint.down.xl} {
		width: 190px;
		height: 190px;
		top: -105px;
	}
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

	@media ${mediaBreakpoint.down.md} {
		padding: 16px;
	}
`;

const StyledTabs = styled(Tabs)`
	border-bottom: none !important;
	display: flex;
	justify-content: center;
	width: 100%;
	& > li {
		margin-right: 18px;
		color: #fff;
		border-radius: 0%;
	}

	& > li button {
		padding: 6px;
		font-weight: 600;
	}

	& > li:last-child {
		margin-right: 0;
	}

	& .nav-link {
		background: #363636;
		min-width: 120px;
		border-radius: 10px;
		border: none;
		color: #fff;
	}

	& .nav-link.active {
		border: none;
		color: #fff;
		background: #42ca9f;
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
						<Tab eventKey="stats" title="Stats">
							<Stats nbMon={nbMon} />
						</Tab>
						<Tab eventKey="game_stats" title="Game Stats">
							<GameStats nbMon={nbMon} />
						</Tab>
					</StyledTabs>
				</TabsContainer>
			</CardContainer>
		</div>
	);
};

export default NBMonLargeCard;
