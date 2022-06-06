import { useEffect, useState } from "react";

import Link from "next/link";

import Layout from "components/Layout";
import MyButton from "components/Buttons/Button";

import styled from "styled-components";
import filterNBMons from "utils/filterNBMons";

import FiltersWithModal from "components/Filters/FiltersWithModal";
import FertilityFilter from "components/Filters/FertilityFilter";

import { mediaBreakpoint } from "utils/breakpoints";
import CheckBoxFilters from "components/Filters/CheckBoxFilters";
import { TextPrimary, TextSecondary } from "components/Typography/Texts";
import NBMonCard from "components/NBMonPreviewCard/NBMonCard";
import EggCard from "components/NBMonPreviewCard/EggCard";

import { useFilterStore } from "stores/filterStore";
import { useSortStore } from "stores/sortStore";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { FaArrowDown } from "react-icons/fa";

import Image from "next/image";
import Pagination from "components/Filters/Pagination";
import SelectSort from "components/Filters/SelectSort";
import { getRarityNumber } from "utils/other";
import { HeadingSuperXXS } from "components/Typography/Headings";
import CardLink from "components/CardLink";
import PriceFilter from "components/Filters/PriceFilter";
import filterNBMonsWithPrice from "utils/filterNBMonsWithPrice";

const Filters = ({ filterOpen, opacityOne, handleFilterButton }) => {
	const clearFilter = useFilterStore((state) => state.clearFilter);

	return (
		<DesktopFilterContainer
			className={`${filterOpen && `show`} ${opacityOne && `opacityOne`}`}
		>
			<FilterHeader>
				<FilterHeaderIcon>
					<Image
						alt="Filter"
						src="/images/filter_icon.svg"
						width={24}
						height={24}
					/>
				</FilterHeaderIcon>

				<FilterHeaderTitle>Filter</FilterHeaderTitle>

				<ClearFilterButton className="mt-1 ms-auto" onClick={clearFilter}>
					<TextClear as="p">Clear</TextClear>
				</ClearFilterButton>
			</FilterHeader>

			<FiltersWithModal />

			<CheckBoxFilters />

			<FertilityFilter />

			<PriceFilter />

			<MyButton
				className="d-xl-none d-block mb-3"
				variant="outline-secondary"
				text="Apply"
				onClick={handleFilterButton}
			/>
		</DesktopFilterContainer>
	);
};

