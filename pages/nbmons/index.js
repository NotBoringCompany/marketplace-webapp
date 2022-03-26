import { useEffect } from "react";

import { useState } from "react";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";

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

import { replaceDummy } from "utils/replaceDummyNBmonAPIValue";

const StyledContainer = styled.div`
	padding: 32px;
	min-height: 100vh;
	padding-left: calc(22% + 32px);

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
	max-height: 100vh;
	height: 100vh;
	overflow: auto;
	overflow-x: hidden;
	width: 22%;
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
			className={`bg-primary3 ${filterOpen && `show`} ${
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
	const logout = useMoralis().logout;
	const user = useMoralis().user;
	const router = useRouter();
	const [filterOpen, setFilterOpen] = useState(false);
	const [opacityOne, setOpacityOne] = useState(false);
	const [allNBMons, setAllNBMons] = useState([]);
	const [allFilteredNBMons, setAllFilteredNBMons] = useState([]);
	const { selectedFilters, rangeFilters } = useFilterStore();

	const { isFetching, error } = useQuery(
		"allMyNBMons",
		() =>
			fetch(
				`${process.env.NEXT_PUBLIC_REST_API_PREFIX_URL}/getOwnerNBMons?_ApplicationId=VWnxCyrXVilvNWnBjdnaJJdQGu7QzN4lJeu1teyg&address=${user.attributes.ethAddress}`
			).then(async (res) => {
				let fetchedData = await res.json();
				fetchedData = replaceDummy(fetchedData);
				console.log(fetchedData);
				setAllNBMons(
					fetchedData.result.sort(
						(a, b) => parseInt(a.nbmonId) - parseInt(b.nbmonId)
					)
				);
			}),
		{ refetchOnWindowFocus: false }
	);

	useEffect(() => {
		if (!isFetching) {
			const filtered = filterNBMons(selectedFilters, rangeFilters, allNBMons);
			setAllFilteredNBMons(
				filtered.sort((a, b) => parseInt(a.nbmonId) - parseInt(b.nbmonId))
			);
		}
	}, [selectedFilters, rangeFilters, isFetching, allNBMons]);

	const handleLogOut = async () => {
		await logout();
		router.replace("/connect");
	};

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
					<HeadingXXS as="h1" className="text-white mb-3">
						{allFilteredNBMons.length} NBMons
					</HeadingXXS>
				)}

				<Row>
					{!isFetching ? (
						<>
							{allFilteredNBMons.map((nbMon) => (
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

				{!isFetching &&
					Object.keys(selectedFilters).length > 0 &&
					allFilteredNBMons.length < 1 && (
						<TextPrimary className="mt-4 text-white text-center">
							No Result 🙈
						</TextPrimary>
					)}

				<MyButton
					text="Sign Out"
					onClick={handleLogOut}
					className="w-100 mt-5"
				/>
			</StyledContainer>
		</Layout>
	);
};

export default mustBeAuthed(AccountPage);