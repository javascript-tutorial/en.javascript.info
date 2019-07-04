# Fetch: Cross-Origin Requests

If we make a `fetch` from an arbitrary web-site, that will probably fail.

The core concept here is *origin* -- a domain/port/protocol triplet.

Cross-origin requests -- those sent to another domain (even a subdomain) or protocol or port -- require special headers from the remote side. That policy is called "CORS": Cross-Origin Resource Sharing.

For instance, let's try fetching `http://example.com`:

```js run async
try {
  await fetch('http://example.com');
} catch(err) {
  alert(err); // Failed to fetch
}
```

Fetch fails, as expected.

## Why? A brief history

Because cross-origin restrictions protect the internet from evil hackers.

Seriously. Let's make a very brief historical digression.

**For many years a script from one site could not access the content of another site.**

That simple, yet powerful rule was a foundation of the internet security. E.g. a script from the page `hacker.com` could not access user's mailbox at `gmail.com`. People felt safe.

JavaScript also did not have any special methods to perform network requests at that time. It was a toy language to decorate a web page.

But web developers demanded more power. A variety of tricks were invented to work around the limitation.

### Using forms

One way to communicate with another server was to submit a `<form>` there. People submitted it into `<iframe>`, just to stay on the current page, like this:

```html
<!-- form target -->
*!*
<iframe name="iframe"></iframe>
*/!*

<!-- a form could be dynamically generated and submited by JavaScript -->
*!*
<form target="iframe" method="POST" action="http://another.com/…">
*/!*
  ...
</form>
```

So, it was possible to make a GET/POST request to another site, even without networking methods. But as it's forbidden to access the content of an `<iframe>` from another site, it wasn't possible to read the response.

As we can see, forms allowed to send data anywhere, but not receive the response. To be precise, there wre actually tricks for that (required special scripts at both the iframe and the page), but let these dinosaurs rest in peace.

### Using scripts

Another trick was to use a `<script src="http://another.com/…">` tag. A script could have any `src`, from any domain. But again -- it was impossible to access the raw content of such script.

If `another.com` intended to expose data for this kind of access, then a so-called "JSONP (JSON with padding)" protocol was used.

Let's say we need to get the data from `http://another.com` this way:

1. First, in advance, we declare a global function to accept the data, e.g. `gotWeather`.

    ```js
    // 1. Declare the function to process the data
    function gotWeather({ temperature, humidity }) {
      alert(`temperature: ${temperature}, humidity: ${humidity}`);
    }
    ```
2. Then we make a `<script>` tag with `src="http://another.com/weather.json?callback=gotWeather"`,  please note that the name of our function is its `callback` parameter.

    ```js
    let script = document.createElement('script');
    script.src = `http://another.com/weather.json?callback=gotWeather`;
    document.body.append(script);
    ```
3. The remote server dynamically generates a script that calls `gotWeather(...)` with the data it wants us to receive.
    ```js
    // The expected answer from the server looks like this:
    gotWeather({
      temperature: 25,
      humidity: 78
    });
    ```
4. When the remote script loads and executes, `gotWeather` runs, and, as it's our function, we have the data.



That works, and doesn't violate security, because both sides agreed to pass the data this way. And, when both sides agree, it's definitely not a hack. There are still services that provide such access, as it works even for very old browsers.

After a while, networking methods appeared, such as `XMLHttpRequest`.

At first, cross-origin requests were forbidden. But as a result of long discussions, cross-domain requests were  allowed, in a way that does not add any capabilities unless explicitly allowed by the server.

## Simple requests

There are two types of cross-domain requests:
1. Simple requests.
2. All the others.

Simple Requests are, well, simpler to make, so let's start with them.

A [simple request](http://www.w3.org/TR/cors/#terminology) is a request that satisfies two conditions:

1. [Simple method](http://www.w3.org/TR/cors/#simple-method): GET, POST or HEAD
2. [Simple headers](http://www.w3.org/TR/cors/#simple-header) -- the only allowed custom headers are:
    - `Accept`,
    - `Accept-Language`,
    - `Content-Language`,
    - `Content-Type` with the value `application/x-www-form-urlencoded`, `multipart/form-data` or `text/plain`.

Any other request is considered "non-simple". For instance, a request with `PUT` method or with an `API-Key` HTTP-header does not fit the limitations.

**The essential difference is that a "simple request" can be made with a `<form>` or a `<script>`, without any special methods.**

So, even a very old server should be ready to accept a simple request.

Contrary to that, requests with non-standard headers or e.g. method `DELETE` can't be created this way. For a long time JavaScript was unable to do such requests. So an old server may assume that such requests come from a privileged source, "because a webpage is unable to send them".

When we try to make a non-simple request, the browser sends a special "preflight" request that asks the server -- does it agree to accept such cross-origin requests, or not?

And, unless the server explicitly confirms that with headers, a non-simple request is not sent.

Now we'll go into details. All of them serve a single purpose -- to ensure that new cross-origin capabilities are only accessible with an explicit permission from the server.

## CORS for simple requests

If a request is cross-origin, the browser always adds `Origin` header to it.

For instance, if we request `https://anywhere.com/request` from `https://javascript.info/page`, the headers will be like:

