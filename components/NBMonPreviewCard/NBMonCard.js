import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { HeadingSuperXXS } from "components/Typography/Headings";
import { mediaBreakpoint } from "utils/breakpoints";
import { TextSecondary } from "components/Typography/Texts";
import GenesisTag from "./GenesisTag";
import { data } from "configs";
import NewPill from "components/NewPill";
import { nbmonColorSchemes } from "configs/nbmonColorSchemes";

const OuterCard = styled.div`
	position: relative;
	padding: 3px;
	background: ${(props) => props.border};
	width: 240px;
	height: 300px;
	border-radius: 16px;

	transition: 0.35s all;

	&:hover {
		cursor: pointer;
		transform: translate(2px, -5px);
	}
`;

const Card = styled.div`
	position: absolute;
	padding: 8px 10px;
	padding-top: 0;
	padding-left: 12px;
	display: flex;
	flex-direction: column;
	border-radius: 16px;

	width: 100%;
	height: 100%;

	p {
		margin: 0;
	}

	background: linear-gradient(0deg, #2c2d2d, #2c2d2d),
		linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01)),
		#000000;

	& .genusName {
		font-size: 18px;
	}

	@media ${mediaBreakpoint.down.xl} {
		width: 240px;
	}
`;

const IDContainer = styled.div`
	background: red;
	min-width: 28px;
	min-height: 28px;
	padding: 2px 16px;
	border-radius: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #242424;

	p {
		font-size: 12px;
		font-weight: 500;
	}
`;

const ImageContainer = styled.div`
	position: relative;
	width: 140px;
	height: 140px;
	align-self: center;
`;

const NBMonCard = ({ nbMon, ...props }) => {
	const { className } = props;
	const { nbmonId, genera, fertility, species, gender } = nbMon;
	return (
		<OuterCard
			border={nbmonColorSchemes.colors.rarity[nbMon.rarity].background}
		>
			<Card
				className={`text-white align-items-center position-relative ${className}`}
			>
				<GenesisTag
					background={nbmonColorSchemes.colors.rarity[nbMon.rarity].background}
				/>
				<div className="d-flex w-100 justify-content-between">
					<Image
						src={"/images/eth_logo.svg"}
						width={12}
						height={12}
						alt="ETH Logo"
					/>
					<IDContainer className="mt-2">
						<TextSecondary className="text-gray">#{nbmonId}</TextSecondary>
					</IDContainer>
				</div>
				<div className="d-flex flex-column mt-0">
					<ImageContainer>
						<Image
							layout="fill"
							className={`nbmonImg ${nbMon.genera}`}
							src={data.genera[nbMon.genera].imageurl}
							alt="nbmon"
						/>
					</ImageContainer>

					<div className="mt-3 justify-content-center d-flex align-items-center">
						<HeadingSuperXXS
							as="p"
							className={`text-capitalize genusName text-center ${
								gender === "male" ? "me-2" : "me-1"
							}`}
						>
							{genera}
						</HeadingSuperXXS>
						{gender === "male" ? (
							<Image
								src="/images/male_1.svg"
								alt="Male"
								width={18}
								height={18}
							/>
						) : (
							<Image
								src="/images/female_1.svg"
								alt="Female"
								width={21}
								height={21}
							/>
						)}
					</div>

					<div className="d-flex align-items-center mt-3">
						<NewPill pillType="species" content={species} className="me-1" />
						<NewPill
							pillType="fertility"
							content={fertility}
							className="ms-1"
						/>
					</div>
				</div>
			</Card>
		</OuterCard>
	);
};

export default NBMonCard;
