import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import styled from "styled-components";

import Layout from "components/Layout";

import NewButton from "components/Buttons/NewButton";
import { FiArrowLeft } from "react-icons/fi";
import DummyNBMonLargeCard from "components/NBMonLargeCard/DummyNBMonLargeCard";

import { mediaBreakpoint } from "utils/breakpoints";

import mustBeAuthed from "utils/mustBeAuthed";

export const BackBtnContainer = styled.div`
	position: absolute;
	right: calc(48% + 500px);
	top: 60px;
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
	const [nbMon, setNbmon] = useState({
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
		priceEth: 1,
	});
	const { isAuthenticated, user } = useMoralis();

	return (
		<Layout title={`Genesis NBMon | Realm Hunter`}>
			<div className="position-relative">
				{isAuthenticated && (
					<BackBtnContainer>
						<NewButton
							icon={<FiArrowLeft className="me-2" />}
							isLink
							href="/preview-marketplace"
							text="Marketplace"
						/>
					</BackBtnContainer>
				)}

				<DummyNBMonLargeCard
					dummy
					isListed
					nbMon={nbMon}
					setNbmon={setNbmon}
					userAddress={user ? user.attributes.ethAddress : null}
				/>
			</div>
		</Layout>
	);
};

export default mustBeAuthed(IndividualNBMon);
