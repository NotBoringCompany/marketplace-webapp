import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { HeadingSuperXXS } from "components/Typography/Headings";
import { TextSecondary } from "components/Typography/Texts";
import GenesisTag from "./GenesisTag";
import { data } from "configs";
import NewPill from "components/NewPill";
import { nbmonColorSchemes } from "configs/nbmonColorSchemes";
import exchangeRateCalculator from "utils/exchangeRateCalculator";

const OuterCard = styled.div`
	position: relative;
	padding: 2px;
	${(props) =>
		props.mutation
			? `background-image: linear-gradient(${
					props.basecolor ? props.basecolor : props.border
			  } 55%, ${props.mutationcolor});`
			: `background: ${props.border};`}

	width: 240px;
	border-radius: 16px;
	transition: 0.35s all;
	height: 100%;

	&:hover {
		cursor: pointer;
		transform: translate(2px, -5px);
	}
`;

const Card = styled.div`
	padding-left: 12px;
	padding-right: 10px;
	padding-bottom: ${(props) => (props.mutationcolor ? `40px` : `24px`)};
	padding-top: 0;
	display: flex;
	flex-direction: column;
	border-radius: 16px;

	width: 100%;
	height: 100%;
	min-height: 340px;

	p {
		margin: 0;
	}

	background: ${(props) =>
			props.mutationcolor
				? `linear-gradient(to bottom right, #0000 50%, ${props.mutationcolor} 50.1%) bottom
			right/50px 50px no-repeat,
		linear-gradient(0deg, #2c2d2d, #2c2d2d),
		linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01));`
				: `linear-gradient(0deg, #2c2d2d, #2c2d2d),
		linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01));`}
		& .genusName {
		font-size: 18px;
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

const MutatedLogoContainer = styled.div`
	width: 20px;
	height: 20px;
	position: absolute;
	right: -16px;
`;

const RarityContainer = styled.div`
	position: absolute;
	left: 50%;
	top: 0;

	transform: translateX(-50%);
`;

const StyledRarity = styled(NewPill)`
	padding: 4px 16px;
	padding-top: 2px;
	border-radius: 12px;
	border-top-right-radius: 0;
	border-top-left-radius: 0;
	font-size: 13px;
`;

const ETHPriceText = styled.p`
	margin: 0;
	font-style: normal;
	font-weight: 600;
	font-size: 13px;
	line-height: 15px;
`;

const USDPriceText = styled.p`
	margin: 0;
	font-style: normal;
	font-weight: 600;
	font-size: 11px;
	line-height: 12px;
	color: #afafaf;
`;

const NBMonCard = ({
	nbMon,
	showPriceIfOnSale = false,
	usdToEth,
	...props
}) => {
	const { className } = props;
	const { nbmonId, fertility, species, gender, mutation } = nbMon;

	const rarity = nbMon.rarity.toLowerCase();
	const genus = nbMon.genus.toLowerCase();
	let mutationType = null;
	if (nbMon.mutationType) {
		mutationType = nbMon.mutationType.toLowerCase();
	}
	return (
		<OuterCard
			mutation={mutation === "Mutated" ? 1 : 0}
			mutationcolor={
				mutationType
					? nbmonColorSchemes.colors.type[mutationType].background
					: 0
			}
			basecolor={
				rarity === "legendary" || rarity === "mythical"
					? nbmonColorSchemes.colors.rarity[rarity].baseColor
					: 0
			}
			border={nbmonColorSchemes.colors.rarity[rarity].background}
		>
			<Card
				className={`text-white align-items-center position-relative ${className}`}
				mutationcolor={
					mutationType
						? nbmonColorSchemes.colors.type[mutationType].background
						: 0
				}
			>
				<RarityContainer>
					<StyledRarity pillType="rarity" content={rarity} />
				</RarityContainer>
				<GenesisTag
					background={nbmonColorSchemes.colors.rarity[rarity].background}
				/>
				<div className="d-flex w-100 justify-content-between items-center">
					<div
						style={{ width: "16px", height: "16px" }}
						className="position-relative mt-2"
					>
						<Image src="/images/link-logo.png" layout="fill" alt="ETH Logo" />
					</div>

					<IDContainer className="mt-2">
						<TextSecondary className="text-gray">#{nbmonId}</TextSecondary>
					</IDContainer>
				</div>
				<div className="d-flex flex-column mt-3">
					<ImageContainer>
						<Image
							layout="fill"
							className={`nbmonImg ${genus}`}
							src={data.genus[genus].imageurl}
							alt="nbmon"
						/>

						{mutationType && mutationType !== "not mutated" && (
							<MutatedLogoContainer>
								<Image
									layout="fill"
									alt="mutation"
									src={data.types[mutationType].imageurl}
								/>
							</MutatedLogoContainer>
						)}
					</ImageContainer>

					<div className="mt-3 justify-content-center d-flex align-items-center">
						<HeadingSuperXXS
							as="p"
							className={`text-capitalize genusName text-center ${
								gender === "Male" ? "me-2" : "me-1"
							}`}
						>
							{genus}
						</HeadingSuperXXS>
						{gender === "Male" ? (
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

					<div className="d-flex flex-column">
						<div className="d-flex align-items-center mt-3">
							<NewPill pillType="species" content={species} className="me-1" />
							<NewPill
								pillType="fertility"
								content={fertility}
								className="ms-1"
							/>
						</div>
						{mutation === "Mutated" && (
							<NewPill
								className="w-100 mt-2"
								pillType="mutation"
								content={mutationType}
							/>
						)}
					</div>

					{nbMon.listingData && nbMon.listingData.price && showPriceIfOnSale && (
						<div className="mx-auto d-flex mt-4 align-items-center">
							<div
								style={{ width: "24px", height: "24px" }}
								className="position-relative"
							>
								<Image
									src="/images/link-logo.png"
									layout="fill"
									alt="ETH Logo"
								/>
							</div>
							<div className="ms-2 d-flex flex-column">
								<ETHPriceText className="text-start mb-1">
									{nbMon.listingData.price}{" "}
									{process.env.NEXT_PUBLIC_CURRENCY_NAME}
								</ETHPriceText>
								<USDPriceText className="text-center">
									~ ${exchangeRateCalculator(usdToEth, nbMon.listingData.price)}
								</USDPriceText>
							</div>
						</div>
					)}
				</div>
			</Card>
		</OuterCard>
	);
};

export default NBMonCard;
