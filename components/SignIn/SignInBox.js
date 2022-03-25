import styled from "styled-components";
import LinkCustom from "components/Link/Link";
import TextInput from "components/FormInputs/TextInput";
import MyButton from "components/Buttons/Button";
import Form from "react-bootstrap/Form";
import { TextSecondary } from "components/Typography/Texts";

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

	return (
		<Box
			className={`p-3 p-md-4 p-lg-4 bg-primaryComplement ${className}`}
			{...props}
		>
			<Form onSubmit={auth}>
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
					href="/"
					className="mt-3 mb-1 text-secondary"
					text="Forgotten your password?"
				/>
				<MyButton
					type="submit"
					// onClick={auth}
					text={!isAuthenticating ? "Sign In" : "Signing In..."}
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
				You must previously have connected your wallet to our marketplace to be
				able to sign in using email and password.
			</TextSecondary>
			<LinkCustom
				href="/terms-and-conditions"
				className="mt-3 text-gray"
				text="Terms & Conditions"
			/>
		</Box>
	);
};

export default SignInBox;