```
GET /request
Host: anywhere.com
*!*
Origin: https://javascript.info
*/!*
...
```

As you can see, `Origin` contains exactly the origin (domain/protocol/port), without a path.

The server can inspect the `Origin` and, if it agrees to accept such a request, adds a special header `Access-Control-Allow-Origin` to the response. That header should contain the allowed origin (in our case `https://javascript.info`), or a star `*`. Then the response is successful, otherwise an error.

The browser plays the role of a trusted mediator here:
1. It ensures that the corrent `Origin` is sent with a cross-domain request.
2. If checks for correct `Access-Control-Allow-Origin` in the response, if it is so, then JavaScript access, otherwise forbids with an error.

![](xhr-another-domain.png)

Here's an example of a permissive server response:
```
200 OK
Content-Type:text/html; charset=UTF-8
*!*
Access-Control-Allow-Origin: https://javascript.info
*/!*
```

## Response headers

For cross-origin request, by default JavaScript may only access "simple response headers":

- `Cache-Control`
- `Content-Language`
- `Content-Type`
- `Expires`
- `Last-Modified`
- `Pragma`

Any other response header is forbidden.

```smart header="Please note: no `Content-Length`"
Please note: there's no `Content-Length` header in the list!

This header contains the full response length. So, if we're downloading something and would like to track the percentage of progress, then an additional permission is required to access that header (see below).
```

To grant JavaScript access to any other response header, the server must list it in the `Access-Control-Expose-Headers` header.

For example:

```
200 OK
Content-Type:text/html; charset=UTF-8
Content-Length: 12345
API-Key: 2c9de507f2c54aa1
Access-Control-Allow-Origin: https://javascript.info
*!*
Access-Control-Expose-Headers: Content-Length,API-Key
*/!*
```

With such `Access-Control-Expose-Headers` header, the script is allowed to access `Content-Length` and `API-Key` headers of the response.


## "Non-simple" requests

We can use any HTTP-method: not just `GET/POST`, but also `PATCH`, `DELETE` and others.

Some time ago no one could even assume that a webpage is able to do such requests. So there may exist webservices that treat a non-standard method as a signal: "That's not a browser". They can take it into account when checking access rights.

So, to avoid misunderstandings, any "non-simple" request -- that couldn't be done in the old times, the browser does not make such requests right away. Before it sends a preliminary, so-called "preflight" request, asking for permission.

A preflight request uses method `OPTIONS` and has no body.
- `Access-Control-Request-Method` header has the requested method.
- `Access-Control-Request-Headers` header provides a comma-separated list of non-simple HTTP-headers.

If the server agrees to serve the requests, then it should respond with status 200, without body.

- The response header `Access-Control-Allow-Methods` must have the allowed method.
- The response header `Access-Control-Allow-Headers` must have a list of allowed headers.
- Additionally, the header `Access-Control-Max-Age` may specify a number of seconds to cache the permissions. So the browser won't have to send a preflight for subsequent requests that satisfy given permissions.

![](xhr-preflight.png)

Let's see how it works step-by-step on example, for a cross-domain `PATCH` request (this method is often used to update data):

```js
let response = await fetch('https://site.com/service.json', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'  
    'API-Key': 'secret'
  }
});
```

There are three reasons why the request is not simple (one is enough):
- Method `PATCH`
- `Content-Type` is not one of: `application/x-www-form-urlencoded`, `multipart/form-data`,  `text/plain`.
- "Non-simple" `API-Key` header.

### Step 1 (preflight request)

Prior to sending our request, the browser, on its own, sends a preflight request that looks like this:

```
OPTIONS /service.json
Host: site.com
Origin: https://javascript.info
Access-Control-Request-Method: PATCH
Access-Control-Request-Headers: Content-Type,API-Key
```

- Method: `OPTIONS`.
- The path -- exactly the same as the main request: `/service.json`.
- Cross-origin special headers:
    - `Origin` -- the source origin.
    - `Access-Control-Request-Method` -- requested method.
    - `Access-Control-Request-Headers` -- a comma-separated list of "non-simple" headers.

