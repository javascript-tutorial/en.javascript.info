

```js no-beautify
5 > 4 → true
"apple" > "pineapple" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
0=="\n0\n" → true
"0"=="\n0\n" → false
"0"== +"\n0\n" → true
null == "\n0\n" → false
null === +"\n0\n" → false
```

Some of the reasons:

1. Obviously, true.
2. Dictionary comparison, hence false. `"a"` is smaller than `"p"`.
3. Again, dictionary comparison, first char `"2"` is greater than the first char `"1"`.
4. Values `null` and `undefined` are equal to each other only when their type is not cared about.
5. For Strict equality different types from both sides lead to false.
6. Here R.H.S is converted to Number because L.H.S is number, hence true.
7. Here R.H.S is not coverted to Number becasue L.H.S is also a String , and these two Strings are not equal.
8. R.H.S is converted to Number using unary `+` , making it equal to `0`,hence L.H.S also gets converted to Number , hence the result is `true`
9. Similar to point `4`, `null` is only equal to `undefined`, when compared using `==` , because both of them are of different types and with `==` their type don't matter. Here `null` don't get converted to number but "\n0\n" is converted to Number, hence `null == 0` is false
10. `null` is a type in itself hence, Strict equality of different types resulted to false. Here also `null` is not converted to `0`.
