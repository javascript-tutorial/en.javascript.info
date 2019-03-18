# Cross-Origin Requests

If we make a `fetch` from an arbitrary web-site, that will probably fail.

The core concept here is *origin* -- a domain/port/protocol triplet.

Cross-origin requests -- those sent to another domain or protocol or port -- require special headers from the remote side. That policy is called "CORS": Cross-Origin Resource Sharing.

For instance, let's try fetching from `http://example.com`:

```js run async
try {
  await fetch('http://example.com');
} catch(err) {
  alert(err); // Failed to fetch
}
```

Fetch fails, as expected.

## Why?

Because cross-origin restrictions protect the internet from evil hackers.

Seriously. Let's make a very brief historical digression.

For many years Javascript did not have any special methods to perform network requests.

One way to communicate with another server was to submit a `<form>` there. People submitted it into `<iframe>`, just to stay on the current page, like this:

```html
<iframe name="iframe"></iframe>

<form target="iframe" method="POST" action="http://another.com/…">
  <!-- a form could be dynamically generated and submited by Javascript -->
</form>

```

- So, it was possible to make a GET/POST request to another site.
- But as it's forbidden to access the content of an `<iframe>` from another site, it wasn't possible to read the response.

**A script from one site could not access the content of another site.**

That simple, yet powerful rule was a foundation of the internet security. E.g. a script from the page `hacker.com` could not access user's mailbox at `gmail.com`. People felt safe.

But growing appetites of web developers demanded more power. A variety of tricks were invented.

One of them was to use a `<script src="http://another.com/…">` tag. It could request a script from anywhere, but again -- it was forbidden to access its content (if from another site).

So if `another.com` was going to send back the data, it would be wrapped in a callback function with the name known to the receiving side. Usually, an url parameter, such as `?callback=…`, was used to specify the name.

For instance:
1. We declare a global function, e.g. `gotWeather`.
1. Our page is requesting `http://another.com/weather.json?callback=gotWeather`.
2. The remote server dynamically generates a script wrapping the response data into `gotWeather(...)`. As `gotWeather` is our global function, it handles the response: we have the data.


Here's the demo:

```js run
function gotWeather({ temperature, humidity }) {
  alert(`temperature: ${temperature}, humidity: ${humidity}`);
}

let script = document.createElement('script');
script.src = `http://cors.javascript.local/article/fetch-crossorigin/demo/script?callback=gotWeather`;
document.body.append(script);
```

The response looks like this:

```js
gotWeather({
  temperature: 25,
  humidity: 78
});
```


That works, and doesn't violate security, because both sides agreed to pass the data this way. And, when both sides agree, it's definitely not a hack.

Then `XMLHttpRequest` appeared, and `fetch` afterwards. After long discussions, it was decided that cross-domain requests would be possible, but in a way that does not add any capabilities unless explicitly allowed by the server.

## Simple requests

[Simple requests](http://www.w3.org/TR/cors/#terminology) must satisfy the following conditions:

1. [Simple method](http://www.w3.org/TR/cors/#simple-method): GET, POST or HEAD
2. [Simple headers](http://www.w3.org/TR/cors/#simple-header) -- only allowed:
    - `Accept`
    - `Accept-Language`
    - `Content-Language`
    - `Content-Type` with the value `application/x-www-form-urlencoded`, `multipart/form-data` or `text/plain`.

Any other request is considered "non-simple". For instance, a request with `PUT` method or with an `Authorization` HTTP-header does not fit the limitations.

**The essential difference is that a "simple request" can be made with a `<form>` or a `<script>`, without any special methods.**

So, even a very old server should be ready to accept a simple request.

Contrary to that, headers with non-standard headers or e.g. `DELETE` method can't be created this way. For a long time Javascript was unable to do such requests. So an old server may assume that such requests come from a privileged source, "because a webpage is unable to send them".

That's why we try to make a non-simple request, the browser sends a special "preflight" request that asks the server -- does it agree to accept such cross-origin requests, or not?

And, unless the server explicitly confirms that with headers, a non-simple request is not sent.

Now we'll go into details. All of them serve a single purpose -- to ensure that new cross-origin capabilities are only accessible with an explicit permission from the server.

## CORS for simple requests

A browser always adds to cross-origin requests header `Origin`, with the origin of the request.

For instance, if we request `https://anywhere.com/request` from `https://javascript.info/page`, the headers will be like:

```
GET /request
Host:anywhere.com
*!*
Origin:https://javascript.info
*/!*
...
```

Please note: `Origin` has no path, only domain/protocol/port.

The server can inspect the `Origin` and, if it agrees to accept such a request, add a special header `Access-Control-Allow-Origin` to the response. That header should contain the allowed origin (in our case `https://javascript.info`), or a star `*`.

The browser plays the role of a trusted mediator here:
1. It ensures that the corrent `Origin` is sent in any cross-domain request.
2. If checks for correct `Access-Control-Allow-Origin` in the response, grants Javascript access if it's so, forbids otherwise.

![](xhr-another-domain.png)

Here's an example of an "accepting" response:
```
200 OK
Content-Type:text/html; charset=UTF-8
*!*
Access-Control-Allow-Origin: https://javascript.info
*/!*
```

## Response headers

For cross-origin request, by default Javascript may only access "simple response headers":

- `Cache-Control`
- `Content-Language`
- `Content-Type`
- `Expires`
- `Last-Modified`
- `Pragma`

Any other header is forbidden.

```smart
Please note: there's no `Content-Length` header in the list! So, if we're downloading something, we can't track the percentage of progress.
```

To grant Javascript access to any other header, the server must list it in the `Access-Control-Expose-Headers` header.

For example:

