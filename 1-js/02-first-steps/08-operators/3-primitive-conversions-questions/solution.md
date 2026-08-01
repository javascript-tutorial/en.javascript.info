
```js no-beautify
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1 // (3)
6 / "3" = 2 // (4)
"2" * "3" = 6 // (5)
4 + 5 + "px" = "9px" // (6)
"$" + 4 + 5 = "$45" // (7)
"4" - 2 = 2 // (8)
"4px" - 2 = NaN // (9)
"  -9  " + 5 = "  -9  5" // (10)
"  -9  " - 5 = -14 // (11)
null + 1 = 1 // (12)
undefined + 1 = NaN // (13)
" \t \n" - 2 = -2 // (14)
```

1. The addition with a string `"" + 1` converts `1` to a string: `"" + 1 = "1"`, and then we have `"1" + 0`, the same rule is applied.
2. The subtraction `-` (like most math operations) only works with numbers, it converts an empty string `""` to `0`.
3. True is considered to be `1` and false is considered to be `0`, so the expression is equivalent to `1 + 0`.
4. Here, `6` is divided by the string `"3"`, which is converted to the number `3`, resulting in a value of `2`.
5. `"2"` and `"3"` are automatically converted to numbers and then multiplied, resulting in `6`. 
6. Addition operator `+` has higher precedence than string concatenation. The first two additions are performed before the string `"px"` is concatenated. 
7. First, `4` is converted to a string and concatenated with `"$"` to make `$4`, which is then concatenated with `5`.
8. Both operands are first converted to numbers before the subtraction is performed. 
9. Subtraction requires numeric operands, as `"4px“` cannot be converted it results in `NaN`.
10. When one operand of a `+` operation is a string, concatenation occurs rather than numeric addition.
11. The subtraction always converts to numbers, so it makes `"  -9  "` a number `-9` (ignoring spaces around it).
12. `null` is converted to `0` before the addition is performed, and `0 + 1` is equal to `1`.
13. Because `undefined` is not a number and cannot be converted to one, when either operand of a `+` operation is `NaN`, the result is `NaN`.
14. Space characters are trimmed off the string start and end when a string is converted to a number. Here the whole string consists of space characters, such as `\t`, `\n` and a "regular" space between them. So, similarly to an empty string, it becomes `0`.
