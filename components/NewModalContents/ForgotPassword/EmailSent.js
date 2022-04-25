import Image from "next/image";
import { TextPrimary, TextSecondary } from "components/Typography/Texts";
import { HeadingSuperXXS } from "components/Typography/Headings";
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

const EmailSent = ({ stateUtils }) => {
	const { setter, getter } = stateUtils;

	return (
		<div className="d-flex flex-column">
			<Image
				src={"/images/mail_logo.svg"}
				height={48}
				width={48}
				alt="Forgt Password"
			/>

			<TextPrimary className="text-center mt-3">
				Email has been sent
			</TextPrimary>
			<StyledText className="my-3">
				If your account exists, you will receive an email shortly containing a
				link to reset your password.
			</StyledText>

			<div className="ms-auto mt-4">
				<StyledButton
					onClick={() => {
						setter({ ...getter, show: false });
					}}
					className="text-secondary"
				>
					Close
				</StyledButton>
			</div>
		</div>
	);
};

export default EmailSent;
