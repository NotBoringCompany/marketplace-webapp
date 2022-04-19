import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import { useQuery } from "react-query";

import Link from "next/link";

import Layout from "components/Layout";
import MyButton from "components/Buttons/Button";

import styled from "styled-components";
import mustBeAuthed from "utils/mustBeAuthed";
import filterNBMons from "utils/filterNBMons";

import FiltersWithModal from "components/Filters/FiltersWithModal";
import FertilityFilter from "components/Filters/FertilityFilter";

import { HeadingSuperXXS, HeadingXXS } from "components/Typography/Headings";

import { mediaBreakpoint } from "utils/breakpoints";
import CheckBoxFilters from "components/Filters/CheckBoxFilters";
import { TextPrimary } from "components/Typography/Texts";
import Loading from "components/Loading";
import EggCard from "components/NBMonPreviewCard/EggCard";

import { useFilterStore } from "stores/filterStore";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { FaArrowDown } from "react-icons/fa";

import Image from "next/image";
import { BackBtnContainer } from "pages/genesis-nbmons/[nbmonId]";
import NewButton from "components/Buttons/NewButton";
import { FiArrowLeft } from "react-icons/fi";
import Pagination from "components/Filters/Pagination";
import { useRouter } from "next/router";
import SelectSort from "components/Filters/SelectSort";
import NBMonPreviewCard from "components/NBMonPreviewCard";
import { getRarityNumber } from "utils/other";

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
`

const FilterHeaderTitle = styled.h5`
	font-family: 'Mada';
	font-style: normal;
	font-weight: 400;
	font-size: 22px;
	line-height: 28px;
	color: #E1E3E0;
	flex: 0 1 auto;
	padding-left: 12px;
`

const FilterHeaderIcon = styled.div`
	flex: 0 1 auto;
`

const TextClear = styled.span`
	font-family: 'Mada';
	font-style: normal;
	font-weight: 700;
	font-size: 14px;
	line-height: 18px;
	color: #5B5B5B;
