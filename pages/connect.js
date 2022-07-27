import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useMoralis } from "react-moralis";

import AppContext from "context/AppContext";
import Layout from "components/Layout";
import { HeadingSM } from "components/Typography/Headings";
import { TextPrimary } from "components/Typography/Texts";
import MetamaskButton from "components/Buttons/MetamaskButton";
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
	background: #1d1d1d;
`;

const Connect = () => {
	const { isAuthenticated, isAuthenticating, hasAuthError, login, authError } =
		useMoralis();
	const { statesSwitchModal } = useContext(AppContext);

	const router = useRouter();

	const [authDetail, setAuthDetail] = useState({
		email: "",
		password: "",
		errors: { email: "", password: "", authFailedMessage: "" },
	});

	const [resetPasswordToken, setResetPasswordToken] = useState("");

	const { email, password, errors } = authDetail;

	const { query } = router;

	useQuery(
		"tokenCheck",
		() =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/account/password-token-check/${resetPasswordToken}`
			),
		{
			onSuccess: async (response) => {
				const res = await response.json();
				if (response.ok) {
					statesSwitchModal.setter({
						show: true,
						content: "resetPassword",
						tokenId: resetPasswordToken,
					});
					return;
				} else {
					if (res.valid === false) {
						statesSwitchModal.setter({
							show: true,
							content: "txError",
							detail: {
								title: "Error",
								text: "This password reset link doesn't \n exist or has expired. \n\n Please feel free to request a \n new one if you need to.",
							},
						});
					} else {
						console.log("TOKEN CHECK ERROR", res);
						statesSwitchModal.setter({
							show: true,
							content: "txError",
							detail: {
								title: "Error",
								text: "An unexpected error occured when trying to process your reset \n password URL. \n\n Please refrresh this page and \n try again. (400)",
							},
						});
					}
				}
			},
			onError: (_) => {
				statesSwitchModal.setter({
					show: true,
					content: "txError",
					detail: {
						title: "Error",
						text: "An unexpected error occured when trying to process your reset \n password URL. \n\n Please refrresh this page and \n try again.",
					},
				});
			},
			retry: 1,
			enabled: resetPasswordToken.length > 0,
			refetchOnWindowFocus: false,
		}
	);

	useEffect(() => {
		console.log("ROUTER", router);
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

	useEffect(() => {
		//We know for sure rtk will be of length 300 chars
		if (query.rtk && query.rtk.length === 300) {
			setResetPasswordToken(query.rtk);
		}
	}, [query]);

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
		<Layout showMonsters title="Connect | Realm Hunter">
			<StyledContainer className="d-flex flex-column justify-content-center position-relative">
				<Row>
					<Col
						className="mt-5 mt-lg-0 d-flex flex-column align-items-center"
						xl={12}
					>
						<HeadingSM as="h1" className="text-center text-lg-start text-white">
							Connect
						</HeadingSM>
						<TextPrimary className="text-center text-lg-start mt-3 mb-4 text-white">
							Join our Marketplace by connecting your wallet.
						</TextPrimary>
						<MetamaskButton big />
						<TextPrimary className="my-4 text-center text-lg-start text-white">
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