```
200 OK
Content-Type:text/html; charset=UTF-8
Access-Control-Allow-Origin: https://javascript.info
Content-Length: 12345
Authorization: 2c9de507f2c54aa1
*!*
Access-Control-Expose-Headers: Content-Length, Authorization
*/!*
```

With such `Access-Control-Expose-Headers` header, the script is allowed to access `Content-Length` and `Authorization` headers of the response.


## "Non-simple" requests

We can use any HTTP-method: not just `GET/POST`, but also `PATCH`, `DELETE` and others.

Some time ago no one could even assume that a webpage is able to do such requests. So there may exist webservices that treat a non-standard method as a signal: "That's not a browser". They can take it into account when checking access rights.

So, to avoid misunderstandings, any "non-simple" request -- that couldn't be done in the old times, the browser does not make such requests right away. Before it sends a preliminary, so-called "preflight" request, asking for permission.

A preflight request uses method `OPTIONS` and has no body:
- `Access-Control-Request-Method` header has the requested method.
- `Access-Control-Request-Headers` header provides a comma-separated list of non-simple HTTP-headers.

If the server agrees to serve the requests, then it should respond with status 200, no body and:

- The response header `Access-Control-Allow-Method` must have the allowed method.
- The response header `Access-Control-Allow-Headers` must have a list of allowed headers.
- Additionally, the header `Access-Control-Max-Age` may specify a number of seconds to cache the permissions. So the browser won't have to send a preflight for subsequent requests that satisfy given permissions.

![](xhr-preflight.png)

Let's see how it works step-by-step for a cross-domain `PATCH` request:

```js
let response = await fetch('https://site.com/service.json', {
  method: 'PATCH', // this method is often used to update data
  headers: {
    'Content-Type': 'application/json'  
    'API-Key': 'secret'
  }
});
```

There are three reasons why the request is not simple (one is enough):
- Method `PATCH`
- `Content-Type` is not one of: `application/x-www-form-urlencoded`, `multipart/form-data`,  `text/plain`.
- Custom `API-Key` header.

### Step 1 (preflight request)

The browser, on its own, sends a preflight request that looks like this:

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

The server can respond with status 200 and headers:
- `Access-Control-Allow-Method: PATCH`
- `Access-Control-Allow-Headers: Content-Type,API-Key`.

...But if it expects other methods and headers, makes sense to list them all at once:

```
200 OK
Access-Control-Allow-Methods: PUT,PATCH,DELETE
Access-Control-Allow-Headers: API-Key,Content-Type,If-Modified-Since,Cache-Control
Access-Control-Max-Age: 86400
```

Now the browser can see that `PATCH` is an allowed method, and both headers are in the list too, so it sends the main request.

Besides, the preflight response is cached for 86400 seconds (one day), so subsequent requests will not cause a preflight. Assuming that they fit the allowances, they will be sent directly, without `OPTIONS`.

### Step 3 (actual request)

When the preflight is successful, the browser now makes the real request.

It has `Origin` header (because it's cross-origin):

```
PATCH /service.json
Host: site.com
Content-Type: application/json
API-Key: secret
Origin: https://javascript.info
```

### Step 4 (actual response)

The server should not forget `Accept-Control-Allow-Origin` in the response. A successful preflight does not relieve from that:

```
Access-Control-Allow-Origin: https://javascript.info
```

Now it's done. Because of `Access-Control-Max-Age: 86400`, preflight permissions are cached for 86400 seconds (1 day).


## Credentials

A cross-origin request by default does not bring any cookies.

for example, `fetch('http://another.com')` does not send any cookies, even those that belong to `another.com` domain.

To send cookies, we need to add the option `credentials: "include"`.

Like this:

```js
fetch('http://another.com', {
  credentials: "include"
});
```

Now `fetch` sends cookies originating from `another.com` with the request.

A request with credentials is much more powerful than an anonymouse one. Does the server trust Javascript to work on behalf of a user? Then it will access sensitive information, these permissions are not for everyone.

The server should add a new header `Access-Control-Allow-Credentials: true` to the response, if it allows requests with credentials.

For example:

```
200 OK
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Credentials: true
```

Please note: using a start `*` in `Access-Control-Allow-Origin` is forbidden in such case. The server must explicitly put the trusted origin there. That's an additional safety measure, to ensure that the server really knows who it trusts.


## Итого

- Все современные браузеры умеют делать кросс-доменные XMLHttpRequest.
- В IE8,9 для этого используется объект `XDomainRequest`, ограниченный по возможностям.
- Кросс-доменный запрос всегда содержит заголовок `Origin` с доменом запроса.

Порядок выполнения:

1. Для запросов с "непростым" методом или особыми заголовками браузер делает предзапрос `OPTIONS`, указывая их в `Access-Control-Request-Method` и `Access-Control-Request-Headers`.

    Браузер ожидает ответ со статусом `200`, без тела, со списком разрешённых методов и заголовков в `Access-Control-Allow-Method` и `Access-Control-Allow-Headers`. Дополнительно можно указать `Access-Control-Max-Age` для кеширования  предзапроса.
2. Браузер делает запрос и проверяет, есть ли в ответе `Access-Control-Allow-Origin`, равный `*` или `Origin`.

    Для запросов с `withCredentials` может быть только `Origin` и дополнительно `Access-Control-Allow-Credentials: true`.
3. Если проверки пройдены, то вызывается `xhr.onload`, иначе `xhr.onerror`, без деталей ответа.
4. Дополнительно: названия нестандартных заголовков ответа сервер должен указать в `Access-Control-Expose-Headers`, если хочет, чтобы клиент мог их прочитать.

Детали и примеры мы разобрали выше.
