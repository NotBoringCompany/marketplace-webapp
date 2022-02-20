import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Layout from "./Layout";
const StyledContainer = styled.div`
	height: 100vh;
	display: flex;
`;
import { TextPrimary } from "./Typography/Texts";
const Loading = () => {
	return (
		<StyledContainer className="bg-primary">
			<TextPrimary className="text-white m-auto">Loading...</TextPrimary>
		</StyledContainer>
	);
};

export default Loading;