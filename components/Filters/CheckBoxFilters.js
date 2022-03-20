import React, { useState, useEffect } from "react";
import CollapseFilter from "components/CollapseFilter";
import CheckBox from "./CheckBox";
import { useFilterStore } from "stores/filterStore";
const CheckBoxFilters = () => {
	const availableFilters = useFilterStore((state) => state.availableFilters);
	return (
		<>
			{Object.keys(availableFilters).map((kind) => (
				<CollapseFilter key={kind} id={kind} title={kind}>
					<div className="d-grid" id={`collapse-filter-${kind}`}>
						{availableFilters[kind].map((item) => (
							<IndividualCheckBox item={item} kind={kind} key={item} />
						))}
					</div>
				</CollapseFilter>
			))}
		</>
	);
};

const IndividualCheckBox = ({ item, kind }) => {
	const addFilter = useFilterStore((state) => state.addFilter);
	const removeFilter = useFilterStore((state) => state.removeFilter);
	const clearingFilter = useFilterStore((state) => state.clearing);

	const allSelectedKind = useFilterStore((state) =>
		state.selectedFilters[kind] ? state.selectedFilters[kind] : {}
	);

	const [checked, setChecked] = useState(false);

	useEffect(() => {
		setChecked(false);
	}, [clearingFilter]);

	useEffect(() => {
		if (Object.keys(allSelectedKind).length > 0) {
			const isChecked = Object.keys(allSelectedKind).includes(item);
			setChecked(isChecked);
		}
	}, []);

	const handleClicked = (e) => {
		setChecked(e.target.checked);
		if (e.target.checked) {
			addFilter({ prop: kind, item: e.target.value });
		} else {
			removeFilter({ prop: kind, item: e.target.value });
		}
	};
	return (
		<CheckBox
			key={item}
			onChange={(e) => handleClicked(e)}
			type={"checkbox"}
			name={kind}
			checked={checked}
			id={`${kind}-${item}`}
			value={item}
			label={
				item.toString() === "not_mutated"
					? "NOT MUTATED"
					: item.toString().toUpperCase()
			}
		/>
	);
};

export default CheckBoxFilters;
