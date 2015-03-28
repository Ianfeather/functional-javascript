(function() {


  "use strict";

  var Promise = require('es6-promise').Promise;

  // var someAsyncThing = function() {
  //   return new Promise(function(resolve, reject) {
  //     var x = 2;
  //     resolve(x + 2);
  //   });
  // };

  // var someOtherAsyncThing = function(foo) {
  //   return new Promise(function(resolve, reject) {
  //     resolve(foo + ' something went wrong');
  //   });
  // };

  // someAsyncThing()
  //   .then(someOtherAsyncThing).catch(function(err) {
  //     console.log(err)
  //   })
  //   .then(function() {
  //     console.log('carry on');
  //   });

  var fetchData = function() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve({
          users: [
            { name: 'Jack', age: 22 },
            { name: 'Tom', age: 21 },
            { name: 'Isaac', age: 21 },
            { name: 'Ian', age: 29 }
          ]
        });
      }, 50);
    });
  }

  var prepareDataForCsv = function(data) {
    return new Promise(function(resolve, reject) {
      var newData = data.users.filter(function(user) {
        return user.name[0] == "I"
      })
      resolve(newData);
    });
  };

  var writeToCsv = function(data) {
    return new Promise(function(resolve, reject) {
      resolve(data);
    });
  };

  fetchData()
    .then(prepareDataForCsv)
    .then(writeToCsv)
    .then(console.log)
    .catch(function(err) {
      console.log(err)
    });


  // fetchData()
  //   .then(prepareDataForCsv)
  //   .then(writeToCsv)
  //   .then(console.log)



})();
