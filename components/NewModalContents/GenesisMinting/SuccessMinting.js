import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { TextPrimary, TextSecondary } from "components/Typography/Texts";
import { HeadingSuperXXS } from "components/Typography/Headings";
import Egg from "components/../public/images/egg_confetti.svg";
import styled from "styled-components";

const Subtitle = styled(HeadingSuperXXS)`
	font-size: 16px;
`;

const StyledTextSecondary = styled(TextSecondary)`
	font-size: 14px;
`;

const StyledButton = styled.button`
	background: transparent;
	border: none;
	font-weight: 500;
`;

const SuccessMinting = ({ stateUtils }) => {
	const { setter, getter } = stateUtils;
	const router = useRouter();
	return (
		<div className="d-flex flex-column text-center">
			<TextPrimary className="mb-5">Success!</TextPrimary>
			<Image src={Egg} height={77} width={60} alt="Loading..." />
			<Subtitle as="p" className="mt-3">
				You are now proud owner of a <br />
				Genesis NBMon Egg!
			</Subtitle>
			<StyledTextSecondary className="mt-3">
				You can inspect the egg in your inventory
			</StyledTextSecondary>

			<div className="d-flex mt-4 align-items-center justify-content-end pe-1">
				<StyledButton
					onClick={() => {
						setter({ ...getter, show: false });
					}}
					className="text-secondary me-2"
				>
					OK
				</StyledButton>
				<StyledButton
					onClick={() => {
						setter({ ...getter, show: false });
						router.push("/nbmons");
					}}
					className="text-secondary"
				>
					View in Inventory
				</StyledButton>
			</div>
		</div>
	);
};

export default SuccessMinting;
