# Pattern Generator
A background and pattern generator for creating backgrounds, gradients, and patterns, made with JavaScript. Many possible outputs can be generated, with many customizable options.

Include the `patternGenerator.js` file directly in your projects, then add some code like the following to your HTML:

```html
<script src="patternGenerator.js"></script>
<script>patternGenerator.applyRandomPattern();</script>
```

## Usage
`patternGenerator.applyRandomPattern([obj], [options])`

`obj` can be one of the following:
- "document" (default)
- "id"
	- Required parameter: id (string)
- "class"
	- Required parameter: class (string)
- An instance of `HTMLCanvasElement` (usually from a `<canvas>` element)
	- Required parameters: width (number), height (number)
	- Optional parameters: x (number), y (number)
- An instance of `CanvasRenderingContext2D` (from a context of a `<canvas>` element)
	- Required parameters: width (number), height (number)
	- Optional parameters: x (number), y (number)

All parameters need to be defined in the options object.

## Options
Options can be passed to the `applyRandomPattern()` function to refine the types of backgrounds and patterns generated.

| Parameter | Type | Description |
| --- | --- | --- |
| types | string[] | Pattern types to include |
| exclude | string[] | Pattern types to exclude |

The available pattern types are currently `linear` and `radial`.

## Examples
```js
// Applies to the whole document
patternGenerator.applyRandomPattern();
patternGenerator.applyRandomPattern("document");
patternGenerator.applyRandomPattern("document", {types: ["linear"]})

// Applies to a single element with id="myElement"
patternGenerator.applyRandomPattern("id", {id: "myElement"});
patternGenerator.applyRandomPattern("id", {id: "myElement", types: ["radial"]});

// Applies to elements with class="myElementClass"
patternGenerator.applyRandomPattern("class", {class: "myElementClass"});
patternGenerator.applyRandomPattern("class", {class: "myElementClass", exclude: ["linear"]});
```

Example with a `<canvas>` element having id="myCanvas":
```js
const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");

patternGenerator.applyRandomPattern(ctx, {width: myCanvas.width, height: myCanvas.height});
patternGenerator.applyRandomPattern(ctx, {
	width: myCanvas.width,
	height: myCanvas.height,
	exclude: ["radial"]
});
```
