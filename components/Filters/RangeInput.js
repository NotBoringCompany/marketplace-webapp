import React from "react";
import TextInput from "components/FormInputs/TextInput";
import { TextPrimary } from "components/Typography/Texts";

const RangeInput = ({ min = 0, max = 0 }) => {
	return (
		<div className="mb-3 d-flex align-items-center justify-content-between">
			<TextInput type="number" value={min} variant="dark" />
			<TextPrimary className="mx-3">-</TextPrimary>
			<TextInput type="number" value={max} variant="dark" />
		</div>
	);
};

export default RangeInput;
