import { useState } from "react";
import Image from "next/image";
import { TextPrimary, TextSecondary } from "components/Typography/Texts";
import { HeadingSuperXXS } from "components/Typography/Headings";
import TextInput from "components/FormInputs/TextInput";
import styled from "styled-components";

const Subtitle = styled(HeadingSuperXXS)`
	font-size: 16px;
`;

const StyledButton = styled.button`
	background: transparent;
	border: none;
	font-weight: 500;
`;

const StyledText = styled(TextSecondary)`
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	color: #bfc9c2;
`;

const ForgotPassword = ({ stateUtils }) => {
	const { setter, getter } = stateUtils;
	const [email, setEmail] = useState("");

	const onEmailChange = () => {};

	return (
		<div className="d-flex flex-column">
			<Image
				src={"/images/key_off.svg"}
				height={48}
				width={48}
				alt="Forgot Password"
			/>

			<TextPrimary className="text-center mt-3">Forgot Password?</TextPrimary>
			<StyledText className="my-3">
				No worries! It happens. Please enter the email-address associated with
				your account.
			</StyledText>

			<TextInput
				name="email"
				value={email}
				variant="dark"
				placeholder="Email"
				autoComplete={"off"}
				type="email"
				onChange={onEmailChange}
				errorDesc={""}
			/>

			<div className="ms-auto mt-4">
				<StyledButton
					onClick={() => {
						setter({ ...getter, show: false });
					}}
					className="text-secondary"
				>
					Cancel
				</StyledButton>
				<StyledButton
					onClick={() => {
						setter({ ...getter, show: false });
					}}
					className="text-secondary"
				>
					Send
				</StyledButton>
			</div>
		</div>
	);
};

export default ForgotPassword;
