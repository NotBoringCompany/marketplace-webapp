import styled from "styled-components";
import LinkCustom from "components/Link/Link";
import TextInput from "components/FormInputs/TextInput";
import Form from "react-bootstrap/Form";
import { TextSecondary } from "components/Typography/Texts";
import Link from "next/link";
import MyButton from "components/Buttons/Button";

const Box = styled.div`
	max-width: 361px;
	width: 100%;
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
			className={className}
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
					className="mt-2 mb-1 text-secondary mb-4 text-12px"
					text="forgot your password?"
				/>

				{/*<LoginButton
					type="submit"
					disabled={isAuthenticating}
				>
					{!isAuthenticating ? "Log-in" : "Signing In..."}
				</LoginButton>*/}

				<MyButton
					type="submit"
					// onClick={auth}
					text={!isAuthenticating ? "Sign In" : "Signing In..."}
					disabled={isAuthenticating}
					className="w-100 mb-1 text-secondary"
				/>

				{errors.authFailedMessage && (
					<TextSecondary className="mt-2 text-danger">
						{errors.authFailedMessage}
					</TextSecondary>
				)}
			</Form>

			<Link href="#">
				<a className="link-terms-condition mt-1">Terms and Conditions</a>
			</Link>
		</Box>
	);
};

const LoginButton = styled.button`
	background: rgba(227, 227, 227, 0.12);
	border-radius: 100px;
	padding: 10px 24px;
	border: none;
	display: block;
	letter-spacing: 0.1px;
	color: rgba(230, 225, 229, 0.38);
	width: 100%;
`

export default SignInBox;
