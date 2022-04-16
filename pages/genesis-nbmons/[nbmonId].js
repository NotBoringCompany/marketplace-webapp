import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

import Layout from "components/Layout";
import { useRouter } from "next/router";
import Loading from "components/Loading";
import NotFound from "pages/404";
import NewButton from "components/Buttons/NewButton";
import { FiArrowLeft } from "react-icons/fi";

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

	const { isFetching, isError, error } = useQuery(
		"individualNBMon",
		() =>
			fetch(
				`${
					process.env.NEXT_PUBLIC_NEW_REST_API_URL
				}/genesisNBMon/getGenesisNBMon/${parseInt(nbmonId)}`
			).then(async (res) => {
				let fetchedData = await res.json();

				// fetchedData = replaceDummyForSingleNBMon(fetchedData.result);
				// setNbmon(fetchedData);
			}),
		{ refetchOnWindowFocus: false, enabled: isReady, retry: 1 }
	);

	const handleBackBtnClick = () => {
		router.push("/nbmons");
	};

	if (isFetching || !isReady)
		return (
			<Layout title={`Genesis NBMon #... | Realm Hunter`}>
				<Loading />
			</Layout>
		);
	if (isError) {
		console.log(error);
		return <NotFound />;
	}

	return (
		<Layout title={`Genesis NBMon #${nbmonId} | Realm Hunter`}>
			<div className="position-relative">
				<BackBtnContainer onClick={handleBackBtnClick}>
					<NewButton
						icon={<FiArrowLeft className="me-2" />}
						isLink
						href="/nbmons"
						text="Inventory"
					/>
				</BackBtnContainer>
			</div>
		</Layout>
	);
};

export default IndividualNBMon;