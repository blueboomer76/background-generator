function generateCanvasPattern(ctx, width, height, options = {}) {
	if (!(ctx instanceof CanvasRenderingContext2D)) throw new Error("First function argument must be a canvas context.");

	// Preparation for generating
	let types = ["linear", "linear-3", "radial", "radial-3"];
	if (options.types) {
		const userTypes = new Set(options.types).values();
		for (const type of userTypes) {
			if (!types.includes(type)) throw new Error("Invalid background type provided.");
		}
		types = options.types;
	} else if (options.exclude) {
		const userTypes = new Set(options.exclude).values();
		for (const toExclude of userTypes) {
			const typeIndex = types.indexOf(toExclude);
			if (typeIndex == -1) throw new Error("Invalid background type provided.");
			types.splice(typeIndex, 1);
		}
	}

	// Generate the pattern
	const chosenType = types[Math.floor(Math.random() * types.length)];
	let iters = parseInt(chosenType.split("-").pop());
	if (isNaN(iters)) iters = 2;
	let colors = [];
	for (let i = 0; i < iters; i++) {
		colors.push(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
	}

	const x0 = Math.random() * width, y0 = Math.random() * height;
	let gradient;
	if (chosenType.startsWith("linear")) {
		gradient = ctx.createLinearGradient(x0.toFixed(1), y0.toFixed(1), (width - x0).toFixed(1), (height - y0).toFixed(1));
	} else {
		const cx = x0.toFixed(1),
			cy = y0.toFixed(1),
			r = Math.sqrt(Math.pow(Math.max(x0, width - x0), 2) + Math.pow(Math.max(y0, height - y0), 2)).toFixed(1);
		gradient = ctx.createRadialGradient(cx, cy, 5, cx, cy, r);
	}

	gradient.addColorStop(0, "rgb(" + colors.slice(0, 3).join(",") + ")")
	const perPart = 1 / iters;
	for (let i = 1; i < iters; i++) {
		// Examples:
		// 2 parts: (1) 50 +- 25%
		// 3 parts: (1) 33 +- 16% (2) 66 +- 16%
		const colorStop = (Math.random() * perPart + perPart * (i - 0.5)).toFixed(3);
		gradient.addColorStop(colorStop, "rgb(" + colors.slice(i * 3, i * 3 + 3).join(",") + ")");
	}

	return gradient;
}
