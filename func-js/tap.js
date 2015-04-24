var _ = require("lodash");
var result,
    contacts = ["ian feather", "dan etherington"],
    numbers = [1,2,3];

function isEven(num) { return num % 2 == 0 };

function capitalizeEven(letter, i) {
  return isEven(i) ? letter.toUpperCase() : letter
};

function capitalizeEveryOtherLetter(string) {
  console.log(string);
    return _.map(string, capitalizeEven).join('')
};

result = _(contacts)
          .tap(_.first)
          .tap(capitalizeEveryOtherLetter)
          .tap(console.log)
          .value()

result = _(numbers)
          .tap(function(a) {a.pop()})
          .reverse()
          .value()





console.log(result);
