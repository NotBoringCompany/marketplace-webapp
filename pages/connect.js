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

import NBMons from "../public/images/nbmons.png";

const StyledContainer = styled(Container)`
	padding-top: 32px;
	padding-bottom: 32px;
	min-height: 100vh;
`;

const Connect = () => {
	return (
		<Layout showMonsters title="Connect | Realm Hunter">
			<StyledContainer className="bg-primary d-flex flex-column justify-content-center position-relative">
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
						<MyButton text="Connect with Metamask" variant="secondary" />

						<TextPrimary className="my-5 text-center text-lg-start text-white">
							or
						</TextPrimary>
						<SignInBox />
					</Col>
				</Row>
			</StyledContainer>
		</Layout>
	);
};

export default Connect;
