

var app = (function() {

  "use strict";

  var currentPosition = 0,
      shapes;

  /*
  // Update the shape in the DOM
  */
  var updateShape = function updateShape(state) {
    test.style.width = `${state.get("width")}px`;
    test.style.height = `${state.get("height")}px`;
  };


  /*
  // Returns an array of immutables
  */
  var setupShapes = function setupShapes() {

    var map1 = Immutable.Map({ width: 1, height: 1 });

    return Array.apply(null, Array(10)).map(function() {

      return map1.merge({
        height: Math.random() * 200,
        width:  Math.random() * 1000
      });

    });

  };

  /*
  // Animate in our new shapes so we have some visual progress
  */
  var paintInitialShapes = function paintInitialShapes() {
    var interval = setInterval(function() {
      if (currentPosition < shapes.length) {
        updateShape(shapes[currentPosition]);
        return currentPosition++;
      }

      currentPosition = shapes.length - 1;
      clearInterval(interval);
    }, 500);
  }

  /*
  //  Add a few event handers
  */
  var setupHandlers = function setupHandlers() {

    document.querySelector("#undo").addEventListener("click", app.undo, false);
    document.querySelector("#redo").addEventListener("click", app.redo, false);

    document.querySelector("#export").addEventListener("click", function() {
      console.log(JSON.stringify(app.getState()));
    }, false);

    document.querySelector("#import").addEventListener("click", function() {
      app.setState(JSON.parse(document.querySelector("#import-input").value));
    }, false);

  }




  /*
  // Public API
  */
  return {

    // Set up ten initial shapes
    init: function init() {
      shapes = setupShapes();

      setupHandlers();
      paintInitialShapes();
    },

    undo: function undo() {
      currentPosition > 0 && updateShape(shapes[--currentPosition]);
    },

    redo: function redo() {
      currentPosition < shapes.length - 1 && updateShape(shapes[++currentPosition]);
    },

    getState: function getState() {
      return shapes.slice(0, currentPosition + 1);
    },

    setState: function setState(newState) {
      shapes = [ Immutable.Map(newState.shift()) ];

      newState.forEach(function(currentState){
        shapes.push(shapes[0].merge(currentState))
      });

      currentPosition = shapes.length - 1;

      updateShape(shapes[currentPosition]);
    }

  }

}());
