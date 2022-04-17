import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { StatsContainer, StatsText } from "./TabItemComponents";
import Pill from "components/Pill";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { mediaBreakpoint } from "utils/breakpoints";
import { ButtonCopy } from "components/Buttons/ButtonCopy";

const BasicInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0 32px;

	@media ${mediaBreakpoint.down.lg} {
		padding: 0;
	}
`;

const StyledStatsText = styled(StatsText)`
	color: rgba(225, 227, 224, 0.23);
	& .me {
		font-size: 12px;
	}
`;

const BasicInfo = ({ nbMon, mine = false }) => {
	const birthDate = () => {
		const properDate = parseInt(nbMon.hatchedAt) * 1000;
		const day = new Date(properDate).getDate();
		const month = new Date(properDate).getMonth() + 1;
		const year = new Date(properDate).getFullYear();
		return `${day}/${month}/${year}`;
	};
	const { isEgg } = nbMon;
	return (
		<BasicInfoContainer className="">
			{isEgg ? (
				<>
					<div className="d-flex text-white w-100 justify-content-between">
						<StatsText as="p">NBMonID</StatsText>
						<StatsText as="p">#{nbMon.nbmonId}</StatsText>
					</div>
					<div className="d-flex text-white w-100 justify-content-between mt-3">
						<StatsText as="p">Owned by</StatsText>

						<div className="d-flex">
							<StyledStatsText as="p">
								{nbMon.owner.split("").splice(0, 16).join("")}...
								<span className="me">{mine && "(me)"}</span>
							</StyledStatsText>
							<ButtonCopy
								onClick={() => navigator.clipboard.writeText(nbMon.owner)}
							>
								<Image src="/images/copy_all.svg" height={24} width={24} />
							</ButtonCopy>
						</div>
					</div>
					<div className="d-flex text-white w-100 justify-content-between mt-3">
						<StatsText as="p">Owner Count</StatsText>

						<StatsText as="p">TODO</StatsText>
					</div>
				</>
			) : (
				<>
					{" "}
					<StatsContainer>
						<StatsText as="p" className="text-white">
							Genus
						</StatsText>
						<StatsText as="p" className="text-capitalize text-white">
							{nbMon.genera}
						</StatsText>
					</StatsContainer>
					<StatsContainer>
						<StatsText as="p" className="text-white">
							Species
						</StatsText>
						<Pill content={nbMon.species} />
					</StatsContainer>
					<StatsContainer>
						<StatsText as="p" className="text-white">
							Rarity
						</StatsText>
						<Pill content={nbMon.rarity} />
					</StatsContainer>
					<StatsContainer>
						<StatsText as="p" className="text-white">
							Mutation
						</StatsText>
						<Pill content={nbMon.mutation} />
					</StatsContainer>
					<StatsContainer>
						<StatsText as="p" className="text-white">
							NBMonID
						</StatsText>
						<StatsText as="p" className="text-white">
							{nbMon.nbmonId}
						</StatsText>
					</StatsContainer>
					<StatsContainer>
						<StatsText as="p" className="text-white">
							Gender
						</StatsText>
						<div className="d-flex align-items-center">
							<StatsText as="p" className="text-white text-capitalize">
								{nbMon.gender}
							</StatsText>
							{nbMon.gender === "male" ? (
								<IoMdMale className="male ms-2" />
							) : (
								<IoMdFemale className="female ms-2" />
							)}
						</div>
					</StatsContainer>
					<StatsContainer>
						<StatsText as="p" className="text-white">
							Birthdate
						</StatsText>
						<StatsText as="p" className="text-white">
							{birthDate()}
						</StatsText>
					</StatsContainer>
					<StatsContainer>
						<StatsText as="p" className="text-white">
							Current owner
						</StatsText>
						<StatsText as="p" className="text-white">
							{nbMon.owner.split("").splice(0, 5).join("")}...
							{nbMon.owner.split("").splice(-4).join("")}
						</StatsText>
					</StatsContainer>
					<StatsContainer>
						<StatsText as="p" className="text-white">
							Owner count
						</StatsText>
						<StatsText as="p" className="text-white">
							- TODO -
						</StatsText>
					</StatsContainer>
				</>
			)}
		</BasicInfoContainer>
	);
};
export default BasicInfo;
