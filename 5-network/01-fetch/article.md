
# Fetch

JavaScript can send network requests to the server and load new information whenever is needed.

For example, we can:

- Submit an order,
- Load user information,
- Receive latest updates from the server,
- ...etc.

...And all of that without reloading the page!

There's an umbrella term "AJAX" (abbreviated <b>A</b>synchronous <b>J</b>avascript <b>A</b>nd <b>X</b>ml) for that. We don't have to use XML though: the term comes from old times, that's that word is there.

There are multiple ways to send a network request and get information from the server.

The `fetch()` method is modern and versatile, so we'll start with it. It evolved for several years and continues to improve, right now the support is pretty solid among browsers.

The basic syntax is:

```js
let promise = fetch(url, [options])
```

- **`url`** -- the URL to access.
- **`options`** -- optional parameters: method, headers etc.

The browser starts the request right away and returns a `promise`.

Getting a response is usually a two-stage process.

**First, the `promise` resolves with an object of the built-in [Response](https://fetch.spec.whatwg.org/#response-class) class as soon as the server responds with headers.**

So we can check HTTP status, to see whether it is successful or not, check headers, but don't have the body yet.

The promise rejects if the `fetch` was unable to make HTTP-request, e.g. network problems, or there's no such site. HTTP-errors, even such as 404 or 500, are considered a normal flow.

We can see them in response properties:

- **`ok`** -- boolean, `true` if the HTTP status code is 200-299.
- **`status`** -- HTTP status code.

For example:

```js
let response = await fetch(url);

if (response.ok) { // if HTTP-status is 200-299
  // get the response body (see below)
  let json = await response.json();
} else {
  alert("HTTP-Error: " + response.status);
}
```

**Second, to get the response body, we need to use an additional method call.**

`Response` provides multiple promise-based methods to access the body in various formats:

- **`response.json()`** -- parse the response as JSON object,
- **`response.text()`** -- return the response as text,
- **`response.formData()`** -- return the response as `FormData` object (form/multipart encoding, explained in the [next chapter](info:formdata)),
- **`response.blob()`** -- return the response as [Blob](info:blob) (binary data with type),
- **`response.arrayBuffer()`** -- return the response as [ArrayBuffer](info:arraybuffer-binary-arrays) (pure binary data),
- additionally, `response.body` is a [ReadableStream](https://streams.spec.whatwg.org/#rs-class) object, it allows to read the body chunk-by-chunk, we'll see an example later.

For instance, let's get a JSON-object with latest commits from GitHub:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

*!*
let commits = await response.json(); // read response body and parse as JSON
*/!*

alert(commits[0].author.login);
```

Or, the same without `await`, using pure promises syntax:

```js run
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

To get the text, `await response.text()` instead of `.json()`:
```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

let text = await response.text(); // read response body as text

alert(text.slice(0, 80) + '...');
```

As a show-case for reading in binary format, let's fetch and show an image (see chapter [Blob](info:blob) for details about operations on blobs):

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

setTimeout(() => { // hide after three seconds
  img.remove();
  URL.revokeObjectURL(img.src);
}, 3000);
```

````warn
We can choose only one body-parsing method.

If we got the response with `response.text()`, then `response.json()` won't work, as the body content has already been processed.

```js
let text = await response.text(); // response body consumed
let parsed = await response.json(); // fails (already consumed)
````

## Headers

There's a Map-like headers object in `response.headers`.

We can get individual headers or iterate over them:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// get one header
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// iterate over all headers
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
```

To set a header, we can use the `headers` option, like this:

```js
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'abcdef'
  }
});
```

...But there's a list of [forbidden HTTP headers](https://fetch.spec.whatwg.org/#forbidden-header-name) that we can't set:

- `Accept-Charset`, `Accept-Encoding`
- `Access-Control-Request-Headers`
- `Access-Control-Request-Method`
- `Connection`
- `Content-Length`
- `Cookie`, `Cookie2`
- `Date`
- `DNT`
- `Expect`
- `Host`
- `Keep-Alive`
- `Origin`
- `Referer`
- `TE`
- `Trailer`
- `Transfer-Encoding`
- `Upgrade`
- `Via`
- `Proxy-*`
- `Sec-*`

These headers ensure proper and safe HTTP, so they are controlled exclusively by the browser.

## POST requests

To make a `POST` request, or a request with another method, we need to use `fetch` options:

- **`method`** -- HTTP-method, e.g. `POST`,
- **`body`** -- one of:
  - a string (e.g. JSON),
  - `FormData` object, to submit the data as `form/multipart`,
  - `Blob`/`BufferSource` to send binary data,
  - [URLSearchParams](info:url), to submit the data in `x-www-form-urlencoded` encoding, rarely used.

For example, this code submits `user` object as JSON:

```js run async
let user = {
  name: 'John',
  surname: 'Smith'
};

*!*
let response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});
*/!*

let result = await response.json();
alert(result.message);
```

Please note, if the body is a string, then `Content-Type` is set to `text/plain;charset=UTF-8` by default. So we use `headers` option to send `application/json` instead, that's the correct content type for JSON-encoded data.

## Sending an image

We can also submit binary data directly using `Blob` or `BufferSource`.

For example, here's a `<canvas>` where we can draw by moving a mouse. A click on the "submit" button sends the image to server:

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
      let response = await fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
      });
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

Here we also didn't need to set `Content-Type` manually, because a `Blob` object has a built-in type (here `image/png`, as generated by `toBlob`).

The `submit()` function can be rewritten without `async/await` like this:

```js
function submit() {
  canvasElem.toBlob(function(blob) {        
    fetch('/article/fetch/post/image', {
      method: 'POST',
      body: blob
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
  }, 'image/png');
}
```

## Summary

A typical fetch request consists of two `await` calls:

```js
let response = await fetch(url, options); // resolves with response headers
let result = await response.json(); // read body as json
```

Or, promise-style:
```js
fetch(url, options)
  .then(response => response.json())
  .then(result => /* process result */)
```

Response properties:
- `response.status` -- HTTP code of the response,
- `response.ok` -- `true` is the status is 200-299.
- `response.headers` -- Map-like object with HTTP headers.

Methods to get response body:
- **`response.json()`** -- parse the response as JSON object,
- **`response.text()`** -- return the response as text,
- **`response.formData()`** -- return the response as `FormData` object (form/multipart encoding, see the next chapter),
- **`response.blob()`** -- return the response as [Blob](info:blob) (binary data with type),
- **`response.arrayBuffer()`** -- return the response as [ArrayBuffer](info:arraybuffer-binary-arrays) (pure binary data),

Fetch options so far:
- `method` -- HTTP-method,
- `headers` -- an object with request headers (not any header is allowed),
- `body` -- `string`, `FormData`, `BufferSource`, `Blob` or `UrlSearchParams` object to send.

In the next chapters we'll see more options and use cases of `fetch`.
