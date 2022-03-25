import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

import Layout from "components/Layout";
import { useRouter } from "next/router";
import NBMonLargeCard from "components/NBMonLargeCard";
import Loading from "components/Loading";
import { replaceDummyForSingleNBMon } from "utils/replaceDummyNBmonAPIValue";
import NotFound from "pages/404";

const IndividualNBMon = () => {
	const { query, isReady } = useRouter();
	const [nbMon, setNbmon] = useState(null);
	const { nbmonId } = query;

	const { isFetching, isError } = useQuery(
		"individualNBMon",
		() =>
			fetch(
				`${
					process.env.NEXT_PUBLIC_REST_API_PREFIX_URL
				}/getNBMon?_ApplicationId=VWnxCyrXVilvNWnBjdnaJJdQGu7QzN4lJeu1teyg&id=${parseInt(
					nbmonId
				)}`
			).then(async (res) => {
				let fetchedData = await res.json();

				fetchedData = replaceDummyForSingleNBMon(fetchedData.result);
				setNbmon(fetchedData);
			}),
		{ refetchOnWindowFocus: false, enabled: isReady, retry: 1 }
	);

	if (isFetching || !isReady)
		return (
			<Layout title={`NBMon | Realm Hunter`}>
				<Loading />
			</Layout>
		);
	if (isError) return <NotFound />;

	return (
		<Layout title={`NBMon #${nbmonId} | Realm Hunter`}>
			<NBMonLargeCard nbMon={nbMon} />
		</Layout>
	);
};

export default IndividualNBMon;
