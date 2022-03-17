import { useFilterStore } from "stores/filterStore";

export const handleClick = (e, kind, setChecked) => {
	const addFilter = useFilterStore((state) => state.addFilter);
	const removeFilter = useFilterStore((state) => state.removeFilter);

	let newArr = [...checked].filter((c) => c.id !== e.target.id);
	setChecked([...newArr, { id: e.target.id, checked: e.target.checked }]);

	if (e.target.checked) {
		addFilter({ prop: kind, item: e.target.value });
	} else {
		removeFilter({ prop: kind, item: e.target.value });
	}
};
