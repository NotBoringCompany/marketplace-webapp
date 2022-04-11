import React from "react";
import { BlurContainer } from "components/BlurContainer";
import styled from "styled-components";
import { HeadingSuperXXS } from "components/Typography/Headings";
import ProgressBar from "./ProgressBar";
const StyledHeadingSuperXXS = styled(HeadingSuperXXS)`
	font-size: 18px;
	font-weight: 400;
	line-height: 16px;
`;

const MintingStats = ({ haveBeenMinted = 0, totalSupply = 5000 }) => {
	return (
		<BlurContainer>
			<ProgressBar progress={parseInt((haveBeenMinted / totalSupply) * 100)} />
			<HeadingSuperXXS as="p" className="text-secondary text-center mt-2">
				{haveBeenMinted} / {totalSupply}
			</HeadingSuperXXS>
			<StyledHeadingSuperXXS as="p" className="text-white text-center mt-2">
				Genesis NBMons Eggs Minted
			</StyledHeadingSuperXXS>
		</BlurContainer>
	);
};

export default MintingStats;
