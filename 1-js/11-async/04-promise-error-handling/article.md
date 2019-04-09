
# Error handling with promises

Asynchronous actions may sometimes fail: in case of an error the corresponding promise becomes rejected. For instance, `fetch` fails if the remote server is not available. We can use `.catch` to handle errors (rejections).

Promise chaining is great at that aspect. When a promise rejects, the control jumps to the closest rejection handler down the chain. That's very convenient in practice.

For instance, in the code below the URL is wrong (no such server) and `.catch` handles the error:

```js run
*!*
fetch('https://no-such-server.blabla') // rejects
*/!*
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch (the text may vary)
```

Or, maybe, everything is all right with the server, but the response is not valid JSON:

```js run
fetch('/') // fetch works fine now, the server responds successfully
*!*
  .then(response => response.json()) // rejects: the page is HTML, not a valid json
*/!*
  .catch(err => alert(err)) // SyntaxError: Unexpected token < in JSON at position 0
```

The easiest way to catch all errors is to append `.catch` to the end of chain:

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
*!*
  .catch(error => alert(error.message));
*/!*
```

Normally, `.catch` doesn't trigger at all, because there are no errors. But if any of the promises above rejects (a network problem or invalid json or whatever), then it would catch it.

## Implicit try..catch

The code of a promise executor and promise handlers has an "invisible `try..catch`" around it. If an error happens, it gets caught and treated as a rejection.

For instance, this code:

```js run
new Promise((resolve, reject) => {
*!*
  throw new Error("Whoops!");
*/!*
}).catch(alert); // Error: Whoops!
```

...Works exactly the same as this:

```js run
new Promise((resolve, reject) => {
*!*
  reject(new Error("Whoops!"));
*/!*  
}).catch(alert); // Error: Whoops!
```

The "invisible `try..catch`" around the executor automatically catches the error and treats it as a rejection.

That's so not only in the executor, but in handlers as well. If we `throw` inside a `.then` handler, that means a rejected promise, so the control jumps to the nearest error handler.

Here's an example:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  throw new Error("Whoops!"); // rejects the promise
*/!*
}).catch(alert); // Error: Whoops!
```

That's so not only for `throw`, but for any errors, including programming errors as well:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  blabla(); // no such function
*/!*
}).catch(alert); // ReferenceError: blabla is not defined
```

As a side effect, the final `.catch` not only catches explicit rejections, but also occasional errors in the handlers above.

## Rethrowing

As we already noticed, `.catch` behaves like `try..catch`. We may have as many `.then` handlers as we want, and then use a single `.catch` at the end to handle errors in all of them.

In a regular `try..catch` we can analyze the error and maybe rethrow it if can't handle. The same thing is possible for promises.

If we `throw` inside `.catch`, then the control goes to the next closest error handler. And if we handle the error and finish normally, then it continues to the closest successful `.then` handler.

In the example below the `.catch` successfully handles the error:

```js run
// the execution: catch -> then
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("The error is handled, continue normally");

}).then(() => alert("Next successful handler runs"));
```

Here the `.catch` block finishes normally. So the next successful `.then` handler is called.

In the example below we see the other situation with `.catch`. The handler `(*)` catches the error and just can't handle it (e.g. it only knows how to handle `URIError`), so it throws it again:

```js run
// the execution: catch -> catch -> then
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // handle it
  } else {
    alert("Can't handle such error");

*!*
    throw error; // throwing this or another error jumps to the next catch
*/!*
  }

}).then(function() {
  /* never runs here */
}).catch(error => { // (**)

  alert(`The unknown error has occurred: ${error}`);
  // don't return anything => execution goes the normal way

});
```

Then the execution jumps from the first `.catch` `(*)` to the next one `(**)` down the chain.

In the section below we'll see a practical example of rethrowing.

## Fetch error handling example

Let's improve error handling for the user-loading example.

The promise returned by [fetch](mdn:api/WindowOrWorkerGlobalScope/fetch) rejects when it's impossible to make a request. For instance, a remote server is not available, or the URL is malformed. But if the remote server responds with error 404, or even error 500, then it's considered a valid response.

What if the server returns a non-JSON page with error 500 in the line `(*)`? What if there's no such user, and github returns a page with error 404 at `(**)`?

```js run
fetch('no-such-user.json') // (*)
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`)) // (**)
  .then(response => response.json())
  .catch(alert); // SyntaxError: Unexpected token < in JSON at position 0
  // ...
```


