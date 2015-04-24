var _ = require("underscore");
var result;

function curry(fun) {
  return function(arg) {
    return fun(arg);
  }
}

result = rightCurryDiv(10)(5)

console.log(result);
