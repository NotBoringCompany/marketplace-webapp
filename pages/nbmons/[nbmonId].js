import React from "react";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import NBMonLargeCard from "components/NBMonLargeCard";
const IndividualNBMon = () => {
	const router = useRouter();
	const { nbmonId } = router.query;
	console.log(router.query);
	return (
		<Layout title="Account Page | Realm Hunter">
			<NBMonLargeCard />
		</Layout>
	);
};

export default IndividualNBMon;
