;(function(window, undefined){
  function toType (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
  }

  function caller (obj, self, args) {
    if (obj.argTypes) {
      if (args.length === obj.argTypes.length) {
        for (var i = 0, len = args.length; i < len; i++) {
          if (typeof argTypes[i] === 'string') {
            if (toType(args[i]) === obj.argTypes[i]) {
              return obj.cb.apply(self, args);
            }
          } else if (args[i] instanceof obj.argTypes[i]) {
            return obj.cb.apply(self, args);
          } else {
            throw new TypeError('(def): argument passed not valid, '+args[i]+' is not an instance of '+obj.argTypes[i]);
          }
        }
      } else {

      }
    } else {
      return obj.cb.apply(self);
    }
  }

  function create (obj) {
    if (obj.name) {
      window[obj.name] = function () {
        var self = this;
        var args = [].slice.call(arguments);
        if (obj.returnType) {
          var result = caller(obj, self, args);
          if (typeof obj.returnType === 'string') {
            if (toType(result) !== obj.returnType) {
              throw new TypeError('(def): returned value is '+toType(result)+' instead of '+obj.returnType+'');
            }
          } else if (! (result instanceof obj.returnType)) {
            throw new TypeError('(def): return value is an instance of '+result+' instead of '+ obj.returnType);
          }
        }  
      }

      return window[obj.name];
    }

    return function () {
      var self = this;
      var args = [].slice.call(arguments);
      if (obj.returnType) {
        var result = caller(obj, self, args);
        if (typeof obj.returnType === 'string') {
          if (toType(result) !== obj.returnType) {
            throw new TypeError('(def): returned value is '+toType(result)+' instead of '+obj.returnType+'');
          }
        } else if (! (result instanceof obj.returnType)) {
          throw new TypeError('(def): return value is an instance of "'+result+'" instead of "'+ obj.returnType+'"');
        }
      }
    }
  }

  function def () {
    var args = [].slice.call(arguments), i = args.length;
    if (args.length === 1 && toType(args[0]) === 'object') {
      return create(args[0]);
    }

    if (!i) {
      throw new Error('(def): no arguments passed, ');
    } else if (i && toType(args[i -1]) === 'function') {
      var cb = args[i -1];
      if (--i) return create({cb: cb});
    } else {
      throw new TypeError('(def)(arg:'+(i)+'/'+args.length+')('+args[i -1]+'): is not a function');
    }

    if (i && toType(args[i -1]) === 'array') {
      var argTypes = args[i -1];
      if (--i) {
        return create({
          cb: cb,
          argTypes: argTypes
        });
      } 
    }
    if (i === 1) {
      return create({
        cb: cb,
        argTypes: argTypes,
        returnType: args[0]
      });
    } else if (i === 2) {
      if (toType(args[0]) === 'string') {
        return create({
          cb: cb,
          argTypes: argTypes,
          returnType: args[1],
          name: args[0]
        });
      } else {
        throw new TypeError('(def)(arg:1/4)('+args[i -1]+'): is not a string');
      }
    }
  }

  window.def = def;
})(window);