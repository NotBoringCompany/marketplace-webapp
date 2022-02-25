import React from "react";
import CollapseFilter from "components/CollapseFilter";

const TypesFilter = () => {
	return (
		<CollapseFilter id="types" title="Types">
			<div id={`collapse-filter-types`}>Here's the types filter</div>
		</CollapseFilter>
	);
};

export default TypesFilter;
