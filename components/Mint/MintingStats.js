import React from "react";
import styled from "styled-components";
import { HeadingSuperXXS } from "components/Typography/Headings";
import ProgressBar from "./ProgressBar";
const StyledHeadingSuperXXS = styled(HeadingSuperXXS)`
	font-size: 18px;
	font-weight: 400;
	line-height: 16px;
`;

const MintingStats = ({ haveBeenMinted = 0, supplyLimit = 5000 }) => {
	return (
		<>
			<ProgressBar progress={parseInt((haveBeenMinted / supplyLimit) * 100)} />
			<HeadingSuperXXS as="p" className="text-secondary text-center mt-2">
				{haveBeenMinted} / {supplyLimit}
			</HeadingSuperXXS>
			<StyledHeadingSuperXXS as="p" className="text-white text-center mt-2">
				Genesis NBMons Eggs Minted
			</StyledHeadingSuperXXS>
		</>
	);
};

export default MintingStats;
