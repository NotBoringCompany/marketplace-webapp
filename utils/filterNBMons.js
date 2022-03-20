export default function filterNBMons(selectedFilters, rangeFilters, nbmons) {
	const preFiltered = nbmons.filter((nbmon) => {
		return Object.keys(selectedFilters).every((key) => {
			return Object.keys(selectedFilters).every((key) => {
				if (Array.isArray(nbmon[key])) {
					return nbmon[key].some(
						(item) => item.toLowerCase() in selectedFilters[key]
					);
				} else {
					return nbmon[key].toLowerCase() in selectedFilters[key];
				}
			});
		});
	});

	return preFiltered.filter((pfItem) => {
		return Object.keys(rangeFilters).every(
			(key) =>
				pfItem[key] >= rangeFilters[key].currentMin &&
				pfItem[key] <= rangeFilters[key].currentMax
		);
	});
}
