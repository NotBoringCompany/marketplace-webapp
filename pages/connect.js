import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

import Layout from "components/Layout";
import { HeadingSM } from "components/Typography/Headings";
import { TextPrimary } from "components/Typography/Texts";
import MyButton from "components/Buttons/Button";
import NoMetaMask from "components/Modal/NoMetaMask";
import SignInBox from "components/SignIn/SignInBox";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styled from "styled-components";

import mustBeUnauthed from "utils/mustBeUnauthed";
import { validEmail } from "utils/validEmail";
import { whitespace } from "utils/whitespace";

const StyledContainer = styled(Container)`
	padding-top: 32px;
	padding-bottom: 32px;
	min-height: 100vh;
`;

const Connect = () => {
	const {
		authenticate,
		isAuthenticated,
		isAuthenticating,
		// isWeb3Enabled,
		// enableWeb3,
		hasAuthError,
		login,
		authError,
	} = useMoralis();

	const [triedAuth, setTriedAuth] = useState(false);
	const [showModalNoMM, setShowModalNoMM] = useState(false);
	const [authDetail, setAuthDetail] = useState({
		email: "",
		password: "",
		validationErrors: { email: "", password: "" },
	});

	const { email, password, validationErrors } = authDetail;

	const statesModalNoMM = { getter: showModalNoMM, setter: setShowModalNoMM }; // getter + setter

	// useEffect(() => {
	// 	console.log(isWeb3Enabled);
	// }, [isWeb3Enabled, isAuthenticated, enableWeb3]);

	useEffect(() => {
		if (hasAuthError && triedAuth) {
			//TODO, refactor the below...
			if (authError.message === "Non ethereum enabled browser")
				setShowModalNoMM(true);
			else if (
				authError.message !==
				"MetaMask Message Signature: User denied message signature."
			) {
				alert(
					"Sorry, an unexpected error occured. Please try again, preferably with a different browser."
				);
			}

			console.log("Error:", authError.message);
		}
	}, [hasAuthError, triedAuth]);

	const handleInputChange = (e) => {
		setAuthDetail({ ...authDetail, [e.target.name]: e.target.value });
	};

	const authCrypto = async () => {
		setTriedAuth(true);
		await authenticate({ provider: "metamask" });
	};

	const authNonCrypto = async (e) => {
		e.preventDefault();
		// login(email, password);

		if (validEmail(email) && !whitespace(password)) {
			setAuthDetail({
				...authDetail,
				validationErrors: {
					password: "",
					email: "",
				},
			});
			login(email, password);
			return;
		}

		setAuthDetail({
			...authDetail,
			validationErrors: {
				password: !whitespace(password) ? "" : "Please enter a valid password!",
				email: validEmail(email) ? "" : "Please enter a valid email!",
			},
		});
	};

	if (isAuthenticated) return <p>Authenticated</p>;

	return (
		<Layout showMonsters title="Connect | Realm Hunter">
			<StyledContainer className="bg-primary d-flex flex-column justify-content-center position-relative">
				<NoMetaMask stateUtils={statesModalNoMM} />
				<Row>
					<Col
						xl={6}
						lg={6}
						md={12}
						className="d-flex d-lg-block justify-content-center"
					>
						<MyButton
							variant="outline-secondary"
							text="Back to Marketplace"
							isLink
							backIcon
							to="/"
						/>
					</Col>
					<Col
						className="mt-5 mt-lg-0 d-flex flex-column d-lg-block align-content-center"
						xl={6}
						lg={6}
						md={12}
					>
						<HeadingSM as="h1" className="text-center text-lg-start text-white">
							Connect
						</HeadingSM>
						<TextPrimary className="text-center text-lg-start mt-3 mb-5 text-white">
							Join our Marketplace by connecting your wallet.
						</TextPrimary>

						<MyButton
							text={
								!isAuthenticating ? "Connect with Metamask" : "Connecting..."
							}
							variant="secondary"
							onClick={authCrypto}
							disabled={isAuthenticating}
						/>

						<TextPrimary className="my-5 text-center text-lg-start text-white">
							or
						</TextPrimary>
						<SignInBox
							isAuthenticating={isAuthenticating}
							auth={authNonCrypto}
							authDetail={authDetail}
							onTextInputChange={handleInputChange}
						/>
					</Col>
				</Row>
			</StyledContainer>
		</Layout>
	);
};

export default mustBeUnauthed(Connect);
