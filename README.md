# Def.js

## Example
Usage example with a return type, argument types and the function itself (callback)
```javascript
// @param {string|function} returnType
// @param {array} argTypes
// @param {function} callback
var func = def('object', ['string','array'], function (text, list) {
  return {
    text: text,
    list: list 
  };
});

func();
```

Usage example using only the argument types and callback
```javascript
// @param {array} argTypes
// @param {function} callback
var func2 = def(['string','array'], function (text, list) {
  return {
    text: text,
    list: list 
  };
});

func2();
```


## Motivation
Writing functions that need some sort of type checking in JavaScript doesn't need to suck.

## Installation
Download def.js and include it in your web page or node project
```html
<script src="def.js"></script>
```
