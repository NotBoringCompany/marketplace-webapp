import React from "react";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
const StyledButton = styled(Button)`
	box-shadow: 0px 5px 4px rgba(173, 173, 173, 0.25);
	padding: 16px 32px;
	border-radius: 0%;
`;
const StyledP = styled.p`
	font-family: "Mada";
	font-weight: 600;
`;
const MyButton = ({ text, onClick, className, ...props }) => {
	const { variant } = props;
	let textColor = "text-light";
	if (variant.includes("outline-")) textColor = variant.split("-")[0];
	return (
		<StyledButton onClick={onClick} className={className} {...props}>
			<StyledP className={textColor}>text</StyledP>
		</StyledButton>
	);
};

export default MyButton;
