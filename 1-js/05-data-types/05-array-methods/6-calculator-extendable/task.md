importance: 5

---

# Create an extendable calculator

Create a constructor function `Calculator` that creates "extendable" calculator objects.

The task consists of two parts.

1. First, implement the method `calculate(str)` that takes a string like `"1 + 2"` in the format "NUMBER operator NUMBER" (space-delimited) and returns the result. Should understand plus `+` and minus `-`.

    Usage example:

    ```js
    let calc = new Calculator;

    alert( calc.calculate("3 + 7") ); // 10
    ```
2. Then add the method `addMethod(name, func)` that teaches the calculator a new operation. It takes the operator `name` and the two-argument function `func(a,b)` that implements it.

    For instance, let's add the multiplication `*`, division `/` and power `**`:

    ```js
    let powerCalc = new Calculator;
    powerCalc.addMethod("*", (a, b) => a * b);
    powerCalc.addMethod("/", (a, b) => a / b);
    powerCalc.addMethod("**", (a, b) => a ** b);

    let result = powerCalc.calculate("2 ** 3");
    alert( result ); // 8
    ```

- No parentheses or complex expressions in this task.
- The numbers and the operator are delimited with exactly one space.
- There may be error handling if you'd like to add it.
