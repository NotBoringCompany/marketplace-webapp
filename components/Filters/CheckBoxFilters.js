import React, { useState, useEffect } from "react";
import CollapseFilter from "components/CollapseFilter";
import { useFilterStore } from "stores/filterStore";
import CheckBoxIcon from "./CheckBoxIcon";
import styled from "styled-components";

const CheckBoxFilters = () => {
	const availableFilters = useFilterStore((state) => state.availableFilters);
	return (
		<>
			{Object.keys(availableFilters).map((kind) => (
				<CollapseFilter key={kind} id={kind} title={kind}>
					<ListCheckbox id={`collapse-filter-${kind}`}>
						{availableFilters[kind].map((item) => (
						<ListItem key={item}>
							<IndividualCheckBox item={item} kind={kind} />
						</ListItem>
						))}
					</ListCheckbox>
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
	<>
		<CheckBoxIcon
			key={item}
			onChange={(e) => handleClicked(e)}
			type={"checkbox"}
			name={kind}
			checked={checked}
			id={`${kind}-${item}`}
			value={item}
			label={item.toString().toUpperCase()}
		/>
	</>
	);
};

const ListCheckbox = styled.ul`
	list-style: none;
	margin: 0 !important;
	padding: 0 !important;
	display: flex;
	flex-flow: row wrap;
`

const ListItem = styled.li`
	flex: 0 1 auto;
	width: 50%;
	padding-bottom: 8px;

	&:nth-child(odd) {
		padding-right: 4px;
	}

	&:nth-child(even) {
		padding-left: 4px;
	}
`

export default CheckBoxFilters;
