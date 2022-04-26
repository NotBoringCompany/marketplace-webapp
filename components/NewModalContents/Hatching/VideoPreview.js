import React from "react";
import styled from "styled-components";
import delay from "utils/delay";

const CancelButton = styled.button`
	background: none;
	border: none;
	font-weight: 500;
	font-size: 14px;
	line-height: 20px;
`;

const VideoContainer = styled.video`
	right: 0;
	bottom: 0;
	min-width: 100%;
	min-height: 100%;
	border-top-right-radius: 30px;
	border-top-left-radius: 30px;
`;

const VideoPreview = ({ stateUtils }) => {
	const { setter, getter } = stateUtils;

	const { nbMon } = getter;

	console.log("HATCHED NBMON", nbMon);

	const handleClose = async () => {
		setter({ ...getter, show: false });
		await delay(250);
		setter({ content: "cardPreview", show: true, nbMon });
	};

	return (
		<div className="d-flex flex-column">
			<VideoContainer
				onEnded={handleClose}
				autoPlay
				muted
				playsInline
				id="myVideo"
			>
				<source
					src={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/bg.mp4`}
					type="video/mp4"
				/>
			</VideoContainer>

			<CancelButton
				onClick={handleClose}
				className="mt-5 ms-auto me-2 text-white"
			>
				Skip {getter.foo}
			</CancelButton>
		</div>
	);
};

export default VideoPreview;
