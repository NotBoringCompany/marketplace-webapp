import React from "react";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
const StyledButton = styled(Button)`
	box-shadow: 0px 5px 4px rgba(173, 173, 173, 0.25);
	padding: 8px 24px;
	border-radius: 0%;
`;
const StyledP = styled.p`
	font-family: "Mada";
	font-weight: 600;
	font-size: 18px;
`;
const MyButton = ({
	text,
	onClick,
	variant = "secondary",
	className,
	...props
}) => {
	let textColor = "text-light";
	if (variant && variant.includes("outline-"))
		textColor = variant.split("-")[0];
	return (
		<StyledButton
			variant={variant}
			onClick={onClick}
			className={className}
			{...props}
		>
			<StyledP className={textColor}>{text}</StyledP>
		</StyledButton>
	);
};

export default MyButton;
