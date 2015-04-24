var _ = require("underscore");
var result;

function cat() {
  var head = _.first(arguments);
  if (head) {
    return head.concat.apply(head, _.rest(arguments))
  }
  return [];
}

function construct(head, tail) {
  return cat([head], _.toArray(tail))
}

function dispatch() {
  var funs = _.toArray(arguments),
      size = funs.length;

  return function(target) {
    var result;

    _.find(funs, function(fun) {
      var x = fun.apply(fun, construct(target, _.rest(arguments)));
      if (x) { result = x; return true; }
    });

    return result;
  };
}

var arrayReverse = function(arg) {
  if (!_.isArray(arg)) return;
  return arg.reverse();
}

var stringReverse = function(arg) {
  if (!_.isString(arg)) return;
  return arg.split("").reverse().join("");
}

var errorReverse = function() {
  return "That wasn't expected";
}

var myReverser = dispatch(arrayReverse, stringReverse, errorReverse)
result = myReverser(2)



result = _.map([1,2,3], function(x){ return ++x;})
console.log(result);
