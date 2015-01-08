var _ = require("underscore");

var myMessage = {
  message: "Hi!",
  type: "display",
  from: "http://foo.com"
}


function checker(/* validators */) {
  var validators = _.toArray(arguments);

  return function(obj) {
    var errors = _.reduce(validators, function(errs, check) {
      if (check(obj)) {
        return errs;
      } else {
        return _.chain(errs).push(check.message).value();
      }
    }, []);
    return errors.length == 0 ? true : errors;
  }
}

function validator(message, fun) {
  var f = function() {
    return fun.apply(fun, arguments);
  };
  f['message'] = message;
  return f;
}

// Validators

function aMap(obj) {
  return _.isObject(obj);
}

function hasKeys() {
  var keys = _.toArray(arguments);

  var fun = function(obj) {
    return _.every(keys, function(k) {
      return _.has(obj, k);
    });
  };

  fun.message = Array.prototype.concat(["Must have values for keys:"], keys).join(" ");
  return fun;
}


var checkCommand = checker(validator("Must be a map", aMap), hasKeys("message", "type"))

console.log(checkCommand(myMessage))
