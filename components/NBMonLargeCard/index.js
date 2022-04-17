import React from "react";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
import { data } from "configs";
import { HeadingXXS } from "components/Typography/Headings";
import { TextSecondary } from "components/Typography/Texts";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import BasicInfo from "./BasicInfo";
import Stats from "./Stats";
import { mediaBreakpoint } from "utils/breakpoints";
const CardContainer = styled.div`
	padding: 16px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 400px;
	max-width: 80%;
	border-radius: 20px;
	margin-top: 160px;
	& .afterImage {
		position: relative;
		top: -102px;
	}
	margin-bottom: 24px;
	background: linear-gradient(
			0deg,
			rgba(255, 255, 255, 0.14),
			rgba(255, 255, 255, 0.14)
		),
		linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01)),
		#000000;

	@media ${mediaBreakpoint.down.lg} {
		padding: 32px;
	}

	@media ${mediaBreakpoint.down.md} {
		padding: 16px;
	}
`;

const NBMonImage = styled(Image)`
	width: 240px;
	height: 240px;
	position: relative;
	top: -121px;

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
	background: transparent;
	width: 100%;
	padding: 16px 0;
	align-items: center;
	border-radius: 8px;
	margin-top: -56px;

	& .tab-content {
		margin-top: 24px;
		width: 100%;
	}

	@media ${mediaBreakpoint.down.md} {
		padding: 16px;
		position: relative;
		top: -16px;
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
		padding: 8px 40px;
		border-radius: 100px;
		border: none;
		color: #fff;
	}

	& .nav-link.active {
		border: none;
		color: #003827;
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
	console.log("NBM", nbMon.isEgg);
	const { isEgg } = nbMon;
	return (
		<div className="py-4 d-flex w-100 align-items-center justify-content-center">
			<CardContainer>
				{isEgg ? (
					<NBMonImage
						src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/egg.svg`}
						alt="NBMon"
						width={224}
						height={200}
					/>
				) : (
					<NBMonImage src={data.genera[nbMon.genera].imageurl} alt="NBMon" />
				)}
				{isEgg ? (
					<div className="afterImage text-center w-100">
						<HeadingXXS as="h1" className="text-white text-capitalize">
							Genesis NBMon Egg
						</HeadingXXS>
					</div>
				) : (
					<div className="afterImage text-center w-100">
						<HeadingMD as="h1" className="text-white text-capitalize">
							{nbMon.genera}
						</HeadingMD>
						<Description className="mt-2 text-white mx-auto">
							{data.genera[nbMon.genera].description}
						</Description>
					</div>
				)}

				{isEgg ? (
					<TabsContainer>
						<StyledTabs defaultActiveKey="info">
							<Tab eventKey="info" title="Info">
								<BasicInfo nbMon={nbMon} />
							</Tab>
						</StyledTabs>
					</TabsContainer>
				) : (
					<TabsContainer>
						<StyledTabs defaultActiveKey="basic_info">
							<Tab eventKey="basic_info" title="Basic Info">
								<BasicInfo nbMon={nbMon} />
							</Tab>
							<Tab eventKey="stats" title="Stats">
								<Stats nbMon={nbMon} />
							</Tab>
							{/* <Tab eventKey="game_stats" title="Game Stats">
							<GameStats nbMon={nbMon} />
						</Tab> */}
						</StyledTabs>
					</TabsContainer>
				)}
			</CardContainer>
		</div>
	);
};

export default NBMonLargeCard;
