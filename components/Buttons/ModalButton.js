import styled from "styled-components";

const StyledButton = styled.button`
	background: none;
	color: ${(props) => props.color};
	border: none;
	font-weight: 300;
	font-size: 14px;
	line-height: 20px;
`;

const ModalButton = ({ color = "#67dbb1", ...props }) => {
	return <StyledButton color={color} {...props} />;
};

export default ModalButton;
