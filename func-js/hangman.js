"use strict";

var seedWord = "hello";

function play(word) {

  function letterPosition(letter) {
    return word.indexOf(letter);
  }

  function createArrayOfLengthAndValue(len, value) {
    return Array.apply(null, new Array(len)).map(function() {return value;});
  }

  function buildStage(word) {
    var stage = createArrayOfLengthAndValue(word.length, "_");

    return function (letter) {
      word.split("").forEach(function(l, i) {
        if (l == letter) {
          stage[i] = letter;
        }
      });
      return stage.join(" ");
    };
  }

  function countLives(lives) {
    return function(letter) {
      letterPosition(letter) < 0 && lives--;
      return lives;
    }
  }

  var updateStage = buildStage(word);
  var updateLives = countLives(3);

  return function (letter) {
    var newLives = updateLives(letter),
        newStage = updateStage(letter);

    if (newLives <= 0) return "You lose, sorry!"

    if (newStage.indexOf("_") == -1) {
      return newStage + " : You win! Congratulations!"
    }

    return newStage + " : " + newLives + " lives left";
  };

}

var guess = play(seedWord);

guess("l");
