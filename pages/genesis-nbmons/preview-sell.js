import React, { useState, useEffect } from "react";
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
		nbmonId: 6,
		owner: "asd",
		hatchedAt: 1653474160,
		isHatchable: false,
		transferredAt: 1653473181,
		hatchingDuration: 300,
		strongAgainst: ["Ordinary", "Water", "Nature", "Spirit", "Psychic"],
		weakAgainst: ["Fire", "Electric", "Earth", "Wind", "Brawler", "Magic"],
		resistantTo: [
			"Ordinary",
			"Water",
			"Electric",
			"Wind",
			"Frost",
			"Crystal",
			"Nature",
			"Brawler",
			"Psychic",
		],
		vulnerableTo: ["Fire", "Earth", "Spirit", "Magic", "Reptile", "Toxic"],
		gender: "Female",
		rarity: "Common",
		mutation: "Mutated",
		mutationType: "Water",
		species: "Origin",
		genus: "Lamox",
		genusDescription:
			"A combination of a fox and a dog. Lamoxes are very loyal to their owners but do not like too much physical touch. ",
		behavior: "Aggressive",
		fertility: "3000",
		fertilityDeduction: 1000,
		types: ["Spirit", "Electric"],
		healthPotential: 16,
		energyPotential: 0,
		attackPotential: 13,
		defensePotential: 11,
		spAtkPotential: 22,
		spDefPotential: 7,
		speedPotential: 0,
		passives: ["Resilient Fur", "Electric Bracer"],
		isEgg: false,
	});
	const { isAuthenticated, user } = useMoralis();

	useEffect(() => {
		if (user && user.attributes.ethAddress) {
			setNbmon({ ...nbMon, owner: user.attributes.ethAddress });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<Layout title={`Genesis NBMon | Realm Hunter`}>
			<div className="position-relative">
				{isAuthenticated && (
					<BackBtnContainer>
						<NewButton
							icon={<FiArrowLeft className="me-2" />}
							isLink
							href="/nbmons"
							text="Inventory"
						/>
					</BackBtnContainer>
				)}

				<DummyNBMonLargeCard
					dummy
					nbMon={nbMon}
					userAddress={user ? user.attributes.ethAddress : null}
				/>
			</div>
		</Layout>
	);
};

export default mustBeAuthed(IndividualNBMon);
