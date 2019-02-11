# XMLHttpRequest and AJAX

`XMLHttpRequest` is a built-in browser object that allows to make HTTP requests in JavaScript.

Despite of having the word "XML" in its name, it can operate on any data, not only in XML format.

## Asynchronous XMLHttpRequest

XMLHttpRequest has two modes of operation: synchronous and asynchronous.

First let's see the asynchronous variant as it's used in the majority of cases.

The code below loads the URL at `/article/xmlhttprequest/hello.txt` from the server and shows its content on-screen:

```js run
*!*
// 1. Create a new XMLHttpRequest object
*/!*
let xhr = new XMLHttpRequest();

*!*
// 2. Configure it: GET-request for the URL /article/.../hello.txt
xhr.open('GET', '/article/xmlhttprequest/hello.txt');
*/!*

*!*
// 3. Send the request over the network
*/!*
xhr.send();

*!*
// 4. This will be called after the response is received
*/!*
xhr.onload = function() {
  if (xhr.status != 200) { // analyze HTTP status of the response
    // if it's not 200, consider it an error
    alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
  } else {
    // show the result
    alert(xhr.responseText); // responseText is the server response
  }
};
```

As we can see, there are several methods of `XMLHttpRequest` here. Let's cover them.

## Setup: "open"

The syntax:
```js
xhr.open(method, URL, async, user, password)
```

This method is usually called first after `new XMLHttpRequest`. It specifies the main parameters of the request:

