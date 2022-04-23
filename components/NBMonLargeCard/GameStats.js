import React from "react";
import { StatsContainer, StatsHeading, StatsItem } from "./TabItemComponents";
import { HeadingSuperXXS } from "components/Typography/Headings";
import Pill from "components/Pill";
import styled from "styled-components";

const StyledHeadingSuperXXS = styled(HeadingSuperXXS)`
	font-size: 24px;
`;
const GameStats = ({ nbMon }) => {
	return (
		<div className="d-flex flex-column align-items-center p-0 p-lg-3 pt-0">
			<StyledHeadingSuperXXS as="p" className="text-white mt-3">
				Potentials
			</StyledHeadingSuperXXS>
			<StatsContainer className="text-white">
				<StatsHeading>Health</StatsHeading>
				<StatsItem>{nbMon.healthPotential}</StatsItem>
			</StatsContainer>
			<StatsContainer className="text-white">
				<StatsHeading>Energy</StatsHeading>
				<StatsItem>{nbMon.energyPotential}</StatsItem>
			</StatsContainer>
			<StatsContainer className="text-white">
				<StatsHeading>Attack</StatsHeading>
				<StatsItem>{nbMon.attackPotential}</StatsItem>
			</StatsContainer>
			<StatsContainer className="text-white">
				<StatsHeading>Defense</StatsHeading>
				<StatsItem>{nbMon.defensePotential}</StatsItem>
			</StatsContainer>
			<StatsContainer className="text-white">
				<StatsHeading>Special Attack</StatsHeading>
				<StatsItem>{nbMon.spAtkPotential}</StatsItem>
			</StatsContainer>
			<StatsContainer className="text-white">
				<StatsHeading>Special Defense</StatsHeading>
				<StatsItem>{nbMon.spDefPotential}</StatsItem>
			</StatsContainer>
			<StatsContainer className="text-white">
				<StatsHeading>Speed</StatsHeading>
				<StatsItem>{nbMon.speedPotential}</StatsItem>
			</StatsContainer>

			<StyledHeadingSuperXXS as="p" className="text-white mt-3 mb-md-3 mb-0">
				Passives
			</StyledHeadingSuperXXS>

			<div className="d-flex justify-content-center flex-wrap flex-md-nowrap">
				<Pill content={nbMon.passives[0]} className="me-3 mt-3 mt-md-0" />
				<Pill content={nbMon.passives[1]} className="me-3 mt-3 mt-md-0" />
			</div>

			<StyledHeadingSuperXXS as="p" className="text-white mt-3 mb-md-3 mb-0">
				Inherited Passives
			</StyledHeadingSuperXXS>

			<div className="d-flex justify-content-center flex-wrap flex-md-nowrap">
				<Pill
					content={nbMon.firstInheritedPassive}
					className="me-3 mt-3 mt-md-0"
				/>
				<Pill
					content={nbMon.secondInheritedPassive}
					className="me-3 mt-3 mt-md-0"
				/>
			</div>

			<StyledHeadingSuperXXS as="p" className="text-white mt-3 mb-md-3 mb-0">
				Inherited Moves
			</StyledHeadingSuperXXS>

			<div className="d-flex justify-content-center flex-wrap flex-md-nowrap">
				<Pill
					content={nbMon.firstInheritedMove}
					className="me-3 mt-3 mt-md-0"
				/>
				<Pill
					content={nbMon.secondInheritedMove}
					className="me-3 mt-3 mt-md-0"
				/>
			</div>
		</div>
	);
};

export default GameStats;
