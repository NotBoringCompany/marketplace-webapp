import React, { useState } from "react";
import CollapseFilter from "components/CollapseFilter";
import MyButton from "components/Buttons/Button";
import FilterModal from "components/Modal/FilterModal";
const GenusFilter = () => {
	const [showModal, setShowModal] = useState(false);
	const stateUtils = { getter: showModal, setter: setShowModal }; // getter + setter
	const genus = [
		{
			name: "Lamox",
			id: "lamox",
			imageUrl: "https://assets.thetanarena.com/skin/smallavatar/2.png",
		},
		{
			name: "Licorine",
			id: "licorine",
			imageUrl: "https://assets.thetanarena.com/skin/smallavatar/1000.png",
		},
		{
			name: "Birvo",
			id: "birvo",
			imageUrl: "https://assets.thetanarena.com/skin/smallavatar/1.png",
		},
		{
			name: "Dranexx",
			id: "dranexx",
			imageUrl: "https://assets.thetanarena.com/skin/smallavatar/8000.png",
		},
		{
			name: "Heree",
			id: "heree",
			imageUrl: "https://assets.thetanarena.com/skin/smallavatar/0.png",
		},
		{
			name: "Milnas",
			id: "milnas",
			imageUrl: "https://assets.thetanarena.com/skin/smallavatar/7000.png",
		},
	];
	return (
		<CollapseFilter id="genus" title="Genus">
			<FilterModal
				data={genus}
				title={"Select Genus"}
				stateUtils={stateUtils}
			/>
			<div className="mb-3" id={`collapse-filter-genus`}>
				<MyButton text={"Select Genus"} onClick={() => setShowModal(true)} />
			</div>
		</CollapseFilter>
	);
};

export default GenusFilter;
