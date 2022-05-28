import { mockData } from "../../../../utils/mockdata";

export default function handler(req, res) {
	if (req.method === "GET") {
		const { address } = req.query;

		res.status(200).json({
			nbmonId: 6,
			owner: address,
			hatchedAt: 1653474160,
			isHatchable: false,
			transferredAt: 1653473181,
			hatchingDuration: 300,
			strongAgainst: ["Ordinary", "Water", "Nature", "Spirit", "Psychic"],
			weakAgainst: ["Fire", "Electric", "Earth", "Wind", "Brawler", "Magic"],
			resistantTo: [
				"Ordinary",
				"Water",
				"Electric",
				"Wind",
				"Frost",
				"Crystal",
				"Nature",
				"Brawler",
				"Psychic",
			],
			vulnerableTo: ["Fire", "Earth", "Spirit", "Magic", "Reptile", "Toxic"],
			gender: "Female",
			rarity: "Common",
			mutation: "Mutated",
			mutationType: "Water",
			species: "Origin",
			genus: "Lamox",
			genusDescription:
				"A combination of a fox and a dog. Lamoxes are very loyal to their owners but do not like too much physical touch. ",
			behavior: "Aggressive",
			fertility: "3000",
			fertilityDeduction: 1000,
			types: ["Spirit", "Electric"],
			healthPotential: 16,
			energyPotential: 0,
			attackPotential: 13,
			defensePotential: 11,
			spAtkPotential: 22,
			spDefPotential: 7,
			speedPotential: 0,
			passives: ["Resilient Fur", "Electric Bracer"],
			isEgg: false,
		});
	} else {
		res.setHeader("Allow", ["GET"]);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
}
