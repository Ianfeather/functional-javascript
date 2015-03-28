var i = 0,

app = (function() {

  "use strict";

  var updateState = function updateState(state) {
    test.style.width = state.get("width") + "px";
    test.style.height = state.get("height") + "px";
  };

  var maps = (function setupMaps() {

    var map1 = Immutable.Map({ width: 1, height: 1 }),
        arr  = [];

    for (var i = 0; i < 10; i++) {
      arr.push(map1.merge({ height: Math.random() * 200, width: Math.random() * 1000 }));
    }

    return arr;

  }());

  var interval = setInterval(function() {

    i++;

    if (i == maps.length -1) {
      clearInterval(interval);
    }
    updateState(maps[i]);

  }, 400)


  return {

    undo: function undo() {
      i > 0 && updateState(maps[--i]);
    },

    redo: function redo() {
      i < maps.length - 1 && updateState(maps[++i]);
    },

    getState: function getState() {
      return maps.slice(0, i + 1);
    },

    setState: function setState(newState) {
      var states = JSON.parse(newState);

      maps = states.map(function(state){
        return Immutable.Map(state)
      });

      i = maps.length - 1;
      updateState(maps[i]);
    }

  }


}());



document.querySelector("#undo").addEventListener("click", app.undo, false);
document.querySelector("#redo").addEventListener("click", app.redo, false);

document.querySelector("#export").addEventListener("click", function() {
  console.log(JSON.stringify(app.getState()));
}, false);

document.querySelector("#import").addEventListener("click", function() {
  var value = document.querySelector("#import-input").value;
  app.setState(value);
}, false);
