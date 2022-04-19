import React from "react";
import Image from "next/image";
import { TextPrimary, TextSecondary } from "components/Typography/Texts";
import { HeadingSuperXXS } from "components/Typography/Headings";
import ErrorImage from "components/../public/images/sadface.svg";
import styled from "styled-components";

const Subtitle = styled(HeadingSuperXXS)`
	font-size: 16px;
	line-break: anywhere;
	white-space: pre-line;
`;

const StyledButton = styled.button`
	background: transparent;
	border: none;
	font-weight: 500;
`;

const Error = ({ stateUtils }) => {
	const { setter, getter } = stateUtils;
	const { detail } = getter;

	return (
		<div className="d-flex flex-column text-center">
			<TextPrimary className="mb-5">
				{detail && detail.title ? detail.title : "Error"}
			</TextPrimary>
			<Image src={ErrorImage} height={68} width={68} alt="Loading..." />
			<Subtitle as="p" className="mt-5">
				{detail && detail.text
					? detail.text
					: `Oops, sorry, something went wrong.`}
			</Subtitle>

			<div className="d-flex mt-4 align-items-center justify-content-end pe-1">
				<StyledButton
					onClick={() => {
						// window && window.location.reload();
						setter({ ...getter, show: false });
					}}
					className="text-secondary me-2"
				>
					OK
				</StyledButton>
			</div>
		</div>
	);
};

export default Error;
