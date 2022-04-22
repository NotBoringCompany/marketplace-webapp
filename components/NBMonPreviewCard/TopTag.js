import React from "react";
import styled from "styled-components";
import { TextSecondary } from "components/Typography/Texts";

const Container = styled.div`
	border-bottom-left-radius: 14px;
	border-bottom-right-radius: 14px;
	background: ${(props) => (props.background ? props.background : `#464646`)};
	position: absolute;
	left: 50%;
	top: 0;
	transform: translateX(-50%);
	padding: 4px 8px;
`;

const StyledTextSecondary = styled(TextSecondary)`
	font-size: 14px;
	font-weight: 500;
`;
const TopTag = ({ background, text }) => {
	return (
		<Container background={background}>
			<StyledTextSecondary className="text-white">{text}</StyledTextSecondary>
		</Container>
	);
};

export default TopTag;
