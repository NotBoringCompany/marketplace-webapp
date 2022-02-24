import React from "react";
import { useRouter } from "next/router";

const Artifacts = () => {
	const router = useRouter();
	return <div>{router.pathname}</div>;
};

export default Artifacts;
