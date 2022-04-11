import React from "react";
import MyButton from "components/Buttons/Button";
import { HeadingSuperXXS } from "components/Typography/Headings";
import { AiOutlineArrowRight } from "react-icons/ai";
import styled from "styled-components";

const StyledHeadingSuperXXS = styled(HeadingSuperXXS)`
	font-size: 14px;
	font-weight: 500;
`;
const RealmHunterButton = () => {
	return (
		<div className="d-flex flex-column mt-auto ms-auto me-3 mb-0">
			<MyButton
				icon={<AiOutlineArrowRight className="text-white me-2" />}
				pill
				thinText
				newTab
				isLink
				href="https://realmhunter.io"
				text="visit realmhunter.io"
			/>
			<StyledHeadingSuperXXS as="p" className="text-white mt-2">
				for more information about the game
			</StyledHeadingSuperXXS>
		</div>
	);
};

export default RealmHunterButton;
