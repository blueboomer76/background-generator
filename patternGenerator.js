const patternGenerator = {
	applyRandomPattern: (obj = "document", options = {}) => {
		// Check types and generate the array of elements
		let targets;
		if (obj == "document") {
			targets = [document.body];
		} else if (obj == "id") {
			const elementWithId = document.getElementById(options.id);
			if (!elementWithId) throw new Error(`No element with ID '${options.id}' found`);
			targets = [elementWithId];
		} else if (obj == "class") {
			const elementsWithClass = document.getElementsByClassName(options.class);
			if (elementsWithClass.length == 0) {
				throw new Error(`No element with class name '${options.class}' found`);
			} else if (elementsWithClass.length > 1000) {
				console.warn("Many elements are affected by the generated pattern; performance may be slow.");
			}
			targets = elementsWithClass;
		}

		// Preparation for generating
		let types = ["linear", "radial"];
		if (options.types) {
			const userTypes = new Set(options.types).values();
			for (const type of userTypes) {
				if (!types.includes(type)) throw new Error(`Invalid pattern type '${type}'`);
			}
			types = options.types;
		} else if (options.exclude) {
			const userTypes = new Set(options.exclude).values();
			for (const toExclude of userTypes) {
				const typeIndex = types.indexOf(toExclude);
				if (typeIndex == -1) throw new Error(`Invalid pattern type '${type}'`);
				types.splice(typeIndex, 1);
			}
		}

		// Generate background colors
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

		const isLinear = chosenType == "linear";
		let angle, centerX, centerY;
		if (isLinear) angle = Math.random() * 360;
		if (!isLinear || !targets) {
			centerX = Math.random() * 100;
			centerY = Math.random() * 100;
		}

		if (targets) {
			let background = isLinear ? `linear-gradient(${angle.toFixed(1)}deg` : `radial-gradient(circle at ${centerX.toFixed(1)}% ${centerY.toFixed(1)}%`;
			background += `, rgb(${colors.slice(0, 3).join(", ")})`;
			for (let i = 0; i < stopPositions.length; i++) {
				background += `, rgb(${colors.slice(i * 3 + 3, i * 3 + 6).join(", ")}) ${stopPositions[i].toFixed(1)}%`;
			}
			background += ") fixed";

			// Apply background to target elements
			for (const targetElement of targets) targetElement.style.background = background;
		} else {
			let ctx;
			if (obj instanceof HTMLCanvasElement) {
				ctx = obj.getContext("2d");
			} else if (obj instanceof CanvasRenderingContext2D) {
				ctx = obj;
			}
			if (ctx) {
				const width = parseFloat(options.width), height = parseFloat(options.height);
				if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
					throw new Error("The width and height of the pattern to apply to the canvas must be positive numbers.");
				}
				const fillX = options.x, fillY = options.y;
				if ((fillX != undefined && isNaN(fillX)) || (fillY != undefined && isNaN(fillY))) {
					throw new Error("The x and y positions to begin drawing the pattern to the canvas must be numbers.");
				}

				let gradient;

				if (isLinear) {
					const centerToCornerLength = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2,
						xOffset = centerToCornerLength * Math.cos((angle + 90) * Math.PI / 180),
						yOffset = centerToCornerLength * Math.sin((angle + 90) * Math.PI / 180),
						x1 = width / 2 + xOffset,
						y1 = height / 2 + yOffset,
						x2 = width / 2 - xOffset,
						y2 = height / 2 - yOffset;
					gradient = ctx.createLinearGradient(parseFloat(x1.toFixed(1)), parseFloat(y1.toFixed(1)),
						parseFloat(x2.toFixed(1)), parseFloat(y2.toFixed(1)));
				} else {
					// Radius is from the center to the farthest corner
					const cx = centerX * width / 100,
						cy = centerY * height / 100,
						radius = Math.sqrt(Math.pow(Math.max(cx, width - cx), 2) + Math.pow(Math.max(cy, height - cy), 2));
					gradient = ctx.createRadialGradient(
						parseFloat(cx.toFixed(1)),
						parseFloat(cy.toFixed(1)),
						5,
						parseFloat(cx.toFixed(1)),
						parseFloat(cy.toFixed(1)),
						parseFloat(radius.toFixed(1))
					);
				}

				gradient.addColorStop(0, `rgb(${colors.slice(0, 3).join(", ")})`);
				for (let i = 0; i < stopPositions.length; i++) {
					gradient.addColorStop(parseFloat((stopPositions[i] / 100).toFixed(3)), `rgb(${colors.slice(i * 3 + 3, i * 3 + 6).join(", ")})`);
				}

				ctx.fillStyle = gradient;
				ctx.fillRect(fillX ? parseFloat(fillX.toFixed(1)) : 0, fillY ? parseFloat(fillY.toFixed(1)) : 0, width, height);
			} else {
				throw new TypeError("Invalid object provided to apply pattern.");
			}
		}
	}
}
