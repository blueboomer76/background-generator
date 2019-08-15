function generateBackground(type = "document", options = {}) {
	// Check types and generate the array of elements
	let target;
	switch (type) {
		case "document":
			target = [document.body];
			break;
		case "id": {
			const elementWithId = document.getElementById(options.id);
			if (!elementWithId) throw new Error("Element with ID not found.");
			target = [elementWithId];
			break;
		}
		case "class": {
			const elementsWithClass = document.getElementsByClassName(options.class);
			if (elementsWithClass.length == 0) {
				throw new Error("Element with class name not found.");
			} else if (elementsWithClass.length > 1000) {
				console.warn("Many elements are affected by the generated background, performance may be slow.");
			}
			target = Array.from(elementsWithClass);
			break;
		}
		default:
			throw new Error("Invalid element type to apply background.");
	}

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
	const svgString = generateSVGString(types[Math.floor(Math.random() * types.length)]),
		svgStyle = "url(\"data:image/svg+xml," + encodeURIComponent(svgString) + "\")";

	// Apply pattern to target elements
	for (const targetElement of target) targetElement.style.backgroundImage = svgStyle;
}

function generateSVGString(type) {
	let iters = parseInt(type.split("-").pop());
	if (isNaN(iters)) iters = 2;
	let colors = [];
	for (let i = 0; i < iters; i++) {
		colors.push(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
	}

	const isLinear = type.startsWith("linear");
	let gradientStr;
	if (isLinear) {
		const x1 = Math.random() * 100, y1 = Math.random() * 100;
		gradientStr = `<linearGradient id="grad" x1="${x1.toFixed(1)}%" y1="${y1.toFixed(1)}%" x2="${(100-x1).toFixed(1)}%" y2="${(100-y1).toFixed(1)}%">`;
	} else {
		const cx = (Math.random() * 100).toFixed(1),
			cy = (Math.random() * 100).toFixed(1),
			r = Math.sqrt(Math.pow(Math.max(cx, 100-cx), 2) + Math.pow(Math.max(cy, 100-cy), 2)).toFixed(1);
		gradientStr = `<radialGradient id="grad" cx="${cx}%" cy="${cy}%" fx="${cx}%" fy="${cy}%" r="${r}%">`;
	}

	gradientStr += `<stop offset="0" stop-color="rgb(${colors.slice(0, 3).join(",")})" />`;
	const perPart = 1 / iters;
	for (let i = 1; i < iters; i++) {
		// Examples:
		// 2 parts: (1) 50 +- 25%
		// 3 parts: (1) 33 +- 16% (2) 66 +- 16%
		const colorStop = (Math.random() * perPart + perPart * (i - 0.5)).toFixed(3);
		gradientStr += `<stop offset="${colorStop}" stop-color="rgb(${colors.slice(i*3, i*3+3).join(",")})" />`;
	}
	gradientStr += isLinear ? "</linearGradient>" : "</radialGradient>";

	return "<svg xmlns=\"http://www.w3.org/2000/svg\"><defs>" + gradientStr +
		"</defs><rect x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" fill=\"url('#grad')\" /></svg>";
}
