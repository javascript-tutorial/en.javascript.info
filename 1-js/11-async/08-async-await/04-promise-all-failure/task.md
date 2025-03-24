
# Dangerous Promise.all

`Promise.all` is a great way to parallelize multiple operations. It's especially useful when we need to make parallel requests to multiple services.

However, there's a hidden danger. We'll see an example in this task and explore how to avoid it.

Let's say we have a connection to a remote service, such as a database.

There're two functions: `connect()` and `disconnect()`.

When connected, we can send requests using `database.query(...)` - an async function which usually returns the result but also may throw an error.

Here's a simple implementation:

```js
let database;

function connect() {
  database = {
    async query(isOk) {
      if (!isOk) throw new Error('Query failed');
    }
  };
}

function disconnect() {
  database = null;
}

// intended usage:
// connect()
// ...
// database.query(true) to emulate a successful call
// database.query(false) to emulate a failed call
// ...
// disconnect()
```

Now here's the problem.

We wrote the code to connect and send 3 queries in parallel (all of them take different time, e.g. 100, 200 and 300ms), then disconnect:

```js
// Helper function to call async function `fn` after `ms` milliseconds
function delay(fn, ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => fn().then(resolve, reject), ms);
  });
}

async function run() {
  connect();

  try {
    await Promise.all([
      // these 3 parallel jobs take different time: 100, 200 and 300 ms
      // we use the `delay` helper to achieve this effect
*!*
      delay(() => database.query(true), 100),
      delay(() => database.query(false), 200),
      delay(() => database.query(false), 300)
*/!*
    ]);
  } catch(error) {
    console.log('Error handled (or was it?)');
  }

  disconnect();
}

run();
```

Two of these queries happen to be unsuccessful, but we're smart enough to wrap the `Promise.all` call into a `try..catch` block.

However, this doesn't help! This script actually leads to an uncaught error in console!

Why? How to avoid it?