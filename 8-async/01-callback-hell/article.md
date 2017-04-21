
# Callback hell


Consider this function `loadScript(src)` that loads a script:

```js
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```

When the script element is added to the document, the browser loads it and executes. So, the function works.

We can use it like this:

```js
// loads and executes the script
loadScript('/my/script.js');
```

The function is *asynchronous*: the script starts loading now, but finishes later.

"Synchonous" and "asynchronous" are general programming terms, not specific to JavaScript.

A *synchronous* action suspends the execution until it's completed. For instance, a call to `alert` or `prompt` is synchronous: the program may not continue until it's finished.

```js
let age = prompt("How old are you", 20);
// the execution of the code below awaits for the prompt to finish
```

An *asynchronous* action allows the program to continue while it's in progress. For instance, a call to `loadScript` is asynchronous. It initiates the script loading, but does not suspend the execution. Other commands may execute while the script is loading:

```js
loadScript('/my/script.js');
// the execution does not wait for the script loading to finish,
// it just goes on
```

As of now, `loadScript` provides no way to track the load completion. The script loads and eventually runs.

Let's add a `callback` function as a second argument to `loadScript`, that should execute at when the script is loaded.

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(script);

  document.head.append(script);
}
```

Now we're able to load a script and run our code that can use new functions from it, like here:

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

*!*
loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', function(script) {
  alert(`Cool, the ${script.src} is loaded`);
  alert( _ ); // function declared in the loaded script
});
*/!*
```

That's called a "callback style" of asynchronous programming. A function that does something asynchronously provides a callback argument where we put the code to run after it's complete.

## Callback in callback

What if we need to load two scripts sequentially: the first one, and then the second one after it?

We can put the second `loadScript` inside the callback, like this:

```js
loadScript('/my/script.js', function(script) {

  alert(`Cool, the ${script.src} is loaded, let's load one more`);

*!*
  loadScript('/my/script2.js', function(script) {
    alert(`Cool, the second script is loaded`);
  });
*/!*

});
```

Now after the outer `loadScript` is complete, the callback initiates the inner one.

...What if we want one more script?

```js
loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

*!*
    loadScript('/my/script3.js', function(script) {
      // ...continue after all scripts are loaded
    });
*/!*

  })

});
```

As we can see, a new asynchronous action means one more nesting level. So the code becomes deeper and deeper.

## Handling errors

In examples above we didn't consider errors. What if a script loading failed with an error? Our callback should be able to react on that.

Here's an improved version of `loadScript` that tracks loading errors:

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
    // script loaded successfully
  }
});
```

The convention is:
1. The first argument of `callback` is reserved for an error if it occurs.
2. The second argument (and successive ones if needed) are for the successful result.

So the single `callback` function is used both for reporting errors and passing back results.

## Pyramid of doom

From the first look it's a viable way of asynchronous coding. And indeed it is. For one or maybe two nested calls it looks fine.

But for multiple asynchronous actions that follow one after another we'll have a code like this:

```js
loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
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
1. We load `1.js`, then if there's no error.
2. We load `2.js`, then if there's no error.
3. We load `3.js`, then if there's no error -- do something else `(*)`.

As calls become more nested, the whole thing becomes increasingly more difficult to manage, especially if we add real code instead of `...`, that may include more loops, conditional statements and other usage of loaded scripts.

That's sometimes called "callback hell" or "pyramid of doom".

![](callback-hell.png)

The pyramid grows to the right with every asynchronous action. Soon it spirales out of control.

In simple cases we can evade the problem by making every action a standalone function, like this:

```js
loadScript('1.js', step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('3.js', step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...continue after all scripts are loaded (*)
  }
};
```

See? There's no deep nesting now, because we moved every function to the top. But the code looks like a torn apart spreadsheet. We need to eye-jump between pieces while reading it. The functions `step*` have no use, they are only created to evade the "pyramid of doom".

Luckily, there are other ways to evade such pyramids. Most modern code makes use of "promises", we'll study them in the next chapter.
