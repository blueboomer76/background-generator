# Pattern Generator
A pattern generator for creating backgrounds for HTML pages, made with JavaScript. Many different patterns and gradients can be generated, with many customizable options.

Include the `patternGenerator.js` file directly in your projects, then add some code like the following to your HTML:

```html
<script src="patternGenerator.js"></script>
<script>patternGenerator.applyRandomPattern();</script>
```

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
