# Background Generator
A background and pattern generator for creating backgrounds, gradients, and patterns, made with JavaScript. Many possible outputs can be generated, with many customizable options.

## Installation
Include one of the following files to create random backgrounds and patterns:
- CSS: `background-generator.js`
- SVG: `svg-pattern-generator.js`
- HTML5 Canvas: `canvas-pattern-generator.js`

Each of these files is designed for a different purpose.

## Usage
For CSS or SVG patterns, include the corresponding file in your HTML:
```html
<script src="background-generator.js"></script>
```

Then include the following JavaScript (in a script or file) like the following:
```javascript
// These two are the same and apply to the whole document
generateBackground();
generateBackground("document");

// Applies to a single element with id="myElement"
generateBackground("id", {id: "myElement"});
generateBackground("id", {id: "myElement", types: ["linear", "linear-3"]});

// Applies to elements with class="myElementClass"
generateBackground("class", {class: "myElementClass"});
generateBackground("class", {class: "myElementClass", exclude: ["linear-3", "radial-3"]});
```

Example HTML and JavaScript given a canvas element:
```html
<canvas id="myCanvas"></canvas>
<script src="canvas-pattern-generator.js"></script>
```

```javascript
const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d"); // Must be a CanvasRenderingContext2D instance

const gradient1 = generateCanvasPattern(ctx, myCanvas.width, myCanvas.height);
ctx.fillStyle = gradient1;
ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

const gradient2 = generateCanvasPattern(ctx, myCanvas.width, myCanvas.height, {types: ["radial", "radial-3"]});
ctx.fillStyle = gradient2;
ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
```

## Options
Options can be passed to all functions to refine the types of backgrounds and patterns generated.

| Parameter | Type | Description |
| --- | --- | --- |
| types | string[] | Pattern types to include
| exclude | string[] | Pattern types to exclude

The available pattern types are currently `linear`, `linear-3`, `radial`, and `radial-3`. Examples are shown under the usage section above, both without and with options.
