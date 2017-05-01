'use strict';

new Promise()
  .then(result => {
    return {
      then(resolve, reject) {
        setTimeout(() => resolve("two"), 1000);
      }
    };
  })
  .then(result => {
    console.log("HERE", result);
    return result;
  })
  .then(console.log)
  .catch(err => console.error("ERROR", err));

// https://tc39.github.io/ecma262/#sec-promise-resolve-functions

