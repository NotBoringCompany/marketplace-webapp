const inSelectedFilter = (item, selectedFilter) => {
	if (item === null) return false;
	return item.toLowerCase() in selectedFilter;
};

export default function filterNBMonsWithPrice(
	selectedFilters,
	rangeFilters,
	price,
	nbmons
) {
	const preFiltered = nbmons.filter((nbmon) => {
		return Object.keys(selectedFilters).every((_) => {
			return Object.keys(selectedFilters).every((key) => {
				if (Array.isArray(nbmon[key])) {
					return nbmon[key].some((item) =>
						inSelectedFilter(item, selectedFilters[key])
					);
				} else {
					return nbmon[key] !== null
						? nbmon[key].toLowerCase() in selectedFilters[key]
						: false;
				}
			});
		});
	});

	const fertilityFiltered = preFiltered.filter((pfItem) => {
		return Object.keys(rangeFilters).every(
			(key) =>
				pfItem[key] >= rangeFilters[key].currentMin &&
				pfItem[key] <= rangeFilters[key].currentMax
		);
	});

	const x = fertilityFiltered.filter((item) => {
		return (
			item.priceEth >= price.currentMin && item.priceEth <= price.currentMax
		);
	});

	return x;
}