- `method` -- HTTP-method. Usually `"GET"` or `"POST"`, but we can also use TRACE/DELETE/PUT and so on.
- `URL` -- the URL to request. Can use any path and protocol, but there are cross-domain limitations called "Same Origin Policy". We can make any requests to the same `protocol://domain:port` that the current page comes from, but other locations are "forbidden" by default (unless they implement special HTTP-headers, we'll cover them in chapter [todo]).
- `async` -- if the third parameter is explicitly set to `false`, then the request is synchronous, otherwise it's asynchronous. We'll talk more about that in this chapter soon.
- `user`, `password` -- login and password for basic HTTP auth (if required).

Please note that `open` call, contrary to its name, does not open the connection. It only configures the request, but the network activity only starts with the call of `send`.

## Send it out: "send"

The syntax:
```js
xhr.send([body])
```

This method opens the connection and sends the request to server. The optional `body` parameter contains the request body. Some request methods like `GET` do not have a body. And some of them like `POST` use `body` to send the data. We'll see examples with a body in the next chapter.


## Cancel: abort and timeout

If we changed our mind, we can terminate the request at any time. The call to `xhr.abort()` does that:

```js
xhr.abort(); // terminate the request
```

We can also specify a timeout using the corresponding property:

```js
xhr.timeout = 10000;
```

The timeout is expressed in ms. If the request does not succeed within the given time, it gets canceled automatically.

## Events: onload, onerror etc

A request is asynchronous by default. In other words, the browser sends it out and allows other JavaScript code to execute.

After the request is sent, `xhr` starts to generate events. We can use `addEventListener` or `on<event>` properties to handle them, just like with DOM objects.

The modern [specification](https://xhr.spec.whatwg.org/#events) lists following events:

- `loadstart` -- the request has started.
- `progress` -- the browser received a data packet (can happen multiple times).
- `abort` -- the request was aborted by `xhr.abort()`.
- `error` -- an network error has occurred, the request failed.
- `load` -- the request is successful, no errors.
- `timeout` -- the request was canceled due to timeout (if the timeout is set).
- `loadend` -- the request is done (with an error or without it)
- `readystatechange` -- the request state is changed (will cover later).

Using these events we can track successful loading (`onload`), errors (`onerror`) and the amount of the data loaded (`onprogress`).

Please note that errors here are "communication errors". In other words, if the connection is lost or the remote server does not respond at all -- then it's the error in the terms of XMLHttpRequest. Bad HTTP status like 500 or 404 are not considered errors.

Here's a more feature-full example, with errors and a timeout:

```html run
<script>
  function load(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.timeout = 1000;
    xhr.send();

    xhr.onload = function() {
      alert(`Loaded: ${this.status} ${this.responseText}`);
    };

    xhr.onerror = () => alert('Error');

    xhr.ontimeout = () => alert('Timeout!');
  }
</script>

<button onclick="load('/article/xmlhttprequest/hello.txt')">Load</button>
<button onclick="load('/article/xmlhttprequest/hello.txt?speed=0')">Load with timeout</button>
<button onclick="load('no-such-page')">Load 404</button>
<button onclick="load('http://example.com')">Load another domain</button>
```

1. The first button triggers only `onload` as it loads the file `hello.txt` normally.
2. The second button loads a very slow URL, so it calls only `ontimeout` (because `xhr.timeout` is set).
3. The third button loads a non-existant URL, but it also calls `onload` (with "Loaded: 404"), because there's no network error.
4. The last button tries to load a page from another domain. That's prohibited unless the remote server explicitly agrees by sending certain headers (to be covered later), so we have `onerror` here. The `onerror` handler would also trigger in other cases if we start a request, and then sever the network connection of our device.

## Response: status, responseText and others

Once the server has responded, we can receive the result in the following properties of the request object:

`status`
: HTTP status code: `200`, `404`, `403` and so on. Also can be `0` if an error occurred.

`statusText`
: HTTP status message: usually `OK` for `200`, `Not Found` for `404`, `Forbidden` for `403` and so on.

`responseText`
: The text of the server response,

If the server returns XML with the correct header `Content-type: text/xml`, then there's also `responseXML` property with the parsed XML document. You can query it with `xhr.responseXml.querySelector("...")` and perform other XML-specific operations.

That's rarely used, because most of the time JSON is returned by the server. And then we can parse it using `JSON.parse(xhr.responseText)`.

## Synchronous and asynchronous requests

If in the `open` method the third parameter `async` is set to `false`, the request is made synchronously.

In other words, Javascript execution pauses at that line and continues when the response is received. Somewhat like `alert` or `prompt` commands.

Synchronous calls are used rarely, because they block in-page Javascript till the loading is complete. In some browsers, a user is unable to scroll the page.

```js
// Synchronous request
xhr.open('GET', 'phones.json', *!*false*/!*);

// Send it
xhr.send();
*!*
// ...JavaScript "hangs" and waits till the request is complete
*/!*
```

If a synchronous call takes too much time, the browser may suggest to close the "hanging" webpage.

Also, because of the blocking, it becomes impossible to send two requests simultaneously. And, looking a bit forward, let's note that some advanced capabilities of `XMLHttpRequest`, like requesting from another domain or specifying a timeout, are unavailable for synchronous requests.

Because of all that, synchronous requests are used very sparingly, almost never.

By default, requests are asynchronous.

The same request made asynchronously:

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', 'phones.json'); // the third parameter is true by default

xhr.send(); // (1)

*!*
xhr.onreadystatechange = function() { // (3)
  if (xhr.readyState != 4) return;
*/!*

  button.innerHTML = 'Complete!';

  if (xhr.status != 200) {
    alert(xhr.status + ': ' + xhr.statusText);
  } else {
    alert(xhr.responseText);
  }

}

button.innerHTML = 'Loading...'; // (2)
button.disabled = true;
```

Now as there's no third argument in `open` (or if we explicitly set it to `true`), the request is asynchronous. In other words, after the call `xhr.send()` in the line `(1)`, Javascript does not "hang", but continues to execute.

In our case, it means that `(2)` shows a "loading" message.

Then, after time, when the result is received, it comes in the event handler `(3)` that we'll cover a bit later.

```online
The full example in action:

[codetabs src="phones-async"]
```

# Event "readystatechange"

The event `readystatechange` occurs multiple times during sending the request and receiving the response.

As the name suggests, there's a "ready state" of `XMLHttpRequest`. It is accessible as  `xhr.readyState`.

In the example above we only used state `4` (request complete), but there are few more.

All states, as in [the specification](http://www.w3.org/TR/XMLHttpRequest/#states):

```js
const unsigned short UNSENT = 0; // initial state
const unsigned short OPENED = 1; // open called
const unsigned short HEADERS_RECEIVED = 2; // response headers received
const unsigned short LOADING = 3; // response is loading (a data packed is received)
const unsigned short DONE = 4; // request complete
```

An `XMLHttpRequest` object travels them in the order `0` -> `1` -> `2` -> `3` -> ... -> `3` -> `4`. State `3` repeats every time a data packet is received over the network.

The example above demonstrates these states. The server answers the request `digits` by sending a string of `1000` digits once per second.

[codetabs src="readystate"]

```warn header="Packets may break at any byte"
One might think that `readyState=3` (the next data packet is received) allows us to get the current (not full yet) response body in `responseText`.

That's true. But only partially.

Technically, we do not have control over breakpoints between network packets. Many languages use multi-byte encodings like UTF-8, where a character is represented by multiple bytes. Some characters use only 1 byte, some use 2 or more. And packets may split *in the middle of a character*.

E.g. the letter `ö` is encoded with two bytes. The first of them may be at the end of one packet, and the second one -- at the beginning of the next packet.

So, during the `readyState`, at the end of `responseText` there will be a half-character byte. That may lead to problems. In some simple cases, when we use only latin characters and digits (they all are encoded with 1 byte), such thing can't happen, but in other cases, that can become a source of bugs.
```

## HTTP-headers

`XMLHttpRequest` allows both to send custom headers and read headers from the response.

There are 3 methods for HTTP-headers:

`setRequestHeader(name, value)`
: Sets the request header with the given `name` and `value`.

    For instance:

    ```js
    xhr.setRequestHeader('Content-Type', 'application/json');
    ```

    ```warn header="Headers limitations"
    Several headers are managed exclusively by the browser, e.g. `Referer` and `Host`.
    The full list is [in the specification](http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader-method).

    XMLHttpRequest is not allowed to change them, for the sake of user safety and correctness of the request.
    ```

    ````warn header="Can't remove a header"
    Another peciliarity of `XMLHttpRequest` is that one can't undo `setRequestHeader`.

    Once the header is set, it's set. Additional calls add information to the header, don't overwrite it.

    For instance:

    ```js
    xhr.setRequestHeader('X-Auth', '123');
    xhr.setRequestHeader('X-Auth', '456');

    // the header will be:
    // X-Auth: 123, 456
    ```
    ````

`getResponseHeader(name)`
: Gets the response header with the given `name` (except `Set-Cookie` and `Set-Cookie2`).

    For instance:

    ```js
    xhr.getResponseHeader('Content-Type')
    ```

`getAllResponseHeaders()`
: Returns all response headers, except `Set-Cookie` and `Set-Cookie2`.

    Headers are returned as a single line, e.g.:

    ```
    Cache-Control: max-age=31536000
    Content-Length: 4260
    Content-Type: image/png
    Date: Sat, 08 Sep 2012 16:53:16 GMT
    ```

    The line break between headers is always `"\r\n"` (doesn't depend on OS), so we can easily split it into individual headers. The separator between the name and the value is always a colon followed by a space `": "`. That's fixed in the specification.

    So, if we want to get an object with name/value pairs, we need to throw in a bit JS.

    Like this (assuming that if two headers have the same name, then the latter one overwrites the former one):

    ```js
    let headers = xhr
      .getAllResponseHeaders()
      .split('\r\n')
      .reduce((result, current) => {
        let [name, value] = current.split(': ');
        result[name] = value;
        return result;
      }, {});
    ```


## Timeout

The maximum duration of an asynchronous request can be set using the `timeout` property:

```js
xhr.timeout = 30000; // 30 seconds (in milliseconds)
```

If the request exceeds that time, it's aborted, and the `timeout` event is generated:

```js
xhr.ontimeout = function() {
  alert( 'Sorry, the request took too long.' );
}
```

## The full event list

The [modern specification](http://www.w3.org/TR/XMLHttpRequest/#events) lists following events (in the lifecycle order):

- `loadstart` -- the request has started.
- `progress` -- a data packet of the response has arrived, the whole response body at the moment is in `responseText`.
- `abort` -- the request was canceled by the call `xhr.abort()`.
- `error` -- connection error has occured, e.g. wrong domain name. Doesn't happen for HTTP-errors like 404.
- `load` -- the request has finished successfully.
- `timeout` -- the request was canceled due to timeout (only happens if it was set).
- `loadend` -- the request has finished (succeffully or not).

The most used events are load completion (`onload`), load failure (`onerror`), and also `onprogress` to track the progress.

We've already seen another event: `readystatechange`. Historically, it appeared long ago, before the specification settled. Nowadays, there's no need to use it, we can replace it with newer events, but it can often be found in older scripts.

## Summary

Typical code of the GET-request with `XMLHttpRequest`:

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url');

xhr.send();

xhr.onload = function() {
  // we can check
  // status, statusText - for response HTTP status
  // responseText, responseXML (when content-type: text/xml) - for the response

  if (this.status != 200) {
    // handle error
    alert( 'error: ' + this.status);
    return;
  }

  // get the response from this.responseText
};

xhr.onerror = function() {
  // handle error
};
```

XMLHttpRequest is widely used, but there's a more modern method named `fetch(url)` that returns a promise, thus working well with async/await. We'll cover it soon in the next sections.
