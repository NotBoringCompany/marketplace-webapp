import React from "react";
import Image from "next/image";
import { TextPrimary, TextSecondary } from "components/Typography/Texts";
import { HeadingSuperXXS } from "components/Typography/Headings";
import Egg from "components/../public/images/egg.svg";
import styled from "styled-components";

const Subtitle = styled(HeadingSuperXXS)`
	font-size: 16px;
`;

const WaitTransaction = () => {
	return (
		<div className="d-flex flex-column">
			<TextPrimary className="text-center mb-5">
				Transaction in Progress
			</TextPrimary>
			<Image src={Egg} height={77} width={60} alt="Loading..." />
			<Subtitle as="p" className="text-center mt-3">
				Transaction is in progress. <br />
				We appreciate your patience.
			</Subtitle>
		</div>
	);
};

export default WaitTransaction;
