import React from "react";
import Image from "next/image";
import { HeadingSuperXXS } from "components/Typography/Headings";
import styled from "styled-components";
import NewPill from "components/NewPill";
import { StatsContainer, StatsText } from "./TabItemComponents";
import { mediaBreakpoint } from "utils/breakpoints";
import SeparatorContainer from "./SeparatorContainer";
import { MainText } from "./Texts";
import NFTTable from "./NFTTable";

const PillsContainer = styled.div`
	max-width: 150px;

	@media ${mediaBreakpoint.down.lg} {
		width: 600px;
	}
`;

const TypesContainer = styled.div`
	display: flex;
	background: linear-gradient(
			0deg,
			rgba(255, 255, 255, 0.17),
			rgba(255, 255, 255, 0.17)
		),
		linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01)),
		#000000;
	border-radius: 8px;
	max-width: 324px;
	padding: 2px 16px;
	width: 100%;
	justify-content: space-between;

	@media ${mediaBreakpoint.down.md} {
		flex-direction: column;
	}
`;

const Stats = ({ nbMon, listed, activitiesData = [] }) => {
	return (
		<div className="d-flex flex-column align-items-center p-0 p-lg-3 pt-0">
			<TypesContainer>
				<MainText as="p" className="text-white mt-3">
					Type{nbMon.types[1] && `s`}
				</MainText>

				<div className="d-flex justify-content-center my-3">
					<NewPill content={nbMon.types[0]} pillType="type" />
					{nbMon.types[1] && (
						<NewPill
							content={nbMon.types[1]}
							className="ms-2"
							pillType="type"
						/>
					)}
				</div>
			</TypesContainer>

			<div className="d-flex flex-lg-row flex-column my-3 align-items-lg-start align-items-center">
				<div className="d-flex flex-column  align-items-center w-50">
					<Image
						src="/images/strong_against.svg"
						width={40}
						height={32}
						alt="Strong Against"
					/>
					<MainText as="p" className="text-white my-2">
						Strong Against
					</MainText>
					<PillsContainer className="d-flex flex-wrap justify-content-center">
						{nbMon.strongAgainst.map((type) => (
							<NewPill
								noText
								className="me-1 mb-2"
								key={type}
								pillType="type"
								content={type}
							/>
						))}
					</PillsContainer>
				</div>

				<div className="ms-lg-4 ms-0 mt-lg-0 mt-3 d-flex flex-column  align-items-center w-50">
					<Image
						src="/images/weak_against.svg"
						width={40}
						height={32}
						alt="Weak Against"
					/>
					<MainText as="p" className="text-white my-2">
						Weak Against
					</MainText>
					<PillsContainer className="d-flex flex-wrap justify-content-center">
						{nbMon.weakAgainst.map((type) => (
							<NewPill
								noText
								className="me-1 mb-2"
								key={type}
								pillType="type"
								content={type}
							/>
						))}
					</PillsContainer>
				</div>
			</div>

			<div className="d-flex flex-lg-row flex-column my-3 align-items-lg-start align-items-center">
				<div className="d-flex flex-column  align-items-center w-50">
					<Image
						src="/images/resistant_to.svg"
						width={40}
						height={32}
						alt="Resistant To"
					/>
					<MainText as="p" className="text-white my-2">
						Resistant To
					</MainText>
					<PillsContainer className="d-flex flex-wrap justify-content-center">
						{nbMon.resistantTo.map((type) => (
							<NewPill
								noText
								className="me-1 mb-2"
								key={type}
								pillType="type"
								content={type}
							/>
						))}
					</PillsContainer>
				</div>
				<div className="ms-lg-4 ms-0 mt-lg-0 mt-3 d-flex flex-column  align-items-center w-50">
					<Image
						src="/images/vuln_to.svg"
						width={40}
						height={32}
						alt="Vulnerable To"
					/>
					<MainText as="p" className="text-white my-2">
						Vulnerable To
					</MainText>
					<PillsContainer className="d-flex flex-wrap justify-content-center">
						{nbMon.vulnerableTo.map((type) => (
							<NewPill
								noText
								className="me-1 mb-2"
								key={type}
								pillType="type"
								content={type}
							/>
						))}
					</PillsContainer>
				</div>
			</div>
			<SeparatorContainer className="w-100">
				<StatsContainer>
					<StatsText as="p" className="text-white">
						Fertility
					</StatsText>
					<StatsText as="p" className="text-capitalize text-white">
						{nbMon.fertility}
					</StatsText>
				</StatsContainer>

				<StatsContainer className="mt-3">
					<StatsText as="p" className="text-white">
						Fertility Deduction
					</StatsText>
					<StatsText as="p" className="text-capitalize text-white">
						{nbMon.fertilityDeduction}
					</StatsText>
				</StatsContainer>
			</SeparatorContainer>

			{!listed && (
				<NFTTable
					type="Activities"
					data={activitiesData}
					className="w-100 mt-3"
				/>
			)}
		</div>
	);
};

export default Stats;
