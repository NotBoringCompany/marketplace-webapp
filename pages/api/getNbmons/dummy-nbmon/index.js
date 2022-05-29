import { mockData } from "../../../../utils/mockdata";

export default function handler(req, res) {
	if (req.method === "GET") {
		res.status(200).json({
			nbmonId: 3,
			owner: "3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5",
			hatchedAt: 1652992179,
			isHatchable: false,
			transferredAt: 1652991774,
			hatchingDuration: 300,
			strongAgainst: ["Water", "Earth", "Brawler", "Magic", "Reptile"],
			weakAgainst: ["Fire", "Wind", "Nature", "Spirit", "Toxic"],
			resistantTo: ["Water", "Earth", "Nature", "Magic", "Reptile"],
			vulnerableTo: ["Fire", "Electric", "Wind", "Frost", "Toxic"],
			gender: "Male",
			rarity: "Common",
			mutation: "Not mutated",
			mutationType: null,
			species: "Origin",
			genus: "Heree",
			genusDescription:
				"Heree has a strong connection with the forest, body made of leaves and sticks. Gets sick if he spends too much time in the city.",
			behavior: "Aggressive",
			fertility: "3000",
			fertilityDeduction: 1000,
			types: ["Nature", null],
			healthPotential: 14,
			energyPotential: 15,
			attackPotential: 16,
			defensePotential: 12,
			spAtkPotential: 0,
			spDefPotential: 8,
			speedPotential: 16,
			passives: ["Camouflage", "Wind Bracer"],
			isEgg: false,
		});
	} else {
		res.setHeader("Allow", ["GET"]);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
}
