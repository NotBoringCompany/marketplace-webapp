import React from "react";
import styled from "styled-components";
import { Image } from "react-bootstrap";
const StyledContainer = styled.div`
	display: flex;

	& img {
		width: 180px;
		height: 180px;
		margin: auto;
	}
`;
import { TextPrimary } from "./Typography/Texts";
const Loading = () => {
	return (
		<StyledContainer className="bg-primary">
			{/* <TextPrimary className="text-white m-auto">Loading...</TextPrimary> */}
			<Image
				src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/loading_anim.svg`}
				alt="loading"
			/>
		</StyledContainer>
	);
};

export default Loading;
