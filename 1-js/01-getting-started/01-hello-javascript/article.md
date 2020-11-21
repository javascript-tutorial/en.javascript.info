# Hello, JavaScript!

The programs in JavaScript are called *scripts*. They can be embedded right into HTML using `<script>` tag and run automatically as the page loads.

For example, this HTML-page shows the "Hello" message:

```html run
<!doctype html>
<script>
  alert("Hello, world!");
</script>
```

JavaScript can execute not only in a browser, but also on a server, or actually on any device that has a special program called [the JavaScript engine](https://en.wikipedia.org/wiki/JavaScript_engine). 

Browsers have built-in JavaScript engines, so they can run scripts.

We can also run scripts using [Node.js](https://nodejs.org), it's commonly used to build server-side applications.

Depending on the environment, JavaScript may provide platform-specific functionality.

- In a web browser, JavaScript can manipulate the web-page, send network requests, show messages and so on.  
- In node.js we can use JavaScript to run a web-server, read and write arbitrary files.
- ...And so on. 

Technically, even a coffee machine can include its own JavaScript engine, to allow programming of coffee recipes.

![](javascript-engine.svg)

**In this tutorial we concentrate on the "core JavaScript", that's the same everywhere.**

We'll try to keep browser-specific notes at minimum. After you learn the core, you can go in any direction: browsers, frameworks, servers and so on.

Turn the page to start learning JavaScript!
