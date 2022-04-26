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

const CardPreview = ({ stateUtils }) => {
	const handleCollectBtn = () => {
		window && window.location.reload();
	};

	const { getter } = stateUtils;

	const { nbMon } = getter;

	return (
		<div className="d-flex flex-column w-100">
			<div className="my-3 mx-auto">
				<NBMonCard nbMon={nbMon} />
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
