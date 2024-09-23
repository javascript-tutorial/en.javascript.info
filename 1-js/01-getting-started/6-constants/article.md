# Constants

To declare a constant (unchanging) variable, use `const` instead of `let`:

```js
const myBirthDate = '18.04.1982';
```

Variables declared using `const` are called "constants". They cannot be reassigned. An attempt to do so would cause an error:

```js run
const myBirthDate = '18.04.1982';

myBirthDate = '01.01.2001'; // error, can't reassign the constant!
```

When we are sure that a variable must never change, we should declare it with `const` – not only to technically guarantee it, but also to clearly communicate this fact to future readers and maintainers of our code.

## Uppercase constants

There is a widespread practice to use constants as aliases for difficult-to-remember values.

Such constants are named using capital letters and underscores.

For instance, let's make constants for colors in so-called "web" (hexadecimal) format:

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...when we need to pick a color
let color = COLOR_ORANGE;
console.log(color); // #FF7F00
```

Benefits:

- `COLOR_ORANGE` is much easier to remember than `"#FF7F00"`.
- It is much easier to mistype in `"#FF7F00"` than in `COLOR_ORANGE`.
- When reading the code, `COLOR_ORANGE` is much more meaningful than `#FF7F00`.

When should we use capitals for a constant? Let's make that clear.

Being a "constant" just means that a variable's value never changes. But some constants are known before execution. People also call them "hard-coded", because their values (such as the hexadecimal value for red) are embedded into the code. For them we should use capital letters.

On the other hand, some constants are *calculated* at run time, during the execution, but do not change after their initial assignment.

For instance, after a web page is loaded, we can store the time it took into a variable:

```js
const pageLoadTime = /* time taken by a webpage to load */;
```

The value of `pageLoadTime` will never change, so it's a constant. However, it's not known before the execution, it's not "hard-coded", this is why its name is not capitalized.
