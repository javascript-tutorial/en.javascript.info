function makeCounter() {
  let count = 0;

  // ... sizning kod ...
}

let counter = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

counter.set(10); // yangi count o'rnating

alert( counter() ); // 10

counter.decrease(); // countni 1 ga kamaytiring

alert( counter() ); // 10 (11 o'rniga)