`

const Filters = ({ filterOpen, opacityOne, handleFilterButton }) => {
	const clearFilter = useFilterStore((state) => state.clearFilter);
	return (
		<DesktopFilterContainer
			className={`${filterOpen && `show`} ${
				opacityOne && `opacityOne`
			}`}
		>
			<FilterHeader>
				<FilterHeaderIcon>
					<Image
						src='/images/filter_icon.svg'
						width={24}
						height={24}
					/>
				</FilterHeaderIcon>

				<FilterHeaderTitle>Filter</FilterHeaderTitle>

				<ClearFilterButton className="mt-1 ms-auto" onClick={clearFilter}>
					<TextClear>clear</TextClear>
				</ClearFilterButton>
			</FilterHeader>

			<FiltersWithModal />

			<CheckBoxFilters />

			<FertilityFilter />

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
	const { user } = useMoralis();
	const router = useRouter();

	const [filterOpen, setFilterOpen] = useState(false);
	const [opacityOne, setOpacityOne] = useState(false);
	const [allNBMons, setAllNBMons] = useState([]);
	const [page, setPage] = useState({
		show: 12,
		current: 1,
		totalPage: null,
	});
	const [allFilteredNBMons, setAllFilteredNBMons] = useState([]);
	const [shownNBMons, setshownNBMons] = useState([]);
	const { selectedFilters, rangeFilters } = useFilterStore();
	const { show, current, totalPage } = page;

	const [btnSort, setBtnSort] = useState('down'); // down = high to low, up = low to high
	const [typeSort, setTypeSort] = useState('ID') // default is ID

	const totalPageCounter = (fetchedDataLength, show) => {
		if (fetchedDataLength % show > 0) {
			return parseInt(fetchedDataLength / show) + 1;
		}
		return parseInt(fetchedDataLength / show);
	};

	const { isFetching, error } = useQuery(
		"allMyNBMons",
		() =>
			fetch(
				`https://run.mocky.io/v3/d561df65-168a-4e91-b66d-c5c0ad012018`
			),
		{
			refetchOnWindowFocus: false,
			onSuccess: async (res) => {
				let fetchedData = await res.json();
				// console.log(fetchedData);
				// fetchedData = replaceDummy(fetchedData);
				setAllNBMons(
					fetchedData.sort((a, b) => parseInt(a.nbmonId) - parseInt(b.nbmonId))
				);
				setPage({
					...page,
					totalPage: totalPageCounter(fetchedData.length, show) - 1, // first page is page 0
				});
			},
		}
	);

	useEffect(() => {
		if (!isFetching) {
			const filtered = filterNBMons(selectedFilters, rangeFilters, allNBMons);
			setAllFilteredNBMons(
				filtered.sort((a, b) => parseInt(a.nbmonId) - parseInt(b.nbmonId)).map(data => {
					return {
						...data,
						rarityNum: data.rarity == null ? -1 : getRarityNumber(data.rarity.toLowerCase())
					}
				})
			);
			setPage({
				...page,
				current: 1,
				totalPage: totalPageCounter(filtered.length, show) - 1, // first page is page 0.,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedFilters, rangeFilters, isFetching, allNBMons]);

	useEffect(() => {
		const reSort = allFilteredNBMons.sort((a, b) => {
			if(typeSort == 'ID' && btnSort == 'down') return b.nbmonId - a.nbmonId
			if(typeSort == 'ID' && btnSort == 'up') return a.nbmonId - b.nbmonId
			if(typeSort == 'Rarity' && btnSort == 'down') return b.rarityNum - a.rarityNum
			if(typeSort == 'Rarity' && btnSort == 'up') return a.rarityNum - b.rarityNum
		})

		setshownNBMons(reSort.slice(0, show)); // these r the nbmons that are shown in THAT page.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allFilteredNBMons, btnSort, typeSort]);

	useEffect(() => {
		if (current === 1 || current == 0) {
			setshownNBMons(allFilteredNBMons.slice(0, show));
		} else {
			//2 and above
			setshownNBMons(
				allFilteredNBMons.slice(show * (current - 1), (show * current) + 1)
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

		if (current-1 !== totalPage) {
			setPage({ ...page, current: current + 1 });
		}
	};

	const handleBackbtn = () => {
		if (totalPage === 0 || !totalPage || totalPage < 0) {
			return;
		}

		if (current > 1) {
			setPage({ ...page, current: current - 1 });
		}
	};
	const handleChangeCurrentInput = (e) => {
		if(Number(e.target.value) <= totalPage + 1) return setPage({ ...page, current: Number(e.target.value) });
		if(Number(e.target.value) > totalPage + 1) return setPage({ ...page, current: totalPage + 1 });
	};

	const handleBackToOverview = () => {
		router.push("/overview");
	};

	return (
		<Layout title="Account Page | Realm Hunter">
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

				{!isFetching && (
				<div>
					<div>
						<RecustomBackBtn onClick={handleBackToOverview}>
							<NewButton
								icon={<FiArrowLeft className="me-2" />}
								isLink
								href="/overview"
								text="Back to Overview"
							/>
						</RecustomBackBtn>
					</div>

					<div className="d-flex align-items-center mb-3">
						<TextTotalNBMons>
							{allFilteredNBMons.length} NBMons
						</TextTotalNBMons>
					</div>

					<FilterWrap>
						<FilterSort>
							<TextSort>Sort:</TextSort>

							<SelectSort
								list={[
									{
										name: 'ID'
									},
									{
										name: 'Rarity'
									}
								]}
								defaultValue={typeSort}
								getSelectedValue={setTypeSort}
							/>

							<ButtonSort
								onClick={() => setBtnSort(btnSort == 'down' ? 'up' : 'down')}
							>
								<FaArrowDown className={btnSort == 'up' && 'up'}/>
							</ButtonSort>
						</FilterSort>

						<PaginationWrap>
							{totalPage + 1 >= 1 && (<Pagination
								prevOnClick={handleBackbtn}
								nextOnClick={handleNextBtn}
								prevDisabled={current  == 1}
								nextDisabled={current == totalPage + 1}
								currentPage={current}
								totalPage={totalPage + 1}
								onChangeCurrent={handleChangeCurrentInput}
								onBlurCurrent={() => {
									if(current === 0) setPage({ ...page, current: 1 })
								}}
							/>)}
						</PaginationWrap>

						<FilterInfo>
							<BoxGetMore>
								<TextMore>Get more on</TextMore>
								<TextMoreLink href="#">
									<span className="pe-1">Opensea</span>
									<Image
										src="/images/opensea_link_icon.svg"
										width={17.5}
										height={8.75}
									/>
								</TextMoreLink>
							</BoxGetMore>
						</FilterInfo>
					</FilterWrap>
				</div>
				)}

				<Row className="justify-content-lg-start justify-content-center">
					{!isFetching ? (
						<>
							{shownNBMons.map((nbMon) => (
								<>
									<Col
										xl={3}
										lg={6}
										md={6}
										style={{ maxWidth: "270px" }}
										key={`genesis-${nbMon.nbmonId}`}
										className="mb-4 "
									>
										{" "}
										<Link href={`/genesis-nbmons/${nbMon.nbmonId}`}>
											<a>
												{nbMon.isEgg ? <EggCard nbMon={nbMon} /> : <NBMonPreviewCard nbMon={nbMon} />}
											</a>
										</Link>
									</Col>
								</>
							))}
						</>
					) : (
						<Loading />
					)}
				</Row>

				{error && (
					<TextPrimary className="mt-4 text-white text-center">
						An error occured while fetching your NBMons. Please refresh this
						page.
					</TextPrimary>
				)}

				{!isFetching && totalPage < 0 && (
					<TextPrimary className="mt-4 text-white text-center">
						No results found 😔
					</TextPrimary>
				)}

				{/* {!isFetching &&
					Object.keys(selectedFilters).length > 0 &&
					allFilteredNBMons.length < 1 && (
						<TextPrimary className="mt-4 text-white text-center">
							No Result 🙈
						</TextPrimary>
					)} */}
			</StyledContainer>
		</Layout>
	);
};

const RecustomBackBtn = styled(BackBtnContainer)`
	position: relative;
	top: unset;
	bottom: unset;
	right: unset;
	left: unset;
`

const TextTotalNBMons = styled.h2`
	font-style: normal;
	font-weight: 400 !important;
	font-size: 22px !important;
	line-height: 28px;
	color: #E1E3E0;
	margin-top: 40px;
`

const FilterWrap = styled.div`
	display: flex;
	flex-flow: row wrap;
	align-items: center;
`

const FilterSort = styled.div`
	flex: 0 1 auto;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	padding: 8px 0;
`

const PaginationWrap = styled.div`
	flex: 1 1 auto;
	padding: 8px 0;
`

const FilterInfo = styled.div`
	flex: 0 1 auto;
	padding: 8px 0;
`

const BoxGetMore = styled.div`
	background: linear-gradient(0deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.07)), #171717;
	border-radius: 8px;
	padding: 4px 12px;
`

const TextMore = styled.span`
	font-family: 'Mada';
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	color: #E1E3E0;
	display: inline-block;
	padding-right: 4px;
`

const TextMoreLink = styled.a`
	font-family: 'Mada';
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: 0.25px;
	color: #5484FF !important;
`

const TextSort = styled.span`
	font-family: 'Mada';
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: 0.1px;
	color: #BFC9C2;
	flex: 0 1 auto;
	padding-right: 12px;
`

const ButtonSort = styled.button`
	height: 29px;
	width: 29px;
	background: linear-gradient(0deg, rgba(255, 255, 255, 0.17), rgba(255, 255, 255, 0.17)), linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01)), #000000;
	border-radius: 38px;
	color: #E1E3E0;
	font-size: 14px;
	flex: 0 1 auto;
	border: none;
	border-radius: 8px;
	position: relative;
	padding: 2px 8px;

	& svg {
		transform: rotate(0deg);
		transition: .6s;
	}

	& svg.up {
		transform: rotate(180deg);
	}
`


export default mustBeAuthed(AccountPage);
