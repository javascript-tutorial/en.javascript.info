## Example: fetch


## Example: fetch

Promises are also returned by some built-in browser methods.

For instance, [fetch](https://fetch.spec.whatwg.org/#fetch-method) allows to load arbitrary content over the network. We can use it to send information to the server and load data from it.

The syntax is:

```js
let promise = fetch(url[, options]);
```

Here:
- `url` is the URL to load,
- `options` are various request options.

There are many options, full information about them is in the [spec](https://fetch.spec.whatwg.org/#requestinit), here we won't need them.

The promise returned by `fetch` resolves with the `response` object when the server responds.

The most important properties of `response` are:
- `status` -- HTTP-code: 200 for OK, 404 for "Page not found" etc.
- `headers` -- HTTP headers.
- 

The important thing


```js run
fetch('/article/promise-chaining/1.html?speed=1')
  .then(console.log);
```


