# Custom errors, extending Error

When we develop something, we often need our own error classes to reflect specific things that may go wrong in our tasks. For errors in network operations we may need `HttpError`, for database operations `DbError`, for searching operations `NotFoundError` and so on.

Our errors should inherit from basic `Error` class and support basic error properties like `message`, `name` and, preferably, `stack`. But they also may have other properties of their own, e.g. `HttpError` objects may have `statusCode` property with a value like `404` or `403` or `500`.

Technically, we can use standalone classes for our errors, because JavaScript allows to use `throw` with any argument. But if we inherit from `Error`, then it becomes possible to use `obj instanceof Error` check to identify error objects. So it's better to inherit from it.

As we build our application, our own errors naturally form a hierarchy, for instance `HttpTimeoutError` may inherit from `HttpError`. Examples will follow soon.

## Extending Error

As an example, let's consider a function `readUser(json)` that should read JSON with user data.

Here's an example of how a valid `json` may look:
```js
let json = `{ "name": "John", "age": 30 }`;
```

If `JSON.parse` receives malformed `json`, then it throws `SyntaxError`. But even if `json` is syntactically correct, it may don't have the necessary data. For instance, if may not have `name` and `age` properties that are essential for our users.

That's called "data validation" -- we need to ensure that the data has all the necessary fields. And if the validation fails, then it not really a `SyntaxError`, because the data is syntactically correct. Let's create `ValidationError` -- the error object of our own with additional information about the offending field.

Our `ValidationError` should inherit from the built-in `Error` class. To better understand what we're extending -- here's the approximate code for built-in [Error class](https://tc39.github.io/ecma262/#sec-error-message):

```js
// "pseudocode" for the built-in Error class defined by JavaScript itself
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (different names for different built-in error classes)
    this.stack = <nested calls>; // non-standard, but most environments support it
  }
}
```

Now let's inherit from it:

```js run untrusted
*!*
class ValidationError extends Error {
*/!*
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("Woops!");
}

try {
  test();
} catch(err) {
  alert(err.message); // Woops!
  alert(err.name); // ValidationError
  alert(err.stack); // a list of nested calls with line numbers for each
}
```

Please note:

1. In the line `(1)` we call the parent constructor to set the message. JavaScript requires us to call `super` in the child constructor.
2. The parent constructor sets the `name` property to `"Error"`, so here we reset it to the right value.

Let's try to use it in `readUser(json)`:

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// Usage
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new ValidationError("No field: age");
  }
  if (!user.name) {
    throw new ValidationError("No field: name");
  }

  return user;
}

// Working example with try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Invalid data: No field: name
*/!*
  } else if (err instanceof SyntaxError) {
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // unknown error, rethrow it
  }
}
```

Everything works -- both our `ValidationError` and the built-in `SyntaxError` from `JSON.parse` can be generated and handled.

Please take a look at how the code checks for the error type in `catch (err) { ... }`. We could use `if (err.name == "ValidationError")`, but `if (err instanceof ValidationError)` is much better, because in the future we are going to extend `ValidationError`, make new subtypes of it, namely `PropertyRequiredError`. And `instanceof` check will continue to work. So that's future-proof.

Also it's important that if `catch` meets an unknown error, then it rethrows it. The `catch`  only knows how to handle validation and syntax errors, other kinds (due to a typo in the code or such) should fall through.

## Further inheritance

The `ValidationError` class is very generic. Many things may be wrong. The property may be absent or it may be in a wrong format (like a string value for `age`). Let's make a more concrete class `PropertyRequiredError`, exactly for absent properties. It will carry additional information about the property that's missing.

```js run
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

*!*
class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}
*/!*

// Usage
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

// Working example with try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
*!*
    alert("Invalid data: " + err.message); // Invalid data: No property: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
*/!*
  } else if (err instanceof SyntaxError) {
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // unknown error, rethrow it
  }
}
```

The new class `PropertyRequiredError` is easy to use: we only need to pass the property name: `new PropertyRequiredError(property)`. The human-readable `message` is generated by the constructor.

Plese note that `this.name` in `PropertyRequiredError` once again assigned manually. We could make our own "basic error" class, name it `MyError` that removes this burden from our shoulders by using `this.constructor.name` for `this.name` in the constructor. And then inherit from it.

Here we go:

```js run
class MyError extends Error {
  constructor(message) {
    super(message);
*!*
    this.name = this.constructor.name;
*/!*
  }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}

// name is correct
alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```

Now the inheritance became simpler, as we got rid of the `"this.name = ..."` line in the constructor.

## Wrapping exceptions

The purpose of the function `readUser` in the code above is "to read the user data", right? There may occur different kinds of errors in the process. Right now we have `SyntaxError` and `ValidationError`, but there may appear more if we put more stuff into it.

Right now the code which calls `readUser` uses multiple `if` in `catch` to check for different error types. The important questions is: do we really want to check for all error types one-by-one every time we call `readUser`?

Often the answer is: "No". The outer code wants to be "one level above all that". It wants to have some kind of "data reading error". Why exactly it happened -- is usually irrelevant (the message has the info). Or, even better if there is a way to get more details, but only if we need to.

So let's make a new class `ReadError` to represent such errors. If an error occurs inside `readUser`, we'll catch it there and generate `ReadError`. We'll also keep the reference to the original error in the `cause` property.

```js run
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

class ValidationError extends Error { /*...*/ }
class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }

  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
*!*
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
*/!*
  }

  try {
    validateUser(user);
  } catch (err) {
*!*
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
*/!*
  }

}

try {
  readUser('{bad json}');
} catch (e) {
  if (e instanceof ReadError) {
*!*
    alert(e);
    // Original error: SyntaxError: Unexpected token b in JSON at position 1
    alert("Original error: " + e.cause);
*/!*
  } else {
    throw e;
  }
}
```

In the code above, `readUser` does exactly as described -- catches syntax and validation errors and throws `ReadError` errors instead (unknown errors are rethrown as usual).

The approach is called "wrapping exceptions", because we take "low level exceptions" and "wrap" them into `ReadError` that is more abstract and more convenient to use for the calling code. It is widely used in object-oriented programming.

## Summary

- We can inherit from `Error` and other built-in error classes normally, just need to take care of `name` property and don't forget to call `super`.
- Most of the time, we should use `instanceof` to check for particular errors. It also works with inheritance. But sometimes we have an error object coming from the 3rd-party library and there's no easy way to get the class. Then `name` property can be used for such checks.
- Wrapping exceptions is a widespread technique when a function handles low-level exceptions and makes a higher-level object to report about the errors. Low-level exceptions sometimes become properties of that object like `err.cause` in the examples above, but that's not strictly required.
