import React, { useState } from "react";
import CollapseFilter from "components/CollapseFilter";
import MyButton from "components/Buttons/Button";
import FilterModal from "components/Modal/FilterModal";
import { useFilterStore } from "stores/filterStore";
import { genusImages } from "configs";
import styled from "styled-components";
import { TextSecondary } from "components/Typography/Texts";
const PreviewImage = styled.img`
	width: 32px;
	height: 32px;
	border-radius: 8px;
`;
const GenusFilter = () => {
	const [showModal, setShowModal] = useState(false);
	const stateUtils = { getter: showModal, setter: setShowModal }; // getter + setter
	const genus = useFilterStore(
		(state) => state.availableFiltersWithImage.genus
	);
	const selectedGenus = useFilterStore((state) =>
		state.selectedFilters.genus ? state.selectedFilters.genus : {}
	);
	return (
		<CollapseFilter id="genus" title="Genus">
			<FilterModal
				data={genus}
				title={"Select Genus"}
				stateUtils={stateUtils}
				kind={"genus"}
			/>
			<div className="mb-3">
				{Object.keys(selectedGenus).length > 0 ? (
					Object.keys(selectedGenus).map((g) => (
						<PreviewImage
							key={g}
							alt={g}
							src={genusImages[g].imageurl}
							width={32}
							height={32}
							className="me-2"
						/>
					))
				) : (
					<TextSecondary>NONE SELECTED</TextSecondary>
				)}
			</div>

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
