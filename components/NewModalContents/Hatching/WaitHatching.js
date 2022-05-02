import React from "react";
import { Image as BsImage } from "react-bootstrap";
import { TextPrimary } from "components/Typography/Texts";
import { HeadingSuperXXS } from "components/Typography/Headings";
import styled from "styled-components";

const Subtitle = styled(HeadingSuperXXS)`
	font-size: 16px;
`;

const WaitHatching = () => {
	return (
		<div className="d-flex flex-column">
			<TextPrimary className="text-center mb-4">
				Your Genesis NBMon is hatching
			</TextPrimary>
			<BsImage
				src="/images/dummy_egg.gif"
				alt="Egg"
				width={66}
				height={77}
				className="mx-auto"
			/>
			<Subtitle className="text-center mt-3">What NBMon will it be?</Subtitle>
		</div>
	);
};

export default WaitHatching;
