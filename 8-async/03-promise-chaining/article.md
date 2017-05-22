
# Promises chaining

Let's return to the problem mentioned in the chapter <info:callbacks>:

- We have a sequence of asynchronous tasks to be done one after another. For instance, loading scripts.
- How to code it well?

Promises provide a couple of recipes to do that.

[cut]

In this chapter we cover promise chaining.

It looks like this:

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});
```

The idea is that the result is passed through the chain of `.then` handlers.

Here the flow is:
1. The initial promise resolves in 1 second `(*)`,
2. Then the `.this` handler is called `(**)`.
3. The value that it returns is passed to the next `.this` handler `(***)`
4. ...and so on.

As the result is passed along the chain of handlers, we can see a sequence of `alert` calls: `1` -> `2` -> `4`.

![](promise-then-chain.png)

The whole thing works, because a call to `promise.then` returns a promise, so that we can call next `.then` on it.

When a handler returns a value, it becomes the result of that promise, so the next `.then` is called with it.

To make things clear, here's the start of the chain:

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1
  return result * 2; // (1)

}) // <-- (2)
```

The value returned by `.then` is a promise, so we can add another `.then` at `(2)`. When the value is returned in `(1)`, that promise becomes resolved, so the next handler triggers with it.

Unlike the chaining, technically we can also add many `.then` to a single promise, like this:

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});
```

...But that's a totally different thing. Here's the picture (compare it with the chaining above):

![](promise-then-many.png)

All `.then` on the same promise get the same result -- the result of that promise. So in the code above all `alert` show the same: `1`. There is no result-passing between them.

In practice we rarely need multiple handlers for one promise. Chaining is used much more often.

## Returning promises

Normally, a value returned by a `.then` handler is immediately passed to the next handler. But there's an exception.

If the returned value is a promise, then the further execution is suspended until it settles. And then the result of that promise is given to the next `.then` handler.

For instance:

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1

*!*
  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });
*/!*

}).then(function(result) { // (**)

  alert(result); // 2

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) {

  alert(result); // 4

});
```

Here the first `.then` shows `1` returns `new Promise(…)` in the line `(*)`. After one second it resolves, and the result is passed on to handler of the second `.then` in the line `(**)`, that shows `2` and so on.

So the output is again 1 -> 2 > 4, but now with 1 second delay between `alert` calls.

Returning promises allows us to build chains of asynchronous actions.

## Example: loadScript

Let's use this feature with `loadScript` to load scripts one by one, in sequence:

```js run
loadScript("/article/promise-chaining/one.js")
  .then(function(script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function(script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function(script) {
    // use functions declared in scripts
    // to show that they indeed loaded
    one();
    two();
    three();
  });
```

Here each `loadScript` call returns a promise, and the next `.then` runs when it resolves. Then it initiates the loading of the next script. So scripts are loaded one after another.

We can add more asynchronous actions to the chain. Please note that code is still "flat", it grows down, not to the right. There are no signs of "pyramid of doom".

Please note that technically it is also possible to write `.then` directly after each promise, without returning them, like this:

```js run
loadScript("/article/promise-chaining/one.js").then(function(script1) {
  loadScript("/article/promise-chaining/two.js").then(function(script2) {
    loadScript("/article/promise-chaining/three.js").then(function(script3) {
      // this function has access to variables script1, script2 and script3 (*)
      one();
      two();
      three();
    });
  });
});
```

This code does the same: loads 3 scripts in sequence. But it "grows to the right". So we have the same problem as with callbacks. Use chaining (return promises from `.then`) to evade it.

Sometimes it's ok to write `.then` directly, because the nested function has access to the outer scope `(*)`, but that's an exception rather than a rule.

## Bigger example: fetch

In frontend programming promises are often used for network requests. So let's make an example of that.

We'll use the [fetch](mdn:api/WindowOrWorkerGlobalScope/fetch) method to load the information about the user from the remote server. The method is quite complex, it has many optional parameters, but the basic usage is quite simple:

```js
let promise = fetch(url);
```

Makes a network request to the `url` and returns a promise. The promise resolves with a `response` object when the remote server responds with headers, but before the full response is downloaded.

To read the full response, we should call a method `response.text()`: it returns a promise that resolves with the full response text when it's downloaded from the remote server.

The code below makes a request to `user.json` and then loads it as text from the server:

```js run
fetch('/article/promise-chaining/user.json')
  // .then runs when the remote server responds
  .then(function(response) {
    // response.text() is the new promise that resolves when the server finishes sending data
    return response.text();
  })
  .then(function(text) {
    // ...and here's the content of the remote file
    alert(text); // {"name": "iliakan", isAdmin: true}
  });
```

There is also a method `response.json()` that reads the remote data and parses it as JSON. In our case that's even more convenient.

We'll also use arrow functions for brevity:

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => alert(user.name)); // iliakan
```

Now let's do something with it. For instance, we can make one more request to github, load the user profile and show its avatar:

```js run
// 1. Make a request for user.json
fetch('/article/promise-chaining/user.json')
  // Load it as json
  .then(response => response.json())
  // Make a request to github
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  // Load the response as json
  .then(response => response.json())
  // Show the avatar image (githubUser.avatar_url) for 3 seconds (maybe animate it)
  .then(githubUser => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => img.remove(), 3000); // (*)
  });
```

Now it works. But there's a potential problem in the code.

Look at the line `(*)`: how can we do something *after* the avatar is removed? For instance, we'd like to show a form for editing that user or something else.

To make the chain extendable, we need to return a promise that resolves when the avatar finishes showing.

Here's how:

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
*!*
  .then(githubUser => new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
  */!*
  // triggers after 3 seconds
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
```

An async action should always return a promise. That makes possible to plan actions after it.

Finally, we can split it into reusable functions:

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => response.json());
}

function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`)
    .then(response => response.json());
}

function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

loadJson('/article/promise-chaining/user.json')
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
  // ...
```

Now when `setTimeout` runs the function, it calls `resolve(githubUser)`, thus passing the control to the next `.then` in the chain and passing forward the user data.

Here we assumed that everything works as intended. But that's not always the case. In the next chapter we'll talk about error handling.