const AccountPage = () => {
	const [filterOpen, setFilterOpen] = useState(false);
	const [opacityOne, setOpacityOne] = useState(false);
	const [allNBMons] = useState([
		{
			nbmonId: 3,
			owner: "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5",
			hatchedAt: 1652992179,
			isHatchable: false,
			transferredAt: 1652991774,
			hatchingDuration: 300,
			strongAgainst: ["Water", "Earth", "Brawler", "Magic", "Reptile"],
			weakAgainst: ["Fire", "Wind", "Nature", "Spirit", "Toxic"],
			resistantTo: ["Water", "Earth", "Nature", "Magic", "Reptile"],
			vulnerableTo: ["Fire", "Electric", "Wind", "Frost", "Toxic"],
			gender: "Male",
			rarity: "Common",
			mutation: "Not mutated",
			mutationType: null,
			species: "Origin",
			genus: "Heree",
			genusDescription:
				"Heree has a strong connection with the forest, body made of leaves and sticks. Gets sick if he spends too much time in the city.",
			behavior: "Aggressive",
			fertility: "3000",
			fertilityDeduction: 1000,
			types: ["Nature", null],
			healthPotential: 14,
			energyPotential: 15,
			attackPotential: 16,
			defensePotential: 12,
			spAtkPotential: 0,
			spDefPotential: 8,
			speedPotential: 16,
			passives: ["Camouflage", "Wind Bracer"],
			isEgg: false,
			priceEth: 2.3,
		},
	]);

	const [allFilteredNBMons, setAllFilteredNBMons] = useState([]);
	const [shownNBMons, setshownNBMons] = useState([]);
	const { selectedFilters, rangeFilters, price } = useFilterStore();

	const btnSort = useSortStore((states) => states.sortingDetails.btnSort);
	const typeSort = useSortStore((states) => states.sortingDetails.typeSort);
	const changeSortDirection = useSortStore(
		(states) => states.changeSortDirection
	);

	const pageSettings = useSortStore((states) => states.pageSettings);
	const setPageSettings = useSortStore((states) => states.setPageSettings);
	const { show, current, totalPage } = pageSettings;

	useEffect(() => {
		const filtered = filterNBMonsWithPrice(
			selectedFilters,
			rangeFilters,
			price,
			allNBMons
		);
		setAllFilteredNBMons(
			filtered
				.sort((a, b) => parseInt(a.nbmonId) - parseInt(b.nbmonId))
				.map((data) => {
					return {
						...data,
						rarityNum:
							data.rarity === null
								? -1
								: getRarityNumber(data.rarity.toLowerCase()),
					};
				})
		);

		setPageSettings({
			...pageSettings,
			current: 1,
			totalPage: 0,
		}); // first page is page 0

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedFilters, rangeFilters, allNBMons, price]);

	useEffect(() => {
		const reSort = allFilteredNBMons.sort((a, b) => {
			if (typeSort === "ID" && btnSort === "down") return b.nbmonId - a.nbmonId;
			if (typeSort === "ID" && btnSort === "up") return a.nbmonId - b.nbmonId;
			if (typeSort === "Rarity" && btnSort === "down")
				return b.rarityNum - a.rarityNum;
			if (typeSort === "Rarity" && btnSort === "up")
				return a.rarityNum - b.rarityNum;
		});

		setshownNBMons(reSort.slice(0, show)); // these r the nbmons that are shown in THAT page.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allFilteredNBMons, btnSort, typeSort]);

	useEffect(() => {
		if (current === 1 || current === 0) {
			setshownNBMons(allFilteredNBMons.slice(0, show));
		} else {
			//2 and above
			setshownNBMons(
				allFilteredNBMons.slice(show * (current - 1), show * current + 1)
			);
		}
		// these r the nbmons that are shown in THAT page.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [current]);

	const handleFilterButton = () => {
		if (!filterOpen) {
			setFilterOpen(true);
			setTimeout(() => {
				setOpacityOne(true);
			}, 100);
			return;
		} else {
			setOpacityOne(false);
			window.scrollTo(0, 0);

			setTimeout(() => {
				setFilterOpen(false);
			}, 300);
		}
	};

	const handleNextBtn = () => {
		if (totalPage === 0 || !totalPage || totalPage < 0) {
			return;
		}

		if (current - 1 !== totalPage) {
			setPageSettings({ ...pageSettings, current: current + 1 });
		}
	};

	const handleBackbtn = () => {
		if (totalPage === 0 || !totalPage || totalPage < 0) {
			return;
		}

		if (current > 1) setPageSettings({ ...pageSettings, current: current - 1 });
	};
	const handleChangeCurrentInput = (e) => {
		if (Number(e.target.value) <= totalPage + 1)
			return setPageSettings({
				...pageSettings,
				current: Number(e.target.value),
			});
		if (Number(e.target.value) > totalPage + 1)
			return setPageSettings({ ...pageSettings, current: totalPage + 1 });
	};

	return (
		<Layout title="Marketplace | Realm Hunter">
			<Filters
				filterOpen={filterOpen}
				opacityOne={opacityOne}
				handleFilterButton={handleFilterButton}
			/>
			<StyledContainer>
				<div className="d-flex align-items-center justify-content-between mb-3">
					<MyButton
						variant="outline-secondary"
						className="d-block d-xl-none"
						text="Filter"
						onClick={handleFilterButton}
					/>
				</div>

				<div className="d-flex justify-content-between mb-5 flex-lg-row flex-column ">
					<CardLink active text="NBMon" href={"/preview-marketplace"} />
					<CardLink
						className={"mx-lg-3 mx-0 my-lg-0 my-3"}
						text="Artifacts"
						href={"#"}
					/>
					<CardLink text="Land" href={"#"} />
				</div>

				<div className="d-flex flex-column">
					<div className="d-flex align-items-center mb-2 justify-content-lg-start justify-content-center">
						<TextTotalNBMons>
							{allFilteredNBMons.length} NBMon on sale
						</TextTotalNBMons>
					</div>
					<FilterWrap>
						<div className="d-flex flex-lg-row flex-column justify-content-between w-100 align-items-lg-start align-items-center">
							<div className="d-flex align-items-center mb-lg-0 mb-4">
								<TextSort>Sort:</TextSort>
								<SelectSort
									list={[
										{
											name: "ID",
										},
										{
											name: "Price",
										},
									]}
									defaultValue={typeSort}
								/>

								<ButtonSort
									onClick={() =>
										changeSortDirection(btnSort === "down" ? "up" : "down")
									}
								>
									<FaArrowDown className={btnSort === "up" && "up"} />
								</ButtonSort>
							</div>

							{totalPage + 1 >= 1 && (
								<Pagination
									prevOnClick={handleBackbtn}
									nextOnClick={handleNextBtn}
									prevDisabled={current === 1}
									nextDisabled={current === totalPage + 1}
									currentPage={current}
									totalPage={totalPage + 1}
									onChangeCurrent={handleChangeCurrentInput}
									onBlurCurrent={() => {
										if (current === 0)
											setPageSettings({ ...pageSettings, current: 1 });
									}}
								/>
							)}

							<FilterInfo className="mx-lg-0 mx-auto align-items-center d-flex mt-lg-0 mt-4">
								<Image
									alt="Eth Logo"
									src="/images/Ethereum.svg"
									width={21}
									height={21}
								/>
								<TextMore className="ms-1">ETH</TextMore>
							</FilterInfo>
						</div>
					</FilterWrap>
				</div>

				<Row className="justify-content-lg-start justify-content-center mt-4">
					<>
						{shownNBMons.map((nbMon) => (
							<Col
								xl={3}
								lg={6}
								md={6}
								style={{ maxWidth: "270px" }}
								key={`genesis-${nbMon.nbmonId}`}
								className="mb-4 "
							>
								{" "}
								<Link href={`/genesis-nbmons/preview-buy`}>
									<a>
										{nbMon.isEgg ? (
											<EggCard nbMon={nbMon} />
										) : (
											<NBMonCard nbMon={nbMon} />
										)}
									</a>
								</Link>
							</Col>
						))}
					</>
				</Row>

				{totalPage < 0 && (
					<TextPrimary className="mt-4 text-white text-center">
						No results found 😔
					</TextPrimary>
				)}
			</StyledContainer>
		</Layout>
	);
};

const StyledContainer = styled.div`
	padding: 32px;
	min-height: 1321px;
	padding-left: calc(24% + 32px);

	& .pagingContainer > svg:first-child {
		margin-left: -100px;
	}

	& .pagingContainer svg {
		font-size: 24px;
	}

	& .pagingContainer svg:hover {
		cursor: pointer;
	}
	@media ${mediaBreakpoint.down.xl} {
		padding: 32px;
	}

	& h1 {
		font-size: 22px;
	}
`;
const DesktopFilterContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow-y: scroll;
	background-color: #242424;
	width: 24%;
	z-index: 1;
	position: absolute;
	padding: 24px 12px 24px 16px;
	& > * {
		margin-top: 16px;
	}

	transition: opacity 300ms;

	@media ${mediaBreakpoint.down.xl} {
		width: 100%;
		padding: 16px;
		max-height: unset;
		height: 100%;

		display: none;
		opacity: 0;
		overflow: auto;
		overflow-x: hidden;
	}

	&.show {
		display: flex;
	}

	&.opacityOne {
		opacity: 1;
	}
`;

const ClearFilterButton = styled.button`
	background: transparent;
	border: none;
	padding: 0;
	color: #fff;

	& p {
		font-size: 18px;
	}
`;

const FilterHeader = styled.div`
	display: flex;
	flex-flow: row nowrap;
	margin-bottom: 15px;
`;

const FilterHeaderTitle = styled(TextSecondary)`
	font-weight: 400;
	font-size: 22px;
	line-height: 28px;
	color: #e1e3e0;
	flex: 0 1 auto;
	padding-left: 12px;
`;

const FilterHeaderIcon = styled.div`
	flex: 0 1 auto;
`;

const TextClear = styled(HeadingSuperXXS)`
	font-weight: 700;
	font-size: 14px;
	line-height: 18px;
`;

//

const TextTotalNBMons = styled.h2`
	font-style: normal;
	font-weight: 400 !important;
	font-size: 22px !important;
	line-height: 28px;
	color: #e1e3e0;
`;

const FilterWrap = styled.div`
	display: flex;
	flex-flow: row wrap;
	align-items: center;
`;

const FilterInfo = styled.div`
	flex: 0 1 auto;
	padding: 8px 0;
	background: linear-gradient(
			0deg,
			rgba(255, 255, 255, 0.07),
			rgba(255, 255, 255, 0.07)
		),
		#171717;
	border-radius: 8px;
	padding: 4px 12px;
`;

const TextMore = styled(TextSecondary)`
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	color: #e1e3e0;
	display: inline-block;
	margin-right: 4px;
`;

const TextSort = styled(TextSecondary)`
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: 0.1px;
	color: #bfc9c2;
	margin-right: 12px;
`;

const ButtonSort = styled.button`
	height: 29px;
	width: 29px;
	background: linear-gradient(
			0deg,
			rgba(255, 255, 255, 0.17),
			rgba(255, 255, 255, 0.17)
		),
		linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01)),
		#000000;
	border-radius: 38px;
	color: #e1e3e0;
	font-size: 14px;
	flex: 0 1 auto;
	border: none;
	border-radius: 8px;
	position: relative;
	padding: 2px 8px;

	& svg {
		transform: rotate(0deg);
		transition: 0.6s;
	}

	& svg.up {
		transform: rotate(180deg);
	}
`;

export default AccountPage;
