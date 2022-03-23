const mightBeDummy = new Set(["rarity", "mutation", "species", "genera"]);
const keyValuePairDummy = {
	rarity: "uncommon",
	mutation: "mutated",
	species: "wild",
	genera: "birvo",
};
export default function replaceDummy(data) {
	data.result.map((item) => {
		let types = [];

		Object.keys(item).forEach((key) => {
			const value = item[key];
			if (value.length === 1 && mightBeDummy.has(key)) {
				return (item[key] = keyValuePairDummy[key]);
			} else if (key === "firstType" || key === "secondType") {
				types.push(
					value === "N/A" ? (key === "firstType" ? "nature" : "fire") : value
				);
			}
		});
		return (item.types = types);
	});

	return data;
}
