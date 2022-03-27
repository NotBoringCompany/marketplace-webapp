import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

import Layout from "components/Layout";
import { useRouter } from "next/router";
import NBMonLargeCard from "components/NBMonLargeCard";
import Loading from "components/Loading";
import { replaceDummyForSingleNBMon } from "utils/replaceDummyNBmonAPIValue";
import NotFound from "pages/404";

import { FaChevronLeft } from "react-icons/fa";
import { TextSecondary } from "components/Typography/Texts";

import { mediaBreakpoint } from "utils/breakpoints";

const BackBtnContainer = styled.div`
	position: absolute;
	right: calc(48% + 500px);
	top: 120px;
	display: flex;
	align-items: center;

	& svg {
		font-size: 21px;
		color: #fff;
	}

	& p {
		font-size: 21px;
	}

	&:hover {
		cursor: pointer;
	}

	@media ${mediaBreakpoint.down.xl} {
		margin-top: 48px;
		margin-bottom: 0px;
		margin-left: 0;
		position: static;
		justify-content: center;
	}
`;

const IndividualNBMon = () => {
	const { query, isReady } = useRouter();
	const router = useRouter();
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

	const handleBackBtnClick = () => {
		router.push("/nbmons");
	};

	if (isFetching || !isReady)
		return (
			<Layout title={`NBMon #... | Realm Hunter`}>
				<Loading />
			</Layout>
		);
	if (isError) return <NotFound />;

	return (
		<Layout title={`NBMon #${nbmonId} | Realm Hunter`}>
			<div className="position-relative">
				<BackBtnContainer onClick={handleBackBtnClick}>
					<FaChevronLeft className="me-2" />
					<TextSecondary className="text-white">Back</TextSecondary>
				</BackBtnContainer>
				<NBMonLargeCard nbMon={nbMon} />
			</div>
		</Layout>
	);
};

export default IndividualNBMon;
