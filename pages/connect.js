import React from "react";
import Layout from "components/Layout";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

import { HeadingSM } from "components/Typography/Headings";
import { TextPrimary } from "components/Typography/Texts";

import MyButton from "components/Buttons/Button";

import SignInBox from "../components/SignIn/SignInBox";

const StyledContainer = styled(Container)`
	padding-top: 32px;
	padding-bottom: 32px;
	min-height: 100vh;
`;

const Connect = () => {
	return (
		<Layout title="Connect | Realm Hunter">
			<StyledContainer className="bg-primary d-flex flex-column justify-content-center">
				<Row>
					<Col xl={6} lg={6} md={12}>
						<MyButton
							variant="outline-secondary"
							text="Back to Marketplace"
							isLink
							to="/"
						/>
					</Col>
					<Col xl={6} lg={6} md={12}>
						<HeadingSM as="h1" className="text-white">
							Connect
						</HeadingSM>
						<TextPrimary className="mt-3 mb-5 text-white">
							Join our Marketplace by connecting your wallet.
						</TextPrimary>
						<MyButton text="Connect with Metamask" variant="secondary" />

						<TextPrimary className="my-5 text-white">or</TextPrimary>
						<SignInBox />
					</Col>
				</Row>
			</StyledContainer>
		</Layout>
	);
};

export default Connect;
