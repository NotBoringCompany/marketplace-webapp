import React from "react";
import FormControl from "react-bootstrap/FormControl";
import styled from "styled-components";
import { TextSecondary } from "components/Typography/Texts";

const StyledFormControl = styled(FormControl)`
	border: 1px solid #938F99;
	border-radius: 4px;
	background: ${(props) => (props.variant === "light" ? `#fff` : `#181818`)};
	color: ${(props) => (props.variant === "light" ? `#181818` : `#fff`)};
	padding: 15px 16px;

	&:focus {
		background: ${(props) => (props.variant === "light" ? `#fff` : `black`)};
		color: ${(props) => (props.variant === "light" ? `#212121` : `#fff`)};
	}

	&::placeholder {
		color: #CAC4D0;
	}
`;

const TextInput = ({
	name = "",
	variant = "light",
	errorDesc = "",
	...props
}) => {
	const { className } = props;
	return (
		<div>
			<StyledFormControl
				name={name}
				variant={variant}
				className={`${className}`}
				{...props}
			/>
			{errorDesc && (
				<TextSecondary className="mt-2 text-danger">{errorDesc}</TextSecondary>
			)}
		</div>
	);
};

export default TextInput;
