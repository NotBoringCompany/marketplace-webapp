import React from "react";
import styled from "styled-components";
import { TextSecondary } from "components/Typography/Texts";

const Container = styled.div`
	transform: rotate(270deg);
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	background: ${(props) => (props.background ? props.background : `#464646`)};
	position: absolute;

	top: 30%;
	left: calc(0% - 29px);
	padding: 4px 8px;
`;
const GenesisTag = ({ background }) => {
	return (
		<Container background={background}>
			<TextSecondary className="text-white text-bold">GENESIS</TextSecondary>
		</Container>
	);
};

export default GenesisTag;
