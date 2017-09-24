
# Polyfills

The JavaScript language steadily evolves. New proposals to the language appear regularly, they are analyzed and, if considered worthy, are appended to the list at <https://tc39.github.io/ecma262/> and then progress to the [specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm).

Teams behind JavaScript engines have their own ideas about what to implement first. They may decide to implement proposals that are in draft and postpone things that are already in the spec, because they are less interesting or just harder to do.

So it's quite common for an engine to implement only the part of the standard.

A good page to see the current state of support for language features is <https://kangax.github.io/compat-table/es6/> (it's big, we have a lot to study yet).

## Babel

When we use modern features of the language, some engines may fail to support such code. Just as said, not all features are implemented everywhere.

Here Babel comes to the rescue.

[Babel](https://babeljs.io) is a [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler). It rewrites modern JavaScript code into the previous standard.

Actually, there are two parts in Babel:

1. First, the transpiler program, which rewrites the code. The developer runs it on his own computer. It rewrites the code into the older standard. And then the code is delivered to the website for users. Modern project build system like [webpack](http://webpack.github.io/) or [brunch](http://brunch.io/) provide means to run transpiler automatically on every code change, so that doesn't involve any time loss from our side.

2. Second, the polyfill.

    The transpiler rewrites the code, so syntax features are covered. But for new functions we need to write a special script that implements them. JavaScript is a highly dynamic language, scripts may not just add new functions, but also modify built-in ones, so that they behave according to the modern standard.

    There's a term "polyfill" for scripts that "fill in" the gap and add missing implementations.

    Two interesting polyfills are:
    - [babel polyfill](https://babeljs.io/docs/usage/polyfill/) that supports a lot, but is big.
    - [polyfill.io](http://polyfill.io) service that allows to load/construct polyfills on-demand, depending on the features we need.

So, we need to setup the transpiler and add the polyfill for old engines to support modern features.

If we orient towards modern engines and do not use features except those supported everywhere, then we don't need to use Babel.

## Examples in the tutorial


````online
Most examples are runnable at-place, like this:

```js run
alert('Press the "Play" button in the upper-right corner to run');
```

Examples that use modern JS will work only if your browser supports it.
````

```offline
As you're reading the offline version, examples are not runnable. But they usually work :)
```

[Chrome Canary](https://www.google.com/chrome/browser/canary.html) is good for all examples, but other modern browsers are mostly fine too.

Note that on production we can use Babel to translate the code into suitable for less recent browsers, so there will be no such limitation, the code will run everywhere.
