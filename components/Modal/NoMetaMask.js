import React from "react";
import Image from "next/image";

import CustomModal from "./CustomModal";
import { HeadingXXS } from "components/Typography/Headings";
import { TextSecondary } from "components/Typography/Texts";
import MyButton from "components/Buttons/Button";

import styled from "styled-components";

import Wallet from "public/images/wallet.svg";

const CustomHeadingXXS = styled(HeadingXXS)`
	font-size: 24px;
`;

const NoMetaMask = ({ stateUtils }) => {
	return (
		<CustomModal
			stateUtils={stateUtils}
			className="d-flex flex-column align-items-center justify-content-center"
		>
			<div className="d-flex mb-3">
				<Image src={Wallet} width={64} height={64} alt="Wallet" />
			</div>

			<CustomHeadingXXS className="text-center">
				MetaMask not found
			</CustomHeadingXXS>
			<TextSecondary className="mt-1 mb-3 text-center">
				Please set up a <b>MetaMask wallet as a browser extension</b> to
				connect.
			</TextSecondary>
			<MyButton
				isLink
				passHref
				target="_blank"
				href="https://metamask.io/download/"
				text={"Install MetaMask"}
			/>
		</CustomModal>
	);
};

export default NoMetaMask;
