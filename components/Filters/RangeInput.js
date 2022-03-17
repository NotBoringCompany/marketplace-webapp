import React from "react";
import TextInput from "components/FormInputs/TextInput";
import { TextPrimary } from "components/Typography/Texts";

const RangeInput = ({ min = 0, max = 0, onChange = () => {} }) => {
	return (
		<div className="mb-3 d-flex align-items-center justify-content-between">
			<TextInput
				onChange={(e) => onChange(e)}
				type="number"
				name="min"
				value={min}
				variant="dark"
			/>
			<TextPrimary className="mx-3">-</TextPrimary>
			<TextInput
				onChange={(e) => onChange(e)}
				type="number"
				name="max"
				value={max}
				variant="dark"
			/>
		</div>
	);
};

export default RangeInput;
