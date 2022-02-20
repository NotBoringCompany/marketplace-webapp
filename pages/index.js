import { useEffect } from "react";
import { useMoralis } from "react-moralis";

import Container from "react-bootstrap/Container";

import Layout from "components/Layout";
import styled from "styled-components";

const StyledContainer = styled(Container)`
	padding-top: 32px;
	padding-bottom: 32px;
	min-height: 100vh;
`;

export default function Home() {
	const { isAuthenticated, account, user } = useMoralis();

	useEffect(() => {
		user && console.log(user.attributes);
	}, [user]);

	return (
		<Layout>
			<StyledContainer>
				<h2 className="text-white">
					Home.. you are {isAuthenticated ? `signed in` : `not signed in`}
				</h2>

				{isAuthenticated && (
					<p className="text-white">
						Wallet Address: {user.attributes.ethAddress.toUpperCase()}
						<br />
						<hr />
						Linked email:{" "}
						{user.attributes.email ? user.attributes.email : "None."}
					</p>
				)}
			</StyledContainer>
		</Layout>
	);
}
