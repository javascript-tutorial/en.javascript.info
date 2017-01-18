importance: 5

---

# Inherit from SyntaxError

Create an error `FormatError` that inherits from `SyntaxError`.

Usage example:
```js
let err = new FormatError("formatting error");

alert( err.message ); // formatting error
alert( err.name ); // FormatError
alert( err.stack ); // stack

alert( err instanceof SyntaxError ); // true
```
