import { useEffect } from "react";

import { useState } from "react";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";

import { useQuery } from "react-query";

import Layout from "components/Layout";
import MyButton from "components/Buttons/Button";

import styled from "styled-components";
import mustBeAuthed from "utils/mustBeAuthed";
import filterNBMons from "utils/filterNBMons";

import GenusFilter from "components/Filters/GenusFilter";
import TypesFilter from "components/Filters/TypesFilter";
import FertilityFilter from "components/Filters/FertilityFilter";

import { HeadingXXS } from "components/Typography/Headings";

import { mediaBreakpoint } from "utils/breakpoints";
import CheckBoxFilters from "components/Filters/CheckBoxFilters";
import NBMonPreviewCard from "components/NBMonPreviewCard";
import { TextPrimary } from "components/Typography/Texts";
import Loading from "components/Loading";

import { useFilterStore } from "stores/filterStore";

const StyledContainer = styled.div`
	padding: 32px;
	min-height: 100vh;
	padding-left: calc(25% + 32px);

	@media ${mediaBreakpoint.down.xl} {
		padding: 32px;
	}
`;
const DesktopFilterContainer = styled.div`
	display: flex;
	flex-direction: column;
	max-height: 100vh;
	height: 100vh;
	overflow: auto;
	overflow-x: hidden;
	width: 25%;
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
		height: auto;
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

const Filters = ({ filterOpen, opacityOne, handleFilterButton }) => {
	const clearFilter = useFilterStore((state) => state.clearFilter);

	return (
		<DesktopFilterContainer
			className={`bg-primary3 ${filterOpen && `show`} ${
				opacityOne && `opacityOne`
			}`}
		>
			<HeadingXXS as="p" className="mb-3 text-white text-center">
				Filters
			</HeadingXXS>
			<button onClick={clearFilter}>clearfilter</button>
			<GenusFilter />
			<TypesFilter />
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

const GalleryContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 24px;
`;

const AccountPage = () => {
	const { isAuthenticated, user, logout } = useMoralis();
	const router = useRouter();
	const [filterOpen, setFilterOpen] = useState(false);
	const [opacityOne, setOpacityOne] = useState(false);
	const [allNBMons, setAllNBMons] = useState([]);
	const [allFilteredNBMons, setAllFilteredNBMons] = useState([]);
	const { selectedFilters, rangeFilters } = useFilterStore();

	const { isLoading, error } = useQuery("allMyNBMons", () =>
		fetch("https://run.mocky.io/v3/822bd2f3-47fc-476a-8022-40d1698a8e74").then(
			async (res) => {
				const fetchedData = await res.json();
				setAllNBMons(fetchedData.result);
			}
		)
	);

	useEffect(() => {
		if (!isLoading) {
			const filtered = filterNBMons(selectedFilters, rangeFilters, allNBMons);
			setAllFilteredNBMons(filtered);
		}
	}, [selectedFilters, rangeFilters, isLoading]);

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
				<div className="d-flex align-items-center justify-content-between">
					<MyButton
						variant="outline-secondary"
						className="d-block d-xl-none"
						text="Filter"
						onClick={handleFilterButton}
					/>
				</div>

				<GalleryContainer className="mt-4">
					{!isLoading ? (
						<>
							{allFilteredNBMons.map((nbMon) => (
								<NBMonPreviewCard nbMon={nbMon} key={nbMon.nbmonId} />
							))}
						</>
					) : (
						<Loading />
					)}
				</GalleryContainer>

				{error && (
					<TextPrimary className="mt-4 text-white text-center">
						An error occured while fetching your NBMons. Please refresh this
						page.
					</TextPrimary>
				)}

				{!isLoading &&
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
