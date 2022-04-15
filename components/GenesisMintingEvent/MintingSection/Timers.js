import React from "react";
import CloseMintingTimer from "./CloseMintingTimer";
import { TimersContainer } from "./Containers";
import PublicTimer from "./PublicTimer";
import WhitelistTimer from "./WhitelistTimer";

const Timers = ({ timeStampsStates }) => {
	const { timeStamps, setTimeStamps } = timeStampsStates;
	const {
		now,
		mintingCloseAt,
		publicOpenAt,
		whitelistOpenAt,
		isPublicOpen,
		isWhitelistOpen,
	} = timeStamps;
	return (
		<TimersContainer className="mt-lg-3 mt-0">
			{!isPublicOpen && !isWhitelistOpen && (
				<WhitelistTimer
					date={whitelistOpenAt}
					rn={now}
					timeStampsStates={{ timeStamps, setTimeStamps }}
				/>
			)}

			{!isPublicOpen && isWhitelistOpen && <CloseMintingTimer dummyDisplay />}
			<div className="separator"></div>

			{!isPublicOpen ? (
				<PublicTimer
					date={publicOpenAt}
					rn={now}
					timeStampsStates={{ timeStamps, setTimeStamps }}
				/>
			) : (
				<CloseMintingTimer date={mintingCloseAt} rn={now} />
			)}
		</TimersContainer>
	);
};

export default Timers;
