import React from "react";
import CollapseFilter from "components/CollapseFilter";
import CheckBox from "./CheckBox";
const GenderFilter = () => {
	return (
		<CollapseFilter id="gender" title="Gender">
			<div className="d-grid" id={`collapse-filter-gender`}>
				<CheckBox type={"checkbox"} label="MALE" />
				<CheckBox type={"checkbox"} label="FEMALE" />
			</div>
		</CollapseFilter>
	);
};

export default GenderFilter;
