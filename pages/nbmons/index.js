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
import NBMonPreviewCard from "components/NBMonPreviewCard";
import { TextPrimary } from "components/Typography/Texts";
import Loading from "components/Loading";

import { useFilterStore } from "stores/filterStore";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import { replaceDummy } from "utils/replaceDummyNBmonAPIValue";

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
	width: 24%;
	z-index: 1;
	position: absolute;
	padding: 24px;
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

const Filters = ({ filterOpen, opacityOne, handleFilterButton }) => {
	const clearFilter = useFilterStore((state) => state.clearFilter);
	return (
		<DesktopFilterContainer
			className={`bg-primaryComplement ${filterOpen && `show`} ${
				opacityOne && `opacityOne`
			}`}
		>
			<div className="d-flex mb-4 justify-content-center">
				<HeadingXXS as="p" className="ms-auto text-white text-center">
					Filters
				</HeadingXXS>
				<ClearFilterButton className="mt-1 ms-auto" onClick={clearFilter}>
					<HeadingSuperXXS as="p">Clear</HeadingSuperXXS>
				</ClearFilterButton>
			</div>
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

	const [filterOpen, setFilterOpen] = useState(false);
	const [opacityOne, setOpacityOne] = useState(false);
	const [allNBMons, setAllNBMons] = useState([]);
	const [page, setPage] = useState({
		show: 12,
		current: 0,
		totalPage: null,
	});
	const [allFilteredNBMons, setAllFilteredNBMons] = useState([]);
	const [shownNBMons, setshownNBMons] = useState([]);
	const { selectedFilters, rangeFilters } = useFilterStore();
	const { show, current, totalPage } = page;

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
				`${process.env.NEXT_PUBLIC_REST_API_PREFIX_URL}/getOwnerNBMons?_ApplicationId=VWnxCyrXVilvNWnBjdnaJJdQGu7QzN4lJeu1teyg&address=${user.attributes.ethAddress}`
			).then(async (res) => {
				let fetchedData = await res.json();
				fetchedData = replaceDummy(fetchedData);
				setAllNBMons(
					fetchedData.result.sort(
						(a, b) => parseInt(a.nbmonId) - parseInt(b.nbmonId)
					)
				);
				setPage({
					...page,
					totalPage: totalPageCounter(fetchedData.result.length, show) - 1, // first page is page 0.,
				});
			}),
		{ refetchOnWindowFocus: false }
	);

	useEffect(() => {
		if (!isFetching) {
			const filtered = filterNBMons(selectedFilters, rangeFilters, allNBMons);
			setAllFilteredNBMons(
				filtered.sort((a, b) => parseInt(a.nbmonId) - parseInt(b.nbmonId))
			);
			setPage({
				...page,
				current: 0,
				totalPage: totalPageCounter(filtered.length, show) - 1, // first page is page 0.,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedFilters, rangeFilters, isFetching, allNBMons]);

	useEffect(() => {
		setshownNBMons(allFilteredNBMons.slice(0, show)); // these r the nbmons that are shown in THAT page.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allFilteredNBMons]);

	useEffect(() => {
		if (current === 1) {
			setshownNBMons(allFilteredNBMons.slice(show, show + show));
		} else {
			//2 and above
			setshownNBMons(
				allFilteredNBMons.slice(show * current, show * (current + 1))
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

		if (current !== totalPage) {
			setPage({ ...page, current: current + 1 });
		}
	};
	const handleBackbtn = () => {
		if (totalPage === 0 || !totalPage || totalPage < 0) {
			return;
		}

		if (current <= totalPage && current > 0) {
			setPage({ ...page, current: current - 1 });
		}
	};

	return (
		<Layout title="Account Page | Realm Hunter" showSubnav>
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
					<div className="d-flex align-items-center mb-5">
						<HeadingXXS as="h1" className="text-white ">
							{allFilteredNBMons.length} NBMons
						</HeadingXXS>
						{totalPage >= 0 && (
							<div className="pagingContainer d-flex mx-auto align-items-center">
								<FaChevronLeft className="text-white" onClick={handleBackbtn} />
								<HeadingSuperXXS className="text-white mx-3">
									{current + 1} of {totalPage + 1}
								</HeadingSuperXXS>
								<FaChevronRight
									className="text-white"
									onClick={handleNextBtn}
								/>
							</div>
						)}
					</div>
				)}

				<Row>
					{!isFetching ? (
						<>
							{shownNBMons.map((nbMon) => (
								<Col
									key={nbMon.nbmonId}
									className="mb-4"
									xl={3}
									lg={4}
									md={6}
									sm={12}
								>
									{" "}
									<Link href={`/nbmons/${nbMon.nbmonId}`}>
										<a>
											<NBMonPreviewCard nbMon={nbMon} />
										</a>
									</Link>
								</Col>
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

export default mustBeAuthed(AccountPage);
