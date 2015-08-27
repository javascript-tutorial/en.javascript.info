

```js
//+ no-beautify
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true // (1)
undefined == null → true // (2)
undefined === null → false // (3)
null == "\n0\n" → false // (4)
```

Some of the reasons:

<ol>
<li>The string `"2"` is indeed greater than `"12"`, because strings are compared character-by-character. The first character of `"2"` is greater than the first character of `"12"` (that is `"1"`).</li>
<li>Values `null` and `undefined` equal each other only.</li>
<li>Strict equality is strict. Different types from both sides lead to false.</li>
<li>See (2) for the reason.</li>
</ol>