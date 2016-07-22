function makeCounter() {
  let count = 0;

  // ... your code ...
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

counter.set(10); // set the new count

alert( counter() ); // 10

counter.decrease(); // decrease the count by 1

alert( counter() ); // 10 (instead of 11)
