import React from "react";
import styled from "styled-components";
import ModalButton from "components/Buttons/ModalButton";
import { HeadingSuperXXS } from "components/Typography/Headings";

const Title = styled(HeadingSuperXXS)`
	flex: 0 1 auto;
	font-family: "Lexend";
	font-size: 24px;
	font-style: normal;
	font-weight: 400;
	line-height: 24px;
	color: #e1e3e0;
`;
const IncreaseAllowanceSuccess = () => {
	return (
		<div className="d-flex flex-column">
			<Title className="br-2">Increase Allowance</Title>
			<p className="mt-4 fw-light small">
				<b>You have successfully increased your RES deposit allowance!</b>
				<br />
				<br /> This page will automatically reload in a moment...
			</p>
			<ModalButton
				onClick={() => {
					window && window.location.reload();
				}}
			>
				OK
			</ModalButton>
		</div>
	);
};

export default IncreaseAllowanceSuccess;
