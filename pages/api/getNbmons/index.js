import { mockData } from "../../../utils/mockdata";

export default async function getNbmons(req, res) {
	if (req.method === "GET") {
		res.status(200).json(mockData);
	} else {
		res.setHeader("Allow", ["GET"]);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
}
