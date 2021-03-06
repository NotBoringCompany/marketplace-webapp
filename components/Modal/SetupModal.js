import React, { useEffect, useState, useContext } from "react";
import { useChain, useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import Image from "next/image";

import CustomModal from "./CustomModal";
import { HeadingXXS } from "components/Typography/Headings";
import { TextSecondary } from "components/Typography/Texts";
import MyButton from "components/Buttons/Button";

import styled from "styled-components";

import EmailSetup from "public/images/email_setup.svg";

import SignUpBox from "components/SignUp/SignUpBox";

import { validEmail } from "utils/validEmail";
import { whitespace } from "utils/whitespace";
import AppContext from "context/AppContext";

import sha256 from 'crypto-js/sha256';

const CustomHeadingXXS = styled(HeadingXXS)`
	font-size: 24px;
`;

export const NoteText = () => (
	<TextSecondary className="my-3 text-center text-white">
		<b>Link an email & a password</b> to your account to be able to sign-in
		using these credentials next time.
	</TextSecondary>
);

const SetupModal = ({ stateUtils }) => {
	const router = useRouter();
	const { isUserUpdating, setUserData, userError, user } = useMoralis();
	const { setShowWrongNetworkModal, showWrongNetworkModal } =
		useContext(AppContext);
	const { chainId } = useChain();
	const [authDetail, setAuthDetail] = useState({
		email: "",
		password: "",
		errors: { email: "", password: "", authFailedMessage: "" },
	});
	const [showForm, setShowForm] = useState(false);
	const { email, password, errors } = authDetail;

	const validCreds = validEmail(email) && !whitespace(password);

	useEffect(() => {
		if (userError) {
			let authFailedMessage;
			switch (userError.message) {
				case "Account already exists for this email address.":
					authFailedMessage =
						"Oops, sorry, this email already exists. Please use a different one.";
					break;
				default:
					authFailedMessage =
						"Oops, sorry, an unexpected error occured. Please try again, preferably with a different browser.";
					break;
			}

			setAuthDetail({
				...authDetail,
				errors: {
					...errors,
					authFailedMessage,
				},
			});
		} else {
			if (validCreds && !isUserUpdating && user && user.attributes.email) {
				window && router.reload(window.location.pathname);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isUserUpdating, userError, user]);

	const setEmailAndPassword = async () => {
		setAuthDetail({
			...authDetail,
			errors: {
				password: "",
				email: "",
			},
		});

		await setUserData({
			email,
			password,
		});

		const min = 1000;
		const max = 9999;
		const nonce = min + Math.random() * (max - min);

		const userUniqueHash = sha256(nonce + email).toString();

		await setUserData({
			userUniqueHash: userUniqueHash
		});

		return;
	};

	const link = async (e) => {
		e.preventDefault();
		if (chainId !== process.env.NEXT_PUBLIC_CHAIN_ID) {
			setShowWrongNetworkModal(!showWrongNetworkModal);
		} else {
			if (validCreds) {
				await setEmailAndPassword();
			}

			setAuthDetail({
				...authDetail,
				errors: {
					password: !whitespace(password)
						? ""
						: "Please enter a valid password!",
					email: validEmail(email) ? "" : "Please enter a valid email!",
				},
			});
		}
	};

	const handleInputChange = (e) => {
		setAuthDetail({ ...authDetail, [e.target.name]: e.target.value });
	};

	return (
		<CustomModal
			stateUtils={stateUtils}
			className="d-flex flex-column align-items-center justify-content-center"
		>
			<div className="d-flex mb-3">
				<Image src={EmailSetup} alt="icon" width={66} height={50} />
			</div>

			<CustomHeadingXXS className="text-center">
				Finish setting-up your account
			</CustomHeadingXXS>
			{!showForm && <NoteText />}

			{showForm && (
				<SignUpBox
					isUserUpdating={isUserUpdating}
					className="mt-4"
					authDetail={authDetail}
					auth={link}
					onTextInputChange={handleInputChange}
				/>
			)}
			{!showForm && (
				<MyButton text={"Finish set-up"} onClick={() => setShowForm(true)} />
			)}
		</CustomModal>
	);
};

export default SetupModal;
