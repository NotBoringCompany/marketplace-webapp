import { useContext } from "react";
import styled from "styled-components";
import LinkCustom from "components/Link/Link";
import TextInput from "components/FormInputs/TextInput";
import MyButton from "components/Buttons/Button";
import Form from "react-bootstrap/Form";
import { TextSecondary } from "components/Typography/Texts";
import AppContext from "context/AppContext";

const Box = styled.div`
	border: 2px solid rgba(176, 176, 176, 0.35);
	box-shadow: 0px 4px 4px rgba(66, 202, 159, 0.2);
	max-width: 560px;
	border-radius: 8px;
`;

const SignInBox = ({
	auth,
	authDetail,
	isAuthenticating,
	onTextInputChange,
	className,
	...props
}) => {
	const { email, password, errors } = authDetail;
	const { statesSwitchModal } = useContext(AppContext);

	const handleClickForgotPassword = () => {
		statesSwitchModal.setter({
			show: true,
			content: "forgotPassword",
		});
	};

	return (
		<Box
			className={`p-3 p-md-4 p-lg-4 bg-primaryComplement ${className}`}
			{...props}
		>
			<Form autoComplete={"off"} onSubmit={auth}>
				<TextInput
					name="email"
					value={email}
					variant="dark"
					placeholder="Email"
					autoComplete={"off"}
					type="email"
					onChange={onTextInputChange}
					errorDesc={errors.email}
				/>
				<div className="mb-3" />
				<TextInput
					name="password"
					value={password}
					variant="dark"
					placeholder="Password"
					type="password"
					onChange={onTextInputChange}
					errorDesc={errors.password}
				/>
				<LinkCustom
					href="#"
					onClick={() => handleClickForgotPassword()}
					className="mt-3 mb-1 text-secondary"
					text="Forgotten your password?"
				/>
				<MyButton
					type="submit"
					// onClick={auth}
					text={!isAuthenticating ? "Log In" : "Logging In..."}
					disabled={isAuthenticating}
					className="w-100 mt-3 mb-3 text-secondary"
				/>
				{errors.authFailedMessage && (
					<TextSecondary className="mt-2 text-danger">
						{errors.authFailedMessage}
					</TextSecondary>
				)}
			</Form>

			<TextSecondary className="mt-4 text-white">
				You must previously have connected your wallet, as well as your email
				address to our marketplace to be able to log-in using email & password.
			</TextSecondary>
			<LinkCustom href="/faq" className="mt-3 text-gray" text="FAQ" />
		</Box>
	);
};

export default SignInBox;
