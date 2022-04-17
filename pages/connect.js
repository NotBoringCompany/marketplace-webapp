import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

import Layout from "components/Layout";
import MetamaskButton from "components/Buttons/MetamaskButton";
import SignInBox from "components/SignIn/SignInBox";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styled from "styled-components";

import mustBeUnauthed from "utils/mustBeUnauthed";
import { validEmail } from "utils/validEmail";
import { whitespace } from "utils/whitespace";
import Image from "next/image";

const StyledContainer = styled(Container)`
	padding-top: 32px;
	padding-bottom: 32px;
	min-height: 100vh;
`;

const Connect = () => {
	const { isAuthenticated, isAuthenticating, hasAuthError, login, authError } =
		useMoralis();

	const [authDetail, setAuthDetail] = useState({
		email: "",
		password: "",
		errors: { email: "", password: "", authFailedMessage: "" },
	});

	const { email, password, errors } = authDetail;

	useEffect(() => {
		if (hasAuthError) {
			// console.log("Error:", authError.message);
			if (authError.message === "Invalid username/password.") {
				setAuthDetail({
					...authDetail,
					errors: {
						...errors,
						authFailedMessage:
							"Oops, sorry, your email / password was incorrect. Please double-check your credentials.",
					},
				});
				return;
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasAuthError]);

	const handleInputChange = (e) => {
		setAuthDetail({ ...authDetail, [e.target.name]: e.target.value });
	};

	const authNonCrypto = async (e) => {
		e.preventDefault();
		// login(email, password);

		if (validEmail(email) && !whitespace(password)) {
			setAuthDetail({
				...authDetail,
				errors: {
					password: "",
					email: "",
				},
			});
			login(email, password);
			return;
		}

		setAuthDetail({
			...authDetail,
			errors: {
				password: !whitespace(password) ? "" : "Please enter a valid password!",
				email: validEmail(email) ? "" : "Please enter a valid email!",
			},
		});
	};

	if (isAuthenticated) return <p>Authenticated</p>;

	return (
		<Layout title="Connect | Realm Hunter">
			<StyledContainer className="bg-primary d-flex flex-column justify-content-center position-relative">
				<Row>
					{/* <Col
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
					</Col> */}

					<Col
						className="mt-5 mt-lg-0 d-flex flex-column align-items-center"
						xl={12}
					>
						<Image
							src='/images/logo.png'
							width={77.12}
							height={69.29}
						/>

						<TitleConnect className="text-center text-lg-start text-white">
							Connect
						</TitleConnect>

						<DescriptionConnect>Join our Marketplace by connecting your wallet.</DescriptionConnect>

						<MetamaskButton big />

						<TextOr>
							or
						</TextOr>

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

const TitleConnect = styled.h1`
	font-family: 'Mada';
	font-style: normal;
	font-weight: 400;
	font-size: 32px;
	line-height: 40px;
	color: #E1E3E0;
	margin-top: 34px;
	margin-bottom: 0;
`

const DescriptionConnect = styled.p`
	margin: 0;
	font-family: 'Mada';
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	letter-spacing: 0.5px;
	color: #E1E3E0;
	margin-bottom: 35px;
	text-align: center;
`

const TextOr = styled.span`
	font-family: 'Mada';
	font-style: normal;
	font-weight: 400;
	font-size: 22px;
	line-height: 28px;
	display: block;
	text-align: center;
	color: #FFFFFF;
	margin: 32px 0;
`

export default mustBeUnauthed(Connect);