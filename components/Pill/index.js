import React from "react";
import styled from "styled-components";

const StyledPill = styled.div`
	padding: 4px 16px;
	border-radius: 48px;
	text-transform: capitalize;
	background: blue;
	min-width: 72px;
	text-align: center;

	&.common {
		background: #808080;
	}

	&.origin {
		background: linear-gradient(180deg, #fa13ff 0%, #62298f 100%);
		filter: drop-shadow(0px 0px 9px #ff1ee8);
	}
`;
const Pill = ({ content }) => {
	return <StyledPill className={`${content} mx-1`}>{content}</StyledPill>;
};

export default Pill;
