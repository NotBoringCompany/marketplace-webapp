import React, { useState } from "react";
import styled from "styled-components";
import Image from "react-bootstrap/Image";
import { data } from "configs";
import { TextSecondary } from "components/Typography/Texts";
import { HeadingSM } from "components/Typography/Headings";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import BasicInfo from "./BasicInfo";
import Stats from "./Stats";
import { mediaBreakpoint } from "utils/breakpoints";
import HatchButtonContainer from "./HatchButtonContainer";
import Sell from "./Sell";

const OuterContainer = styled.div`
	@media (max-width: 1024px) {
		flex-direction: column;
		align-items: center;
	}
`;

const CardContainer = styled.div`
	padding: 16px;
	padding-bottom: 0px;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 500px;
	max-width: 80%;
	border-radius: 20px;
	${(props) =>
		props.hatchable ? `border: 3px solid #7b61ff` : `border: auto`};
	margin-top: 160px;
	& .afterImage {
		position: relative;
		top: -102px;
	}
	margin-bottom: 24px;
	padding: 16px;

	border-top-right-radius: ${(props) => (props.listed ? `0` : `20px`)};
	border-bottom-right-radius: ${(props) => (props.listed ? `0` : `20px`)};

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

	@media (max-width: 1024px) {
		border-radius: 20px;
	}
`;

const RightSideContainer = styled(CardContainer)`
	padding: 48px;
	padding-top: calc(48px - 24px);
	border-top-left-radius: 0%;
	border-bottom-left-radius: 0%;
	border-top-right-radius: 20px;
	@media (max-width: 1024px) {
		padding: 24px;
		margin-top: 8px;
		border-radius: 20px;
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
	font-weight: 500;
	font-size: 16px;
	line-height: 20px;
`;

const TabsContainer = styled.div`
	display: flex;
	flex-direction: column;
	background: transparent;
	width: 100%;

	align-items: center;
	border-radius: 8px;
	margin-top: -56px;
	position: relative;
	top: -20px;
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
		color: #bfc9c2;
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

const MutationImage = styled(Image)`
	width: 45px;
	height: 45px;
	position: relative;
	top: calc(-121px + -250px);
	right: -136px;

	@media (max-width: 1024px) {
		width: 45px;
		height: 45px;
		position: relative;
		top: calc(-121px + -200px);
		right: -96px;
	}
`;
const NBMonLargeCard = ({
	dummy = false,
	nbMon,
	userAddress,
	isListed = false,
}) => {
	const { isEgg, isHatchable } = nbMon;
	const mine = userAddress
		? nbMon.owner.toLowerCase() === userAddress.toLowerCase()
		: false;
	const hatchesAt = isEgg
		? parseInt(nbMon.bornAt + nbMon.hatchingDuration) * 1000
		: 0;
	let genus;

	const [key, setKey] = useState("info");
	const [listed, setListed] = useState(isListed);
	const [listingType, setListingType] = useState("fixedPrice");
	const [listedPrices, setListedPrices] = useState({
		weth: isListed ? nbMon.priceEth : 1,
		usd: 1300,
		endPrice: 2,
	});
	const [biddingPrices, setBiddingPrices] = useState({
		minAmount: 0,
		reservedAmount: 0,
	});

	if (!isEgg) {
		genus = nbMon.genus.toLowerCase();
	}

	return (
		<div className="py-4 d-flex w-100 align-items-center justify-content-center">
			<CardContainer hatchable={mine && isEgg && isHatchable ? 1 : 0}>
				{isEgg ? (
					<NBMonImage
						src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/egg.svg`}
						alt="NBMon"
						width={224}
						height={200}
					/>
				) : (
					<NBMonImage src={data.genus[genus].imageurl} alt="NBMon" />
				)}
				{nbMon.mutation === "Mutated" && (
					<MutationImage
						src={data.types[nbMon.mutationType.toLowerCase()].imageurl}
						alt="mutation"
					/>
				)}
				{isEgg ? (
					<HatchButtonContainer
						mine={mine}
						nbmonId={nbMon.nbmonId}
						hatchesAt={hatchesAt}
						isHatchable={isHatchable}
					/>
				) : (
					<div className="afterImage   text-center w-100">
						<div className="d-flex w-100 justify-content-center align-items-center">
							<HeadingSM
								as="h1"
								className="text-whitePrimary text-capitalize me-2"
							>
								{genus}
							</HeadingSM>
							{nbMon.gender === "Male" ? (
								<Image
									src="/images/male_1.svg"
									width={32}
									height={32}
									alt="Male"
								/>
							) : (
								<Image
									src="/images/female_1.svg"
									width={32}
									height={32}
									alt="Female"
								/>
							)}
						</div>

						<Description className="mt-2 text-whitePrimary mx-auto">
							{data.genus[genus].description}
						</Description>
					</div>
				)}

				<TabsContainer>
					<StyledTabs onSelect={(k) => setKey(k)} activeKey={key}>
						<Tab eventKey="info" title="Info">
							<BasicInfo listed={false} nbMon={nbMon} mine={mine} />
						</Tab>
						{!isEgg && (
							<Tab eventKey="stats" title="Stats">
								<Stats nbMon={nbMon} />
							</Tab>
						)}
						<Tab eventKey="sell" title="Sell">
							<Sell
								nbMon={nbMon}
								setListed={setListed}
								setListedPrices={setListedPrices}
								setListingType={setListingType}
								listedPrices={listedPrices}
								listingType={listingType}
								setKey={setKey}
								setBiddingPrices={setBiddingPrices}
								biddingPrices={biddingPrices}
							/>
						</Tab>
					</StyledTabs>
				</TabsContainer>
			</CardContainer>
		</div>
	);
};

export default NBMonLargeCard;
