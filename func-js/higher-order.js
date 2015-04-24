console.log("Starting out")

var nums = [1,2,3,4,5,6],
    people = [
      { name: "Fred", age: 65 },
      { name: "John", age: 36 }
    ],
    mixin = {
      doSomething: function(a) {
        return a + 10;
      }
    }

function plucker(field) {
  return function(obj) {
    return obj && obj[field];
  }
}

function best(fun, coll) {
  return _.reduce(coll, function(x, y) {
    return fun(x, y) ? x : y;
  })
}

function finder(valueFun, bestFun, coll) {
  return _.reduce(coll, function(best, current) {
    var bestValue = valueFun(best);
    var currentValue = valueFun(current);

    return bestValue == bestFun(bestValue, currentValue) ? best : current;
  });
}

function invoker(name) {
  return function(target) {
    var targetMethod = target[name],
        args = _.rest(arguments);

    return targetMethod.apply(target, args);
  }
}
x = invoker("doSomething")

console.log(finder(_.identity, Math.max, nums))
console.log(finder(plucker('age'), Math.max, people))

console.log(best(function(x, y) { return x > y}, nums))
console.log(best(function(x, y) { return x.age > y.age}, people))

console.log(x(mixin, 10))
