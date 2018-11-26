The solution is actually pretty simple.

Take a look at this:

```js
Promise.all(
  fetch('https://api.github.com/users/iliakan'),
  fetch('https://api.github.com/users/remy'),
  fetch('http://no-such-url')
)
```

Here we have an array of `fetch(...)` promises that goes to `Promise.all`.

We can't change the way `Promise.all` works: if it detects an error, then it rejects with it. So we need to prevent any error from occurring. Instead, if a `fetch` error happens, we need to treat it as a "normal" result.

Here's how:

```js
Promise.all(
  fetch('https://api.github.com/users/iliakan').catch(err => err),
  fetch('https://api.github.com/users/remy').catch(err => err),
  fetch('http://no-such-url').catch(err => err)
)
```

In other words, the `.catch` takes an error for all of the promises and returns it normally. By the rules of how promises work, if a `.then/catch` handler returns a value (doesn't matter if it's an error object or something else), then the execution continues the "normal" flow.

So the `.catch` returns the error as a "normal" result into the outer `Promise.all`.

This code:
```js
Promise.all(
  urls.map(url => fetch(url))
)
```

Can be rewritten as:

```js
Promise.all(
  urls.map(url => fetch(url).catch(err => err))
)
```
