import React from "react";
import { TextPrimary } from "components/Typography/Texts";
import styled from "styled-components";
import { HeadingSuperXXS } from "components/Typography/Headings";

const Subtitle = styled(HeadingSuperXXS)`
	font-size: 16px;
`;

const IncreaseAllowanceLoading = () => {
	return (
		<div className="d-flex flex-column">
			<TextPrimary className="text-center mb-5">
				Transaction In Progress
			</TextPrimary>
			<Subtitle as="p" className="text-center mt-3">
				Transaction is in progress. <br />
				We appreciate your patience.
			</Subtitle>
		</div>
	);
};
export default IncreaseAllowanceLoading;
