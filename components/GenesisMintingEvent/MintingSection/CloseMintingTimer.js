import React, { useState } from "react";
import Countdown from "react-countdown";
import { HeadingSuperXXS } from "components/Typography/Headings";
import CountDownContainer from "components/CountDownContainer";

const CloseMintingTimer = ({ date, rn, dummyDisplay, timeStampsStates }) => {
	const { setTimeStamps, timeStamps } = timeStampsStates;
	if (dummyDisplay)
		return (
			<div className="d-flex flex-column justify-content-center align-items-center">
				<HeadingSuperXXS
					as="p"
					className="mb-2 text-white text-uppercase text-center"
				>
					Whitelist Mint opened at X UTC
				</HeadingSuperXXS>
				<CountDownContainer
					days={0}
					hours={0}
					minutes={0}
					seconds={0}
					completed
				/>
			</div>
		);

	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			return <></>;
		} else {
			// Render a countdown
			return (
				<div className="d-flex flex-column justify-content-center align-items-center">
					<HeadingSuperXXS
						as="p"
						className="mb-2 text-white text-uppercase text-center"
					>
						Public Mint closes {new Date(date)}
					</HeadingSuperXXS>
					<CountDownContainer
						days={days}
						hours={hours}
						minutes={minutes}
						seconds={seconds}
						completed
					/>
				</div>
			);
		}
	};

	return (
		<Countdown
			date={rn + (date - rn)}
			renderer={renderer}
			onComplete={() => {
				setTimeStamps({
					...timeStamps,
					isPublicOpen: false,
					isWhitelistOpen: false,
					isMintingEnded: true,
				});
			}}
		/>
	);
};

export default CloseMintingTimer;
