# Resource loading: onload and onerror

The browser allows to track the loading of external resources -- scripts, iframes, pictures and so on.

There are two events for it:

- `onload` -- successful load,
- `onerror` -- an error occurred.

## Loading a script

Let's say we need to call a function that resides in an external script.

We can load it dynamically, like this:

```js
let script = document.createElement('script');
script.src = "my.js";

document.head.append(script);
```

...But how to run the function that is declared inside that script? We need to wait until the script loads, and only then we can call it.

### script.onload

The main helper is the `load` event. It triggers after the script was loaded and executed.

For instance:

```js run untrusted
let script = document.createElement('script');

// can load any script, from any domain
script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"
document.head.append(script);

*!*
script.onload = function() {
  // the script creates a helper function "_"
  alert(_); // the function is available
};
*/!*
```

So in `onload` we can use script variables, run functions etc.

...And what if the loading failed? For instance, there's no such script (error 404) or the server or the server is down (unavailable).

### script.onerror

Errors that occur during the loading (but not execution) of the script can be tracked on `error` event.

For instance, let's request a script that doesn't exist:

```js run
let script = document.createElement('script');
script.src = "https://example.com/404.js"; // no such script
document.head.append(script);

*!*
script.onerror = function() {
  alert("Error loading " + this.src); // Error loading https://example.com/404.js
};
*/!*
```

Please note that we can't get error details here. We don't know was it error 404 or 500 or something else. Just that the loading failed.

## Other resources

The `load` and `error` events also work for other resources. There may be minor differences though.

For instance:

`<img>`, `<link>` (external stylesheets)
: Both `load` and `error` events work as expected.

`<iframe>`
: Only `load` event when the iframe loading finished. It triggers both for successful load and in case of an error. That's for historical reasons.

## Summary

Pictures `<img>`, external styles, scripts and other resources provide `load` and `error` events to track their loading:

- `load` triggers on a successful load,
- `error` triggers on a failed load.

The only exception is `<iframe>`: for historical reasons it always triggers `load`, for any load completion, even if the page is not found.

The `readystatechange` event also works for resources, but is rarely used, because `load/error` events are simpler.
