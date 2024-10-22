import React, { useEffect, useState } from "react";

const useTypewriter = (text, speed) => {
	const [displayText, setDisplayText] = useState("");
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const typingInterval = setInterval(() => {
			setDisplayText((prevText) => prevText + text.charAt(index));
			setIndex((prevIndex) => {
				// If end of the text is reached, reset both index and displayed text
				if (prevIndex === text.length - 1) {
					setDisplayText("");
					return 0;
				}
				return prevIndex + 1;
			});
		}, speed);

		return () => clearInterval(typingInterval);
	}, [text, index, speed]);

	return displayText;
};

export default useTypewriter;
