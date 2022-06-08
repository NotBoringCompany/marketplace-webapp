import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { StatsText } from "./TabItemComponents";
import NewPill from "components/NewPill";
import NFTTable from "./NFTTable";
import { mediaBreakpoint } from "utils/breakpoints";
import { ButtonCopy } from "components/Buttons/ButtonCopy";
import SeparatorContainer from "./SeparatorContainer";

const BasicInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0 24px;

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

const BasicInfo = ({
	nbMon,
	listed = false,
	activitiesData = [],
	mine = false,
}) => {
	const birthDate = () => {
		const properDate = parseInt(nbMon.hatchedAt) * 1000;
		const day =
			new Date(properDate).getDate() > 9
				? new Date(properDate).getDate()
				: `0${new Date(properDate).getDate()}`;
		const month =
			new Date(properDate).getMonth() + 1 > 9
				? new Date(properDate).getMonth() + 1
				: `0${new Date(properDate).getMonth() + 1}`;
		const year = new Date(properDate).getFullYear();
		return `${day}/${month}/${year}`;
	};
	const { isEgg } = nbMon;
	return (
		<BasicInfoContainer className="mt-3">
			{isEgg ? (
				<>
					<div className="d-flex text-white w-100 justify-content-between">
						<StatsText>NBMonID</StatsText>
						<StatsText>#{nbMon.nbmonId}</StatsText>
					</div>
					<div className="d-flex text-white w-100 justify-content-between mt-3">
						<StatsText>Owned by</StatsText>

						<div className="d-flex">
							<StyledStatsText>
								{nbMon.owner.split("").splice(0, 16).join("")}...
								<span className="me">{mine && "(me)"}</span>
							</StyledStatsText>
							<ButtonCopy
								onClick={() => navigator.clipboard.writeText(nbMon.owner)}
							>
								<Image
									src="/images/copy_all.svg"
									height={24}
									width={24}
									alt="Copy"
								/>
							</ButtonCopy>
						</div>
					</div>
					<div className="d-flex text-white w-100 justify-content-between mt-3">
						<StatsText>Owner Count</StatsText>

						<StatsText>TODO</StatsText>
					</div>
				</>
			) : (
				<>
					<SeparatorContainer
						small
						noTop
						className="w-100 justify-content-between d-flex align-items-center"
					>
						<StatsText className="text-white">Genus</StatsText>
						<StatsText className="text-capitalize text-white">
							{nbMon.genus}
						</StatsText>
					</SeparatorContainer>
					<SeparatorContainer
						small
						noTop
						className="w-100 justify-content-between d-flex align-items-center"
					>
						<StatsText className="text-white">Rarity</StatsText>
						<NewPill pillType="rarity" content={nbMon.rarity} />
					</SeparatorContainer>
					<SeparatorContainer
						small
						noTop
						className="w-100 justify-content-between d-flex align-items-center"
					>
						<StatsText className="text-white">Species</StatsText>
						<NewPill pillType="species" content={nbMon.species} />
					</SeparatorContainer>
					<SeparatorContainer
						small
						noTop
						className="w-100 justify-content-between d-flex align-items-center"
					>
						<StatsText className="text-white">Mutation</StatsText>
						<NewPill pillType="type" content={nbMon.mutation} />
					</SeparatorContainer>
					<SeparatorContainer
						small
						noTop
						className="w-100 justify-content-between d-flex align-items-center"
					>
						<StatsText className="text-white">Fertility</StatsText>
						<NewPill pillType="fertility" content={nbMon.fertility} />
					</SeparatorContainer>
					<SeparatorContainer
						small
						noTop
						className="w-100 justify-content-between d-flex align-items-center"
					>
						<StatsText className="text-white">Types</StatsText>
						<div className="d-flex">
							<NewPill pillType="type" content={nbMon.types[0]} />
							{nbMon.types[1] && (
								<NewPill
									pillType="type"
									content={nbMon.types[1]}
									className="ms-2"
								/>
							)}
						</div>
					</SeparatorContainer>
					<SeparatorContainer
						small
						noTop
						className="w-100 justify-content-between d-flex align-items-center"
					>
						<StatsText className="text-white">NBMonID</StatsText>
						<StatsText className="text-white">#{nbMon.nbmonId}</StatsText>
					</SeparatorContainer>

					<SeparatorContainer
						small
						noTop
						className="w-100 justify-content-between d-flex align-items-center"
					>
						<StatsText className="text-white">Birthdate</StatsText>
						<StatsText className="text-white">{birthDate()}</StatsText>
					</SeparatorContainer>
					<SeparatorContainer
						small
						noTop
						className="w-100 justify-content-between d-flex align-items-center"
					>
						<StatsText className="text-white">Owned by</StatsText>
						<div className="d-flex">
							<StyledStatsText>
								{nbMon.owner.split("").splice(0, 16).join("")}...
								<span className="me">{mine && "(me)"}</span>
							</StyledStatsText>
							<ButtonCopy
								onClick={() => navigator.clipboard.writeText(nbMon.owner)}
							>
								<Image
									src="/images/copy_all.svg"
									height={24}
									width={24}
									alt="Copy"
								/>
							</ButtonCopy>
						</div>
					</SeparatorContainer>
					<SeparatorContainer
						small
						noTop
						className="w-100 justify-content-between d-flex align-items-center"
					>
						<StatsText className="text-white">Owner count</StatsText>
						<StatsText className="text-white">1</StatsText>
					</SeparatorContainer>
				</>
			)}

			{!listed && (
				<NFTTable
					type="Activities"
					data={activitiesData}
					className="w-100 mt-3"
				/>
			)}
		</BasicInfoContainer>
	);
};
export default BasicInfo;
