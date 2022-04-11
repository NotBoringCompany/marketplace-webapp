import React from "react";
import Countdown from "react-countdown";
import { HeadingSuperXXS } from "components/Typography/Headings";
import CountDownContainer from "components/CountDownContainer";

const WhitelistTimer = ({ date, rn }) => {
	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			// Render a complete state
			return <p>asd</p>;
		} else {
			// Render a countdown
			return (
				<CountDownContainer
					days={days}
					hours={hours}
					minutes={minutes}
					seconds={seconds}
				/>
			);
		}
	};

	return (
		<div className="d-flex flex-column justify-content-center align-items-center">
			<HeadingSuperXXS
				as="p"
				className="mb-2 text-white text-uppercase text-center"
			>
				Whitelist Mint opens at 2 pm utc
			</HeadingSuperXXS>
			<Countdown date={rn + (date - rn)} renderer={renderer} />
		</div>
	);
};

export default WhitelistTimer;
