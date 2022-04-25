import Image from "next/image";
import { TextPrimary, TextSecondary } from "components/Typography/Texts";
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

const NewPasswordSet = ({ stateUtils }) => {
	const { setter, getter } = stateUtils;

	return (
		<div className="d-flex flex-column">
			<Image
				src={"/images/password.svg"}
				height={48}
				width={48}
				alt="New Password Set"
			/>

			<TextPrimary className="text-center mt-3">New password set</TextPrimary>
			<StyledText className="my-3 text-center">
				Make sure you don’t lose this one again. 😉
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

export default NewPasswordSet;
