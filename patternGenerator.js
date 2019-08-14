const patternGenerator = {
	applyRandomPattern: (type = "document", options = {}) => {
		// Check types and generate the array of elements
		let targets;
		if (type == "document") {
			targets = [document.body];
		} else if (type == "id") {
			const elementWithId = document.getElementById(options.id);
			if (!elementWithId) throw new Error(`No element with ID '${options.id}' found`);
			targets = [elementWithId];
		} else if (type == "class") {
			const elementsWithClass = document.getElementsByClassName(options.class);
			if (elementsWithClass.length == 0) {
				throw new Error(`No element with class name '${options.class}' found`);
			} else if (elementsWithClass.length > 1000) {
				console.warn("Many elements are affected by the generated pattern; performance may be slow.");
			}
			targets = elementsWithClass;
		} else {
			throw new Error("Element type must be 'document', 'id', or 'class'");
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

		// Apply background to target elements
		for (const targetElement of targets) targetElement.style.background = background;
	}
}
