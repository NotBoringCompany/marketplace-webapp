import React, { useState } from "react";
import CollapseFilter from "components/CollapseFilter";
import CheckBox from "./CheckBox";
import { useFilterStore } from "stores/filterStore";
const GenderFilter = () => {
	const addFilter = useFilterStore((state) => state.addFilter);
	const removeFilter = useFilterStore((state) => state.removeFilter);
	const availableFilters = useFilterStore((state) => state.availableFilters);
	const [checked, setChecked] = useState(
		availableFilters.gender.map((g) => {
			return { id: `gender-${g}`, checked: false };
		})
	);
	const handleClicked = (e) => {
		let newArr = [...checked].filter((c) => c.id !== e.target.id);
		setChecked([...newArr, { id: e.target.id, checked: e.target.checked }]);

		if (e.target.checked) {
			addFilter({ prop: "gender", item: e.target.value });
		} else {
			removeFilter({ prop: "gender", item: e.target.value });
		}
	};
	return (
		<CollapseFilter id="gender" title="Gender">
			<div className="d-grid" id={`collapse-filter-gender`}>
				{availableFilters.gender.map((g) => (
					<>
						<CheckBox
							onChange={(e) => handleClicked(e)}
							type={"checkbox"}
							name="gender"
							checked={checked[`gender-${g}`] && checked[`gender-${g}`].checked}
							id={`gender-${g}`}
							value={g}
							label={g.toString().toUpperCase()}
						/>
					</>
				))}
			</div>
		</CollapseFilter>
	);
};

export default GenderFilter;
