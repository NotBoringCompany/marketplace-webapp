import React from "react";
import styled from "styled-components";

const Card = styled.div`
	padding: 16px;
	display: flex;
	flex-direction: column;
	border-radius: 16px;

	p {
		margin: 0;
	}
`;
const NBMonPreviewCard = ({ nbMon }) => {
	return (
		<Card className="bg-gray text-white">
			<p>Genus: {nbMon.genus}</p>
			<p>Gender: {nbMon.gender}</p>
			<p>Rarity: {nbMon.rarity}</p>
			<p>Mutation: {nbMon.mutation.toString()}</p>
			<p>Species: {nbMon.species}</p>
			<p>Fertility: {nbMon.fertility}</p>
		</Card>
	);
};

export default NBMonPreviewCard;
