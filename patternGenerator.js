const patternGenerator = {
	applyRandomPattern: () => {
		let types = ["linear", "radial"];

		// Generate background and foreground colors
		const chosenType = types[Math.floor(Math.random() * types.length)];

		const numColors = Math.floor(Math.random() * 2) + 2, // 2 or 3
			perPart = 100 / numColors;
		let colors = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)],
			stopPositions = [];
		for (let i = 1; i < numColors; i++) {
			colors.push(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
			
			/*
				Examples:
				2 parts: (1) 50.0 +- 25.0%
				3 parts: (1) 33.3 +- 16.7% (2) 66.7 +- 16.7%
			*/
			stopPositions.push(perPart * (Math.random() + i - 0.5));
		}

		let background;
		if (chosenType == "linear") {
			const direction = Math.floor(Math.random() * 360) + "deg";
			background = "linear-gradient(" + direction;
		} else {
			const center = `${(Math.random() * 100).toFixed(1)}% ${(Math.random() * 100).toFixed(1)}%`;
			background = `radial-gradient(circle at ${center}`;
		}
		background += ", rgb(" + colors.slice(0, 3).join(", ") + ")";

		for (let i = 0; i < stopPositions.length; i++) {
			background += `, rgb(${colors.slice(i * 3 + 3, i * 3 + 6).join(", ")}) ${stopPositions[i].toFixed(1)}%`;
		}
		background += ") fixed";

		// Apply the background
		document.body.style.background = background;

		// Apply the foreground, with text shadow color based on the color
		const textColors = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
		if (textColors[0] + textColors[1] + textColors[2] < 384) {
			document.body.style.textShadow = "1px 1px 1px rgb(255, 255, 255), 1px 1px 1px rgb(255, 255, 255)";
		} else {
			document.body.style.textShadow = "1px 1px 1px rgb(0, 0, 0), 1px 1px 1px rgb(0, 0, 0)";
		}
		document.body.style.color = `rgb(${textColors.join(", ")})`;
	}
}
