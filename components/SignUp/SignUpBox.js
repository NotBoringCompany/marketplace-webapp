import styled from "styled-components";
import LinkCustom from "components/Link/Link";
import TextInput from "components/FormInputs/TextInput";
import MyButton from "components/Buttons/Button";
import Form from "react-bootstrap/Form";
import { TextSecondary } from "components/Typography/Texts";
import { NoteText } from "components/Modal/SetupModal";

const Box = styled.div`
	border: 2px solid rgba(176, 176, 176, 0.35);
	box-shadow: 0px 4px 4px rgba(66, 202, 159, 0.2);
	max-width: 560px;
	border-radius: 8px;
`;

const SignUpBox = ({
	auth,
	authDetail,
	isUserUpdating,
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
					value={password}
					onChange={onTextInputChange}
					errorDesc={errors.password}
				/>

				<MyButton
					type="submit"
					// onClick={auth}
					text={!isUserUpdating ? "Link" : "Linking..."}
					disabled={isUserUpdating}
					className="w-100 mt-3 mb-3 text-secondary"
				/>
				{errors.authFailedMessage && (
					<TextSecondary className="mt-2 text-danger">
						{errors.authFailedMessage}
					</TextSecondary>
				)}
			</Form>

			<NoteText />
			<LinkCustom
				href="/terms-and-conditions"
				className="mt-3 text-gray"
				text="Terms & Conditions"
			/>
		</Box>
	);
};

export default SignUpBox;
