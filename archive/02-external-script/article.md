# External scripts

If we have a lot of JavaScript code, we can it put it into a separate file.

The script file is attached to HTML like this:

```html
<script src="/path/to/script.js"></script>
```

Here `/path/to/script.js` is an absolute path to the file with the script (from the site root).

It is also possible to provide a path relative to the current page. For instance, `src="script.js"` would mean a file `"script.js"` from the current folder.

We can give a full URL al well, for instance:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"></script>
```

To attach several scripts, use multiple tags:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

```smart
As a rule, only simplest scripts are put into HTML. More complex ones reside in separate files.

The benefit of a separate file is that the browser will download it and then store in its [cache](https://en.wikipedia.org/wiki/Web_cache).

After it, other pages which want the same script will take it from the cache instead of downloading it. So the file is actually downloaded only once.

That saves traffic and makes pages faster.
```

````warn header="If `src` is set, the script content is ignored."
A single `<script>` tag may not have both an `src` and the code inside.

This won't work:

```html
<script *!*src*/!*="file.js">
  alert(1); // the content is ignored, because src is set
</script>
```

We must choose: either it's an external `<script src="…">` or a regular `<script>` with code.

The example above can be split into two scripts to work:

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
````

## Asynchronous scripts: defer/async

Browser loads and shows HTML gradually as it comes. That's clearly noticeable on the slow internet connection. The browser doesn't wait for the page to load fully. It shows the part that has been loaded already, and then adds content to it as it loads.

As we noted before, when the browser meets a `<script>` tag, it must execute it first and after that show the rest of the page.

For example, in the code below -- until all rabbits are counted, the bottom `<p>` is not shown:

```html run height=100
<!DOCTYPE HTML>
<html>
<body>

  <p>Let's count:</p>

*!*
  <script>
    alert( 'The 1st rabbit!' );
    alert( 'The 2nd rabbit!' );
    alert( 'The 3rd rabbit!' );
  </script>
*/!*

  <p>Rabbits counted!</p>

</body>
</html>
```

The behavior is called "synchronous". Usually it causes no problems, but there's an important consequence.

**If a script is external, then until the browser downloads and executes it, a visitor has to wait.**

So, in this document, until `big.js` loads and executes, the `<body>` content is hidden:

```html
<html>
<head>
*!*
  <script src="big.js"></script>
*/!*
</head>
<body>
  This text is not shown until the browser executes big.js.
</body>
</html>
```

The question is -- do we really want the visitor to wait until the script finishes?

Most of time, we don't.

Sometimes, a script may contain a very important code that really must be loaded before the rest of the page is parsed (and the scripts below executed). But that's only sometimes.

Usually a visitor should be able to see the page while the script is loading. That's especially true for sites with an important content (like the tutorial) -- even if some interfaces are yet inactive (scripts not loaded yet), the visitor can read the text and navigate.

There are situations when such blocking is even dangerous. For example, when we attach a script from the banner system, or a 3rd-party integration code.

Like this:

```html run height=100
Wait. The text below will shown up only after the script executes.

<!-- this banner script takes time to load -->
<script src="/article/external-script/banner.js?speed=0"></script>

<p>…Important information!</p>
```

It's just wrong that the rest of the page is not shown until the banner is loaded. And what if their server is overloaded and responds slowly? Our visitors will have wait even more, maybe even leave for  another, faster site.

So, how to "fix" the blocking behavior?

Our first attempt could be to put all such scripts to the bottom of the `<body>`, after all content.

But the solution is not perfect:

1. The script won't start loading until the HTML loads. If the HTML is large, then the delay may be significant. We'd like the browser to start loading a script early, but still do not block the page.
2. If there are many scripts at the bottom of the page, then they queue up. Browser executes only one `<script>` tag in one moment. Please note that it tries to downloads scripts in parallel (for better network utilization), but the execution order is still strictly one after another. So, the first script can block the rest if it's slow. That's not always welcome: some scripts, like ads and web analytics scripts should run independantly and immediately as they load, not block each other. 

And here come the attributes `async` and `defer`.

The `async` attribute.
: The script is executed asynchronously. In other words, when the browser meets `<script async src="...">`, it does not stop showing the page. It just initiates script loading and goes on. When the script loads -- it runs.

The `defer` attribute.
: The script with `defer` also executes asynchronously, like async. But there are two essential differences:

1. The browser guarantees to keep the relative order of "deferred" scripts.
2. A "deferred" script always executes after the HTML-document is fully loaded.


Let's modify the "blocking script" example that we've seen before, adding `async`:

```html run height=100
Wait. The text belown will shown up only after the script executes.

<!-- This banner script take some time to load... But nobody cares. -->
<script *!*async*/!* src="/article/external-script/banner.js?speed=0"></script>

<p>…Important information!</p>
```

Now if we run it, we'll see that the whole document is displayed immediately, and the external script runs when it loads.

Let's see more examples with `defer` and `async` to clearly understand the similarities and the differences.

Both attributes allow the browser to show the page without waiting for the script to load. But...

1. Deferred scripts keep the relative order, while async scripts do not.

    For example, in the code below (with `async`) there are two scripts. The one which loads first will run first.

    ```html
    <script src="1.js" async></script>
    <script src="2.js" async></script>
    ```

    If `2.js` is bigger than `1.js`, it may happen that `2.js` will run before `1.js`. That's normal. Async scripts are totally independent.

    And in the code below `defer` is used, which forces browser to keeps execution order. Even if `2.js` loads first, it waits and executes after `1.js`:

    ```html
    <script src="1.js" defer></script>
    <script src="2.js" defer></script>
    ```

    This feature of "deferred" scripts is important when `2.js` relies on the result of `1.js` and we must be sure that the order is determined.

2. A script with `defer` always waits for the HTML-document to fully load. The `async` script runs immediately as it loads.

    For instance, when the document is large, like:

    ```html
    <script src="async.js" async></script>
    <script src="defer.js" defer></script>

    A long long text. Many words.
    ...
    ```

    ...Here `async.js` executes when it loads -- possibly, before the document is fully loaded. In contrast, `defer.js` always waits for the full document to be ready.

    So, if a script doesn't need the rest of the document (like a web counter), then `async` is superb. And in another case a script may need the whole document to do some work with it. Then `defer` is preferable.


```smart header="Either `async` or `defer`"
We can't use both `defer` and `async` on a single script. If we do that, `async` takes precedence, `defer` is ignored.
```

```warn header="Attributes `async/defer` are only for external scripts"
The attributes `async/defer` work only when set on a script with `src`.

On a script without `src` like <code>&lt;script&gt;...&lt;/script&gt;</code>, they will be ignored.
```


## Summary

- Scripts in an external file can be inserted on the page via `<script src="path"></script>`.
- The browser doesn't show the content below the script until it executes. Unless the script has `async` or `defer` attributes.
- Both `async` and `defer` allow the browser to start script loading and then continue to parse/show the page. They only work on external scripts.
- The difference is that `defer` keeps the relative script order and always executes after the document is fully loaded. In contrast, `async` script executes when it loads, without any conditions.

Before inserting an external `<script src="…">` tag, we should always consider the side-effect of blocking the page rendering. Especially if it's a 3rd-party script. And if we don't want that, then `defer/async` can come in handy.

````smart header="Running ahead..."
For an advanced reader who already knows how to add new tags on the page using DOM: dynamic `<script>` tags behave as `async`. In other words, they run as they load, independantly.

But we can adjust that. If we set `script.async = false`, then such scripts are run in the load of insertion. That's a way to keep the relative order for dynamically added tags.

For example:
```js
function addScript(src){
  let script = document.createElement('script');
  script.src = src;
*!*
  script.async = false;
*/!*
  document.head.appendChild(script);
}

addScript('1.js'); // all these scripts will start loading immediately
addScript('2.js'); // but execute in the order of insertion
addScript('3.js'); // that is: 1 -> 2 -> 3
```

We'll surely cover dynamic tags and page manipulation in detail later, in the second part of the tutorial.
````

