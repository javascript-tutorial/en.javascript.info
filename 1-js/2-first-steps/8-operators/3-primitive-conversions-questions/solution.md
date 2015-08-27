

```js
//+ no-beautify
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2 
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5  = "$45"
"4" - 2  = 2 
"4px" - 2  = NaN
7 / 0  = Infinity 
" -9\n" + 5 = " -9\n5"
" -9\n" - 5 = -14
null + 1 = 1 // (3)
undefined + 1 = NaN // (4)
```

<ol>
<li>The plus `"+"` operator in this case first converts `1` to a string: `"" + 1 = "1"`, and then adds `0`.</li>
<li>The minus `"-"` operator only works with numbers, it converts an empty string `""` to zero immediately.</li>
<li>`null` becomes `0` after the numeric conversion.</li>
<li>`undefined` becomes `NaN` after the numeric conversion.</li>
</ol>