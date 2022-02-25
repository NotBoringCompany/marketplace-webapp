import React from "react";
import CollapseFilter from "components/CollapseFilter";

const GenusFilter = () => {
	return (
		<CollapseFilter id="genus" title="Genus">
			<div id={`collapse-filter-genus`}>
				Here's the genus filter (WORK IN PROGRESS)
			</div>
		</CollapseFilter>
	);
};

export default GenusFilter;
