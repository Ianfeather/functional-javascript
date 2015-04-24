for (var i = 0; i < 50; i++) {
  if (i%5 == 0) {
    if (i%3 == 0) {
      console.log("fizzbuzz")
    } else {
      console.log("fizz")
    }
  } else if (i%3 == 0) {
    console.log("buzz")
  } else {
    console.log(i)
  }
}


function range(n) {
  return Array.apply(null, Array(n)).map(function(x, i) {
     return i;
  });
}

function partialNoRemainder(div) {
  return function(num) {
    return num % div == 0;
  }
}

var fizz = partialNoRemainder(5)
var buzz = partialNoRemainder(3)

range(30).map(function(n) {
  if (fizz(n) && buzz(n)) return "fizzbuzz";
  if (fizz(n)) return "fizz";
  if (buzz(n)) return "buzz";
  return n;
})
.forEach(function(x) {
  console.log(x)
})
