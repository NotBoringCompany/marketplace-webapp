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

import { HeadingXXS } from "components/Typography/Headings";
import PriceRangeFilter from "components/Filters/PriceRangeFilter";

const StyledContainer = styled.div`
	padding: 32px;
	min-height: 100vh;
	padding-left: calc(25% + 32px);
`;
const DesktopFilterContainer = styled.div`
	display: flex;
	flex-direction: column;
	max-height: 100vh;
	height: 100vh;
	overflow: auto;
	width: 25%;
	position: absolute;
	padding: 24px;
	transition: all 300ms;
	& > * {
		margin-top: 16px;
	}
`;
const AccountPage = () => {
	const { isAuthenticated, user, logout } = useMoralis();
	const router = useRouter();

	const handleLogOut = async () => {
		await logout();

		router.replace("/connect");
	};
	return (
		<Layout title="Account Page | Realm Hunter" showSubnav>
			<DesktopFilterContainer className="bg-primary3">
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
			</DesktopFilterContainer>

			<StyledContainer>
				<h2 className="text-white">
					Account Page.. you are{" "}
					{isAuthenticated ? `signed in` : `not signed in`}
				</h2>
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
