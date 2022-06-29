import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import AppContext from "context/AppContext";
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
import ListingBox from "./ListingBox";
import delay from "utils/delay";
import SeparatorContainer from "./SeparatorContainer";
import NFTTable from "./NFTTable";

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

const DummyNBMonLargeCard = ({
	dummy = false,
	isListed = false,
	setNbmon = () => {},
	nbMon,
	userAddress,
}) => {
	const { isEgg, isHatchable, currentHighestBid } = nbMon;
	const { statesSwitchModal } = useContext(AppContext);
	const [listed, setListed] = useState(isListed);
	const [listingType, setListingType] = useState("fixedPrice");

	const offersData = [
		{
			price: 1.312,
			time: "11 months ago",
			usd: 6969,
			id: 123213,
			address: "0x6ef0f724e780E5D3aD6d6f2A4FCbEF64A774eA796",
			txHash:
				"0xe47586b618e22e17c858d067bab5e037cb8ab4af75e4d4028b3e2e676507dd59",
		},
		{
			price: 1,
			time: "4 months ago",
			usd: 6023,
			id: 1354132,
			address: "0x6ef0f724e780E5D3aD66f2A4FCbEF64A774eA796",
			txHash:
				"0xe47586b618e22e17c858d067bab5e037cb8ab4af75e4d4028b3e2e676507dd59",
		},
		{
			price: 0.512,
			time: "2 months ago",
			usd: 931,
			id: 1315132,
			address: "0x6ef0f724e120E5D3aD66f2A4FCbEFeA796",
			txHash:
				"0xe47586b618e22e17c858d067bab5e037cb8ab4af75e4d4028b3e2e676507dd59",
		},
		{
			price: 0.323,
			time: "1 months ago",
			usd: 741,
			id: 1351332,
			address: "0x5fa5c1998d4c11f59c17FDE8b3f07588C23837D5",
			txHash:
				"0xe47586b618e22e17c858d067bab5e037cb8ab4af75e4d4028b3e2e676507dd59",
		},
		{
			price: 0.123,
			time: "21 days ago",
			usd: 192,
			id: 513,
			address: "0xda6FCd7aF0E44E5d301dF3e7720a5281BBECCb2A",
			txHash:
				"0xe47586b618e22e17c858d067bab5e037cb8ab4af75e4d4028b3e2e676507dd59",
		},
		{
			price: 0.523,
			time: "15 days ago",
			usd: 192,
			id: 5133,
			address: "0xA1C97853Efe64f660F5f75D4B4997b87540bF307",
			txHash:
				"0xe47586b618e22e17c858d067bab5e037cb8ab4af75e4d4028b3e2e676507dd59",
		},
		{
			price: 0.523,
			time: "13 days ago",
			usd: 192,
			id: 5113,
			address: "0xA1C97853Efe64f660F5f75D4B4997b87540bF307",
			txHash:
				"0xe47586b618e22e17c858d067bab5e037cb8ab4af75e4d4028b3e2e676507dd59",
		},
		{
			price: 0.2,
			time: "8 days ago",
			usd: 192,
			id: 85,
			address: "0xA1C97853Efe64f660F5f75D4B4997b87540bF307",
			txHash:
				"0xe47586b618e22e17c858d067bab5e037cb8ab4af75e4d4028b3e2e676507dd59",
		},
	];

	const activitiesData = [
		{
			id: 12312,
			price: 0.5,
			time: "2 days ago",
			event: "mint",
			txHash:
				"0xe47586b618e22e17c858d067bab5e037cb8ab4af75e4d4028b3e2e676507dd59",
		},
	];
	const [listedPrices, setListedPrices] = useState({
		weth: isListed ? nbMon.priceEth : 1,
		usd: 1300,
		endPrice: 2,
	});

	const [biddingPrices, setBiddingPrices] = useState({
		minAmount: 0,
		reservedAmount: 0,
	});

	const [key, setKey] = useState("info");

	const { weth, usd, endPrice } = listedPrices;

	useQuery(
		"exchangeRates",
		() => fetch(`https://api.coinbase.com/v2/exchange-rates?currency=ETH`),
		{
			onSuccess: async (res) => {
				const result = await res.json();
				setListedPrices({
					...listedPrices,
					usd: (result.data.rates.USD * weth).toFixed(3),
				});
			},
			enabled: weth > 0,
			retry: 0,
			refetchOnWindowFocus: false,
		}
	);

	const mine = userAddress
		? nbMon.owner.toLowerCase() === userAddress.toLowerCase()
		: false;
	const hatchesAt = isEgg
		? parseInt(nbMon.bornAt + nbMon.hatchingDuration) * 1000
		: 0;
	let genus;

	const onCancelListing = () => {
		statesSwitchModal.setter({
			show: true,
			content: "cancelListNBmon",
			stage: 0,
			onClickCancel: onActualCancelListing,
		});
	};

	const onActualCancelListing = async () => {
		// Clicks on Cancel Listing in the Remove Listing Confirmation Modal "cancelListNBmon"

		//Do Metamask here (cancelling the selling...)

		//Success pop up
		statesSwitchModal.setter({
			show: true,
			content: "cancelListNBmon",
			stage: 1,
			onClickCancel: () => {},
		});

		setListedPrices({ usd: 1, weth: 1, endPrice: 2 });
		setListed(false);
	};

	const onBuy = () => {
		statesSwitchModal.setter({
			show: true,
			content: "confirmBuyNBmon",
			onConfirm,
			usd,
			weth,
		});
	};

	const onConfirm = async () => {
		statesSwitchModal.setter({
			show: true,
			content: "buyNBmon",
			stage: 0,
			price: weth,
		});

		await delay(1500);

		statesSwitchModal.setter({
			show: true,
			content: "buyNBmon",
			stage: 1,
			price: weth,
		});

		await delay(1500);

		statesSwitchModal.setter({
			show: true,
			content: "buyNBmon",
			stage: 2,
			price: weth,
		});
		await delay(1500);

		statesSwitchModal.setter({
			show: true,
			content: "buyNBmon",
			stage: 3,
			price: weth,
		});

		setKey("info");
		setListed(false);
		setNbmon({ ...nbMon, owner: userAddress.toLowerCase() });
	};

	if (!isEgg) {
		genus = nbMon.genus.toLowerCase();
	}

	return (
		<OuterContainer className="py-4 d-flex w-100 justify-content-center ">
			<CardContainer
				listed={listed}
				hatchable={mine && isEgg && isHatchable ? 1 : 0}
			>
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
							<BasicInfo
								listed={listed}
								nbMon={nbMon}
								mine={mine}
								activitiesData={activitiesData}
							/>
						</Tab>
						{!isEgg && (
							<Tab eventKey="stats" title="Stats">
								<Stats nbMon={nbMon} />
							</Tab>
						)}
						{mine && dummy && !listed && (
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
						)}
					</StyledTabs>
				</TabsContainer>
			</CardContainer>
			{listed && (
				<RightSideContainer>
					<SeparatorContainer noTop className="w-100">
						<ListingBox
							listingType={listingType}
							mine={mine}
							price={weth}
							usdValue={usd}
							onCancelListing={onCancelListing}
							onBuy={onBuy}
							endPrice={endPrice}
							biddingPrices={biddingPrices}
							currentHighestBid={currentHighestBid}
						/>
					</SeparatorContainer>
					{(listingType === "absoluteBidding" ||
						listingType === "timedAuction" ||
						listingType === "minimumBidding") && (
						<SeparatorContainer noTop className="w-100">
							<NFTTable
								userAddress={userAddress.toLowerCase()}
								data={offersData}
							/>
						</SeparatorContainer>
					)}

					<NFTTable
						type="Activities"
						className="mt-3 w-100"
						userAddress={userAddress.toLowerCase()}
						data={activitiesData}
					/>
				</RightSideContainer>
			)}
		</OuterContainer>
	);
};

export default DummyNBMonLargeCard;
