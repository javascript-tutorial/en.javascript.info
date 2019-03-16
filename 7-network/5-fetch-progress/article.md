
# Fetch API

The second argument provides a lot of flexibility to `fetch` syntax.

Here's the full list of possible options with default values (alternatives commented out):

```js
let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined // string, FormData, Blob, BufferSource, or URLSearchParams
  referrer: "about:client", // "" for no-referrer, or an url from the current origin
  referrerPolicy: "", // no-referrer, no-referrer-when-downgrade, same-origin...
  mode: "cors", // same-origin, no-cors, navigate, or websocket
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
  redirect: "follow", // manual, error
  integrity: "", // a hash, like "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // AbortController to abort request
  window: window // null
})
```

Not so long list actually, but quite a lot of capabilities.

Let's explore the options one-by-one with examples.

## method, headers, body

These are the most widely used fields.

- **`method`** -- HTTP-method, e.g. POST,
- **`headers`** -- an object with HTTP headers,
- **`body`** -- a string, or:
  - FormData object, to submit `form/multipart`
  - Blob/BufferSource to send binary data
  - URLSearchParams, to submit `x-www-form-urlencoded`
