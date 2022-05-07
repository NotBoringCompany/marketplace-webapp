import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import Image from "next/image";
import { TextPrimary, TextSecondary } from "components/Typography/Texts";
import TextInput from "components/FormInputs/TextInput";
import styled from "styled-components";

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

const ResetPassword = ({ stateUtils }) => {
	const { setter, getter } = stateUtils;
	const { tokenId } = getter;
	const [passwords, setPasswords] = useState({
		password: "",
		confirmPassword: "",
		errorDesc: "",
	});
	const { password, confirmPassword, errorDesc } = passwords;
	const [btnDisabled, setBtnDisabled] = useState(true);

	const resetPasswordMutation = useMutation(
		(passwordResetDetail) =>
			fetch(
				`${process.env.NEXT_PUBLIC_NEW_REST_API_URL}/account/reset-password`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(passwordResetDetail),
				}
			),
		{
			onSuccess: async (response) => {
				if (response.ok) {
					setter({ show: true, content: "newPasswordSet" });
					return;
				} else {
					setter({
						show: true,
						content: "txError",
						detail: {
							title: "Error",
							text: "We are sorry, this reset password \n link might've already expired. \n\n Please request a new one.",
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
						text: "We are sorry, this reset password \n link might've already expired. \n\n Please request a new one.",
					},
				});
			},
			retry: 0,
		}
	);

	const { isLoading } = resetPasswordMutation;

	useEffect(() => {
		if (
			password !== confirmPassword &&
			(password.length > 0 || confirmPassword.length > 0)
		) {
			setPasswords({ ...passwords, errorDesc: "Passwords aren't the same" });
			setBtnDisabled(true);
		} else {
			setPasswords({
				...passwords,
				errorDesc: "",
			});
			if (password.length > 0 || confirmPassword.length > 0) {
				setBtnDisabled(false);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [password, confirmPassword]);

	const onChange = (e) => {
		e.preventDefault();

		setPasswords({ ...passwords, [e.target.name]: e.target.value });
	};

	const handleClickResetPassword = () => {
		if (!btnDisabled) {
			const resetPasswordDetail = {
				tokenId,
				newPassword: password,
				confirmNewPassword: confirmPassword,
			};

			resetPasswordMutation.mutate(resetPasswordDetail);
		}
	};

	return (
		<div className="d-flex flex-column">
			<Image
				src={"/images/key_off.svg"}
				height={48}
				width={48}
				alt="Forgot Password"
			/>

			<TextPrimary className="text-center mt-3">Forgot Password?</TextPrimary>
			{isLoading ? (
				<StyledText className="text-center my-3">
					Resetting your password...
				</StyledText>
			) : (
				<>
					<StyledText className="text-center my-3">
						Enter your new password.
					</StyledText>

					<TextInput
						className="mt-2"
						name="password"
						value={password}
						variant="dark"
						placeholder="New password"
						type="password"
						onChange={onChange}
						errorDesc={""}
					/>
					<TextInput
						className="mt-2"
						name="confirmPassword"
						value={confirmPassword}
						variant="dark"
						placeholder="Confirm new password"
						type="password"
						onChange={onChange}
						errorDesc={errorDesc}
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
							disabled={btnDisabled}
							onClick={handleClickResetPassword}
							className={`text-${btnDisabled ? `gray` : `secondary`}`}
						>
							Set new password
						</StyledButton>
					</div>
				</>
			)}
		</div>
	);
};

export default ResetPassword;
