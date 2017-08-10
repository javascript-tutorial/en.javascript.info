# Hello, world!

The tutorial that you're reading is about core JavaScript, which is platform-independent. Further on, you will learn Node.JS and other platforms that use it.

But, we need a working environment to run our scripts, and, just because this book is online, the browser is a good choice. We'll keep the amount of browser-specific commands (like `alert`) to a minimum, so that you don't spend time on them if you plan to concentrate on another environment like Node.JS. On the other hand, browser details are explained in detail in the [next part](/ui) of the tutorial.

So first, let's see how to attach a script to a webpage. For server-side environments, you can just execute it with a command like `"node my.js"` for Node.JS.


[cut]

## The "script" tag

JavaScript programs can be inserted in any part of an HTML document with the help of the `<script>` tag.

For instance:

```html run height=100
<!DOCTYPE HTML>
<html>

<body>

  <p>Before the script...</p>

*!*
  <script>
    alert( 'Hello, world!' );
  </script>
*/!*

  <p>...After the script.</p>

</body>

</html>
```

```online
You can run the example by clicking on the "Play" button in its right-top corner.
```

The `<script>` tag contains JavaScript code which is automatically executed when the browser meets the tag.


## The modern markup

The `<script>` tag has a few attributes that are rarely used nowadays, but we can find them in old code:

 The `type` attribute: <code>&lt;script <u>type</u>=...&gt;</code>

 : The old standard HTML4 required a script to have a type. Usually it was `type="text/javascript"`. The modern HTML standard assumes this `type` by default. No attribute is required.

 The `language` attribute: <code>&lt;script <u>language</u>=...&gt;</code>
  : This attribute was meant to show the language of the script. As of now, this attribute makes no sense, the language is JavaScript by default. No need to use it.

Comments before and after scripts.
: In really ancient books and guides, one may find comments inside `<script>`, like this:

    ```html no-beautify
    <script type="text/javascript"><!--
        ...
    //--></script>
    ```

    These comments were supposed to hide the code from an old browser that didn't know about a `<script>` tag. But all browsers born in the past 15+ years don't have any issues. We mention it here, because such comments serve as a sign. If you see that somewhere -- that code is probably really old and not worth looking into.


## External scripts

If we have a lot of JavaScript code, we can put it into a separate file.

The script file is attached to HTML with the `src` attribute:

```html
<script src="/path/to/script.js"></script>
```

Here `/path/to/script.js` is an absolute path to the file with the script (from the site root).

It is also possible to provide a path relative to the current page. For instance, `src="script.js"` would mean a file `"script.js"` in the current folder.

We can give a full URL as well, for instance:

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
As a rule, only the simplest scripts are put into HTML. More complex ones reside in separate files.

The benefit of a separate file is that the browser will download it and then store in its [cache](https://en.wikipedia.org/wiki/Web_cache).

After this, other pages that want the same script will take it from the cache instead of downloading it. So the file is actually downloaded only once.

That saves traffic and makes pages faster.
```

````warn header="If `src` is set, the script content is ignored."
A single `<script>` tag can't have both the `src` attribute and the code inside.

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

## Summary

- We can use a `<script>` tag to add JavaScript code to the page.
- The `type` and `language` attributes are not required.
- A script in an external file can be inserted with `<script src="path/to/script.js"></script>`.


There is much more to learn about browser scripts and their interaction with the web-page. But let's keep in mind that this part of the tutorial is devoted to the JavaScript language, so we shouldn't distract ourselves from it. We'll be using a browser as a way to run JavaScript, which is very convenient for online reading, but yet one of many.
