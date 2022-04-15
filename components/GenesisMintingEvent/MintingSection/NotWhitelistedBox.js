import React from "react";
import { BlurContainer } from "components/BlurContainer";
import { HeadingSuperXXS } from "components/Typography/Headings";
import MintingStats from "components/Mint/MintingStats";

const NotWhitelistedBox = ({ supplyData, address }) => {
	const { haveBeenMinted, supplyLimit } = supplyData;
	return (
		<BlurContainer>
			<HeadingSuperXXS as="p" className="text-white mb-2">
				Your address:
			</HeadingSuperXXS>

			<HeadingSuperXXS as="p" className="text-white mb-2">
				{address}
			</HeadingSuperXXS>

			<HeadingSuperXXS as="p" className="text-white mb-3">
				is not whitelisted
			</HeadingSuperXXS>

			<MintingStats haveBeenMinted={haveBeenMinted} supplyLimit={supplyLimit} />
		</BlurContainer>
	);
};

export default NotWhitelistedBox;
