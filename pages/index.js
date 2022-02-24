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
	const { isAuthenticated, user } = useMoralis();

	return (
		<Layout>
			<StyledContainer>
				<h2 className="text-white">
					Home.. you are {isAuthenticated ? `signed in` : `not signed in`}
				</h2>
			</StyledContainer>
		</Layout>
	);
}
