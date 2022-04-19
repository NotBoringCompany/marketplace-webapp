import React, { useState } from "react";
import Image from "next/image";
import { Image as BsImage } from "react-bootstrap";
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
	const [loading, setLoading] = useState(false);
	const handleClose = () => {
		setter({ ...getter, show: false });
	};

	const handleHatch = () => {
		setLoading(true);
	};

	return (
		<div className="d-flex flex-column">
			<TextPrimary className="text-center mb-4">
				{loading
					? "Your Genesis NBMon is hatching"
					: "Are you sure you want to hatch?"}
			</TextPrimary>
			{loading ? (
				<BsImage
					src="/images/dummy_egg.gif"
					alt="Egg"
					width={66}
					height={77}
					className="mx-auto"
				/>
			) : (
				<>
					<Image src={Egg} width={60} height={77} alt="Egg" />
				</>
			)}
			{loading ? (
				<Subtitle className="text-center mt-3">What NBMon will it be?</Subtitle>
			) : (
				<>
					<HatchButton onClick={handleHatch} className="mt-3" />
					<CancelButton onClick={handleClose} className="mt-3">
						Cancel
					</CancelButton>
				</>
			)}
		</div>
	);
};

export default UserConfirm;
