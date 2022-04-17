import React from "react";
import styled from "styled-components";
import MyButton from "./Button";

const StyledButton = styled(MyButton)`
	border-radius: 100px;
	background: linear-gradient(
			0deg,
			rgba(255, 255, 255, 0.12),
			rgba(255, 255, 255, 0.12)
		),
		linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01)),
		#000000;
	& p {
		color: #bfc9c2 !important;
		font-size: 16px !important;
		font-weight: 400;
		margin-top: 1px;
		line-height: 16px;
	}
`;

const NewButton = ({ ...props }) => {
	return <StyledButton {...props} variant={"primary"} />;
};

export default NewButton;
