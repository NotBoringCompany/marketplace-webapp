import React, { useEffect } from "react";
import { useChain } from "react-moralis";
import Image from "next/image";

import CustomModal from "./CustomModal";
import { HeadingXXS } from "components/Typography/Headings";
import { TextSecondary } from "components/Typography/Texts";
import MyButton from "components/Buttons/Button";

import styled from "styled-components";

import WrongNetworkImg from "public/images/wrong_network.svg";

const CustomHeadingXXS = styled(HeadingXXS)`
	font-size: 24px;
`;

const WrongNetwork = ({ stateUtils }) => {
	const { setter } = stateUtils;
	const { switchNetwork, chainId } = useChain();
	const handleSwitchNetworkBtn = () => {
		if (chainId !== process.env.NEXT_PUBLIC_CHAIN_ID) {
			switchNetwork(process.env.NEXT_PUBLIC_CHAIN_ID);
		} else {
			setter(false);
		}
	};
	useEffect(() => {
		if (chainId === process.env.NEXT_PUBLIC_CHAIN_ID) setter(false);
	}, [chainId]);

	return (
		<CustomModal
			stateUtils={stateUtils}
			className="d-flex flex-column align-items-center justify-content-center"
		>
			<div className="d-flex mb-3">
				<Image src={WrongNetworkImg} alt="icon" width={66} height={50} />
			</div>

			<CustomHeadingXXS className="text-center">
				Oops, Wrong Network!
			</CustomHeadingXXS>
			<TextSecondary className="my-1 text-center text-white">
				You need to connect to the right network.
			</TextSecondary>
			<MyButton
				text={`Switch to ${process.env.NEXT_PUBLIC_NETWORK_NAME} Network`}
				className={"mt-4"}
				onClick={handleSwitchNetworkBtn}
			/>
		</CustomModal>
	);
};

export default WrongNetwork;
