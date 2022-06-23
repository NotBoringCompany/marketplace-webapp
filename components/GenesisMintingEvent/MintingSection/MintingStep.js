import React from "react";
import { TextNormal } from "components/Typography/Texts";
import styled from "styled-components";

const MintingStepText = styled(TextNormal)`
	font-weight: 500;
	font-size: 17px;
	line-height: 21px;
	opacity: ${(props) => (props.active ? `1` : `55%`)};
	margin-bottom: 5px;
	max-width: 170px;
`;

const StepNumberContainer = styled.div`
	padding: 8px;
	width: 40px;
	height: 40px;
	border-radius: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: "Lexend";
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	color: #191c1b;
	opacity: ${(props) => (props.active ? `1` : `55%`)};
`;

const MintingStep = ({
	step = 1,
	stepText = "",
	className = "",
	active = false,
}) => {
	return (
		<div
			className={`d-flex flex-md-row flex-column align-items-center ${className}`}
		>
			<StepNumberContainer active={active ? 1 : 0} className="bg-whitePrimary ">
				{step}
			</StepNumberContainer>
			<MintingStepText active={active ? 1 : 0} className="text-white ms-md-2">
				{stepText}
			</MintingStepText>
		</div>
	);
};

export default MintingStep;
