import React from "react";
import Image from "next/image";
import { HeadingSuperXXS } from "components/Typography/Headings";
import styled from "styled-components";
import Pill from "components/Pill";
import NewPill from "components/NewPill";
import { StatsContainer, StatsText } from "./TabItemComponents";

const StyledHeadingSuperXXS = styled(HeadingSuperXXS)`
	font-weight: 400;
	font-size: 18px;
	line-height: 24px;
`;

const Stats = ({ nbMon }) => {
	return (
		<div className="d-flex flex-column align-items-center p-0 p-lg-3 pt-0">
			<StyledHeadingSuperXXS as="p" className="text-white mt-3">
				Type{nbMon[1] && `s`}
			</StyledHeadingSuperXXS>

			<div className="d-flex justify-content-center my-3">
				<NewPill content={nbMon.types[0]} pillType="type" />
				{nbMon.types[1] && (
					<NewPill content={nbMon.types[1]} className="ms-2" pillType="type" />
				)}
			</div>

			<div className="d-flex flex-lg-row flex-column my-3 align-items-lg-start align-items-center">
				<div className="d-flex flex-column  align-items-center w-50">
					<Image
						src="/images/strong_against.svg"
						width={40}
						height={32}
						alt="Strong Against"
					/>
					<StyledHeadingSuperXXS as="p" className="text-white my-2">
						Strong Against
					</StyledHeadingSuperXXS>
					<div className="d-flex flex-wrap justify-content-center">
						{nbMon.strongAgainst.map((type) => (
							<NewPill
								className="me-1 mb-2"
								key={type}
								pillType="type"
								content={type}
							/>
						))}
					</div>
				</div>

				<div className="ms-lg-2 ms-0 mt-lg-0 mt-3 d-flex flex-column  align-items-center w-50">
					<Image
						src="/images/weak_against.svg"
						width={40}
						height={32}
						alt="Weak Against"
					/>
					<StyledHeadingSuperXXS as="p" className="text-white my-2">
						Weak Against
					</StyledHeadingSuperXXS>
					<div className="d-flex flex-wrap justify-content-center">
						{nbMon.weakAgainst.map((type) => (
							<NewPill
								className="me-1 mb-2"
								key={type}
								pillType="type"
								content={type}
							/>
						))}
					</div>
				</div>
			</div>

			<div className="d-flex flex-lg-row flex-column my-3 align-items-lg-start align-items-center">
				<div className="ms-lg-2 d-flex flex-column  align-items-center w-50">
					<Image
						src="/images/resistant_to.svg"
						width={40}
						height={32}
						alt="Resistant To"
					/>
					<StyledHeadingSuperXXS as="p" className="text-white my-2">
						Resistant To
					</StyledHeadingSuperXXS>
					<div className="d-flex flex-wrap justify-content-center">
						{nbMon.resistantTo.map((type) => (
							<NewPill
								className="me-1 mb-2"
								key={type}
								pillType="type"
								content={type}
							/>
						))}
					</div>
				</div>
				<div className="ms-lg-2 ms-0 mt-lg-0 mt-3 d-flex flex-column  align-items-center w-50">
					<Image
						src="/images/vuln_to.svg"
						width={40}
						height={32}
						alt="Vulnerable To"
					/>
					<StyledHeadingSuperXXS as="p" className="text-white my-2">
						Vulnerable To
					</StyledHeadingSuperXXS>
					<div className="d-flex flex-wrap justify-content-center">
						{nbMon.vulnerableTo.map((type) => (
							<NewPill
								className="me-1 mb-2"
								key={type}
								pillType="type"
								content={type}
							/>
						))}
					</div>
				</div>
			</div>

			<StyledHeadingSuperXXS as="p" className="text-white mt-3">
				Fertility
			</StyledHeadingSuperXXS>
			<StatsContainer className="mt-3">
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
		</div>
	);
};

export default Stats;
