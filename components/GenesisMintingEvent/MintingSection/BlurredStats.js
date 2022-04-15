import React from "react";
import { BlurContainer } from "components/BlurContainer";
import MintingStats from "components/Mint/MintingStats";
const BlurredStats = ({ supplyData }) => {
	const { haveBeenMinted, supplyLimit } = supplyData;
	return (
		<BlurContainer className="no-radius-top">
			<MintingStats haveBeenMinted={haveBeenMinted} supplyLimit={supplyLimit} />
		</BlurContainer>
	);
};

export default BlurredStats;
