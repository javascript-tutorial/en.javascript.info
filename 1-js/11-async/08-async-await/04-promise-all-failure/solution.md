
The root of the problem is that `Promise.all` immediately rejects when one of its promises rejects, but it do nothing to cancel the other promises.

In our case, the second query fails, so `Promise.all` rejects, and the `try...catch` block catches this error.Meanwhile, other promises are *not affected* - they independently continue their execution. In our case, the third query throws an error of its own after a bit of time. And that error is never caught, we can see it in the console.

The problem is especially dangerous in server-side environments, such as Node.js, when an uncaught error may cause the process to crash.

How to fix it?

An ideal solution would be to cancel all unfinished queries when one of them fails. This way we avoid any potential errors.

However, the bad news is that service calls (such as `database.query`) are often implemented by a 3rd-party library which doesn't support cancellation. Then there's no way to cancel a call.

As an alternative, we can write our own wrapper function around `Promise.all` which adds a custom `then/catch` handler to each promise to track them: results are gathered and, if an error occurs, all subsequent promises are ignored.

```js
function customPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let resultsCount = 0;
    let hasError = false; // we'll set it to true upon first error

    promises.forEach((promise, index) => {
      promise
        .then(result => {
          if (hasError) return; // ignore the promise if already errored
          results[index] = result;
          resultsCount++;
          if (resultsCount === promises.length) {
            resolve(results); // when all results are ready - successs
          }
        })
        .catch(error => {
          if (hasError) return; // ignore the promise if already errored
          hasError = true; // wops, error!
          reject(error); // fail with rejection
        });
    });
  });
}
```

This approach has an issue of its own - it's often undesirable to `disconnect()` when queries are still in the process.

It may be important that all queries complete, especially if some of them make important updates.

So we should wait until all promises are settled before going further with the execution and eventually disconnecting.

Here's another implementation. It behaves similar to `Promise.all` - also resolves with the first error, but waits until all promises are settled.

```js
function customPromiseAllWait(promises) {
  return new Promise((resolve, reject) => {
    const results = new Array(promises.length);
    let settledCount = 0;
    let firstError = null;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(result => {
          results[index] = result;
        })
        .catch(error => {
          if (firstError === null) {
            firstError = error;
          }
        })
        .finally(() => {
          settledCount++;
          if (settledCount === promises.length) {
            if (firstError !== null) {
              reject(firstError);
            } else {
              resolve(results);
            }
          }
        });
    });
  });
}
```

Now `await customPromiseAllWait(...)` will stall the execution until all queries are processed.

This is a more reliable approach, as it guarantees a predictable execution flow.

Lastly, if we'd like to process all errors, we can use either use `Promise.allSettled` or write a wrapper around it to gathers all errors in a single [AggregateError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) object and rejects with it.

```js
// wait for all promises to settle
// return results if no errors
// throw AggregateError with all errors if any
function allOrAggregateError(promises) {
  return Promise.allSettled(promises).then(results => {
    const errors = [];
    const values = [];

    results.forEach((res, i) => {
      if (res.status === 'fulfilled') {
        values[i] = res.value;
      } else {
        errors.push(res.reason);
      }
    });

    if (errors.length > 0) {
      throw new AggregateError(errors, 'One or more promises failed');
    }

    return values;
  });
}
```
