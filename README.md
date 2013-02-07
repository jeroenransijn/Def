# Def.js
*Define semi strong functions in JavaScript with Def.js*

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


## How it works
Writing functions that need some sort of type checking in JavaScript doesn't need to suck. Often type checking gets annoying and results in code such as this:

```javascript
// @param {array} someList
// @param {string} someText
// @param {element} el
// @return {object}
var annoying = function (someList, someText, el) {
  if ( ! ({}).toString.call(someList) === '[object Array]' ) {
    throw new TypeError('(annoying)(arg:1/3): someList is not an array');
  }

  if ( ! typeof someText === 'string') {
    throw new TypeError('(annoying)(arg:2/3): someText is not a string');
  }

  if ( ! el instanceof Element ) {
    throw new TypeError('(annoying)(arg:3/3): el is not an an element')
  }

  // finally do stuff
  return { /* with some content */ };
};
```

In the function above, I often write some sort of doc blocks before the function. Although I don't use an IDE with support for doc blocks (is there any for js?) I do it to make it clear for myself what types I expect, and what type is returned. Instead of doing it the way above, with the use of def you can define functions in a simpler way, and have the power of type checking even before the function is invoked.
```javascript
var func = def('object', ['array', 'string', Element], function (someList, someText, el) {
  // do stuff
  return { /* with some content */ };
});
```
The same function only without the need to worry about type checking, and just write code instead. As you can see above I pass in the types I expect as strings `'object','array','string'`. But for the element I just pass in `Element`. Inside def, a discrimination is made between checking with the use of `Object.prototype.toString` and the `instanceof` operator.

### Types passed as a string use `Object.prototype.toString`
This way of type checking is pretty much bulletproof, but on the same time also quite heavy compared to the `typeof` operator or compared to duck typing. Read more about it in this excellent article called [Fixing the JavaScript typeof operator](http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/). The examples underneath are shamelessly copied from this article.

#### Overview of what to expect
```javascript
// method used inside def.js
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// returns
toType({a: 4}); 
// => "object"
toType([1, 2, 3]);
// => "array"
(function() {console.log(toType(arguments))})();
// => arguments
toType(new ReferenceError);
// => "error"
toType(new Date);
// => "date"
toType(/a-z/);
// => "regexp"
toType(Math);
// => "math"
toType(JSON);
// => "json"
toType(new Number(4));
// =>"number"
toType(new String("abc"));
// => "string"
toType(new Boolean(true));
// => "boolean"
```

### Types passed as a constructor use `instanceof`
Someimtes you need to check for instances of a constuctor. More info on how the `instanceof` operator works can be found on [Mozilla developer netowrk](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/instanceof).

#### Overview of what to expect



## Installation
Download def.js and include it in your web page or node project
```html
<script src="def.js"></script>
```

## Is it really necessary to use this?
For some projects it might be trivial to have some sort of strong type checking, not every project or function requires this. For now, this project is still experimental, and I hope to make it more useful and powerful in the future.

## What about duck typing?
For now there is not support for duck types. I hope to support this in the future, and have a more powerful type checking system, maybe even decoupled from this project.

## Roadmap
Currently this micro-library, or however you want to call it, is very experimental. Some things that need attention are:
* *Testing:* unit tests, thinking about jasmine
* *Performance:* make tests on JsPerf to collect data about performance
* *This:* find out if the `this` keyword is applied correctly
* *Error logging:* make logging a powerful feature
* *Documentation:* write better docs
