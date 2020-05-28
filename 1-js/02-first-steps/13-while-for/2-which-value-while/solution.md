The task demonstrates how postfix/prefix forms can lead to different results when used in comparisons.

1. **From 1 to 4**

    ```js run
    let i = 0;
    while (++i < 5) alert( i );
    ```

    The first value is `i = 1`, because `++i` first increments `i` and then returns the new value. So the first comparison is `1 < 5` and the `alert` shows `1`.

    Then follow `2, 3, 4…` -- the values show up one after another. The comparison always uses the incremented value, because `++` is before the variable.

    Finally, `i = 4` is incremented to `5`, the comparison `while(5 < 5)` fails, and the loop stops. So `5` is not shown.
2. **From 1 to 5**

    ```js run
    let i = 0;
    while (i++ < 5) alert( i );
    ```

    The first value is again `i = 1`. The postfix form of `i++` increments `i` and then returns the *old* value, so the comparison `i++ < 5` will use `i = 0` (contrary to `++i < 5`).

    But the `alert` call is separate. It's another statement which executes after the increment and the comparison. So it gets the current `i = 1`.

    Then follow `2, 3, 4…`

    Let's stop on `i = 4`. The prefix form `++i` would increment it and use `5` in the comparison. But here we have the postfix form `i++`. So it increments `i` to `5`, but returns the old value. Hence the comparison is actually `while(4 < 5)` -- true, and the control goes on to `alert`.

    The value `i = 5` is the last one, because on the next step `while(5 < 5)` is false.
