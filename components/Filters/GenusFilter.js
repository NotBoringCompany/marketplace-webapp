import React, { useState } from "react";
import CollapseFilter from "components/CollapseFilter";
import MyButton from "components/Buttons/Button";
import FilterModal from "components/Modal/FilterModal";
import { useFilterStore } from "stores/filterStore";
const GenusFilter = () => {
	const [showModal, setShowModal] = useState(false);
	const stateUtils = { getter: showModal, setter: setShowModal }; // getter + setter
	const genus = useFilterStore(
		(state) => state.availableFiltersWithImage.genus
	);
	return (
		<CollapseFilter id="genus" title="Genus">
			<FilterModal
				data={genus}
				title={"Select Genus"}
				stateUtils={stateUtils}
				kind={"genus"}
			/>
			<div className="mb-3" id={`collapse-filter-genus`}>
				<MyButton
					className="w-100"
					text={"Select Genus"}
					onClick={() => setShowModal(true)}
				/>
			</div>
		</CollapseFilter>
	);
};

export default GenusFilter;
