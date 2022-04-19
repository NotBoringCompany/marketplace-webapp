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

const StyledModal = styled(Modal)`
	& .modal-dialog {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	& .modal-content {
		border-radius: 30px;
		width: 312px;
		min-height: 320px;
	}
`;
const StyledModalBody = styled(Modal.Body)`
	padding: ${(props) => (props.nopadding ? `0` : `32px`)};
	margin: 0;
	border-radius: 28px;
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
		if (cantClickOutside(content)) return;
		setter({ ...getter, show: false });
	};

	const cantClickOutside = () => {
		return ["cardPreview", "videoPreview", "userConfirmation"].includes(
			content
		);
	};

	return (
		<StyledModal onHide={close} centered show={show}>
			<StyledModalBody
				className={`bg-darkGray text-white ${className && className}`}
				nopadding={
					content === "videoPreview" || content === "cardPreview" ? 1 : 0
				}
				cardpreview={content === "cardPreview" ? 1 : 0}
			>
				<Switch test={content}>
					{/*Genesis minting modals*/}
					<MetamaskConfirmation switchId="metamaskConfirmation" />
					<WaitTransaction switchId="waitTransaction" />
					<BeingMinted switchId="beingMinted" />
					<SuccessMinting switchId="successMinting" stateUtils={stateUtils} />
					<Error switchId="txError" stateUtils={stateUtils} />

					{/*Hatching modal*/}
					<UserConfirm switchId="userConfirmation" stateUtils={stateUtils} />
					<VideoPreview switchId="videoPreview" stateUtils={stateUtils} />
					<CardPreview switchId="cardPreview" />
				</Switch>
			</StyledModalBody>
		</StyledModal>
	);
};

export default SwitchModal;
