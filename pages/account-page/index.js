import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";

import Layout from "components/Layout";
import MyButton from "components/Buttons/Button";
import CollapseFilter from "components/CollapseFilter";

import styled from "styled-components";
import mustBeAuthed from "utils/mustBeAuthed";

import GenusFilter from "components/Filters/GenusFilter";
import TypesFilter from "components/Filters/TypesFilter";

const StyledContainer = styled.div`
	padding: 32px;
	min-height: 100vh;
	padding-left: calc(20% + 32px);
`;
const DesktopFilterContainer = styled.div`
	display: flex;
	flex-direction: column;
	max-height: 100vh;
	height: 100vh;
	overflow: auto;
	width: 20%;
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
				<GenusFilter />
				<TypesFilter />
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
