
# Fetch

Method `fetch()` is the modern way of sending requests over HTTP.

Is evolved for several years and continues to improve, right now its support is pretty solid among browsers.

The basic syntax is:

```js
let promise = fetch(url, [params])
```

- **`url`** -- the URL to access.
- **`params`** -- optional parameters: method, headers etc.

The browser starts the request right away and returns a `promise`.

Accepting a response is usually a two-step procedure.

**The `promise` resolves as soon as the server responded with headers.**

So we can access the headers, we know HTTP status, whether the response is successful, but don't have the body yet.

We need to wait for the response body additionally, like this:

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

A `fetch` resolves with `response` -- an object of the built-in [Response](https://fetch.spec.whatwg.org/#response-class) class.

The main response properties are:
- **`ok`** -- boolean, `true` if the HTTP status code is 200-299.
- **`status`** -- HTTP status code.
- **`headers`** -- HTTP headers, a Map-like object.

## How to get headers?

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

## How to get response?

`Response` allows to access the body in multiple formats, using following promises:

- **`json()`** -- parse as JSON object,
- **`text()`** -- as text,
- **`formData()`** -- as formData (form/multipart encoding),
- **`blob()`** -- as Blob (for binary data),
- **`arrayBuffer()`** -- as ArrayBuffer (for binary data),
- `response.body` is a [ReadableStream](https://streams.spec.whatwg.org/#rs-class) object, it allows to read the body chunk-by-chunk.

We already saw how to get the response as json.

As text:
```js
let text = await response.text();
```

For the binary example, let's download an image and show it:

```js async run
let response = await fetch('/article/fetch/logo-fetch.svg');

*!*
let blob = await response.blob(); // download as Blob object
*/!*

// create <img> with it
let img = document.createElement('img');
img.src = URL.createObjectURL(blob);

// show it for 2 seconds
document.body.append(img);
img.style = 'position:fixed;top:10px;left:10px;width:100px';
setTimeout(() => img.remove(), 2000);
```

## The full syntax

The second argument provides a lot of flexibility to `fetch` syntax.

Here's the full list of possible options with default values (alternatives commented out):

```js
let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
    "Content-Type": "text/plain;charset=UTF-8"
  },
  destination: "", // audio, audioworklet, document, embed, font...
  referrer: "about:client", // "" for no-referrer, or an url from the current origin
  referrerPolicy: "", // no-referrer, no-referrer-when-downgrade, same-origin...
  mode: "cors", // same-origin, no-cors, navigate, or websocket
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
  redirect: "follow", // manual, error
  integrity: "" // a hash, like "sha256-abcdef1234567890"
  keepalive: false // true
  body: "string" // FormData, Blob, BufferSource, or URLSearchParams
})



## How to track progress?

To track download progress, we need to use `response.body`.

It's a "readable stream" - a special object that provides access chunk-by-chunk.

Here's the code to do this:

```js
const reader = response.body.getReader();

while(true) {
  // done is true for the last chunk
  // value is Uint8Array of bytes
  const chunk = await reader.read();

  if (chunk.done) {
    break;
  }

  console.log(`Received ${chunk.value.length} bytes`)
}
```

We do the infinite loop, while `await reader.read()` returns response chunks.

A chunk has two properties:
- **`done`** -- true when the reading is complete.
- **`value`** -- a typed array of bytes: `Uint8Array`.

The full code to get response and log the progress:

```js run async
// Step 1: start the request and obtain a reader
let response = await fetch('https://api.github.com/repos/iliakan/javascript-tutorial-en/commits?per_page=100');

const reader = response.body.getReader();

// Step 2: get total length
const contentLength = +response.headers.get('Content-Length');

// Step 3: read the data
let receivedLength = 0;
let chunks = [];
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(`Received ${receivedLength} of ${contentLength}`)
}

// Step 4: join chunks into result
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for(let chunk of chunks) {
	chunksAll.set(chunk, position); // (4.2)
	position += chunk.length;
}

// Step 5: decode
let result = new TextDecoder("utf-8").decode(chunksMerged);
let commits = JSON.parse(result);

// We're done!
alert(commits[0].author.login);
```

Let's explain that step-by-step:

1. We perform `fetch` as usual, but instead of calling `response.json()`, we obtain a stream reader `response.body.getReader()`.

    Please note, we can't use both these methods to read the same response. Either use a reader or a response method to get the result.
2. Prior to reading, we can figure out the full response length by its `Content-Length` header.

    It may be absent for cross-domain requests (as in the example) and, well, technically a server doesn't have to set it. But usually it's at place.
3. Now `await reader.read()` until it's done.

    We gather the `chunks` in the array. That's important, because after the response is consumed, we won't be able to "re-read" it using `response.json()` or another way (you can try, there'll be an error).
4. At the end, we have `chunks` -- an array of `Uint8Array` byte chunks. We need to join them into a single result. Unfortunately, there's no single method that concatenates those.
    1. We create `new Uint8Array(receivedLength)` -- a same-type array with the combined length.
    2. Then use `.set(chunk, position)` method that copies each `chunk` at the given `position` (one by one) in the resulting array.
5. We have the result in `chunksAll`. It's a byte array though, not a string.

    To create a string, we need to interpret these bytes. The built-in `TextEncoder` does exactly that. Then we can `JSON.parse` it.

    What if it were a binary file? We could make a blob of it:
    ```js
    let blob = new Blob([chunksAll.buffer]);
    ```

```js run async
let response = await fetch('https://api.github.com/repos/iliakan/javascript-tutorial-en/commits?per_page=100');

const contentLength = +response.headers.get('Content-Length');

const reader = response.body.getReader();

let receivedLength = 0;
let chunks = [];
while(true) {
  const chunk = await reader.read();

  if (chunk.done) {
    console.log("done!");
    break;
  }

  chunks.push(chunk.value);

  receivedLength += chunk.value.length;
  console.log(`${receivedLength}/${contentLength} received`)
}

let chunksMerged = new Uint8Array(receivedLength);
let length = 0;
for(let chunk of chunks) {
	chunksMerged.set(chunk, length);
	length += chunk.length;
}

let result = new TextDecoder("utf-8").decode(chunksMerged);
console.log(JSON.parse(result));
```
