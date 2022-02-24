import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";

import Container from "react-bootstrap/Container";

import Layout from "components/Layout";
import MyButton from "components/Buttons/Button";

import styled from "styled-components";

const StyledContainer = styled(Container)`
	padding-top: 32px;
	padding-bottom: 32px;
	min-height: 100vh;
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

export default AccountPage;
