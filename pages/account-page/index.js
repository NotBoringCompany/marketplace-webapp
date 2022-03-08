import { useState } from "react";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";

import Layout from "components/Layout";
import MyButton from "components/Buttons/Button";

import styled from "styled-components";
import mustBeAuthed from "utils/mustBeAuthed";

import GenusFilter from "components/Filters/GenusFilter";
import TypesFilter from "components/Filters/TypesFilter";
import SpeciesFilter from "components/Filters/SpeciesFilter";
import GenderFilter from "components/Filters/GenderFilter";
import RarityFilter from "components/Filters/RarityFilter";
import MutationFilter from "components/Filters/MutationFilter";
import FertilityFilter from "components/Filters/FertilityFilter";

import { HeadingSM, HeadingXXS } from "components/Typography/Headings";
import PriceRangeFilter from "components/Filters/PriceRangeFilter";

import { mediaBreakpoint, size } from "utils/breakpoints";

import { useWindowSize } from "utils/useWindowSize";

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
	width: 25%;
	z-index: 1;
	position: absolute;
	padding: 24px;
	& > * {
		margin-top: 16px;
	}

	transition: all 300ms;

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
const AccountPage = () => {
	const { isAuthenticated, user, logout } = useMoralis();
	const router = useRouter();
	const [filterOpen, setFilterOpen] = useState(false);
	const [opacityOne, setOpacityOne] = useState(false);

	const { width } = useWindowSize();
	const isMobile = width < size.extraLarge;

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
			<DesktopFilterContainer
				open={filterOpen}
				className={`bg-primary3 ${filterOpen && `show`} ${
					opacityOne && `opacityOne`
				}`}
			>
				<HeadingXXS as="p" className="mb-3 text-white text-center">
					Filters
				</HeadingXXS>
				<GenusFilter />
				<TypesFilter />
				<SpeciesFilter />
				<GenderFilter />
				<RarityFilter />
				<MutationFilter />
				<FertilityFilter />
				<PriceRangeFilter />
				<MyButton
					className="d-xl-none d-block"
					variant="outline-secondary"
					text="Apply"
					onClick={handleFilterButton}
				/>
			</DesktopFilterContainer>

			<StyledContainer>
				<div className="d-flex align-items-center justify-content-between">
					<HeadingSM as="h1" className="text-white">
						Account Page.. you are{" "}
						{isAuthenticated ? `signed in` : `not signed in`}
					</HeadingSM>
					<MyButton
						variant="outline-secondary"
						className="d-block d-xl-none"
						text="Filter"
						onClick={handleFilterButton}
					/>
				</div>

				<hr />
				<h3 className="text-white">
					Here, all of your NBMons will be displayed
					<hr />
				</h3>
				{isAuthenticated && (
					<p className="text-white">
						Wallet Address:{" "}
						{user.attributes.ethAddress &&
							user.attributes.ethAddress.toUpperCase()}
						<br />
						<hr />
						Linked email:{" "}
						{user.attributes.email ? user.attributes.email : "None"}
					</p>
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
