
```js no-beautify
"" + 1 + 0 = "10" 
"" - 1 + 0 = -1 
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
"  -9  " + 5 = "  -9  5" 
"  -9  " - 5 = -14 
null + 1 = 1 
undefined + 1 = NaN 
" \t \n" - 2 = -2
```

1. The addition with a string `"" + 1` converts `1` to a string: `"" + 1 = "1"`, and then we have `"1" + 0`, the same rule is applied.
2. The subtraction `-` (like most math operations) only works with numbers, it converts an empty string `""` to `0`.
3. Here, the operands are not strings, so the `+` operator works with numeric addition rules, so `true` becomes `1` and false becomes `0`.
4. `/` works like math operator and converts the string `"3"` to `3` and then `6/3` is done.
5. Similar to points 3 and 4, the `*` operator converts both operands from strings to numbers and then performs the multiplication
6. Expressions are calculated from left to right if the operators have same precedence. First, `4+5` is evaluated, resulting in `9`. Then, `"9" + "px"` concatenates the string `"px"` to `9`.
7. Similarly to point 6, `"$" + 4` results in `"$4"` because one operand is a string. Then, `"$4" + 5` concatenates `5` to `"$4"`.
8. `-` operator does not work on strings like `+` does. Therefore, `'4'` is converted to `4` by `-`, resulting in `4 - 2`.
9. Here `-` tries to convert `"4px"` to number but it's not a valid convertable value so we get `NaN`, now any direct mathematical operation with `NaN` results in `NaN`
10. The addition with a string appends the number `5` to the string.
11. The subtraction always convert values to numbers, so it makes `"  -9  "` a number `-9` (ignoring spaces around it).
12. `null` becomes `0` after the numeric conversion.
13. `undefined` becomes `NaN` after the numeric conversion and `NaN + 1` is always `NaN`.
14. Space characters are trimmed off from string's start and end when a string is converted to a number. Here the whole string consists of space characters, such as `\t`, `\n` and a "regular" space between them. So, similarly to an empty string, it becomes `0`.
