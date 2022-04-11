import React from "react";
import styled from "styled-components";

const ProgressBarContainer = styled.div`
	width: 100%;
	height: 11px;
	border-radius: 11px;
	background: #454545;
`;

const Content = styled.div`
	height: 11px;
	border-radius: 11px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	width: ${(props) => props.progress}%;
`;

const ProgressBar = ({ progress }) => {
	return (
		<ProgressBarContainer>
			<Content progress={progress} className="bg-secondary" />
		</ProgressBarContainer>
	);
};

export default ProgressBar;
