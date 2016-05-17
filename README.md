# d3-rs-tspan-wrap

`d3-rs-tspan-wrap` is a component for breaking up text into tspans in a Text container.

## Builds

[![Circle CI](https://circleci.com/gh/Redsift/d3-rs-tspan-wrap.svg?style=svg)](https://circleci.com/gh/Redsift/d3-rs-tspan-wrap)

## Example

[View @redsift/d3-rs-tspan-wrap on Codepen](https://codepen.io/rahulpowar/pen/ZWxKdJ/)

## Usage

### Browser
	
	<script src="//static.redsift.io/reusable/d3-rs-tspan-wrap/latest/d3-rs-tspan-wrap.umd-es2015.min.js"></script>
	<script>
		var text = d3_rs_tspan_wrap.text();
		...
	</script>

### ES6

	import { text } from "@redsift/d3-rs-tspan-wrap";
	let eml = text.text();
	...
	
### Require

	var text = require("@redsift/d3-rs-tspan-wrap");
	var eml = text.text();
	...

### Data

Data can either be provided in the text node element itself or bound to the selection.

### Parameters

|Name|Description|Transition|
|----|-----------|----------|
|classed|SVG custom class|N|