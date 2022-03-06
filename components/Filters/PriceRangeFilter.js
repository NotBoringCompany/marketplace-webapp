import React, { useState } from "react";
import CollapseFilter from "components/CollapseFilter";
import CustomSlider from "./CustomSlider";
import RangeInput from "./RangeInput";

const PriceRangeFilter = () => {
	const [values, setValues] = useState([0, 1]);

	return (
		<CollapseFilter id="pricerange" title="Price Range (WBNB)">
			<div id={`collapse-filter-pricerange`}>
				<p style={{ margin: 0, marginTop: -16 }}>&nbsp;</p>
				<RangeInput min={values[0]} max={values[1]} />
			</div>
		</CollapseFilter>
	);
};

export default PriceRangeFilter;
