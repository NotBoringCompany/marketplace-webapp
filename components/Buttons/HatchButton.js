import MyButton from "./Button";
import styled from "styled-components";
import { mediaBreakpoint } from "utils/breakpoints";

const StyledButton = styled(MyButton)`
	border-radius: 8px;
	min-width: 208px;
	padding: 16px 24px;
	& p {
		color: #fff !important;
		font-size: 16px !important;
		font-weight: 400;
		margin-top: 1px;
		line-height: 24px;
	}

	@media ${mediaBreakpoint.down.xl} {
		padding: 8px 32px;
		width: 168px;
	}
`;

const HatchButton = ({ text = "Hatch", disabled = false, ...props }) => {
	return (
		<>
			{disabled ? (
				<StyledButton {...props} disabled variant={"primary3"} />
			) : (
				<StyledButton {...props} variant={"info"} text={text} />
			)}
		</>
	);
};

export default HatchButton;
