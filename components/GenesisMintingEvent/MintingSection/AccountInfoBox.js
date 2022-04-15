import React from "react";
import { BlurContainer } from "components/BlurContainer";
import { Heading18 } from "components/Typography/Headings";
import { TextSecondary } from "components/Typography/Texts";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const AccountInfo = ({ user }) => {
	return (
		<BlurContainer className="mt-lg-5 mt-2 text-white">
			<div className="d-flex align-items-center">
				<IoIosCheckmarkCircleOutline className="me-2 checkmark-icon" />
				<Heading18 as="p">You are logged in</Heading18>
			</div>
			<TextSecondary className="mt-1">
				{user && user.attributes && user.attributes.ethAddress}
			</TextSecondary>
		</BlurContainer>
	);
};

export default AccountInfo;
