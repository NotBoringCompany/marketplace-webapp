import React, { useEffect, useState } from "react";
import CollapseFilter from "components/CollapseFilter";
import CustomSlider from "./CustomSlider";
import RangeInput from "./RangeInput";
import { useFilterStore } from "stores/filterStore";

const PriceFilter = () => {
	const fertilityRange = useFilterStore((state) => state.price);

	const clearingFilter = useFilterStore((state) => state.clearing);

	const setRangeFilter = useFilterStore((state) => state.setPriceRange);
	const [values, setValues] = useState([
		fertilityRange.currentMin,
		fertilityRange.currentMax,
	]);

	const [textInputValues, setTextInputValues] = useState([
		fertilityRange.currentMin,
		fertilityRange.currentMax,
	]);

	useEffect(() => {
		setRangeFilter({ min: values[0], max: values[1] });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values]);

	useEffect(() => {
		setValues([fertilityRange.currentMin, fertilityRange.currentMax]);
		setTextInputValues([fertilityRange.currentMin, fertilityRange.currentMax]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clearingFilter]);

	const onChange = ({ val, e }) => {
		if (e.target.name === "max") {
			setTextInputValues([textInputValues[0], val]);
			if (val > 10000) {
				setTextInputValues([textInputValues[0], 10000]);
				setValues([values[0], 10000]);
			} else if (val >= values[0]) {
				setValues([values[0], val]);
			}
		} else {
			console.log(e.target.value);
			setTextInputValues([val, textInputValues[1]]);
			if (val <= values[1] || isNaN(val)) {
				setValues([val, values[1]]);
			}
		}
	};

	const onBlur = () => {
		if (textInputValues[0] > values[1]) {
			if (parseFloat(textInputValues[1]) !== 0) {
				setValues([textInputValues[1] - 1, textInputValues[1]]);
				setTextInputValues([textInputValues[1] - 1, textInputValues[1]]);
			} else {
				setValues([textInputValues[1], textInputValues[1]]);
				setTextInputValues([textInputValues[1], textInputValues[1]]);
			}
		} else if (textInputValues[1] < values[0]) {
			setTextInputValues([values[0], values[0] + 1]);
			setValues([values[0], values[0] + 1]);
		}
	};

	return (
		<CollapseFilter allowCollapse={false} id="fertility" title="Price Range">
			<div id={`collapse-filter-fertility`}>
				<p style={{ margin: 0, marginTop: -6 }}>&nbsp;</p>
				<CustomSlider
					values={values}
					valuesMax={10000}
					onChange={(v) => {
						setValues(v);
						setTextInputValues(v);
					}}
				/>
				<RangeInput
					onlyInteger={false}
					onChange={onChange}
					onBlur={onBlur}
					min={textInputValues[0]}
					max={textInputValues[1]}
				/>
			</div>
		</CollapseFilter>
	);
};

export default PriceFilter;
