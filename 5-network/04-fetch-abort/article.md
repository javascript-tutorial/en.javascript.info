
# Fetch: Abort

Aborting a `fetch` is a little bit tricky. Remember, `fetch` returns a promise. And JavaScript generally has no concept of "aborting" a promise. So how can we cancel a fetch?

There's a special built-in object for such purposes: `AbortController`.

The usage is pretty simple:

- Step 1: create a controller:

    ```js
    let controller = new AbortController();
    ```

    A controller is an extremely simple object. It has a single method `abort()`, and a single property `signal`. When `abort()` is called, the `abort` event triggers on `controller.signal`:

    Like this:

    ```js run
    let controller = new AbortController();
    let signal = controller.signal;

    // triggers when controller.abort() is called
    signal.addEventListener('abort', () => alert("abort!"));

    controller.abort(); // abort!

    alert(signal.aborted); // true (after abort)
    ```

- Step 2: pass the `signal` property to `fetch` option:

    ```js
    let controller = new AbortController();
    fetch(url, {
      signal: controller.signal
    });
    ```

    Now `fetch` listens to the signal.

- Step 3: to abort, call `controller.abort()`:

    ```js
    controller.abort();
    ```

    We're done: `fetch` gets the event from `signal` and aborts the request.

When a fetch is aborted, its promise rejects with an error named `AbortError`, so we should handle it:

```js run async
// abort in 1 second
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') { // handle abort()
    alert("Aborted!");
  } else {
    throw err;
  }
}
```

**`AbortController` is scalable, it allows to cancel multiple fetches at once.**

For instance, here we fetch many `urls` in parallel, and the controller aborts them all:

```js
let urls = [...]; // a list of urls to fetch in parallel

let controller = new AbortController();

let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// from elsewhere:
// controller.abort() stops all fetches
```

If we have our own jobs, different from `fetch`, we can use a single `AbortController` to stop those, together with fetches.


```js
let urls = [...];
let controller = new AbortController();

let ourJob = new Promise((resolve, reject) => {
  ...
  controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all([...fetchJobs, ourJob]);

// from elsewhere:
// controller.abort() stops all fetches and ourJob
```
