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

**If the script is external, then until the browser executes it, it can't show the page below.**

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

The question is -- do we really want to hide the body until the script finishes?

Most of time, we don't.

Sometimes, a script may contain a very important code that really must be loaded before the rest of the page is parsed (and the scripts below executed). But that's an exception.

Usually it's ok that a visitor can see the page content while the script is loading.

````warn header="Blocking is dangerous"
There are situations when such blocking is even dangerous.

Let's say we attach a script from the banner system, or a 3rd-party integration code.

Like this:

```html
Information below is not shown until the script loads and executes.

<script src="https://ad.service/path/to/banner"></script>

<p>…Important information!</p>
```

It's just wrong that the rest of the page is not shown until the banner is loaded. The banner is not that important.

And what if their server is overloaded and responds slowly? Our visitors will wait even more.

Here's an example of such "slow" script (the delay is artificial here):

```html run height=100
Wait. The text belown will shown up only after the script executes.

<script src="/article/external-script/banner.js?speed=0"></script>

<p>…Important information!</p>
```
````

So, how to "fix" the blocking behavior?

Our first attempt could be to put all such scripts to the bottom of the `<body>`, after all content. Then the browser will show the content first and then load the script. Problem gone.

But the solution is not perfect:

1. The script won't start loading until the whole page loads. If the page is large, then the delay may be significant. We'd like the browser to start loading a script early, but still do not block the page.
2. If there is more than one script at the bottom of the page, and the first script is slow, then the second one will have to wait for it. Browser executes only one `<script>` tag in one moment. So scripts queue one after another. That's not always welcome: ads and counter should run independently.

And here come the attributes `async` and `defer`.

The `async` attribute.
: The script is executed asynchronously. In other words, when the browser meets `<script async src="...">`, it does not stop showing the page. It just initiates script loading and goes on. When the script loads -- it runs.

The `defer` attribute.
<dd>The script with `defer` also executes asynchronously, like async. But there are two essential differences:

1. The browser guarantees to keep the relative order of "deferred" scripts.
2. A "deferred" script always executes after HTML-document is fully loaded.

We'll discuss them more in-depth further in this chapter.

```smart header="`async` together with `defer`"
We can't use both `defer` and `async` on a single script. If we do that, `defer` will be ignored.
```

```warn header="Attributes `async/defer` -- only for external scripts"
Attribute `async/defer` work only when set on a script with `src`.

On a script without `src` like <code>&lt;script&gt;...&lt;/script&gt;</code>, they will be ignored.
```

Let's modify the "blocking script" example that we've seen before, adding `async`:

```html run height=100
Wait. The text belown will shown up only after the script executes.

<script *!*async*/!* src="/article/external-script/banner.js?speed=0"></script>

<p>…Important information!</p>
```

Now if we run it, we'll see that the whole document is displayed immediately, and the external script runs when it loads.

## Defer vs Async: order

Let's discuss these differences in more detail.

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

## Defer vs Async: page

A script with `defer` always works when the HTML-document is fully processed by the browser.

That feature comes into play when the document is large, like:

```html
<script src="async.js" async></script>
<script src="defer.js" defer></script>

Too long text. Didn't read. Many words.
...
```

...Here `async.js` executes when it loads -- possibly, before the document is fully loaded.

In contrast, `defer.js` always waits for the full document to be ready.

The choice between `defer` and `async` here depends on our intentions. Sometimes a script doesn't need the document at all (like a counter), it should execute ASAP. In this case `async` is superb.

And in another case a script may need the whole document to do some work with it. Then `defer` is preferable.

## Summary

- Scripts in an external file can be inserted on the page via `<script src="path"></script>`.
- Normally, the browser doesn't show the document after the script until it executes. Unless the script has `async` or `defer` attributes.
- Both `async` and `defer` allow the browser to start script loading and then continue to parse/show the page. They only work on external scripts.
- The difference is that `defer` keeps the relative script order and always executes after the document is fully loaded. In contrast, `async` script executes when it loads, without any conditions.

Before inserting an external `<script src="…">` tag, we should always consider the side-effect of blocking the page rendering. Especially if it's a 3rd-party script. And if we don't want that, then `defer/async` can come in handy.

````smart header="Running ahead..."
For an advanced reader who knows that new tags can be added on page dynamically, we'd like to note that dynamic `<script>` tags behave as if they have `async` by default.

In other words, they run as they load without an order.

We can ensure that dynamic `<script>` tags run in the order of insertion by setting `script.async` to `false`.

The code example:
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

We'll cover page dynamic tags and page manipulation in detail later, in the second part of the tutorial.
````

