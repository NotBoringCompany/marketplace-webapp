import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import Loading from "components/Loading";
import styled from "styled-components";
const StyledContainer = styled.div`
	height: 100vh;
	display: flex;
	& div {
		width: 100%;
		margin: auto;
		height: 100%;
	}
`;
const mustBeAuthed = (Component) => {
	const Authed = (props) => {
		const { isAuthenticated, isInitializing } = useMoralis();
		const router = useRouter();
		const [redir, setRedir] = useState(false);

		let description = "";
		let title = "";
		switch (router.pathname) {
			//for SEO in the future... :)
			default:
				description = "All of your NBMons and Artifacts";
		}

		if (isInitializing) {
			return (
				<StyledContainer>
					<Loading />
				</StyledContainer>
			);
		}
		if (!isInitializing) {
			// If user is not logged in, return login component
			if (!isAuthenticated) {
				setTimeout(() => {
					router.replace("/connect");
				}, 100);
			} else {
				return <Component {...props} />;
			}
			// If user is logged in, return original component
		}
		return null;
	};

	// Copy getInitial props so it will run as well
	if (Component.getInitialProps) {
		Authed.getInitialProps = Component.getInitialProps;
	}

	return Authed;
};

export default mustBeAuthed;
