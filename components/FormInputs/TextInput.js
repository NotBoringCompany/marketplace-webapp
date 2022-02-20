import React from "react";
import FormControl from "react-bootstrap/FormControl";
import styled from "styled-components";
import { TextSecondary } from "components/Typography/Texts";
const StyledFormControl = styled(FormControl)`
	border-radius: 8px;
	padding: 10px 16px;
	background: ${(props) => (props.variant === "light" ? `#fff` : `#181818`)};
	border: 2px solid rgba(176, 176, 176, 0.35);
	color: ${(props) => (props.variant === "light" ? `#181818` : `#fff`)};

	&:focus {
		background: ${(props) => (props.variant === "light" ? `#fff` : `black`)};
		color: ${(props) => (props.variant === "light" ? `#212121` : `#fff`)};
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
