# Scheduling: setTimeout and setInterval

We may decide to execute a function not right now, but at a certain time later. That's called "scheduling a call".

There are two methods for it:

- `setTimeout` allows to run a function once after the given interval of time.
- `setInterval` allows to run of the function regularly with the given interval between the runs.

These methods are not a part of Javascript specification. But most environments have the internal scheduler and provide these methods. In particular, they are supported in all browsers and Node.JS.


[cut]

## setTimeout

The syntax:

```js
let timerId = setTimeout(func / code, delay[, arg1, arg2...])
```

Parameters:

`func/code`
: Function or a string of code to execute.
Usually, that's a function. For historical reasons, a string of code can be passed, but that's not recommended.

`delay`
: The delay before run, in milliseconds (1000 ms = 1 second).

`arg1`, `arg2`...
: Arguments to pass the function (not supported in IE9-)


For instance, this code calls `sayHi()` after one second:

```js run
function sayHi() {
  alert('Hello');
}

*!*
setTimeout(sayHi, 1000);
*/!*
```

With arguments:

```js run
function sayHi(phrase, who) {
  alert( phrase + ', ' + who );
}

*!*
setTimeout(sayHi, 1000, "John", "Hello"); // Hello, John
*/!*
```

If the first argument is a string, then Javascript creates a function from it.

So, this will also work:

```js run no-beautify
setTimeout("alert('Hello')", 1000);
```

But using strings is not recommended, use functions instead of them, like this:

```js run no-beautify
setTimeout(() => alert('Hello'), 1000);
```

````smart header="Pass a function, don't run it"
Novice developers sometimes make a mistake by adding brackets `()` after the function:

```js
// wrong!
setTimeout(sayHi(), 1000);
```
That doesn't work, because `setTimeout` expects a reference to function. And here `sayHi()` runs the function, and the *result of its execution* is passed as the first argument. In our case the result of `sayHi()` is `undefined` (the function returns nothing), so nothing is scheduled.
````

### Canceling with clearTimeout

A call to `setTimeout` returns a "timer identifier" `timerId`, that we can use to cancel the execution.

The syntax to cancel:

```js
let timerId = setTimeout(...);
clearTimeout(timerId);
```

In the code below we schedule the function, and then cancel it (changed our mind). As a result, nothing happens:

```js run no-beautify
let timerId = setTimeout(() => alert("never happens"), 1000);
alert(timerId); // timer identifier

clearTimeout(timerId);
alert(timerId); // same identifier (doesn't become null after canceling)
```

As we can see from `alert` output, in browsers timer identifier is a number. In other environments, that can be something else. For instance, Node.JS returns a timer object, with additional methods.

Again, there is no universal specification for these methods.

