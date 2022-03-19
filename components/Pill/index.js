import React from "react";
import styled from "styled-components";

const StyledPill = styled.div`
	padding: 4px 16px;
	border-radius: 48px;
	text-transform: capitalize;
	background: blue;
	min-width: 72px;
	text-align: center;
	font-weight: 600;
	font-size: 14px;
	&.common {
		background: #808080;
	}

	&.origin {
		background: linear-gradient(180deg, #fa13ff 0%, #62298f 100%);
		filter: drop-shadow(0px 0px 9px #ff1ee8);
	}
	&.mutate {
		max-width: 120px;
		padding: 4px 16px;
		background: #000;
	}
`;
const Pill = ({ content }) => {
	return (
		<StyledPill
			className={`${content} mx-1 ${
				content.toLowerCase().includes("mutate") && `mutate mt-1 mx-auto`
			}`}
		>
			{content}
		</StyledPill>
	);
};

export default Pill;
