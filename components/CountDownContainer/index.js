import React from "react";
import { BlurContainer } from "components/BlurContainer";
import { TextPrimary } from "components/Typography/Texts";
import styled from "styled-components";
import { HeadingSuperXXS } from "components/Typography/Headings";

import { mediaBreakpoint } from "utils/breakpoints";

const NumberText = styled(TextPrimary)`
	font-size: 56px;
	line-height: 56px;
	margin-bottom: 8px;

	@media ${mediaBreakpoint.down.xl} {
		font-size: 28px;
		line-height: 28px;
	}
`;

const StyledBlurContainer = styled(BlurContainer)`
	border-radius: 24px;
	padding: 14px 56px;
	backdrop-filter: blur(4.5px);
	background: ${(props) => (props.completed ? `#41b995` : `auto`)};
	@media ${mediaBreakpoint.down.xl} {
		padding: 16px;
	}
`;

const CountDownContainer = ({ days, hours, minutes, seconds, completed }) => {
	return (
		<StyledBlurContainer completed={completed ? 1 : 0}>
			<div className="d-flex w-100">
				<div className="d-flex flex-column align-items-center justify-content-center me-4">
					<NumberText className="text-white">{days}</NumberText>
					<HeadingSuperXXS className="text-white text-uppercase">
						Days
					</HeadingSuperXXS>
				</div>

				<div className="d-flex flex-column align-items-center justify-content-center me-4">
					<NumberText className="text-white">{hours}</NumberText>
					<HeadingSuperXXS className="text-white text-uppercase">
						Hours
					</HeadingSuperXXS>
				</div>

				<div className="d-flex flex-column align-items-center justify-content-center me-0 me-md-4">
					<NumberText className="text-white">{minutes}</NumberText>
					<HeadingSuperXXS className="text-white text-uppercase">
						Minutes
					</HeadingSuperXXS>
				</div>

				<div className="d-flex flex-column align-items-center justify-content-center d-none d-md-flex">
					<NumberText className="text-white">{seconds}</NumberText>
					<HeadingSuperXXS className="text-white text-uppercase">
						Seconds
					</HeadingSuperXXS>
				</div>
			</div>
		</StyledBlurContainer>
	);
};

export default CountDownContainer;
