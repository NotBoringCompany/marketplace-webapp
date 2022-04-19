import React from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import MetamaskConfirmation from "components/NewModalContents/GenesisMinting/MetamaskConfirmation";
import BeingMinted from "components/NewModalContents/GenesisMinting/BeingMinted";
import SuccessMinting from "components/NewModalContents//GenesisMinting/SuccessMinting";
import Error from "components/NewModalContents/GenesisMinting/Error";
import WaitTransaction from "components/NewModalContents/GenesisMinting/WaitTransaction";
import UserConfirm from "components/NewModalContents/Hatching/UserConfirm";

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
	padding: 32px;
	margin: 0;
	border-radius: 28px;
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
		setter({ ...getter, show: false });
	};

	return (
		<StyledModal onHide={close} centered show={show}>
			<StyledModalBody className={`bg-darkGray text-white ${className}`}>
				<Switch test={content}>
					{/*Genesis minting modals*/}
					<MetamaskConfirmation switchId="metamaskConfirmation" />
					<WaitTransaction switchId="waitTransaction" />
					<BeingMinted switchId="beingMinted" />
					<SuccessMinting switchId="successMinting" stateUtils={stateUtils} />
					<Error switchId="txError" stateUtils={stateUtils} />

					{/*Hatching modal*/}
					<UserConfirm switchId="userConfirmation" stateUtils={stateUtils} />
				</Switch>
			</StyledModalBody>
		</StyledModal>
	);
};

export default SwitchModal;
