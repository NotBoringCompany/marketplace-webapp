import { useState } from "react";
import Image from "next/image";
import { useMutation } from "react-query";
import { TextPrimary, TextSecondary } from "components/Typography/Texts";
import TextInput from "components/FormInputs/TextInput";
import styled from "styled-components";
import { validEmail } from "utils/validEmail";

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
	const [sendBtnDisabled, setSendBtnDisabled] = useState(true);

	const onEmailChange = (e) => {
		e.preventDefault();
		setEmail(e.target.value);
		const valid = validEmail(e.target.value);
		setSendBtnDisabled(!valid);
	};

	const sendRequestMutation = useMutation(
		(email) =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/account/send-reset-password-request`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email }),
				}
			),
		{
			onSuccess: async (response) => {
				if (response.ok) {
					setter({ show: true, content: "emailSent" });
					return;
				} else {
					setter({
						show: true,
						content: "txError",
						detail: {
							title: "Error",
							text: "We are sorry, there was a problem in sending the password reset link. \n\n Please refresh this page and \n try again. (400)",
						},
					});
				}
			},
			onError: (_) => {
				setter({
					show: true,
					content: "txError",
					detail: {
						title: "Error",
						text: "We are sorry, there was a problem in sending the password reset link. \n\n Please refresh this page and \n try again.",
					},
				});
			},
			retry: 0,
		}
	);

	const { isLoading } = sendRequestMutation;

	const onSendClicked = () => {
		sendRequestMutation.mutate(email);
	};

	return (
		<div className="d-flex flex-column">
			<Image
				src={"/images/key_off.svg"}
				height={48}
				width={48}
				alt="Forgot Password"
			/>

			{isLoading ? (
				<StyledText className="mt-4 text-center">
					Sending a reset password link to your email {email}.
					<br />
					<br />
					We appreciate your patience.
				</StyledText>
			) : (
				<>
					<TextPrimary className="text-center mt-3">
						Forgot Password?
					</TextPrimary>
					<StyledText className="my-3">
						No worries! It happens. Please enter the email-address associated
						with your account.
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
							disabled={sendBtnDisabled}
							onClick={onSendClicked}
							className={`text-${sendBtnDisabled ? `gray` : `secondary`}`}
						>
							Send
						</StyledButton>
					</div>
				</>
			)}
		</div>
	);
};

export default ForgotPassword;
