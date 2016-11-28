# Custom errors, extending Error

When we develop our software, we need our own error classes. For network operations we may need `HttpError`, for database operations `DbError`, for searching operations `NotFoundError` and so on.

Our errors should inherit from with the basic `Error` class and have basic error properties like `message`, `name` and, preferably, `stack`. But they also may have other properties of their own, e.g. `HttpError` objects may have `statusCode` property, that is `404` for the "page not found" error.

Technically, we can use standalone classes for errors, because Javascript allows to use `throw` with any argument. But if we inherit from `Error`, then we can use `obj instanceof Error` check to identify error objects. So it's better to inherit from it.

As we build our application, our own errors naturally form a hierarchy, for instance `HttpTimeoutError` may inherit from `HttpError`. Examples will follow soon.

## Extending Error

As an example, let's create a function `readUser(json)` that should read JSON with user data. We are getting that data from a remote server or, maybe it may be altered by a visitor, or just for the sheer safety -- we should to be aware of possible errors in `json`.

Here's an example of how a valid `json` may look:
```js
let json = `{ "name": "John", "age": 30 }`;
```

If the function receives malformed `json`, then it should throw `SyntaxError`. Fortunately, `JSON.parse` does exactly that.

...But if the `json` is correct, that doesn't mean it has all the data. For instance, if may not have `name` or `age`.

That's called "data validation" -- we need to ensure that the data has all the necessary fields. And if the validation fails, then throwing `SyntaxError` would be wrong, because the data is syntactically correct. So we should throw `ValidationError` -- the error object of our own with the proper message and, preferable, with additional information about the offending field.

Let's make the `ValidationError` class. But to better understand what we're extending -- here's the approximate code for built-in [Error class](https://tc39.github.io/ecma262/#sec-error-message):

```js
class Error {
  constructor(message) {
    this.message = message;
    this.name = "Error"; // (different names for different built-in errors)
    this.stack = <sequence of nested calls>; // non-standard! most environments support it
  }
}
```

Now let's inherit from it:

```js run untrusted
class ValidationError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("Wops!");
}

try {
  test();
} catch(err) {
  alert(err.message); // Wops!
  alert(err.name); // ValidationError
  alert(err.stack); // a list of nested calls with line numbers for each
}
```

Notes:

1. In the line `(1)` we call the parent constructor to set the message. Javascript requires us to call `super` in the child constructor anyway.
2. The `name` property for our own errors should be assigned manually, otherwise it would be set by the superclass (to `"Error"`).


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

Everything works -- both our `ValidationError` and the built-in `SyntaxError` from `JSON.parse` are correctly handled.

Please note how the code check for the error type in `catch (err) { ... }`. We could use `if (err.name == "ValidationError")`, but `if (err instanceof ValidationError)` is much better, because in the future we are going to extend `ValidationError`, make new subtypes of it, namely `PropertyRequiredError`. And `instanceof` check will continue to work. So that's future proof.

Also it's important that if we meet an unknown error, then we just rethrow it. The `catch`  only knows how to handle validation and syntax errors, other kinds (due to a typo in the code or such) should fall through.

## Further inheritance

The `ValidationError` class is very generic. Let's make a more concrete class `PropertyRequiredError`, exactly for the absent properties. It will carry additional information about the property that's missing.

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

The new class `PropertyRequiredError` is easier to use, because we just pass the property name to it: `new PropertyRequiredError(property)`. The human-readable `message` is generated by the constructor.

Plese note that `this.name` in `PropertyRequiredError` once again assigned manually. We could evade that by using `this.constructor.name` for `this.name` in the superclass.

The generic solution would be to make `MyError` class that takes care of it, and inherit from it.

For instance:

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

alert( new PropertyRequiredError("field").name ); // PropertyRequiredError
```


## Wrapping exceptions

The purpose of the function `readUser` in the code above is -- to "read the user data", right? There may occur different kinds of errors in the process, not only `SyntaxError` and `ValidationError`, but probably others if we continue developing it.

Right now the code which calls `readUser` uses multiple `if` in `catch` to check for different error types and rethrow if the error is unknown.

But the important questions is: do we want to check for all these types every time we call `readUser`?

Often the answer is: "No". The outer code wants to be "one level above all that". It wants to have some kind of "data reading error", and why exactly it happened -- is usually irrelevant (the message has the info). Or, even better if there is a way to get more details, but only if it wants to.

In our case, when a data-reading error occurs, we will create an object of the new class `ReadError`, that will provide the proper message. And we'll also keep the original error in its `cause` property, just in case.

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
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
  }

  try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
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

The approach is called "wrapping exceptions", because we take "low level exceptions" and "wrap" them into `ReadError` that is more abstract and more convenient to use for the calling code.


## Summary

- We can inherit from `Error` and other built-in error classes normally, just need to take care of `name` property and don't forget to call `super`.
- Most of the time, we should use `instanceof` to check for particular errors. It also works with inheritance. But sometimes we have an error object coming from the 3rd-party library and there's no easy way to get the class. Then `name` property can be used for such checks.
- Wrapping exceptions is a widespread technique when a function handles low-level exceptions and makes a higher-level object to report about the errors. Low-level exceptions sometimes become properties of that object like `err.cause` in the examples above, but that's not strictly required.
