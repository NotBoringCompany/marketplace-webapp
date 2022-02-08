import React from "react";
import FormControl from "react-bootstrap/FormControl";
import styled from "styled-components";
const StyledFormControl = styled(FormControl)`
	border-radius: 0%;
	padding: 16px;
	background: ${(props) => (props.variant === "light" ? `#fff` : `#212121`)};
	border: 2px solid rgba(176, 176, 176, 0.35);
	color: ${(props) => (props.variant === "light" ? `#212121` : `#fff`)};

	&:focus {
		background: ${(props) => (props.variant === "light" ? `#fff` : `#0D0D0D`)};
		color: ${(props) => (props.variant === "light" ? `#212121` : `#fff`)};
	}
`;

const TextInput = ({ variant = "light", ...props }) => {
	const { className } = props;
	return (
		<div>
			<StyledFormControl
				variant={variant}
				className={`${className}`}
				{...props}
			/>
		</div>
	);
};

export default TextInput;
