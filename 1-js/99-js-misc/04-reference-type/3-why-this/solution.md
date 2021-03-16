
Here's the explanations.

1. That's a regular object method call.

2. The same, parentheses do not change the order of operations here, the dot is first anyway.

3. Here we have a more complex call `(expression)()`. The call works as if it were split into two lines:

    ```js no-beautify
    f = obj.go; // calculate the expression
    f();        // call what we have
    ```

    Here `f()` is executed as a function, without `this`.

4. The similar thing as `(3)`, to the left of the parentheses `()` we have an expression.

To explain the behavior of `(3)` and `(4)` we need to recall that property accessors (dot or square brackets) return a value of the Reference Type.  

Any operation on it except a method call (like assignment `=` or `||`) turns it into an ordinary value, which does not carry the information allowing to set `this`.

