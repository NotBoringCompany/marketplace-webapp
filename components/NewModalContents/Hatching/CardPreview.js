import React from "react";
import styled from "styled-components";
import HatchButton from "components/Buttons/HatchButton";
import NBMonCard from "components/NBMonPreviewCard/NBMonCard";

const StyledHatchButton = styled(HatchButton)`
	border-radius: 30px;
	border-top-right-radius: 0;
	border-top-left-radius: 0;

	&:hover {
		transform: unset;
	}
`;

const dummyNBMon = {
	nbmonId: "1",
	maleParent: null,
	femaleParent: null,
	owner: "0x6ef0f724e780E5D3aD66f2A4FCbEF64A774eA796",
	isTradable: true,
	isBreedable: true,
	hatchedAt: "1646432245",
	transferredAt: "1646432245",
	hatchingDuration: "100",
	gender: "male",
	rarity: "rare",
	mutation: "not mutated",
	mutation_value: null,
	species: "wild",
	genus: "birvo",
	fertility: "2500",
	types: ["reptile", "water"],
	healthPotential: null,
	energyPotential: null,
	attackPotential: null,
	defensePotential: null,
	spAtkPotential: null,
	spDefPotential: null,
	speedPotential: null,
	firstPassive: null,
	secondPassive: null,
	firstInheritedPassive: null,
	secondInheritedPassive: null,
	firstInheritedMove: null,
	secondInheritedMove: null,
	isEgg: false,
};

const CardPreview = ({}) => {
	const handleCollectBtn = () => {
		window && window.location.reload();
	};

	return (
		<div className="d-flex flex-column w-100">
			<div className="my-3 mx-auto">
				<NBMonCard nbMon={dummyNBMon} />
			</div>
			<StyledHatchButton
				onClick={handleCollectBtn}
				className="mt-auto"
				text="Collect"
			/>
		</div>
	);
};

export default CardPreview;
