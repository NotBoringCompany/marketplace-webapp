import React, { useEffect, useState } from "react";
import CollapseFilter from "components/CollapseFilter";
import CustomSlider from "./CustomSlider";
import RangeInput from "./RangeInput";
import { useFilterStore } from "stores/filterStore";

const FertilityFilter = () => {
	const fertilityRange = useFilterStore(
		(state) => state.rangeFilters.fertility
	);
	const [values, setValues] = useState([
		fertilityRange.currentMin,
		fertilityRange.currentMax,
	]);

	const onChange = (e) => {
		e.preventDefault();
		const val = parseInt(e.target.value);
		if (e.target.name === "max") {
			setValues([values[0], val]);
		} else {
			setValues([val, values[1]]);
		}
	};

	return (
		<CollapseFilter allowCollapse={false} id="fertility" title="Fertility">
			<div id={`collapse-filter-fertility`}>
				<p style={{ margin: 0, marginTop: -6 }}>&nbsp;</p>
				<CustomSlider values={values} onChange={(v) => setValues(v)} />
				<RangeInput
					onChange={(e) => onChange(e)}
					min={values[0]}
					max={values[1]}
				/>
			</div>
		</CollapseFilter>
	);
};

export default FertilityFilter;
