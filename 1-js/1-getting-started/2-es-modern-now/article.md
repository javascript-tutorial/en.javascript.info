
# Using the latest features now 

The [latest standard](http://www.ecma-international.org/publications/standards/Ecma-262.htm) was approved in June 2015.

As it includes a lot of new features, most browsers implement them partially. You can find the current state of the support at [](https://kangax.github.io/compat-table/es6/).

If a project is developed for a single JavaScript engine, like V8 (Node.JS, Chrome), then we can use V8-supported features. That's a lot.

But what if we're writing a cross-browser application? Different browsers support different subsets of ES-2015. 

Here comes Babel.JS.

## Babel.JS

[Babel.JS](https://babeljs.io) is a [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler). It rewrites the modern JavaScript code into the previous standard.

Actually, there are two parts in Babel:

<ol>
<li>The transpiler program, which rewrites the code. 

The transpiler runs on a developer's computer. It rewrites the code, which is then bundled by a project build system (like [webpack](http://webpack.github.io/) or [brunch](http://brunch.io/)). Most build systems can support Babel easily. One just needs to setup the build system itself.</li>
<li>JavaScript library.

An additional JavaScript library with modern JavaScript functions for the browsers that do not have them built-in (yet). The library must be attached to each webpage which relies on these functions.</li>
</ol>

There is a special "play" mode of Babel.JS which merges both parts in a single in-browser script.

The usage looks like this:

```html
<!--+ run -->
*!*
<!-- browser.js is on my server please don't hotlink -->
<script src="https://en.js.cx/babel-core/browser.min.js"></script>
*/!*

<script type="text/babel">
  let arr = ["hello", 2]; 

  let [str, times] = arr; 

  alert( str.repeat(times) ); // hellohello
</script>
```

Script `browser.min.js` is attached to the top of the page. It automatically transpiles and runs the scripts with `type="text/babel"`.

The size of `browser.min.js` is above 1 megabyte, because it includes the transpiler. Hence such usage is only for "playing" and not recommended for production.

Also:
<ul>
<li>There is a "try it" page on [](https://babeljs.io/repl/) which allows to run snippets of code.</li>
<li>[JSBin](http://jsbin.com) allows to use "ES6/Babel" mode for JS, see [this snippet](http://jsbin.com/daxihelolo/edit?js,output) as an example.</li>
</ul>

# Examples on this site

[warn header="Browser support is required"]
Examples that use ES-2015 will work only if your browser supports it.
[/warn]

Sometimes it means that when running an example in a non-supporting browser, an error is shown.

That doesn't mean that the example is wrong! It's just the browser lacking the support for certain features yet.

[Chrome Canary](https://www.google.com/chrome/browser/canary.html) is recommended, most examples work in it.

[Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/channel/#developer) is fine too, but it has certain glitches. Like: [let](/let-const) variables working only with when the script type contains `version=1.7` or `1.8`: `<script type="application/javascript;version=1.7">`. Most other browsers do not understand such script type. This site uses a special trick to workaround.

And in any case you can go [Babel: try it out](https://babeljs.io/repl/) page and run the example there!

On production everyone's using Babel anyway.

Once again, let's note that the most up-to-date situation with support is reflected on [](https://kangax.github.io/compat-table/es6/).

Now we can go coding, but we need a good code editor for that, right? That is discussed in the next session.

