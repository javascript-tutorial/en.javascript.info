# External scripts

If we have a lot of JavaScript code, it can be put into a separate file. 

The script file is attached to HTML like this:

```html
<script src="/path/to/script.js"></script>
```

Here `/path/to/script.js` is an absolute path to the file with the script (from the site root).

We can give a full URL too, for instance:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js"></script>
```

It is also possible to provide a path relative to the current page. For instance,  `src="lodash.js"` means a file from the current folder.

To attach several scripts, use multiple tags:

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```

[smart]
As a rule, only simplest scripts are put into HTML. More complex ones reside in separate files.

The benefit is that the browser will download it only once, and then store in its [cache](https://en.wikipedia.org/wiki/Web_cache).

After it, other pages which want the same script will take it from the cache instead of downloading it. So the file is actually downloaded only once.

That saves traffic and makes the future pages faster.
[/smart]


[warn header="If `src` is set, the script content is ignored."]
A single `<script>` tag may not both contain an `src` and the code.

This won't work:

```html
<script *!*src*/!*="file.js">
  alert(1); // the content is ignored, because src is set
</script>
```

One needs to choose: either `<script src="…">` or `<script>` with code. The example above should be split into two scripts: with `src` and with the code.

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
[/warn]

## Asynchronous scripts: defer/async

Browser loads and shows HTML gradually as it comes. That's clearly noticeable on the slow internet connection. The browser doesn't wait for the page to load fully. It shows the part that has been loaded already, and then adds content to it as it loads.

When the browser meets a `<script>` tag, it must execute it first and after that show the rest of the page.

For example, in the code below -- until all rabbits are counted, the bottom `<p>` is not shown:

```html
<!--+ run height=100 -->
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

The question is -- do we really want that? 

Most of time, we don't.

Sometimes, the script contains a very important code that really must be loaded before the rest of the page is parsed (and the scripts below executed). But most of time we'd like to let the visitor see the content while the script is loading.

[warn header="Blocking is dangerous"]
There are situations when such blocking is even dangerous.

Let's say we attach a script from the banner system, or a 3rd-party integration code.

It's just wrong that the rest of the page is not shown until the banner system initialized. The banner is not that important.

And what if their server is overloaded and responds slowly? Our visitors will wait even more.

Here's an example of such "slow" script (the delay is artificial here):

```html
<!--+ run height=100 -->
<p>Important information below is not shown until the script loads and executes.</p>

<script src="https://en.js.cx/hello/ads.js?speed=0"></script>

<p>…Important information!</p>
```
[/warn]

So, how to "fix" the blocking behavior?

Our first attempt could be to put all such scripts to the bottom of the `<body>`, after all content. Then the browser will show the content first and then load the script. Problem gone.

But the solution is not perfect:

<ol>
<li>The script won't start loading until the whole page loads. If the page is large, then the delay may be significant. We'd like the browser to start loading a script early.</li>
<li>If there is more than one scripts at the bottom of the page, and the first script is slow, then the second one will still has wait for it. Scripts still depend one on another, that's not always welcome. Ads and counter can run independently.</li>
</ol>

And here come the attributes `async` and `defer`.

<dl>
<dt>The `async` attribute.</dt>
<dd>The script is executed asynchronously. In other words, when the browser meets `<script async src="...">`, it does not stop showing the page. It just initiates script loading and goes on. When the script loads -- it runs.</dd>
<dt>The `defer` attribute.</dt>
<dd>The script with `defer` also executes asynchronously, like async. But there are two essential differences.

First -- the browser guarantees to keep the relative order of scripts with `defer`.

For example, in the code below (with `async`) there are two scripts. The one which loads first will run first.

```html
<script src="1.js" async></script>
<script src="2.js" async></script>
```

With `async` it may happen that `2.js` will run before `1.js`. Scripts are totally independent.

And in the other code `defer` is used, which forces browser to keeps execution order. Even if `2.js` loads first, it will execute after `1.js`:

```html
<script src="1.js" defer></script>
<script src="2.js" defer></script>
```

So `defer` is used when the second script `2.js` depends on the first one `1.js`, say uses something described in the first script.

The second difference -- script with `defer` always works when the HTML-document is fully processed by the browser.

For example, when the document is large...

```html
<script src="async.js" async></script>
<script src="defer.js" defer></script>

Too long text. Didn't read. Many words.
```

...Then `async.js` executes when it runs -- possibly, before the text is fully loaded. In contrast, `defer.js` always waits for the full document to be ready.

It's great to have the choice here. Sometimes a script doesn't need the document at all (like a counter), then `async` is superb. And if we need the whole document to process it, then `defer` will work nice.
</dd>
</dl>

[smart header="`async` together with `defer`"]
We can't use both `defer` and `async` on a single script. If we do that, `defer` will be ignored.
[/smart]

[warn header="Attributes `async/defer` -- only for external scripts"]
Attribute `async/defer` work only when set on a script with `src`.

On a script without `src` like <code>&lt;script&gt;...&lt;/script&gt;</code>, they will be ignored.
[/warn]

Let's modify the "blocking script" example that we've seen before, adding `async`:

```html
<!--+ run height=100 -->
<p>Important information below is not shown until the script loads and executes.</p>

<script *!*async*/!* src="https://en.js.cx/hello/ads.js?speed=0"></script>

<p>…Important information!</p>
```

Now if we run it, we'll see that the whole document is displayed immediately, and the external script runs when it loads.

[smart header="Running ahead..."]
For an advanced reader who knows that new tags can be added on page dynamically, we'd like to note that the `<script>` tags added in such a way behave as if they have `async`.

In other words, they run as they load without an order.

If we'd like to add several `<script>` tags on the page and keep their execution order, it is possible via `script.async = false`.

Like this:
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

We'll cover page manipulation in detail later, in the second part of the tutorial.
[/smart]


## Summary

<ul>
<li>Scripts in an external file can be inserted on the page via `<script src="path"></script>`.</li>
<li>Normally, the browser doesn't show the document after the script until it executes. Unless the script has `async` or `defer` attributes.</li>
<li>Both `async` and `defer` allow the browser to start script loading and then continue to parse/show the page. They both only work on external scripts.</li>
<li>The difference is that `defer` keeps the relative script order and always executes after the document is fully loaded. In contrast, `async` script executes when it loads, without any conditions.</li>
</ul>

Most modern systems that provide scripts know about these attributes and use them.

Before inserting an external `<script>` tag, one should always check if it should block the page or not. Especially if it's a 3rd-party script. And if not, then `defer/async` can come in handy.


