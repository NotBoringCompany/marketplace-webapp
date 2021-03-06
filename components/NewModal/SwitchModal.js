import React from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";

import MetamaskConfirmation from "components/NewModalContents/GenesisMinting/MetamaskConfirmation";
import BeingMinted from "components/NewModalContents/GenesisMinting/BeingMinted";
import SuccessMinting from "components/NewModalContents//GenesisMinting/SuccessMinting";
import Error from "components/NewModalContents/GenesisMinting/Error";
import WaitTransaction from "components/NewModalContents/GenesisMinting/WaitTransaction";

import UserConfirm from "components/NewModalContents/Hatching/UserConfirm";
import VideoPreview from "components/NewModalContents/Hatching/VideoPreview";
import CardPreview from "components/NewModalContents/Hatching/CardPreview";

import ForgotPassword from "components/NewModalContents/ForgotPassword/ForgotPassword";
import EmailSent from "components/NewModalContents/ForgotPassword/EmailSent";
import NewPasswordSet from "components/NewModalContents/ForgotPassword/NewPasswordSet";
import ResetPassword from "components/NewModalContents/ForgotPassword/ResetPassword";
import WaitHatching from "components/NewModalContents/Hatching/WaitHatching";
import SellNBMon from "components/NewModalContents/SellNBMon";
import CancelListing from "components/NewModalContents/SellNBMon/CancelListing";
import BuyNBMon from "components/NewModalContents/BuyNBMon";
import ConfirmBuyNBMon from "components/NewModalContents/BuyNBMon/ConfirmBuyNBMon";

const StyledModal = styled(Modal)`
	& .modal-dialog {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	& .modal-content {
		border-radius: 30px;
		width: ${(props) => (props.bigger ? `365px` : `312px`)};
		min-height: ${(props) => (props.nominheight ? `unset` : `320px;`)};
	}
`;
const StyledModalBody = styled(Modal.Body)`
	padding: ${(props) => (props.nopadding ? `0` : `32px`)};
	margin: 0;
	border: ${(props) =>
		props.withborder ? `3px solid ${props.bordercolor};` : `auto`};
	border-radius: 24px;
	background: ${(props) =>
		props.cardpreview
			? `linear-gradient(
			180deg,
			rgba(0, 0, 0, 0) 0%,
			rgba(123, 97, 255, 0.2) 87.53%
		),
		#202020;`
			: `unset`};
`;

const Switch = ({ test, children }) => {
	if (children) {
		return children.find((child) => {
			return child.props.switchId === test;
		});
	}

	return <></>;
};

const SwitchModal = ({ stateUtils, children, ...props }) => {
	const { className } = props;
	const { setter, getter } = stateUtils;

	const { show, content } = getter;

	const close = () => {
		//cant click outside to close modal
		if (cantClickOutside(content)) setter({ ...getter, show: false });

		return;
	};

	const cantClickOutside = () => {
		return [
			"confirmBuyNBmon",
			"emailSent",
			"newPasswordSet",
			"resetPassword",
		].includes(content);
	};

	const newPasswordModals = ["emailSent", "newPasswordSet", "resetPassword"];

	return (
		<StyledModal
			onHide={close}
			centered
			show={show}
			bigger={newPasswordModals.includes(content) ? 1 : 0}
			nominheight={
				newPasswordModals.includes(content) || content === "cancelListNBmon"
					? 1
					: 0
			}
		>
			<StyledModalBody
				className={`bg-darkGray text-white ${className && className}`}
				withborder={content === "cancelListNBmon" ? 1 : 0}
				bordercolor={content === "cancelListNBmon" ? `#FFB4A9` : `transparent`}
				nopadding={
					content === "videoPreview" ||
					content === "cardPreview" ||
					content === "listNBmon" ||
					content === "cancelListNBmon" ||
					content === "buyNBmon" ||
					content === "confirmBuyNBmon"
						? 1
						: 0
				}
				cardpreview={content === "cardPreview" ? 1 : 0}
			>
				<Switch test={content}>
					<MetamaskConfirmation
						stateUtils={stateUtils}
						switchId="metamaskConfirmation"
					/>

					{/*Genesis minting modals*/}
					<WaitTransaction switchId="waitTransaction" />
					<BeingMinted switchId="beingMinted" />
					<SuccessMinting switchId="successMinting" stateUtils={stateUtils} />
					<Error switchId="txError" stateUtils={stateUtils} />

					{/*Hatching modal*/}
					<UserConfirm switchId="userConfirmation" stateUtils={stateUtils} />
					<VideoPreview switchId="videoPreview" stateUtils={stateUtils} />
					<CardPreview switchId="cardPreview" stateUtils={stateUtils} />
					<WaitHatching switchId="waitHatching" />

					{/*New Password modal*/}
					<ForgotPassword switchId="forgotPassword" stateUtils={stateUtils} />
					<EmailSent switchId="emailSent" stateUtils={stateUtils} />
					<ResetPassword switchId="resetPassword" stateUtils={stateUtils} />
					<NewPasswordSet switchId="newPasswordSet" stateUtils={stateUtils} />

					{/*Marketplace Listing Modal*/}
					<SellNBMon switchId="listNBmon" stateUtils={stateUtils} />
					<CancelListing switchId="cancelListNBmon" stateUtils={stateUtils} />
					<BuyNBMon switchId="buyNBmon" stateUtils={stateUtils} />
					<ConfirmBuyNBMon switchId="confirmBuyNBmon" stateUtils={stateUtils} />
				</Switch>
			</StyledModalBody>
		</StyledModal>
	);
};

export default SwitchModal;
