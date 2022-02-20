import React, { useState } from "react";
import Image from "next/image";

import CustomModal from "./CustomModal";
import { HeadingXXS } from "components/Typography/Headings";
import { TextSecondary } from "components/Typography/Texts";
import MyButton from "components/Buttons/Button";

import styled from "styled-components";

import EmailSetup from "../../public/images/email_setup.svg";

import SignUpBox from "components/SignUp/SignUpBox";

const CustomHeadingXXS = styled(HeadingXXS)`
	font-size: 24px;
`;

const SetupModal = ({ stateUtils }) => {
	const [authDetail, setAuthDetail] = useState({
		email: "",
		password: "",
		errors: { email: "", password: "", authFailedMessage: "" },
	});
	const [showForm, setShowForm] = useState(false);
	return (
		<CustomModal
			stateUtils={stateUtils}
			className="d-flex flex-column align-items-center justify-content-center"
		>
			<div className="d-flex mb-3">
				<Image src={EmailSetup} width={66} height={50} />
			</div>

			<CustomHeadingXXS className="text-center">
				Finish setting-up your account
			</CustomHeadingXXS>
			{!showForm && (
				<TextSecondary className="mt-1 mb-3 text-center">
					<b>Link an email & password</b> to your account be able to sign-in
					using these credentials next time.
				</TextSecondary>
			)}

			{showForm && <SignUpBox className="mt-4" authDetail={authDetail} />}
			{!showForm && (
				<MyButton text={"Start set-up"} onClick={() => setShowForm(true)} />
			)}
		</CustomModal>
	);
};

export default SetupModal;
