import React from "react";
import Image from "next/image";
import { TextPrimary, TextSecondary } from "components/Typography/Texts";
import HourGlass from "components/../public/images/hourglass.svg";

const MetamaskConfirmation = ({ stateUtils }) => {
	const { extraContent } = stateUtils.getter;
	return (
		<div className="d-flex flex-column">
			<TextPrimary className="text-center mb-5">
				Confirm transaction on Metamask
			</TextPrimary>
			<Image src={HourGlass} height={40} width={24} alt="Loading..." />
			<TextSecondary className="text-center mt-5">
				waiting for your <br />
				<b>
					transaction {extraContent && <>{`(${extraContent})`}</>} to be
					confirmed
				</b>
			</TextSecondary>
		</div>
	);
};

export default MetamaskConfirmation;
