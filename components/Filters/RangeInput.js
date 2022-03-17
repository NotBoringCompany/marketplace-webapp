import React from "react";
import TextInput from "components/FormInputs/TextInput";
import { TextPrimary } from "components/Typography/Texts";

const RangeInput = ({
	min = 0,
	max = 0,
	onChange = () => {},
	onBlur = () => {},
}) => {
	const handleChange = (e) => {
		let val = parseInt(e.target.value);
		if (isNaN(val)) val = "";
		if (val < 0) val = 0;
		onChange({ val, e });
	};

	return (
		<div className="mb-3 d-flex align-items-center justify-content-between">
			<TextInput
				onChange={(e) => handleChange(e)}
				type="number"
				name="min"
				value={min}
				onBlur={onBlur}
				variant="dark"
			/>
			<TextPrimary className="mx-3">-</TextPrimary>
			<TextInput
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

export default RangeInput;
