import React, { useState } from "react";
import CollapseFilter from "components/CollapseFilter";
import FilterModal from "components/Modal/FilterModal";
import { useFilterStore } from "stores/filterStore";
import { data as configData } from "configs";
import styled from "styled-components";

const PreviewImage = styled.img`
	width: 32px;
	height: 32px;
	border-radius: 8px;
`;

const TextNoneSelected = styled.span`
	font-family: 'Mada';
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
	line-height: 16px;
	letter-spacing: 0.4px;
	color: #BFC9C2;
	display: block;
	text-align: center;
`

const ButtonSelect = styled.button`
	padding: 10px 16px;
	position: static;
	left: 0%;
	right: 0%;
	top: 0%;
	bottom: 0%;
	background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(0deg, rgba(103, 219, 177, 0.01), rgba(103, 219, 177, 0.01)), #000000;
	border-radius: 100px;
	border: none;
	width: 100%;
	font-family: 'Mada';
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: 0.1px;
	color: #BFC9C2;
`

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
				title={`Select ${kind === "genera" ? "Genus" : kind}`}
				stateUtils={stateUtils}
				kind={kind}
			/>

			<div className="mb-1">
				{Object.keys(selectedFilters).length > 0 ? (
					Object.keys(selectedFilters).map((g) => (
						<PreviewImage
							key={g}
							alt={g}
							src={
								configData[kind]
									? configData[kind][g.toLowerCase()].imageurl
									: configData.default.imageurl
							}
							width={32}
							height={32}
							className="me-2"
						/>
					))
				) : (
					<TextNoneSelected>None Selected</TextNoneSelected>
				)}
			</div>

			<div className="mb-3" id={`collapse-filter-${kind}`}>
				<ButtonSelect
					onClick={() => setShowModal(true)}
				>
					Select {
						kind === "genera"
						? "Genus"
						: `${kind.split("")[0].toUpperCase()}${kind
							.split("")
							.splice(1)
							.join("")}`
					}
				</ButtonSelect>
			</div>
		</CollapseFilter>
	);
};

export default FiltersWithModal;
