import { useEffect } from "react";
import { useMoralis } from "react-moralis";

import Container from "react-bootstrap/Container";

import Layout from "components/Layout";
import styled from "styled-components";
import { useRouter } from "next/router";
import Loading from "components/Loading";
const StyledContainer = styled(Container)`
	padding-top: 32px;
	padding-bottom: 32px;
	min-height: 100vh;
`;

export default function Home() {
	const { isAuthenticated, user } = useMoralis();
	const router = useRouter();
	useEffect(() => {
		if (isAuthenticated) {
			router.push("/nbmons");
		} else {
			router.push("/connect");
		}
	}, [isAuthenticated]);

	return (
		<Layout>
			<StyledContainer>
				<Loading />
			</StyledContainer>
		</Layout>
	);
}
