import React, { useEffect, useState } from "react";
import CollapseFilter from "components/CollapseFilter";
import CustomSlider from "./CustomSlider";
import RangeInput from "./RangeInput";
import { useFilterStore } from "stores/filterStore";

const FertilityFilter = () => {
	const fertilityRange = useFilterStore(
		(state) => state.rangeFilters.fertility
	);

	const clearingFilter = useFilterStore((state) => state.clearing);

	const setRangeFilter = useFilterStore((state) => state.setRangeFilter);
	const [values, setValues] = useState([
		fertilityRange.currentMin,
		fertilityRange.currentMax,
	]);

	const [textInputValues, setTextInputValues] = useState([
		fertilityRange.currentMin,
		fertilityRange.currentMax,
	]);

	useEffect(() => {
		setRangeFilter({ prop: "fertility", min: values[0], max: values[1] });
	}, [values]);

	useEffect(() => {
		setValues([fertilityRange.currentMin, fertilityRange.currentMax]);
		setTextInputValues([fertilityRange.currentMin, fertilityRange.currentMax]);
	}, [clearingFilter]);

	const onChange = ({ val, e }) => {
		if (e.target.name === "max") {
			setTextInputValues([textInputValues[0], val]);
			if (val > 3000) {
				setTextInputValues([textInputValues[0], 3000]);
				setValues([values[0], 3000]);
			} else if (val >= values[0]) {
				setValues([values[0], val]);
			}
		} else {
			setTextInputValues([val, textInputValues[1]]);
			if (val <= values[1] || isNaN(val)) {
				setValues([val, values[1]]);
			}
		}
	};

	const onBlur = () => {
		if (textInputValues[0] > values[1]) {
			if (parseInt(textInputValues[1]) !== 0) {
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
		<CollapseFilter allowCollapse={false} id="fertility" title="Fertility">
			<div id={`collapse-filter-fertility`}>
				<p style={{ margin: 0, marginTop: -6 }}>&nbsp;</p>
				<CustomSlider
					values={values}
					onChange={(v) => {
						setValues(v);
						setTextInputValues(v);
					}}
				/>
				<RangeInput
					onChange={onChange}
					onBlur={onBlur}
					min={textInputValues[0]}
					max={textInputValues[1]}
				/>
			</div>
		</CollapseFilter>
	);
};

export default FertilityFilter;
