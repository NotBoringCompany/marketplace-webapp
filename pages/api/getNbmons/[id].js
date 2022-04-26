import { mockData } from "../../../utils/mockdata";

export default function handler(req, res) {
	if (req.method === "GET") {
		const { id } = req.query;
		const result = mockData.filter((mD) => mD.nbmonId === parseInt(id));
		if (result.length) {
			res.status(200).json(result[0]);
		} else {
			res.status(404).json({ messsage: "not found" });
		}
	} else {
		res.setHeader("Allow", ["GET"]);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
}
