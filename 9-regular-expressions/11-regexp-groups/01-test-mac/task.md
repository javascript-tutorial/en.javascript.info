# Check MAC-address

[MAC-address](https://en.wikipedia.org/wiki/MAC_address) of a network interface consists of 6 two-digit hex numbers separated by a colon.

For instance: `subject:'01:32:54:67:89:AB'`.

Write a regexp that checks whether a string is MAC-address.

Usage:
```js
let regexp = /your regexp/;

alert( regexp.test('01:32:54:67:89:AB') ); // true

alert( regexp.test('0132546789AB') ); // false (no colons)

alert( regexp.test('01:32:54:67:89') ); // false (5 numbers, must be 6)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ ad the end)
```
