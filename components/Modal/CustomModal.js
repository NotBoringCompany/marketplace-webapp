import React from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import { MdOutlineClose } from "react-icons/md";

const StyledModal = styled(Modal)`
	& .modal-content {
		border-radius: 16px;
	}
`;
const StyledModalBody = styled(Modal.Body)`
	padding: 32px;
	margin: 0;
	border-radius: 10px;
	box-shadow: 3px 5px 32px rgba(173, 173, 173, 0.25);
	& .close {
		font-size: 32px;
		margin-left: auto;
	}

	& .close:hover{
		cursor: pointer;
	}
	
}

`;

const CustomModal = ({ stateUtils, children, ...props }) => {
	const { className } = props;
	const { setter, getter } = stateUtils;

	const close = () => {
		setter(false);
	};

	return (
		<StyledModal centered show={getter}>
			<StyledModalBody className={`bg-darkGray text-white ${className}`}>
				<MdOutlineClose className="close text-white mb-1" onClick={close} />
				{children}
			</StyledModalBody>
		</StyledModal>
	);
};

export default CustomModal;
