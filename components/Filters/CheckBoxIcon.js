import React from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Image from "next/image";

/**
 * Props:
 * @param ChangeEventHandler onChange
 * @param string type
 * @param string name
 * @param boolean checked
 * @param string id
 * @param string value
 * @param string label
 * @returns JSX.Element
 */
const CheckBoxIcon = ({
	onChange,
	type = "checkbox",
	name,
	checked,
	id,
	value,
	label,
}) => {
	return (
		<CheckboxWrap>
			<CheckboxInput>
				<CheckBox
					onChange={onChange}
					type={type}
					name={name}
					checked={checked}
					id={id}
					value={value}
				/>
			</CheckboxInput>

			<BoxText>
				<Image
					src={`/images/${label.toLowerCase().replace(" ", "_")}.svg`}
					width={18}
					alt={label.toLowerCase()}
					height={18}
				/>

				<Text className="ms-1 mt-1">{label}</Text>
			</BoxText>
		</CheckboxWrap>
	);
};

const CheckboxWrap = styled.div`
	display: flex;
	align-items: center;
`;

const CheckBox = styled(Form.Check)`
	display: flex;
	align-items: center;
	margin-right: 0;
	margin-bottom: 0;
	& input {
		transition: all 100ms;
		background: transparent;
		width: 16px;
		height: 16px;
		border: 2px solid #89938d;
	}

	& input:hover {
		cursor: pointer;
		border: 2px solid #42ca9f;
	}

	& input:checked {
		background: #42ca9f;
		border: 2px solid #42ca9f;
	}

	& label {
		margin-top: 7px;
		margin-left: 12px;
	}
`;

const CheckboxInput = styled.div`
	flex: 0 1 auto;
	padding-right: 8px;
`;

const BoxText = styled.div`
	background: linear-gradient(
			0deg,
			rgba(255, 255, 255, 0.2),
			rgba(255, 255, 255, 0.2)
		),
		linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01)),
		#000000;
	border-radius: 23px;
	padding: 6px 12px;
	padding-bottom: 7px;
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
`;

const Text = styled.span`
	font-family: "Lexend";
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 16px;
	letter-spacing: 0.5px;
	color: #e1e3e0;
`;

const BoxIcon = styled.div`
	flex: 0 1 auto;
	padding-right: 4px;
`;

export default CheckBoxIcon;
