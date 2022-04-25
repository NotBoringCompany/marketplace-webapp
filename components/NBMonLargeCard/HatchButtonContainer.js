import React, { useContext } from "react";
import Countdown from "react-countdown";
import HatchButton from "components/Buttons/HatchButton";
import { HeadingXXS } from "components/Typography/Headings";
import AppContext from "context/AppContext";
const HatchButtonContainer = ({ mine, isHatchable, hatchesAt, nbmonId }) => {
	const { statesSwitchModal } = useContext(AppContext);

	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			if (!isHatchable) window.location.reload();

			return <></>;
		} else {
			// Render a countdown
			return (
				<HatchButton
					disabled
					text={`Hatch available in ${days >= 1 ? `${days} day(s) and` : ``} ${
						hours > 9 ? hours : `0${hours}`
					}:${minutes > 9 ? minutes : `0${minutes}`}:${
						seconds > 9 ? seconds : `0${seconds}`
					}`}
				/>
			);
		}
	};

	const handleHatchButtonClick = () => {
		if (mine && isHatchable) {
			statesSwitchModal.setter({
				show: true,
				content: "userConfirmation",
				nbmonId,
			});
		}
	};

	return (
		<div className="afterImage text-center w-100 d-flex flex-column align-items-center">
			<HeadingXXS as="h1" className="text-white text-capitalize mb-3">
				Genesis NBMon Egg
			</HeadingXXS>{" "}
			{mine && !isHatchable && (
				<Countdown date={hatchesAt} renderer={renderer} />
			)}
			{mine && isHatchable && <HatchButton onClick={handleHatchButtonClick} />}
		</div>
	);
};

export default HatchButtonContainer;
