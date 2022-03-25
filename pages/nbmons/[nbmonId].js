import React from "react";
import Layout from "components/Layout";
import { useRouter } from "next/router";
const IndividualNBMon = () => {
	const router = useRouter();
	const { nbmonId } = router.query;
	console.log(router.query);
	return <Layout title="Account Page | Realm Hunter">{nbmonId}</Layout>;
};

export default IndividualNBMon;
