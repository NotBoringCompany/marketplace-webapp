import React, { useState } from "react";
import Image from "next/image";
import { TextPrimary } from "components/Typography/Texts";
import { HeadingSuperXXS } from "components/Typography/Headings";
import Egg from "components/../public/images/egg.svg";
import styled from "styled-components";
import HatchButton from "components/Buttons/HatchButton";

const Subtitle = styled(HeadingSuperXXS)`
	font-size: 16px;
`;

const CancelButton = styled.button`
	background: none;
	color: #67dbb1;
	border: none;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
`;

const UserConfirm = ({ stateUtils }) => {
	const { setter, getter } = stateUtils;
	const { setDisableHatchBtn, onClickHatchKey } = getter;

	const [loading, setLoading] = useState(false);

	const handleClose = () => {
		setDisableHatchBtn(false);
		setter({ ...getter, show: false });
	};

	return (
		<div className="d-flex flex-column">
			<TextPrimary className="text-center mb-4">
				{loading
					? "Generating hatching key"
					: "Are you sure you want to hatch?"}
			</TextPrimary>
			{loading ? (
				<Image
					src={"/images/key_on.svg"}
					height={48}
					width={48}
					alt="Hatching Key"
				/>
			) : (
				<>
					<Image src={Egg} width={60} height={77} alt="Egg" />
				</>
			)}
			{loading ? (
				<Subtitle className="text-center mt-3">
					Please wait while we generate your hatching key.
					<br />
					<br />
					We appreciate your patience.
				</Subtitle>
			) : (
				<>
					<HatchButton
						onClick={() => {
							setLoading(true);
							onClickHatchKey();
						}}
						className="mt-3"
					/>
					<CancelButton onClick={handleClose} className="mt-3">
						Cancel
					</CancelButton>
				</>
			)}
		</div>
	);
};

export default UserConfirm;
