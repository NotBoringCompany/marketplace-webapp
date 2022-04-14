import React from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import MetamaskConfirmation from "components/GenesisMintingEvent/MintingSection/ModalContent/MetamaskConfirmation";
import BeingMinted from "components/GenesisMintingEvent/MintingSection/ModalContent/BeingMinted";
import SuccessMinting from "components/GenesisMintingEvent/MintingSection/ModalContent/SuccessMinting";
import Error from "components/GenesisMintingEvent/MintingSection/ModalContent/Error";
import WaitTransaction from "components/GenesisMintingEvent/MintingSection/ModalContent/WaitTransaction";

const StyledModal = styled(Modal)`
	& .modal-dialog {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	& .modal-content {
		border-radius: 28px;
		width: 312px;
		min-height: 320px;
	}
`;
const StyledModalBody = styled(Modal.Body)`
	padding: 32px;
	margin: 0;
	border-radius: 10px;
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

	// const renderContent = "metamaskConfirmation"

	return (
		<StyledModal onHide={close} centered show={show}>
			<StyledModalBody className={`bg-darkGray text-white ${className}`}>
				<Switch test={content}>
					<MetamaskConfirmation switchId="metamaskConfirmation" />
					<WaitTransaction switchId="waitTransaction" />
					<BeingMinted switchId="beingMinted" />
					<SuccessMinting switchId="successMinting" stateUtils={stateUtils} />
					<Error switchId="txError" stateUtils={stateUtils} />
				</Switch>
			</StyledModalBody>
		</StyledModal>
	);
};

export default SwitchModal;
