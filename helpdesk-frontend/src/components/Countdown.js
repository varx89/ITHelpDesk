import React, { useState, useEffect } from "react";

const Countdown = ({ onCountdownComplete }) => {
	const [seconds, setSeconds] = useState(60);
	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		let interval;

		if (isActive) {
			interval = setInterval(() => {
				setSeconds((prevSeconds) => {
					if (prevSeconds <= 1) {
						setIsActive(false); // Stop the countdown
						return 59; // Reset to 60 seconds
					}
					return prevSeconds - 1;
				});
			}, 1000);
		} else {
			const resetTimer = setTimeout(() => {
				setIsActive(true); // Restart the countdown
			}, 1000); // Wait for 1 second before restarting

			return () => clearTimeout(resetTimer);
		}

		return () => clearInterval(interval); // Cleanup on unmount
	}, [isActive]);

	useEffect(() => {
		if (!isActive) {
			onCountdownComplete(1); // Move this to a separate effect to avoid calling during rendering
		}
	}, [isActive, onCountdownComplete]);

	return <>{seconds}</>;
};

export default Countdown;
