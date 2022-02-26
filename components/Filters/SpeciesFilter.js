import React from "react";
import CollapseFilter from "components/CollapseFilter";
import CheckBox from "./CheckBox";
const SpeciesFilter = () => {
	return (
		<CollapseFilter id="species" title="Species">
			<div className="d-grid" id={`collapse-filter-species`}>
				<CheckBox type={"checkbox"} label="ORIGIN" />
				<CheckBox type={"checkbox"} label="HYBRID" />
				<CheckBox type={"checkbox"} label="WILD" />
			</div>
		</CollapseFilter>
	);
};

export default SpeciesFilter;
