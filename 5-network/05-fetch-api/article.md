
# Fetch API

So far, we know quite a bit about fetch.

Now let's see the rest of API, to cover all its abilities.

Here's the full list of all possible fetch options with their default values (alternatives in comments):

```js
let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
    "Content-Type": "text/plain;charset=UTF-8" // for a string body, depends on body
  },
  body: undefined // string, FormData, Blob, BufferSource, or URLSearchParams
  referrer: "about:client", // "" for no-referrer, or an url from the current origin
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
  mode: "cors", // same-origin, no-cors
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
  redirect: "follow", // manual, error
  integrity: "", // a hash, like "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // AbortController to abort request
  window: window // null
});
```

An impressive list, right?

We fully covered `method`, `headers` and `body` in the chapter <info:fetch-basics>.

The `signal` option is covered in <info:fetch-abort>.

Now let's explore the rest of options.

## referrer, referrerPolicy

These options govern how `fetch` sets HTTP `Referer` header.

That header contains the url of the page that made the request. In most scenarios, it plays a very minor informational role, but sometimes, for security purposes, it makes sense to remove or modify it.
.

**The `referrer` option allows to set any `Referer` within the current origin) or disable it.**

To send no referer, set an empty string:
```js
fetch('/page', {
*!*
  referrer: "" // no Referer header
*/!*
});
```

To set another url within the current origin:

```js
fetch('/page', {
  // assuming we're on https://javascript.info
  // we can set any Referer header, but only within the current origin
*!*
  referrer: "https://javascript.info/anotherpage"
*/!*
});
```

**The `referrerPolicy` option sets general rules for `Referer`.**

Possible values are described in the [Referrer Policy specification](https://w3c.github.io/webappsec-referrer-policy/):

- **`"no-referrer-when-downgrade"`** -- default value: `Referer` is sent always, unless we send a request from HTTPS to HTTP (to less secure protocol).
- **`"no-referrer"`** -- never send `Referer`.
- **`"origin"`** -- only send the origin in `Referer`, not the full page URL, e.g. `http://site.com` instead of `http://site.com/path`.
- **`"origin-when-cross-origin"`** -- send full referrer to the same origin, but only the origin part for cross-origin requests.
- **`"same-origin"`** -- send full referrer to the same origin, but no referer for for cross-origin requests.
- **`"strict-origin"`** -- send only origin, don't send referrer for HTTPS→HTTP requests.
- **`"strict-origin-when-cross-origin"`** -- for same-origin send full referrer, for cross-origin send only origin, unless it's HTTPS→HTTP request, then send nothing.
- **`"unsafe-url"`** -- always send full url in `Referer`.

Let's say we have an admin zone with URL structure that shouldn't be visible from outside.

If we send a cross-origin `fetch`, then by default it sends the `Referer` header with the full url of our page (except when we request from HTTPS to HTTP, then no `Referer`).

E.g. `Referer: https://javascript.info/admin/secret/paths`.

If we'd like to totally hide the referrer:

```js
fetch('https://another.com/page', {
  referrerPolicy: "no-referrer" // no Referer, same effect as referrer: ""
});
```

Otherwise, if we'd like the remote side to see where the request comes from, we can send only the "origin" part of the url:

```js
fetch('https://another.com/page', {
  referrerPolicy: "strict-origin" // Referer: https://javascript.info
});
```

## mode

The `mode` option serves as a safe-guard that prevents cross-origin requests:

- **`"cors"`** -- the default, cross-origin requests are allowed, as described in <info:fetch-crossorigin>,
- **`"same-origin"`** -- cross-origin requests are forbidden,
- **`"no-cors"`** -- only simple cross-origin requests are allowed.

That may be useful in contexts when the fetch url comes from 3rd-party, and we want a "power off switch" to limit cross-origin capabilities.

## credentials

The `credentials` option specifies whether `fetch` should send cookies and HTTP-Authorization headers with the request.

- **`"same-origin"`** -- the default, don't send for cross-origin requests,
- **`"include"`** -- always send, requires `Accept-Control-Allow-Credentials` from cross-origin server,
- **`"omit"`** -- never send, even for same-origin requests.

## cache

By default, `fetch` requests make use of standard HTTP-caching. That is, it honors `Expires`, `Cache-Control` headers, sends `If-Modified-Since`, and so on. Just like regular HTTP-requests do.

The `cache` options allows to ignore HTTP-cache or fine-tune its usage:

- **`"default"`** -- `fetch` uses standard HTTP-cache rules and headers;
- **`"no-store"`** -- totally ignore HTTP-cache, this mode becomes the default if we set a header `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match`, or `If-Range`;
- **`"reload"`** -- don't take the result from HTTP-cache (if any), but populate cache with the response (if response headers allow);
- **`"no-cache"`** -- create a conditional request if there is a cached response, and a normal request otherwise. Populate HTTP-cache with the response;
- **`"force-cache"`** -- use a response from HTTP-cache, even if it's stale. If there's no response in HTTP-cache, make a regular HTTP-request, behave normally;
- **`"only-if-cached"`** -- use a response from HTTP-cache, even if it's stale. If there's no response in HTTP-cache, then error. Only works when `mode` is `"same-origin"`.

## redirect

Normally, `fetch` transparently follows HTTP-redirects, like 301, 302 etc.

The `redirect` option allows to change that:

- **`"follow"`** -- the default, follow HTTP-redirects,
- **`"error"`** -- error in case of HTTP-redirect,
- **`"manual"`** -- don't follow HTTP-redirect, but `response.url` will be the new URL, and `response.redirected` will be `true`, so that we can perform the redirect manually to the new URL (if needed).

## integrity

The `integrity` option allows to check if the response matches the known-ahead checksum.

As described in the [specification](https://w3c.github.io/webappsec-subresource-integrity/), supported hash-functions are SHA-256, SHA-384, and SHA-512, there might be others depending on a browser.

For example, we're downloading a file, and we know that it's SHA-256 checksum is "abc" (a real checksum is longer, of course).

We can put it in the `integrity` option, like this:

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abd'
});
```

Then `fetch` will calculate SHA-256 on its own and compare it with our string. In case of a mismatch, an error is triggered.

## keepalive

The `keepalive` option indicates that the request may outlive the page.

For example, we gather statistics about how the current visitor uses our page (mouse clicks,  page fragments he views), to improve user experience.

When the visitor leaves our page -- we'd like to save it on our server.

We can use `window.onunload` for that:

```js run
window.onunload = function() {
  fetch('/analytics', {
    method: 'POST',
    body: "statistics",
*!*
    keepalive: true
*/!*
  });
};
```

Normally, when a document is unloaded, all associated network requests are aborted. But `keepalive` option tells the browser to perform the request in background, even after it leaves the page. So it's essential for our request to succeed.

- We can't send megabytes: the body limit for keepalive requests is 64kb.
    - If we gather more data, we can send it out regularly, then there won't be a lot for the "onunload" request.
    - The limit is for all currently ongoing requests. So we cheat it by creating 100 requests, each 64kb.
- We don't get the server response if the request is made `onunload`, because the document is already unloaded at that time.
    - Usually, the server sends empty response to such requests, so it's not a problem.
