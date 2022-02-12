import { useContext, useEffect } from "react";
import { useMoralis } from "react-moralis";

import Container from "react-bootstrap/Container";

import AppContext from "context/AppContext";
import Layout from "components/Layout";
import styled from "styled-components";

const StyledContainer = styled(Container)`
	padding-top: 32px;
	padding-bottom: 32px;
	min-height: 100vh;
`;

export default function Home() {
	const { isAuthenticated } = useMoralis();
	const { web3 } = useContext(AppContext);

	useEffect(() => {
		console.log(web3);
	}, [web3]);

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
