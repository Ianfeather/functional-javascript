// https://www.reddit.com/r/dailyprogrammer/comments/2rfae0/20150105_challenge_196_practical_exercise_ready/

var dummySet1 = [1,2,3,3,4],
    dummySet2 = [2,2,2,2,4,5,5,6],
    dummySet3 = [2,4,4,4,4,5,6,6];

function createSet(fuzzySet) {

  var duplicates = []
  // Remove duplicates
  return fuzzySet
    .map(function(val) {
      if (duplicates.indexOf(val) < 0) {
        duplicates.push(val);
        return val;
      }
    })
    .reduce(function(orderedSet, nextVal) {
      if (!nextVal) return orderedSet;
      orderedSet.push(nextVal);
      return orderedSet.sort();
    }, []);
}

function partialContains(actualSet) {
  return function(value) {
    return actualSet.indexOf(value) != -1
  }
}

function intersection(set1, set2) {
  var actualSet1 = createSet(set1),
      actualSet2 = createSet(set2);

  return actualSet1.filter(partialContains(actualSet2));
}

function union(set1, set2) {
  var actualSet1 = createSet(set1),
      actualSet2 = createSet(set2);

  return createSet(actualSet1.concat(actualSet2))
}

function equals(set1, set2) {
  var actualSet1 = createSet(set1),
      actualSet2 = createSet(set2);

  return actualSet1.toString() == actualSet2.toString();
}


var contains = partialContains(createSet(dummySet1));

console.log(contains(2)); // true
console.log(intersection(dummySet1, dummySet2)); // [2, 4]
console.log(union(dummySet1, dummySet2)); // [1, 2, 3, 4, 5, 6]
console.log(equals(dummySet1, dummySet2)); // false
console.log(equals(dummySet2, dummySet3)); // true
