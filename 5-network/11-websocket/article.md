# WebSocket

The `WebSocket` protocol, described in the specification [RFC 6455](http://tools.ietf.org/html/rfc6455) provides a way to exchange data between browser and server via a persistent connection.

Once a websocket connection is established, both client and server may send the data to each other.

WebSocket is especially great for services that require continuous data exchange, e.g. online games, real-time trading systems and so on.

## A simple example

To open a websocket connection, we need to create `new WebSocket` using the special protocol `ws` in the url:

```js
let socket = new WebSocket("*!*ws*/!*://javascript.info");
```

There's also encrypted `wss://` protocol. It's like HTTPS for websockets.

```smart header="Always prefer `wss://`"
The `wss://` protocol not only encrypted, but also more reliable.

That's because `ws://` data is not encrypted, visible for any intermediary. Old proxy servers do not know about WebSocket, they may see "strange" headers and abort the connection.

On the other hand, `wss://` is WebSocket over TLS, (same as HTTPS is HTTP over TLS), the transport security layer encrypts the data at sender and decrypts at the receiver, so it passes encrypted through proxies. They can't see what's inside and let it through.
```

Once the socket is created, we should listen to events on it. There are totally 4 events:
- **`open`** -- connection established,
- **`message`** -- data received,
- **`error`** -- websocket error,
- **`close`** -- connection closed.

...And if we'd like to send something, then `socket.send(data)` will do that.

Here's an example:

```js run
let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

socket.onopen = function(e) {
  alert("[open] Connection established, send -> server");
  socket.send("My name is John");
};

socket.onmessage = function(event) {
  alert(`[message] Data received: ${event.data} <- server`);
};

socket.onclose = function(event) {
  if (event.wasClean) {  
    alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    alert('[close] Connection died');
  }
};

socket.onerror = function(error) {
  alert(`[error] ${error.message}`);
};
```

For demo purposes, there's a small server [server.js](demo/server.js) written in Node.js, for the example above, running. It responds with "hello", then waits 5 seconds and closes the connection.

So you'll see events `open` -> `message` -> `close`.

That's actually it, we can talk WebSocket already. Quite simple, isn't it?

Now let's talk more in-depth.

## Opening a websocket

When `new WebSocket(url)` is created, it starts connecting immediately.

During the connection the browser (using headers) asks the server: "Do you support Websocket?" And if the server replies "yes", then the talk continues in WebSocket protocol, which is not HTTP at all.

![](websocket-handshake.svg)

Here's an example of browser request for `new WebSocket("wss://javascript.info/chat")`.

```
GET /chat
Host: javascript.info
Origin: https://javascript.info
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
```

- `Origin` -- the origin of the client page, e.g. `https://javascript.info`. WebSocket objects are cross-origin by nature. There are no special headers or other limitations. Old servers are unable to handle WebSocket anyway, so there are no compabitility issues. But `Origin` header is important, as it allows the server to decide whether or not to talk WebSocket with this website.
- `Connection: Upgrade` -- signals that the client would like to change the protocol.
- `Upgrade: websocket` -- the requested protocol is "websocket".
- `Sec-WebSocket-Key` -- a random browser-generated key for security.
- `Sec-WebSocket-Version` -- WebSocket protocol version, 13 is the current one.

```smart header="WebSocket handshake can't be emulated"
We can't use `XMLHttpRequest` or `fetch` to make this kind of HTTP-request, because JavaScript is not allowed to set these headers.
```

If the server agrees to switch to WebSocket, it should send code 101 response:

```
101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
```

Here `Sec-WebSocket-Accept` is `Sec-WebSocket-Key`, recoded using a special algorithm. The browser uses it to make sure that the response corresponds to the request.

Afterwards, the data is transfered using WebSocket protocol, we'll see its structure ("frames") soon. And that's not HTTP at all.

### Extensions and subprotocols

There may be additional headers `Sec-WebSocket-Extensions` and `Sec-WebSocket-Protocol` that describe extensions and subprotocols.

For instance:

- `Sec-WebSocket-Extensions: deflate-frame` means that the browser supports data compression. An extension is something related to transferring the data, not data itself.

- `Sec-WebSocket-Protocol: soap, wamp` means that we'd like to transfer not just any data, but the data in [SOAP](http://en.wikipedia.org/wiki/SOAP) or WAMP ("The WebSocket Application Messaging Protocol") protocols. WebSocket subprotocols are registered in the [IANA catalogue](http://www.iana.org/assignments/websocket/websocket.xml).

`Sec-WebSocket-Extensions` header is sent by the browser automatically, with a list of possible extensions it supports.

`Sec-WebSocket-Protocol` header depends on us: we decide what kind of data we send. The second optional parameter of `new WebSocket` is just for that, it lists subprotocols:

```js
let socket = new WebSocket("wss://javascript.info/chat", ["soap", "wamp"]);
```

The server should respond with a list of protocols and extensions that it agrees to use.

For example, the request:

```
GET /chat
Host: javascript.info
Upgrade: websocket
Connection: Upgrade
Origin: https://javascript.info
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
*!*
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap, wamp
*/!*
```

Response:

```
101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
*!*
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap
*/!*
```

Here the server responds that it supports the extension "deflate-frame", and only SOAP of the requested subprotocols.

## WebSocket data

WebSocket communication consists of "frames" -- data fragments, that can be sent from either side, and can be of several kinds:

- "text frames" -- contain text data that parties send to each other.
- "binary data frames" -- contain binary data that parties send to each other.
- "ping/pong frames" are used to check the connection, sent from the server, the browser responds to these automatically.
- "connection close frame" and a few other service frames.

In the browser, we directly work only with text or binary frames.

**WebSocket `.send()` method can send either text or binary data.**

A call `socket.send(body)` allows `body` in string or a binary format, including `Blob`, `ArrayBuffer`, etc. No settings required: just send it out.

**When we receive the data, text always comes as string. And for binary data, we can choose between `Blob` and `ArrayBuffer` formats.**

The `socket.bufferType` is `"blob"` by default, so binary data comes in Blobs.

[Blob](info:blob) is a high-level binary object, it directly integrates with `<a>`, `<img>` and other tags, so that's a sane default. But for binary processing, to access individual data bytes, we can change it to `"arraybuffer"`:

```js
socket.bufferType = "arraybuffer";
socket.onmessage = (event) => {
  // event.data is either a string (if text) or arraybuffer (if binary)
};
```

## Rate limiting

Imagine, our app is generating a lot of data to send. But the user has a slow network connection, maybe on a mobile, outside of a city.

We can call `socket.send(data)` again and again. But the data will be buffered (stored) in memory and sent out only as fast as network speed allows.

The `socket.bufferedAmount` property stores how many bytes are buffered at this moment, waiting to be sent over the network.

We can examine it to see whether the socket is actually available for transmission.

```js
// every 100ms examine the socket and send more data  
// only if all the existing data was sent out
setInterval(() => {
  if (socket.bufferedAmount == 0) {
    socket.send(moreData());
  }
}, 100);
```


## Connection close

Normally, when a party wants to close the connection (both browser and server have equal rights), they send a "connection close frame" with a numeric code and a textual reason.

The method for that is:
```js
socket.close([code], [reason]);
```

- `code` is a special WebSocket closing code (optional)
- `reason` is a string that describes the reason of closing (optional)

Then the other party in `close` event handler gets the code and the reason, e.g.:

```js
// closing party:
socket.close(1000, "Work complete");

// the other party
socket.onclose = event => {
  // event.code === 1000
  // event.reason === "Work complete"
  // event.wasClean === true (clean close)
};
```

Most common code values:

- `1000` -- the default, normal closure (used if no `code` supplied),
- `1006` -- no way to such code manually, indicates that the connection was lost (no close frame).

There are other codes like:

- `1001` -- the party is going away, e.g. server is shutting down, or a browser leaves the page,
- `1009` -- the message is too big to process,
- `1011` -- unexpected error on server,
- ...and so on.

Please refer to the [RFC6455, §7.4.1](https://tools.ietf.org/html/rfc6455#section-7.4.1) for the full list.

WebSocket codes are somewhat like HTTP codes, but different. In particular, any codes less than `1000` are reserved, there'll be an error if we try to set such a code.

```js
// in case connection is broken
socket.onclose = event => {
  // event.code === 1006
  // event.reason === ""
  // event.wasClean === false (no closing frame)
};
```


## Connection state

To get connection state, additionally there's `socket.readyState` property with values:

- **`0`** -- "CONNECTING": the connection has not yet been established,
- **`1`** -- "OPEN": communicating,
- **`2`** -- "CLOSING": the connection is closing,
- **`3`** -- "CLOSED": the connection is closed.


## Chat example

Let's review a chat example using browser WebSocket API and Node.js WebSocket module <https://github.com/websockets/ws>.

HTML: there's a `<form>` to send messages and a `<div>` for incoming messages:

```html
<!-- message form -->
<form name="publish">
  <input type="text" name="message">
  <input type="submit" value="Send">
</form>

<!-- div with messages -->
<div id="messages"></div>
```

JavaScript is also simple. We open a socket, then on form submission -- `socket.send(message)`, on incoming message -- append it to `div#messages`:

```js
let socket = new WebSocket("wss://javascript.info/article/websocket/chat/ws");

// send message from the form
document.forms.publish.onsubmit = function() {
  let outgoingMessage = this.message.value;

  socket.send(outgoingMessage);
  return false;
};

// show message in div#messages
socket.onmessage = function(event) {
  let message = event.data;

  let messageElem = document.createElement('div');
  messageElem.textContent = message;
  document.getElementById('messages').prepend(messageElem);
}
```

Server-side code is a little bit beyond our scope here. We're using browser WebSocket API, a server may have another library.

Still it can also be pretty simple. We'll use Node.js with <https://github.com/websockets/ws> module for websockets.

The server-side algorithm will be:
1. Create `clients = new Set()` -- a set of sockets.
2. For each accepted websocket, `clients.add(socket)` and add `message` event listener for its messages.
3. When a message received: iterate over clients and send it to everyone.
4. When a connection is closed: `clients.delete(socket)`.

```js
const ws = new require('ws');
const wss = new ws.Server({noServer: true});

const clients = new Set();

http.createServer((req, res) => {
  // here we only handle websocket connections
  // in real project we'd have some other code herre to handle non-websocket requests
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
});

function onSocketConnect(ws) {
  clients.add(ws);

  ws.on('message', function(message) {
    message = message.slice(0, 50); // max message length will be 50

    for(let client of clients) {
      client.send(message);
    }
  });

  ws.on('close', function() {
    clients.delete(ws);
  });
}
```


Here's the working example:

[iframe src="chat" height="100" zip]

You can also download it (upper-right button in the iframe) and run locally. Just don't forget to install [Node.js](https://nodejs.org/en/) and `npm install ws` before running.


## Summary

WebSocket is a modern way to have persistent browser-server connections.

- WebSockets don't have cross-origin limitations.
- They are well-supported in browsers.
- Can send/receive strings and binary data.

The API is simple.

Methods:
- `socket.send(data)`,
- `socket.close([code], [reason])`.

Events:
- `open`,
- `message`,
- `error`,
- `close`.

WebSocket by itself does not include reconnection, authentication and many other high-level mechanisms. So there are client/server libraries for that, and it's also possible to implement these capabilities manually.

Sometimes, to integrate WebSocket into existing project, people run WebSocket server in parallel with the main HTTP-server, and they share a single database. Requests to WebSocket use `wss://ws.site.com`, a subdomain that leads to WebSocket server, while `https://site.com` goes to the main HTTP-server.

Surely, other ways of integration are also possible. Many servers (such as Node.js) can support both HTTP and WebSocket protocols.
