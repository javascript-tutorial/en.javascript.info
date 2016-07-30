importance: 4

---

# Filter anagrams

[Anagrams](https://en.wikipedia.org/wiki/Anagram) are words that have the same number of same letters, but in different order.

For instance:

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

Write a function `aclean(arr)` that returns an array cleaned from anagrams.

For instance:

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) ); // "nap,teachers,ear" or "PAN,cheaters,era"
```

From every anagram group should remain only one word, no matter which one.

