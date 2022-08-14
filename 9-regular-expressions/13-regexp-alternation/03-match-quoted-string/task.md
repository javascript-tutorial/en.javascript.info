# Find quoted strings

Create a regexp to find strings in double quotes `subject:"..."`.

The strings should support escaping, the same way as JavaScript strings do. For instance, quotes can be inserted as `subject:\"` a newline as `subject:\n`, and the backslash itself as `subject:\\`.

```js
let str = "Just like \"here\".";
```

Please note, in particular, that an escaped quote `subject:\"` does not end a string.

So we should search from one quote to the other ignoring escaped quotes on the way.

That's the essential part of the task, otherwise it would be trivial.

Examples of strings to match:
```js
.. *!*"test me"*/!* ..  
.. *!*"Say \"Hello\"!"*/!* ... (escaped quotes inside)
.. *!*"\\"*/!* ..  (double backslash inside)
.. *!*"\\ \""*/!* ..  (double backslash and an escaped quote inside)
```

In JavaScript we need to double the backslashes to pass them right into the string, like this:

```js run
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

// the in-memory string
alert(str); //  .. "test me" .. "Say \"Hello\"!" .. "\\ \"" ..
```
