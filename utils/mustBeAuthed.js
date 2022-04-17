import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import Loading from "components/Loading";
import styled from "styled-components";
import delay from "./delay";
const StyledContainer = styled.div`
	height: 100vh;
	display: flex;
	& div {
		width: 100%;
		margin: auto;
		height: 100%;
	}
`;

const NotAuthed = () => {
	const { isAuthenticated } = useMoralis();
	const router = useRouter();
	useEffect(() => {
		setTimeout(() => {
			if (!isAuthenticated) {
				router.push("/connect");
			}
		}, 500);
	}, []);

	return <></>;
};

const mustBeAuthed = (Component) => {
	const Authed = (props) => {
		const {
			isAuthenticated,
			isInitializing,
			isAuthenticating,
			isWeb3EnableLoading,
		} = useMoralis();
		const router = useRouter();
		const [wait, setWait] = useState(true);
		let description = "";
		let title = "";

		useEffect(() => {
			setTimeout(() => {
				setWait(false);
			}, 100);
		}, []);

		switch (router.pathname) {
			//for SEO in the future... :)
			default:
				description = "All of your NBMons and Artifacts";
		}

		if (isInitializing || isAuthenticating || isWeb3EnableLoading || wait) {
			return (
				<StyledContainer>
					<Loading />
				</StyledContainer>
			);
		}

		return <> {isAuthenticated ? <Component {...props} /> : <NotAuthed />}</>;
	};

	// Copy getInitial props so it will run as well
	if (Component.getInitialProps) {
		Authed.getInitialProps = Component.getInitialProps;
	}

	return Authed;
};

export default mustBeAuthed;
