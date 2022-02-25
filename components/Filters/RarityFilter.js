import React from "react";
import CollapseFilter from "components/CollapseFilter";
import CheckBox from "./CheckBox";
const RarityFilter = () => {
	return (
		<CollapseFilter id="rarity" title="Rarity">
			<div className="d-flex flex-wrap" id={`collapse-filter-rarity`}>
				<CheckBox type={"checkbox"} label="COMMON" />
				<CheckBox type={"checkbox"} label="UNCOMMON" />
				<CheckBox type={"checkbox"} label="RARE" />
				<CheckBox type={"checkbox"} label="EPIC" />
				<CheckBox type={"checkbox"} label="LEGENDARY" />
				<CheckBox type={"checkbox"} label="MYTHICAL" />
			</div>
		</CollapseFilter>
	);
};

export default RarityFilter;
