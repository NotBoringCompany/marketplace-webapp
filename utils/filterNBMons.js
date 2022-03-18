export default function filterNBMons(selectedFilters, rangeFilters, nbmons) {
	const preFiltered = nbmons.filter((nbmon) => {
		return Object.keys(selectedFilters).every(
			(key) => nbmon[key].toLowerCase() in selectedFilters[key]
		);
	});

	return preFiltered.filter((pfItem) => {
		return Object.keys(rangeFilters).every(
			(key) =>
				pfItem[key] >= rangeFilters[key].currentMin &&
				pfItem[key] <= rangeFilters[key].currentMax
		);
	});
}
