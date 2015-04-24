//https://www.reddit.com/r/dailyprogrammer/comments/2s7ezp/20150112_challenge_197_easy_isbn_validator/

function isISBNNumber(num) {

  return ("" + num)

    .split("")

    .map(function(curr, i) {
      return (10-i) * parseInt(curr, 10)
    })

    .reduce(function(acc, prev) {
      return acc + prev
    }) % 11

}

function ISBNGenerator() {
  var seed = ("" + parseInt(Math.random() * 10000000000, 10))

    .split("")

    .map(function(curr, i) {
      return (10-i) * parseInt(curr, 10)
    });

  var diff = seed.reduce(function(acc, prev) {
    return acc + prev
  }) % 11;

  console.log(diff)

  return parseInt(seed, 10) + diff;

}

function createIsbn() {
    var isbn = '',
        total = 0;

    for (var i = 0; i < 9; i++)
    {
        isbn += '' + Math.floor(Math.random() * 9);
        total += parseInt(isbn[i]) * (10 - i);
    }

    var modDiff = 11 - (total % 11);
    if (modDiff === 10)
        isbn += 'X';
    else
        isbn += '' + modDiff;
    return isbn;
}
