function generateBackground() {
	let colors = [];
	if (Math.random() < 0.5) {
		if (Math.random() < 0.5) {
			for (let i = 0; i < 6; i++) colors.push(Math.floor(Math.random() * 256));

			let direction = `${Math.floor(Math.random() * 360)}deg`;
			let color1 = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
			let color2 = `rgb(${colors[3]}, ${colors[4]}, ${colors[5]})`;
			let colorStop = ` ${(Math.random() * 30 + 35).toFixed(1)}%`;

			document.body.style.background = `linear-gradient(${direction}, ${color1}, ${color2} ${colorStop}) fixed`;
		} else {
			for (let i = 0; i < 9; i++) colors.push(Math.floor(Math.random() * 256));

			let direction = `${Math.floor(Math.random() * 360)}deg`;
			let color1 = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
			let color2 = `rgb(${colors[3]}, ${colors[4]}, ${colors[5]})`;
			let color3 = `rgb(${colors[6]}, ${colors[7]}, ${colors[8]})`;
			let colorStop1 = `${(Math.random() * 10).toFixed(1)}%`;
			let colorStop2 = `${(Math.random() * 20 + 40).toFixed(1)}%`;
			let colorStop3 = `${(Math.random() * 10 + 90).toFixed(1)}%`;

			document.body.style.background = `linear-gradient(${direction}, ${color1} ${colorStop1}, ${color2} ${colorStop2}, ${color3} ${colorStop3}) fixed`;
		}
	} else {
		let posChoices = ["closest-side", "closest-corner", "farthest-side", "farthest-corner"];
		let pos = posChoices[Math.floor(Math.random() * 4)];
		let center = `${(Math.random() * 45 + 10).toFixed(1)}% ${(Math.random() * 45 + 10).toFixed(1)}%`;
		if (Math.random() < 0.5) {
			let colors = [];
			for (let i = 0; i < 6; i++) {colors.push(Math.floor(Math.random() * 256));};

			let color1 = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
			let color2 = `rgb(${colors[3]}, ${colors[4]}, ${colors[5]})`;
			let colorStop = ` ${(Math.random() * 30 + 35).toFixed(1)}%`;

			document.body.style.background = `radial-gradient(${pos} at ${center}, ${color1}, ${color2} ${colorStop}) fixed`;
		} else {
			let colors = [];
			for (let i = 0; i < 9; i++) colors.push(Math.floor(Math.random() * 256));

			let color1 = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
			let color2 = `rgb(${colors[3]}, ${colors[4]}, ${colors[5]})`;
			let color3 = `rgb(${colors[6]}, ${colors[7]}, ${colors[8]})`;
			let colorStop1 = `${(Math.random() * 10).toFixed(1)}%`;
			let colorStop2 = `${(Math.random() * 20 + 40).toFixed(1)}%`;
			let colorStop3 = `${(Math.random() * 10 + 90).toFixed(1)}%`;

			document.body.style.background = `radial-gradient(${pos} at ${center}, ${color1} ${colorStop1}, ${color2} ${colorStop2}, ${color3} ${colorStop3}) fixed`;
		}
	}

	let textColors = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];

	if (textColors[0] + textColors[1] + textColors[2] < 384) {
		document.body.style.textShadow = "1px 1px 0.5px rgb(255, 255, 255), 1px 1px 0.5px rgb(255, 255, 255)";
	} else {
		document.body.style.textShadow = "1px 1px 0.5px rgb(0, 0, 0), 1px 1px 0.5px rgb(0, 0, 0)";
	}
	document.body.style.color = `rgba(${textColors.join(",")}, 0.8)`;
}
