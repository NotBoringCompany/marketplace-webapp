import React from "react";
import CollapseFilter from "components/CollapseFilter";
import CheckBox from "./CheckBox";
const MutationFilter = () => {
	return (
		<CollapseFilter id="mutation" title="Mutation">
			<div className="d-grid" id={`collapse-filter-mutation`}>
				<CheckBox type={"checkbox"} label="NOT MUTATED" />
				<CheckBox type={"checkbox"} label="MUTATED" />
			</div>
		</CollapseFilter>
	);
};

export default MutationFilter;
