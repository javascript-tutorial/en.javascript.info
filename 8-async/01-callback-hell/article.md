
# Callback hell

Many things that we do in JavaScript are asynchronous. We initiate a process, but it finishes later.

The most obvious example is `setTimeout`, but there are others, like making network requests, performing animations and so on.

Let's see a couple of examples, so that we can discover a problem, and then solve it using "promises".

[cut]

## Callbacks

Remember resource load/error events? They are covered in the chapter <info:onload-onerror>.

Let's say we want to create a function `loadScript` that loads a script and executes our code afterwards.

It can look like this:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(script);

  document.head.append(script);
}
```

Now when we want to load a script and then do something, we can call:

```js
loadScript('/my/script.js', function(script) {
  alert(`Cool, the ${script.src} is loaded, let's use it`);
});
```

...And it works, shows `alert` after the script is loaded.

That is called "a callback API". Our function `loadScript` performs an asynchronous task and we can hook on its completion using the callback function.

## Callback in callback

What if we need to load two scripts: one more after the first one?

We can put another `loadScript` inside the callback, like this:

```js
loadScript('/my/script.js', function(script) {
  alert(`Cool, the ${script.src} is loaded, let's load one more`);

  loadScript('/my/script2.js', function(script) {

    alert(`Cool, the second script is loaded`);

  });

});
```

Now after the outer `loadScript` is complete, the callback initiates the inner one.

...What if we want one more script?

```js
loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

    if (something) {
      loadScript('/my/script3.js', function(script) {
*!*
        // ...continue after all scripts are loaded
*/!*
      });
    }

  })

});
```

As you can see, a new asynchronous action means one more nesting level.

## Handling errors

In this example we didn't consider errors. What if a script loading failed with an error? Our callback should be able to react on that.

Here's an improved version of `loadScript` that can handle errors:

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error ` + src));
*/!*

  document.head.append(script);
}
```

It calls `callback(null, script)` for successful load and `callback(error)` otherwise.

Usage:
```js
loadScript('/my/script.js', function(error, script) {
  if (error) {
    // handle error
  } else {
    // script loaded, go on
  }
});
```

The first argument of `callback` is reserved for errors and the second argument for the successful result. That allows to use a single function to pass both success and failure.

## Pyramid of doom

From the first look it's a viable code. And indeed it is. For one or maybe two nested calls it looks fine.

But for multiple asynchronous actions that follow one after another...

```js
loadScript('/my/script1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('/my/script2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('/my/script3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
  *!*
            // ...continue after all scripts are loaded (*)
  */!*
          }
        });

      }
    })
  }
});
```

In the code above:
1. we load `/my/script1.js`, then if there's no error
2. we load `/my/script2.js`, then if there's no error
3. we load `/my/script3.js`, then if there's no error -- do something else `(*)`.

The nested calls become increasingly more difficult to manage, especially if we add real code instead of `...`, that may include more loops, conditional statements and other usage of loaded scripts.

That's sometimes called "callback hell" or "pyramid of doom".

![](callback-hell.png)

See? It grows right with every asynchronous action.

Compare that with a "regular" synchronous code.

Just *if* `loadScript` were a regular synchronous function:

```js
try {
  // assume we get the result in a synchronous manner, without callbacks
  let script = loadScript('/my/script.js');
  // ...
  let script2 = loadScript('/my/script2.js');
  // ...
  let script3 = loadScript('/my/script3.js');
} catch(err) {
  handleError(err);
}
```

How much cleaner and simpler it is!

Promises allow to write asynchronous code in a similar way. They are really great at that. Let's study them in the next chapter.
