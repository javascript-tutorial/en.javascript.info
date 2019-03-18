
# Fetch basics

Method `fetch()` is the modern way of sending requests over HTTP.

Is evolved for several years and continues to improve, right now its support is pretty solid among browsers.

The basic syntax is:

```js
let promise = fetch(url, [params])
```

- **`url`** -- the URL to access.
- **`params`** -- optional parameters: method, headers etc.

The browser starts the request right away and returns a `promise`.

Accepting a response is usually a two-stage process.

**The `promise` resolves with an object of the built-in [Response](https://fetch.spec.whatwg.org/#response-class) class as soon as the server responds with headers.**

So we can access the headers, we know HTTP status, whether it is successful, but don't have the body yet.

The main response properties are:
- **`ok`** -- boolean, `true` if the HTTP status code is 200-299.
- **`status`** -- HTTP status code.
- **`headers`** -- HTTP headers, a Map-like object.

We can iterate over headers the same way as over a `Map`:

```js run async
let response = await fetch('https://api.github.com/repos/iliakan/javascript-tutorial-en/commits');

// have headers already
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}

if (response.ok) {
  // wait for the body
  let json = await response.json();
} else {
  // handle error
}
```

To get the response body, we need to use an additional method call.

`Response` allows to access the body in multiple formats, using following promise-based methods:

- **`json()`** -- parse as JSON object,
- **`text()`** -- as text,
- **`formData()`** -- as formData (form/multipart encoding),
- **`blob()`** -- as Blob (for binary data),
- **`arrayBuffer()`** -- as ArrayBuffer (for binary data)
- additionally, `response.body` is a [ReadableStream](https://streams.spec.whatwg.org/#rs-class) object, it allows to read the body chunk-by-chunk.

For instance, here we get the response as JSON:

```js run async
let response = await fetch('https://api.github.com/repos/iliakan/javascript-tutorial-en/commits');
*!*
let commits = await response.json();
*/!*
alert(commits[0].author.login);
```

Or, using pure promises:

```js run
fetch('https://api.github.com/repos/iliakan/javascript-tutorial-en/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

To get text:
```js
let text = await response.text();
```

And for the binary example, let's fetch and show an image (see chapter [Blob](info:blob) for details about operations on blobs):

```js async run
let response = await fetch('/article/fetch/logo-fetch.svg');

*!*
let blob = await response.blob(); // download as Blob object
*/!*

// create <img> for it
let img = document.createElement('img');
img.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(img);

// show it
img.src = URL.createObjectURL(blob);

setTimeout(() => { // hide after two seconds
  img.remove();
  URL.revokeObjectURL(img.src);
}, 2000);
```

```warn
Please note: we can use only one of these methods.

If we get `response.text()`, then `response.json()` won't work, as the body content has already been processed.
```
