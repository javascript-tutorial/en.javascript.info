
# Embrace the future!

The JavaScript language steadily evolves. The new proposals get analyzed and, if they look worthy, are appended to the list at <https://tc39.github.io/ecma262/> and then progress to the [specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm).

It's quite common for an engine to implement only the part of the standard. Each engine has its own idea about what to implement first. It may implement proposals that are not approved yet and fail to implement things that are already in the spec, because they are less interesting or just harder to do. 

A good page to see the current state of support for language features is <https://kangax.github.io/compat-table/es6/> (remember the link to use in the future when you know the language).

We are going to learn the most up-to-date JavaScript.

## Babel.JS

...But when we use all the modern features of the language, some engines may fail to support such code.

Here comes Babel.JS.

[Babel.JS](https://babeljs.io) is a [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler). It rewrites the modern JavaScript code into the previous standard.

Actually, there are two parts in Babel:

1. The transpiler program, which rewrites the code.

    The transpiler runs on a developer's computer. It rewrites the code, which is then bundled by a project build system (like [webpack](http://webpack.github.io/) or [brunch](http://brunch.io/)). Most build systems can support Babel easily.

2. The polyfill.

    For some functions we also need add a special script that should run before our scripts and  introduce modern functions that the engine may not support by itself. There's a term "polyfill" for such scripts. 

    The two interesting variants are [babel polyfill](https://babeljs.io/docs/usage/polyfill/) that supports a lot, but is big and the [polyfill.io](http://polyfill.io) service that allows to load/construct polyfills on-demand, depending on the features we need. 

The transpiler and/or polyfill may be not needed if we orient towards more-or-less modern engines and don't use rarely supported features.

## Examples in the tutorial

```warn header="Browser support is required"
Examples that use modern JS will work only if your browser supports it.
```

````online
Most examples are runnable at-place, like here:

```js run
alert('Press the "Play" button in the upper-right corner to run');
```

...But if it uses a feature that your browser does not support, an error is shown.

That doesn't mean that the example is wrong! It's just the browser lacking the support for certain features yet.
````

[Chrome Canary](https://www.google.com/chrome/browser/canary.html) is good for more examples.

Note that on production we can use Babel to translate the code into suitable for less recent browsers, so there will be no such limitation, the code will run everywhere.

Now we can go coding, so let's choose a good code editor.