As of now, the code tries to load the response as JSON no matter what and dies with a syntax error. You can see that by running the example above, as the file `no-such-user.json` doesn't exist.

That's not good, because the error just falls through the chain, without details: what failed and where.

So let's add one more step: we should check the `response.status` property that has HTTP status, and if it's not 200, then throw an error.

```js run
class HttpError extends Error { // (1)
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) { // (2)
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    })
}

loadJson('no-such-user.json') // (3)
  .catch(alert); // HttpError: 404 for .../no-such-user.json
```

1. We make a custom class for HTTP Errors to distinguish them from other types of errors. Besides, the new class has a constructor that accepts `response` object and saves it in the error. So error-handling code will be able to access it.
2. Then we put together the requesting and error-handling code into a function that fetches the `url` *and* treats any non-200 status as an error. That's convenient, because we often need such logic.
3. Now `alert` shows a more helpful descriptive message.

The great thing about having our own class for errors is that we can easily check for it in error-handling code.

For instance, we can make a request, and then if we get 404 -- ask the user to modify the information.

The code below loads a user with the given name from github. If there's no such user, then it asks for the correct name:

```js run
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
*!*
      if (err instanceof HttpError && err.response.status == 404) {
*/!*
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err; // (*)
      }
    });
}

demoGithubUser();
```

Please note: `.catch` here catches all errors, but it "knows how to handle" only `HttpError 404`. In that particular case it means that there's no such user, and `.catch` just retries in that case.

For other errors, it has no idea what could go wrong. Maybe a programming error or something. So it just rethrows it in the line `(*)`.

## Unhandled rejections

What happens when an error is not handled? For instance, after the rethrow `(*)` in the example above.

Or we could just forget to append an error handler to the end of the chain, like here:

```js untrusted run refresh
new Promise(function() {
  noSuchFunction(); // Error here (no such function)
})
  .then(() => {
    // zero or many promise handlers
  }); // without .catch at the end!
```

In case of an error, the promise state becomes "rejected", and the execution should jump to the closest rejection handler. But there is no such handler in the examples above. So the error gets "stuck".

In practice, just like with a regular unhandled errors, it means that something terribly gone wrong, the script probably died.

Most JavaScript engines track such situations and generate a global error in that case. We can see it in the console.

In the browser we can catch such errors using the event `unhandledrejection`:

```js run
*!*
window.addEventListener('unhandledrejection', function(event) {
  // the event object has two special properties:
  alert(event.promise); // [object Promise] - the promise that generated the error
  alert(event.reason); // Error: Whoops! - the unhandled error object
});
*/!*

new Promise(function() {
  throw new Error("Whoops!");
}); // no catch to handle the error
```

The event is the part of the [HTML standard](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections).

If an error occurs, and there's no `.catch`, the `unhandledrejection` handler triggers, and gets the `event` object with the information about the error, so we can do something.

Usually such errors are unrecoverable, so our best way out is to inform the user about the problem and probably report the incident to the server.

In non-browser environments like Node.JS there are other similar ways to track unhandled errors.


## Summary

- `.catch` handles promise rejections of all kinds: be it a `reject()` call, or an error thrown in a handler.
- We should place `.catch` exactly in places where we want to handle errors and know how to handle them. The handler should analyze errors (custom error classes help) and rethrow unknown ones.
- It's normal not to use `.catch` if we don't know how to handle errors (all errors are unrecoverable).
- In any case we should have the `unhandledrejection` event handler (for browsers, and analogs for other environments), to track unhandled errors and inform the user (and probably our server) about the them, so that our app never "just dies".

And finally, if we have load-indication, then `.finally` is a great handler to stop it when the fetch is complete:

```js run
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

*!*
  document.body.style.opacity = 0.3; // (1) start the indication
*/!*

  return loadJson(`https://api.github.com/users/${name}`)
*!*
    .finally(() => { // (2) stop the indication
      document.body.style.opacity = '';
      return new Promise(resolve => setTimeout(resolve, 0)); // (*)
    })
*/!*
    .then(user => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```

Here on the line `(1)` we indicate loading by dimming the document. The method doesn't matter, could use any type of indication instead.

When the promise is settled, be it a successful fetch or an error, `finally` triggers at the line `(2)` and stops the indication.

There's a little browser trick `(*)` with returning a zero-timeout promise from `finally`. That's because some browsers (like Chrome) need "a bit time" outside promise handlers to paint document changes. So it ensures that the indication is visually stopped before going further on the chain.
