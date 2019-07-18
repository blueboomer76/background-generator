function generateBackground() {
	let types = ["linear", "linear-3", "radial", "radial-3"];

	// Generate background and foreground colors
	const chosenType = types[Math.floor(Math.random() * types.length)];
	let iters = parseInt(chosenType.split("-").pop());
	if (isNaN(iters)) iters = 2;
	let colors = [];
	for (let i = 0; i < iters; i++) {
		colors.push(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
	}

	let background;
	if (chosenType.startsWith("linear")) {
		const direction = Math.floor(Math.random() * 360) + "deg";
		background = "linear-gradient(" + direction;
	} else {
		const posChoices = ["closest-side", "closest-corner", "farthest-side", "farthest-corner"],
			pos = posChoices[Math.floor(Math.random() * 4)],
			center = `${(Math.random() * 40 + 50).toFixed(1)}% ${(Math.random() * 40 + 50).toFixed(1)}%`;
		background = `radial-gradient(${pos} at ${center}`;
	}
	background += ", rgb(" + colors.slice(0, 3).join(",") + ")";

	const perPart = 100 / iters;
	for (let j = 1; j < iters; j++) {
		// Examples:
		// 2 parts: (1) 50 +- 25%
		// 3 parts: (1) 33 +- 16% (2) 66 +- 16%

		const colorStop = (Math.random() * perPart + perPart * (j - 0.5)).toFixed(1);
		background += `, rgb(${colors.slice(j * 3, j * 3 + 3).join(",")}) ${colorStop}%`;
	}
	background += ") fixed";

	// Apply the background
	document.body.style.background = background;

	// Apply the foreground, with text shadow color based on the color
	const textColors = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
	if (textColors[0] + textColors[1] + textColors[2] < 384) {
		document.body.style.textShadow = "1px 1px 0.5px rgb(255, 255, 255), 1px 1px 0.5px rgb(255, 255, 255)";
	} else {
		document.body.style.textShadow = "1px 1px 0.5px rgb(0, 0, 0), 1px 1px 0.5px rgb(0, 0, 0)";
	}
	document.body.style.color = `rgba(${textColors.join(",")}, 0.8)`;
}
