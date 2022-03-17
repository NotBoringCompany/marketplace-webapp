import React, { useState, useEffect } from "react";
import CollapseFilter from "components/CollapseFilter";
import CheckBox from "./CheckBox";
import { useFilterStore } from "stores/filterStore";
const CheckBoxFilters = () => {
	const availableFilters = useFilterStore((state) => state.availableFilters);
	return (
		<>
			{Object.keys(availableFilters).map((k) => (
				<CheckBoxesCollapse
					kind={k}
					availableFilters={availableFilters}
					key={k}
				/>
			))}
		</>
	);
};

const CheckBoxesCollapse = ({ kind, availableFilters }) => {
	const addFilter = useFilterStore((state) => state.addFilter);
	const removeFilter = useFilterStore((state) => state.removeFilter);
	const selectedFilters = useFilterStore((state) => state.selectedFilters);

	const [checked, setChecked] = useState(
		availableFilters[kind].map((g) => {
			return { id: `${kind}-${g}`, checked: false };
		})
	);

	useEffect(() => {
		if (Object.keys(selectedFilters).length === 0)
			setChecked(
				availableFilters[kind].map((g) => {
					return { id: `${kind}-${g}`, checked: false };
				})
			);
	}, [selectedFilters]);

	const handleClicked = (e) => {
		let newArr = [...checked].filter((c) => c.id !== e.target.id);
		setChecked([...newArr, { id: e.target.id, checked: e.target.checked }]);

		if (e.target.checked) {
			addFilter({ prop: kind, item: e.target.value });
		} else {
			removeFilter({ prop: kind, item: e.target.value });
		}
	};

	return (
		<CollapseFilter id={kind} title={kind}>
			<div className="d-grid" id={`collapse-filter-${kind}`}>
				{availableFilters[kind].map((item) => (
					<CheckBox
						key={item}
						onChange={(e) => handleClicked(e)}
						type={"checkbox"}
						name="gender"
						checked={checked.find((c) => c.id === `${kind}-${item}`).checked}
						id={`${kind}-${item}`}
						value={item}
						label={
							item.toString() === "not_mutated"
								? "NOT MUTATED"
								: item.toString().toUpperCase()
						}
					/>
				))}
			</div>
		</CollapseFilter>
	);
};

export default CheckBoxFilters;
