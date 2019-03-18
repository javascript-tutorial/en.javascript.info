
# Fetch: Track download progress

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

// Step 5: decode into a string
let result = new TextDecoder("utf-8").decode(chunksAll);
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

What if we need binary content instead of JSON? That's even simpler. Instead of steps 4 and 5, we could make a blob of all chunks:
```js
let blob = new Blob(chunks);
```
