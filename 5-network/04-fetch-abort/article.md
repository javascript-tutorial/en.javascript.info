
# Fetch: Abort

As we know, `fetch` returns a promise. And JavaScript generally has no concept of "aborting" a promise. So how can we cancel an ongoing `fetch`? E.g. if the user actions on our site indicate that the `fetch` isn't needed any more.

There's a special built-in object for such purposes: `AbortController`. It can be used to abort not only `fetch`, but other asynchronous tasks as well.

The usage is very straightforward:

## The AbortController object

Create a controller:

```js
let controller = new AbortController();
```

A controller is an extremely simple object.

- It has a single method `abort()`,
- And a single property `signal` that allows to set event liseners on it.

When `abort()` is called:
- `controller.signal` emits the `"abort"` event.
- `controller.signal.aborted` property becomes `true`.

Generally, we have two parties in the process: 
1. The one that performs an cancelable operation, it sets a listener on `controller.signal`.
2. The one one that cancels: it calls `controller.abort()` when needed.

Here's the full example (without `fetch` yet):

```js run
let controller = new AbortController();
let signal = controller.signal;

// The party that performs a cancelable operation 
// gets "signal" object
// and sets the listener to trigger when controller.abort() is called
signal.addEventListener('abort', () => alert("abort!"));

// The other party, that cancels (at any point later):
controller.abort(); // abort!

// The event triggers and signal.aborted becomes true
alert(signal.aborted); // true
```

As we can see, `AbortController` is just a means to pass `abort` events when `abort()` is called on it.

We could implement same kind of event listening in our code on our own, without `AbortController` object at all.

But what's valuable is that `fetch` knows how to work with `AbortController` object, it's integrated with it. 

## Using with fetch

To become able to cancel `fetch`, pass the `signal` property of an `AbortController` as a `fetch` option:

```js
let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
```

The `fetch` method knows how to work with `AbortController`. It will listen to `abort` events on `signal`.

Now, to abort, call `controller.abort()`:

```js
controller.abort();
```

We're done: `fetch` gets the event from `signal` and aborts the request.

When a fetch is aborted, its promise rejects with an error `AbortError`, so we should handle it, e.g. in `try..catch`.

Here's the full example with `fetch` aborted after 1 second:

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

## AbortController is scalable

`AbortController` is scalable, it allows to cancel multiple fetches at once.

Here's a sketch of code that fetches many `urls` in parallel, and uses a single controller to abort them all:

```js
let urls = [...]; // a list of urls to fetch in parallel

let controller = new AbortController();

// an array of fetch promises
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// if controller.abort() is called from elsewhere,
// it aborts all fetches
```

If we have our own asynchronous tasks, different from `fetch`, we can use a single `AbortController` to stop those, together with fetches.

We just need to listen to its `abort` event in our tasks:

```js
let urls = [...];
let controller = new AbortController();

let ourJob = new Promise((resolve, reject) => { // our task
  ...
  controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, { // fetches
  signal: controller.signal
}));

// Wait for fetches and our task in parallel
let results = await Promise.all([...fetchJobs, ourJob]);

// if controller.abort() is called from elsewhere,
// it aborts all fetches and ourJob
```

## Summary

- `AbortController` is a simple object that generates `abort` event on it's `signal` property when `abort()` method is called (and also sets `signal.aborted` to `true`).
- `fetch` integrates with it: we pass `signal` property as the option, and then `fetch` listens to it, so it becomes possible to abort the `fetch`.
- We can use `AbortController` in our code. The "call `abort()`" -> "listen to `abort` event" interaction is simple and universal. We can use it even without `fetch`.
