import React, { useState } from "react";
import CollapseFilter from "components/CollapseFilter";
import CustomSlider from "./CustomSlider";
import RangeInput from "./RangeInput";
import { useFilterStore } from "stores/filterStore";

const FertilityFilter = () => {
	const fertilityRange = useFilterStore(
		(state) => state.rangeFilters.fertility
	);
	const [values, setValues] = useState([
		fertilityRange.min,
		fertilityRange.max,
	]);
	return (
		<CollapseFilter allowCollapse={false} id="fertility" title="Fertility">
			<div id={`collapse-filter-fertility`}>
				<p style={{ margin: 0, marginTop: -6 }}>&nbsp;</p>
				<CustomSlider
					max={3000}
					min={0}
					values={values}
					onChange={(v) => setValues(v)}
				/>
				<RangeInput min={values[0]} max={values[1]} />
			</div>
		</CollapseFilter>
	);
};

export default FertilityFilter;
