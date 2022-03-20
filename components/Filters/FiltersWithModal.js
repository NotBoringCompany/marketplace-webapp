import React, { useState } from "react";
import CollapseFilter from "components/CollapseFilter";
import MyButton from "components/Buttons/Button";
import FilterModal from "components/Modal/FilterModal";
import { useFilterStore } from "stores/filterStore";
import { images } from "configs";
import styled from "styled-components";
import { TextSecondary } from "components/Typography/Texts";
const PreviewImage = styled.img`
	width: 32px;
	height: 32px;
	border-radius: 8px;
`;

const FiltersWithModal = () => {
	const availableFiltersWithImage = useFilterStore(
		(state) => state.availableFiltersWithImage
	);

	return (
		<>
			{Object.keys(availableFiltersWithImage).map((k) => (
				<CheckBoxFiltersWithImage
					key={k}
					kind={k}
					data={availableFiltersWithImage[k]}
				/>
			))}
		</>
	);
};

const CheckBoxFiltersWithImage = ({ data, kind }) => {
	const [showModal, setShowModal] = useState(false);
	const stateUtils = { getter: showModal, setter: setShowModal }; // getter + setter

	const selectedFilters = useFilterStore((state) =>
		state.selectedFilters[kind] ? state.selectedFilters[kind] : {}
	);
	return (
		<CollapseFilter id={kind} title={kind}>
			<FilterModal
				data={data}
				title={`Select ${kind}`}
				stateUtils={stateUtils}
				kind={kind}
			/>
			<div className="mb-3">
				{Object.keys(selectedFilters).length > 0 ? (
					Object.keys(selectedFilters).map((g) => (
						<PreviewImage
							key={g}
							alt={g}
							src={
								images[kind]
									? images[kind][g.toLowerCase()].imageurl
									: images.default.imageurl
							}
							width={32}
							height={32}
							className="me-2"
						/>
					))
				) : (
					<TextSecondary>NONE SELECTED</TextSecondary>
				)}
			</div>

			<div className="mb-3" id={`collapse-filter-${kind}`}>
				<MyButton
					className="w-100"
					text={`Select ${kind.split("")[0].toUpperCase()}${kind
						.split("")
						.splice(1)
						.join("")}`}
					onClick={() => setShowModal(true)}
				/>
			</div>
		</CollapseFilter>
	);
};

export default FiltersWithModal;
