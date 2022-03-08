import React from "react";
import Image from "next/image";

import CustomModal from "./CustomModal";
import { HeadingXXS } from "components/Typography/Headings";
import { TextSecondary } from "components/Typography/Texts";
import MyButton from "components/Buttons/Button";

import styled from "styled-components";
import CheckBoxImage from "components/Filters/CheckBoxImage";

const CustomHeadingXXS = styled(HeadingXXS)`
	font-size: 24px;
`;

const CheckboxesContainer = styled.div`
	grid-template-columns: 1fr 1fr 1fr;
`;

const FilterModal = ({ stateUtils, title, data = null }) => {
	const { setter } = stateUtils;
	return (
		<CustomModal
			stateUtils={stateUtils}
			className="d-flex flex-column align-items-center justify-content-center"
		>
			<CustomHeadingXXS className="text-center">{title}</CustomHeadingXXS>
			<CheckboxesContainer className="d-grid">
				{data &&
					data.map((d) => (
						<CheckBoxImage key={d.id} type={"checkbox"} label={d.name} />
					))}
			</CheckboxesContainer>

			<MyButton onClick={() => setter(false)} text={"Apply"} />
		</CustomModal>
	);
};

export default FilterModal;