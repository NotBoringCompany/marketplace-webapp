import styled from "styled-components";
import LinkCustom from "components/Link/Link";
import TextInput from "components/FormInputs/TextInput";
import MyButton from "components/Buttons/Button";
import { TextSecondary } from "components/Typography/Texts";
const Box = styled.div`
	border: 2px solid rgba(176, 176, 176, 0.35);
	box-shadow: 0px 4px 4px rgba(66, 202, 159, 0.2);
	max-width: 560px;
`;

const SignInBox = ({ email = "", password = "", className, ...props }) => {
	return (
		<Box className={`p-4 bg-primaryComplement ${className}`} {...props}>
			<TextInput
				variant="dark"
				placeholder="Email"
				className="mb-3"
				type="email"
			/>
			<TextInput variant="dark" placeholder="Password" type="password" />
			<LinkCustom
				href="/"
				className="mt-3 mb-1 text-secondary"
				text="Forgotten your password?"
			/>
			<MyButton
				text="Sign In"
				className="w-100 mt-3 mb-3 text-secondary"
				text="Forgotten your password?"
			/>
			<TextSecondary className="mt-4 text-white">
				You must previously have connected your wallet to our marketplace to be
				able to sign in using email and password.
			</TextSecondary>
			<LinkCustom
				href="/"
				className="mt-3 text-gray"
				text="Terms & Conditions"
			/>
		</Box>
	);
};

export default SignInBox;
