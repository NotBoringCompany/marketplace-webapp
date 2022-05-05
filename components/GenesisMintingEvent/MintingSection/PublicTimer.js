import React from "react";
import Countdown from "react-countdown";
import { HeadingSuperXXS } from "components/Typography/Headings";
import CountDownContainer from "components/CountDownContainer";
import { formatInTimeZone } from "date-fns-tz";

const PublicTimer = ({ date, rn, timeStampsStates }) => {
	const { setTimeStamps, timeStamps } = timeStampsStates;
	const formattedDate = new Date(date);

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
						Public Mint opens on{" "}
						{formatInTimeZone(formattedDate, "utc", "MMMM do h a")} UTC
					</HeadingSuperXXS>
					<CountDownContainer
						days={days}
						hours={hours}
						minutes={minutes}
						seconds={seconds}
					/>
				</div>
			);
		}
	};

	return (
		<Countdown
			date={rn + (date - rn)}
			renderer={renderer}
			onComplete={async () => {
				setTimeStamps({ ...timeStamps, isPublicOpen: true });
			}}
		/>
	);
};

export default PublicTimer;
