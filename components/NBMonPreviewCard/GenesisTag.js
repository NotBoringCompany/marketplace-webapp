import React from "react";
import styled from "styled-components";
import { TextSecondary } from "components/Typography/Texts";

const Container = styled.div`
	transform: rotate(270deg);
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	background: #464646;
	position: absolute;
	top: 25%;
	left: calc(0% - 21px);
	padding: 4px 8px;
`;
const GenesisTag = () => {
	return (
		<Container>
			<TextSecondary className="text-white">GENESIS</TextSecondary>
		</Container>
	);
};

export default GenesisTag;