### Step 2 (preflight response)

The server should respond with status 200 and headers:
- `Access-Control-Allow-Methods: PATCH`
- `Access-Control-Allow-Headers: Content-Type,API-Key`.

That allows future communication, otherwise an error is triggered.

If the server expects other methods and headers in the future, makes sense to allow them in advance by adding to the list:

```
200 OK
Access-Control-Allow-Methods: PUT,PATCH,DELETE
Access-Control-Allow-Headers: API-Key,Content-Type,If-Modified-Since,Cache-Control
Access-Control-Max-Age: 86400
```

Now the browser can see that `PATCH` is in the list of allowed methods, and both headers are in the list too, so it sends out the main request.

Besides, the preflight response is cached for time, specified by `Access-Control-Max-Age` header (86400 seconds, one day), so subsequent requests will not cause a preflight. Assuming that they fit the allowances, they will be sent directly.

### Step 3 (actual request)

When the preflight is successful, the browser now makes the real request. Here the flow is the same as for simple requests.

The real request has `Origin` header (because it's cross-origin):

```
PATCH /service.json
Host: site.com
Content-Type: application/json
API-Key: secret
Origin: https://javascript.info
```

### Step 4 (actual response)

The server should not forget to add `Access-Control-Allow-Origin` to the response. A successful preflight does not relieve from that:

```
Access-Control-Allow-Origin: https://javascript.info
```

Now everything's correct. JavaScript is able to read the full response.


## Credentials

A cross-origin request by default does not bring any credentials (cookies or HTTP authentication).

That's uncommon for HTTP-requests. Usually, a request to `http://site.com` is accompanied by all cookies from that domain. But cross-domain requests made by JavaScript methods are an exception.

For example, `fetch('http://another.com')` does not send any cookies, even those that belong to `another.com` domain.

Why?

That's because a request with credentials is much more powerful than an anonymous one. If allowed, it grants JavaScript the full power to act and access sensitive information on behalf of a user.

Does the server really trust pages from `Origin` that much? Then it must explicitly allow requests with credentials with an additional header.

To send credentials, we need to add the option `credentials: "include"`, like this:

```js
fetch('http://another.com', {
  credentials: "include"
});
```

Now `fetch` sends cookies originating from `another.com` with out request to that site.

If the server wishes to accept the request with credentials, it should add a header `Access-Control-Allow-Credentials: true` to the response, in addition to `Access-Control-Allow-Origin`.

For example:

```
200 OK
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Credentials: true
```

Please note: `Access-Control-Allow-Origin` is prohibited from using a star `*` for requests with credentials. There must be exactly the origin there, like above. That's an additional safety measure, to ensure that the server really knows who it trusts.


## Summary

Networking methods split cross-origin requests into two kinds: "simple" and all the others.

[Simple requests](http://www.w3.org/TR/cors/#terminology) must satisfy the following conditions:
- Method: GET, POST or HEAD.
- Headers -- we can set only:
    - `Accept`
    - `Accept-Language`
    - `Content-Language`
    - `Content-Type` to the value `application/x-www-form-urlencoded`, `multipart/form-data` or `text/plain`.

The essential difference is that simple requests were doable since ancient times using `<form>` or `<script>` tags, while non-simple were impossible for browsers for a long time.

So, practical difference is that simple requests are sent right away, with `Origin` header, but for other ones the browser makes a preliminary "preflight" request, asking for permission.

**For simple requests:**

- → The browser sends `Origin` header with the origin.
- ← For requests without credentials (not sent default), the server should set:
    - `Access-Control-Allow-Origin` to `*` or same value as `Origin`
- ← For requests with credentials, the server should set:
    - `Access-Control-Allow-Origin` to same value as `Origin`
    - `Access-Control-Allow-Credentials` to `true`

Additionally, if JavaScript wants to access non-simple response headers:
- `Cache-Control`
- `Content-Language`
- `Content-Type`
- `Expires`
- `Last-Modified`
- `Pragma`

...Then the server should list the allowed ones in `Access-Control-Expose-Headers` header.

**For non-simple requests, a preliminary "preflight" request is issued before the requested one:**

- → The browser sends `OPTIONS` request to the same url, with headers:
    - `Access-Control-Request-Method` has requested method.
    - `Access-Control-Request-Headers` lists non-simple requested headers
- ← The server should respond with status 200 and headers:
    - `Access-Control-Allow-Methods` with a list of allowed methods,
    - `Access-Control-Allow-Headers` with a list of allowed headers,
    - `Access-Control-Max-Age` with a number of seconds to cache permissions.
- Then the actual request is sent, the previous "simple" scheme is applied.
