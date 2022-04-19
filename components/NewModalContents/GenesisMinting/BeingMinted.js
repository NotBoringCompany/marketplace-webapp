import React from "react";
import Image from "next/image";
import { TextPrimary, TextSecondary } from "components/Typography/Texts";
import { HeadingSuperXXS } from "components/Typography/Headings";
import Egg from "components/../public/images/egg.svg";
import styled from "styled-components";

const Subtitle = styled(HeadingSuperXXS)`
	font-size: 16px;
`;

const BeingMinted = () => {
	return (
		<div className="d-flex flex-column">
			<TextPrimary className="text-center mb-5">
				Genesis NBMon Minting
			</TextPrimary>
			<Image src={Egg} height={77} width={60} alt="Loading..." />
			<Subtitle as="p" className="text-center mt-3">
				Genesis NBMon Egg <br />
				is being minted
			</Subtitle>
		</div>
	);
};

export default BeingMinted;
