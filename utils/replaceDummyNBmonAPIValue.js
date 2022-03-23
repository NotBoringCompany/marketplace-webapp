const mightBeDummy = new Set(["rarity", "mutation", "species", "genera"]);
const keyValuePairDummy = {
	rarity: "uncommon",
	mutation: "mutated",
	species: "wild",
	genera: "birvo",
};
export default function replaceDummy(data) {
	data.result.map((item) => {
		Object.keys(item).forEach((key) => {
			if (item[key].length === 1 && mightBeDummy.has(key)) {
				return (item[key] = keyValuePairDummy[key]);
			}
		});
	});

	return data;
}
