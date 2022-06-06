import React from "react";
import { TextPrimary } from "components/Typography/Texts";
import styled from "styled-components";

const RangeInput = ({
	min = 0,
	max = 0,
	onlyInteger = true,
	onChange = () => {},
	onBlur = () => {},
}) => {
	const handleChange = (e) => {
		let val = onlyInteger
			? parseInt(e.target.value)
			: parseFloat(e.target.value);
		if (isNaN(val)) val = "";
		if (val < 0) val = 0;
		onChange({ val, e });
	};

	return (
		<div className="mb-3 d-flex align-items-center justify-content-between">
			<CustomInput
				onChange={(e) => handleChange(e)}
				type="number"
				name="min"
				value={min}
				onBlur={onBlur}
				variant="dark"
			/>

			<TextPrimary className="mx-3">-</TextPrimary>

			<CustomInput
				onChange={(e) => handleChange(e)}
				type="number"
				name="max"
				value={max}
				onBlur={onBlur}
				variant="dark"
			/>
		</div>
	);
};

const CustomInput = styled.input`
	background: linear-gradient(
			0deg,
			rgba(255, 255, 255, 0.2),
			rgba(255, 255, 255, 0.2)
		),
		linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01)),
		#000000;
	border-radius: 3px;
	border: none;
	font-family: "Lexend";
	font-style: normal;
	font-weight: 700;
	font-size: 14px;
	line-height: 18px;
	text-align: center;
	color: #e1e3e0;
	padding: 10px 12px;
	max-width: 120px;
	width: 100%;

	&:hover {
		border: none;
		outline: none;
	}

	&:focus {
		border: none;
		outline: none;
	}
`;

export default RangeInput;