For browsers, timers are described in the [timers section](https://www.w3.org/TR/html5/webappapis.html#timers) of HTML5 standard.

## setInterval

Method `setInterval` has the same syntax as `setTimeout`:

```js
let timerId = setInterval(func / code, delay[, arg1, arg2...])
```

All arguments have the same meaning. But, unlike `setTimeout`, it runs the function not only once, but regularly with the given interval of time.

To stop the execution, we should call `clearInterval(timerId)`.

The following example will show the message every 2 seconds. After 5 seconds, the output is stopped:

```js run
// repeat with the interval of 2 seconds
let timerId = setInterval(() => alert('tick'), 2000);

// after 5 seconds stop
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
```

```smart header="Modal windows freeze time in Chrome/Opera/Safari"
In browsers Chrome, Opera and Safari the internal timer is "frozen" while showing `alert/confirm/prompt`. And in IE or Firefox it continues ticking.

So if you run the code above and hold the `alert` window for a long time, then in Firefox/IE next `alert` will be shown at once (2 seconds passed from the previous run), and in Chrome/Opera/Safari -- after 2 seconds (timer does not tick during the `alert`).
```

## Recursive setTimeout

There are two ways of running something regularly.

One is `setInterval`. The other one is a recursive `setTimeout`:

```js
/** instead of:
let timerId = setInterval(() => alert('tick'), 2000);
*/

let timerId = setTimeout(function tick() {
  alert('tick');
*!*
  timerId = setTimeout(tick, 2000);
*/!*
}, 2000);
```

The `setTimeout` above schedules next call right at the end of the previous one.

**Recursive `setTimeout` is more flexible method than `setInterval`: the next call may be planned differently, depending on the results of the current one.**

For instance, we have a service that each 5 seconds sends a request to server asking for data. In case if the server is overloaded, we can increase the interval to 10, 20, 60 seconds... And then return it back when everything stabilizes.

And if we regulary have CPU-hungry tasks, then we can measure the time taken by the execition and plan the next call sooner or later.

**Recursive `setTimeout` guarantees a delay before the executions, `setInterval` -- does not.**

Let's compare two code fragments. The first one uses `setInterval`:

```js
let i = 1;
setInterval(function() {
  func(i);
}, 100);
```

The second one uses recursive `setTimeout`:

```js
let i = 1;
setTimeout(function run() {
  func(i);
  setTimeout(run, 100);
}, 100);
```

For `setInterval` the internal scheduler will run `func(i)` every 100ms:

![](setinterval-interval.png)

Did you notice?...

**The real delay between `func` calls for `setInterval` is less than in the code!**

That's natural, because the time taken by `func` execution "consumes" a part of the interval.

It is possible that `func` execution turns out to be longer than we expected and takes more than 100ms.

In this case the engine waits for `func` to complete, then checks the scheduler and if the time is up, then runs it again *immediately*.

As an edge case, if the function always takes longer to execute than `delay` argument, then the calls will happen without pause at all.

And this is the picture for recursive `setTimeout`:

![](settimeout-interval.png)

**Recursive `setTimeout` guarantees fixed delay (here 100ms).**

That's because a new call is planned at the end of the previous one.

````smart header="Garbage collection"
When a function is passed in `setInterval/setTimeout`, an internal reference is created to it and saved in the scheduler. It prevents the function form being garbage collected, even if there are no other references to it.

```js
// the function will stay in memory until the scheduler calls it
setTimeout(function() {}, 100);
```

For `setInterval` the function stays in memory until `cancelInterval` is called.

A function references outer lexical environment, so, while it lives, certain outer variables live too. They may take much more memory than the function itself. That's a good reason to keep an eye on scheduled functions` and cancel them once they are not needed.
````

## Zero timeout

There's a special use case: `setTimeout(func, 0)`.

This plans the execution of `func` as soon as possible. But scheduler will invoke it only after the current code is complete.

So the function is planned to run "right after" the current code. In other words, *asynchronously*.

For instance, this outputs "Hello", then immediately "World":

```js run
setTimeout(() => alert("World"), 0);

alert("Hello");
```

The trick is also used to split a CPU-hungry task.

For instance, syntax highlighting script, used to colorize code examples on this page, is quite CPU-heavy. To hightlight the code, it analyzes it, creates many colored highlighting elements, adds them to the document -- for a big text that takes a lot. It may even cause the browser to "hang", that's unacceptable.

So we can split the long text to pieces. First 100 lines, then plan another 100 lines using `setTimeout(...,0)`, and so on.

As a simpler example -- here's a counting function from `1` to `1000000000`.

If you run it, the CPU will hang. For server-side JS that's clearly noticeable, and if you are running it in-browser, then try to scroll and click other buttons on the page -- you'll see that whole Javascript actually is paused, no other actions work until it finishes.

```js run
let i = 0;

let start = Date.now();

function count() {

  // do a heavy job
  for(let j = 0; j < 1000000000; j++) {
    i++;
  }

  alert("Done in " + (Date.now() - start) + 'ms');
}

count();
```

Let's split the job using the nested `setTimeout`:

```js run
let i = 0;

let start = Date.now();

function count() {

  if (i == 100000000) {
    alert("Done in " + (Date.now() - start) + 'ms');
  } else {
    setTimeout(count, 0); // schedule the new call (*)
  }

  // do a piece of the heavy job (**)
  for(let j = 0; j < 1000000; j++) {
    i++;
  }

}

count();
```

Now the browser UI is fully functional. Pauses between `count` executions provide just enough "breath" for the browser to do something else, to react on other user actions.

The notable thing is that both variants are comparable in speed. There's no much difference in the overall counting time.

Note that in the example above the next call is planned before the counting itself: line `(*)` goes before the loop `(**)`. That plans making the new call as early as possible.

If we switch them, the overall time will be much slower.

Here's the code with `setTimeout` at the end to compare:

```js run
let i = 0;

let start = Date.now();

function count() {

  for(let j = 0; j < 1000000; j++) {
    i++;
  }

  // moved re-scheduling to "after the job"
*!*
  if (i == 100000000) {
    alert("Done in " + (Date.now() - start) + 'ms');
  } else {
    setTimeout(count, 0);
  }
*/!*

}

count();
```

If you run it, easy to notice that it takes significantly more time.

````smart header="Minimal delay of nested timers in-browser"
In the browser, there's a limitation of how often nested timers can run. The [HTML5 standard](https://www.w3.org/TR/html5/webappapis.html#timers) says: "after five nested timers..., the interval is forced to be at least four milliseconds.".

To see that, let's timers immediately and measure times between them:

```js run
let start = Date.now(), times = [];

setTimeout(function run() {
  times.push(Date.now() - start);

  if (start + 100 > Date.now()) setTimeout(run, 0);
  else alert(times);
}, 0);

// an example of the output:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
```

First timers run immediately (just as written in the spec), and then the delay comes into play. That limitation comes from ancient times and many scripts rely on it, so it exists for historical reasons.

For server-side Javascript, that limitation does not exist. Also, there are other ways to schedule an immediate asynchronous job. In Node.JS that's [process.nextTick](https://nodejs.org/api/process.html) and [setImmediate](https://nodejs.org/api/timers.html).
````

## Summary

- Methods `setInterval(func, delay, ...args)` and `setTimeout(func, delay, ...args)` allow to run the `func` regularly/once after `delay` milliseconds.
- To cancel execution, we should `clearInterval/clearTimeout` on the value returned by `setInterval/setTimeout`.
- Nested `setTimeout` calls give more flexible control over the execution than `setInterval`. They also can guarantee the minimal time *between* the execution.
- Zero-timeout is sometimes used to schedule the call "as soon as possible".

Please note that these methods do not *guarantee* the accurate delay. We should not rely on that in the scheduled code.

For example, the in-browser timer may slowdown for a lot of reasons:
- The CPU is overloaded.
- The browser tab is in the background mode.
- The visitor's laptop is on battery.

All that may decrease the minimal timer resolution (the minimal delay) to 300ms or even 1000ms depending on the browser and settings.
