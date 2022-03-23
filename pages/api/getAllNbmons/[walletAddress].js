export default async function getAllNBmons(req, res) {
	if (req.method === "GET") {
		const mightBeDummy = new Set(["rarity", "mutation", "species", "genera"]);
		const keyValuePairDummy = {
			rarity: "uncommon",
			mutation: "mutated",
			species: "wild",
			genera: "birvo",
		};
		const { walletAddress } = req.query;
		const allNbmons = await fetch(
			`https://sxcvpb1zwixk.usemoralis.com:2053/server/functions/getOwnerNBMons?_ApplicationId=VWnxCyrXVilvNWnBjdnaJJdQGu7QzN4lJeu1teyg&address=${walletAddress}`
		);
		const data = await allNbmons.json();

		if (!allNbmons.ok) {
			console.log(data.code);
			res.status(400).json({ message: `Oopsie` });
		} else {
			data.result.map((item) => {
				for (let [key, value] of Object.entries(item)) {
					if (value.length === 1 && mightBeDummy.has(key)) {
						item[key] = keyValuePairDummy[key];
					}
				}
			});

			res.status(200).json({
				result: data.result,
			});
		}
	} else {
		res.setHeader("Allow", ["GET"]);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
}
