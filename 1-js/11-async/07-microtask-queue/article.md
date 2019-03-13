
# Microtasks, event loop

Promise handlers `.then`/`.catch`/`.finally` are always asynchronous.

Even when a Promise is immediately resolved, the code on the lines *below* your `.then`/`.catch`/`.finally` may still execute first.

Here's the code that demonstrates it:

```js run
let promise = Promise.resolve();

promise.then(() => alert("promise done"));

alert("code finished"); // this alert shows first
```

If you run it, you see `code finished` first, and then `promise done`.

That's strange, because the promise is definitely done from the beginning.

Why `.then` triggered after? What's going on?

# Microtasks

Asynchronous tasks need proper management. For that, the standard specifies an internal queue `PromiseJobs`, more often called the "microtask queue" (v8 term).

As said in the [specification](https://tc39.github.io/ecma262/#sec-jobs-and-job-queues):

- The queue is first-in-first-out: tasks that get enqueued first are run first.
- Execution of a task is initiated only when nothing else is running.

Or, to say that simply, when a promise is ready, its `.then/catch/finally` handlers are put into the queue. They are not executed yet. Javascript engine takes a task from the queue and executes it, when it becomes free from the current code.

That's why "code finished" in the example above shows first.

![](promiseQueue.png)

Promise handlers always go through that internal queue.

If there's a chain with multiple `.then/catch/finally`, then every one of them is executed asynchronously.

That is, it first gets queued, and executed when the current code is complete and previously queued handlers are finished.

What if the order matters for us? How to make `code finished` work after `promise done`?

Easy, just put it into the queue with `.then`:

```js run
Promise.resolve()
  .then(() => alert("promise done!"))
  .then(() => alert("code finished"));
```

Now the order is as intended.

## Event loop

Browser Javascript, as well as Node.js, is based on an *event loop*.

"Event loop" is a process when the engine sleeps waits for events.

Examples of events:
- `mousemove`, a user moved their mouse.
- `setTimeout` handler is to be called.
- an external `<script src="...">` is loaded, ready to be executed.
- a network operation, e.g. `fetch` is complete.
- ...etc.

Things happen -- the engine handles them -- and waits for more to happen (while sleeping and consuming close to zero CPU).

![](eventLoop.png)

When an event happens, and the engine is busy, it gets into a so-called "macrotask queue" (v8 term).

For instance, while the engine is busy processing a network `fetch`, a user may move their mouse causing `mousemove`, and `setTimeout` is due and so on, just as painted on the picture above.

Events from the macrotask queue are processed on "first came – first served" basis. When the engine browser finishes with `fetch`, it handles `mousemove` event, then `setTimeout` handler, and so on.

So far, quite simple, right? The engine is busy, so other tasks queue up.

Now the important stuff.

**Microtask queue has a higher priority than the macrotask queue.**

In other words, the engine first executes all microtasks, and then takes a macrotask. Promise handling always has the priority.

For instance, take a look:

```js run
setTimeout(() => alert("timeout"), 0);

Promise.resolved()
  .then(() => alert("promise"));

alert("code");
```

What's the order?

1. `code` shows first, it's a regular synchronous call.
2. `promise` shows second, because `.then` passes through the microtask queue, runs after the current code.
3. `timeout` shows last, because it's a macrotask.

It may happen that while handling a macrotask, new promises are created.

Or, vise-versa, a microtask schedules a macrotask (e.g. `setTimeout`).

For instance, here `.then` schedules a `setTimeout`:

```js run
Promise.resolved()
  .then(() => {
    setTimeout(() => alert("timeout"), 0);
  })
  .then(() => {
    alert("promise");
  });
```

Naturally, `promise` shows up first, because `setTimeout` macrotask awaits in the less-priority macrotask queue.

## Summary

Promise handling is always asynchronous, as all promise actions pass through the internal "promise jobs" queue, also called "microtask queue" (v8 term).

**So, `.then/catch/finally` is called after the current code is finished.**

If we need to guarantee that a piece of code is executed after `.then/catch/finally`, it's best to add it into a chained `.then` call.

There's also a "macrotask queue" that keeps various events, network operation results, `setTimeout`-scheduled calls, and so on. These are also called "macrotasks" (v8 term).

The engine uses the macrotask queue to handle them in the appearance order.

**Macrotasks run after the code is finished *and* after the microtask queue is empty.**

In other words, they have lower priority.

So the order is: regular code, then promise handling, then everything else.
