import { useState } from "react";
import Image from "next/image";
import Form from "react-bootstrap/Form";
import styled from "styled-components";
import { TextSecondary } from "components/Typography/Texts";

const StyledCheckBox = styled(Form.Check)`
	display: flex;
	align-items: center;
	position: absolute;
	top: 5px;
	right: 10px;
	border: none;
	margin: 0;
	padding: 0;

	& input {
		transition: all 100ms;
		background: #278b6c;
		width: 26px;
		height: 26px;
		border: none;
	}

	& input:hover {
		cursor: pointer;
	}

	& input:checked {
		background: #278b6c;
		border: none;
	}
`;

const Container = styled.div`
	width: 84px;
	height: 84px;
	display: flex;
	background: #42ca9f;
	position: relative;
	border-radius: 10px;
	transition: 0.35s all;
	&:hover {
		cursor: pointer;
		transform: scale(1) translate(1px, -3px);
	}

	& *:hover {
		cursor: pointer;
	}

	& img {
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
`;

const NameContainer = styled.div`
	height: 24px;
	width: 100%;
	background: #278b6c;
	bottom: 0;
	position: absolute;
	text-align: center;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
`;

const CheckBoxImage = ({ ...props }) => {
	const [checked, setChecked] = useState(false);

	const handleCheckboxClicked = () => {
		setChecked(!checked);
	};

	return (
		<Container onClick={handleCheckboxClicked}>
			<img src={props.imageURL} alt="NBMon" />
			<StyledCheckBox
				checked={checked}
				type={"checkbox"}
				onClick={handleCheckboxClicked}
				{...props}
				label=""
			/>
			<NameContainer>
				<TextSecondary as="label">{props.label}</TextSecondary>
			</NameContainer>
		</Container>
	);
};

export default CheckBoxImage;
