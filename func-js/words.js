function countWords(src) {
  var words = src.split(" "),
      result = new Map(),
      checkword = function(word) {
        thisWord = word.toLowerCase();
        return result.set(thisWord, result.has(thisWord) ? result.get(thisWord) + 1 : 1);
      };

  words.forEach(checkword);

  return result;
}

var test = "And we went to the zoo and the zoo was really good";

console.log(countWords(test))
