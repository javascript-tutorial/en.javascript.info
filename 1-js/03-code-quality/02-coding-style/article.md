# Coding style

Our code must be as clean and easy to read as possible.

That is actually an art of programming -- to take a complex task and code it in a way that is both correct and human-readable.

One thing to help is the good code style.

[cut]

## Syntax

A cheatsheet with the rules (more details below):

![](code-style.png)
<!--
```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`Power ${n} is not supported,
    please enter an integer number, greater than 0`);
} else {
  alert( pow(x, n) );
}
```

-->

Nothing is "carved in stone" here, so let's discuss the rules in detail.

### Figure brackets

In most JavaScript projects figure brackets are written on the same line. A so-called "egyptian" style. There's also a space before an opening bracket.

A corner-case if a single-line `if/for`. Should we use brackets at all? If yes, then where?

Here are the annotated variants, so you can judge about their readability on your own:

<!--
```js no-beautify
if (n < 0) {alert(`Power ${n} is not supported`);}

if (n < 0) alert(`Power ${n} is not supported`);

if (n < 0)
  alert(`Power ${n} is not supported`);

if (n < 0) {
  alert(`Power ${n} is not supported`);
}
```
-->
![](figure-bracket-style.png)

As a summary, for a really short code one line is acceptable: like `if (cond) return null`.

But a separate line for each statement in brackets is usually better.

### Line length

The maximal line length should be limited. No one likes to eye-follow a long horizontal line. It's better to split it.

The maximal line length is agreed on the team-level. It's usually 80 or 120 characters.

### Indents

There are two types of indents:

- **A horizontal indent: 2(4) spaces.**

    A horizantal identation is made using either 2 or 4 spaces or the "Tab" symbol. Which one to choose is a kind of an old holy war. Spaces are a little more common nowadays.

    One of advantages of spaces over tabs is that they allow more flexible configurations of indents than the "Tab" symbol.

    For instance, we can align the arguments with the opening bracket, like this:

    ```js no-beautify
    show(parameters,
         aligned, // 5 spaces padding at the left  
         one,
         after,
         another
      ) {
      // ...
    }
    ```

- **A vertical indent, line breaks for splitting the code in logical blocks.**

    Even a single function can often be divided in logical blocks. In the example below, the initialization of variables, the main loop and returning the result are split vertically:

    ```js
    function pow(x, n) {
      let result = 1;
      //              <--
      for (let i = 0; i < n; i++) {
        result *= x;
      }
      //              <--
      return result;
    }
    ```

    Insert an additional line break where it helps to make the code more readable. There should not be more than 9 lines of code without a vertical indentation.

### A semicolon

A semicolons should be after each statement. Even if could possibly be skipped.

There are languages where a semicolon is truly optional. It's rarely used there.

But in JavaScript a line break is sometimes interpreted as a semicolon and sometimes not. That leaves a place for programming errors, so semicolons should be at place.

### Nesting levels

There should not be too many nesting levels.

Sometimes it's a good idea to use the ["continue"](info:while-for#continue) directive in the loop to evade extra nesting in `if(..) { ... }`:

Instead of:

```js
for (let i = 0; i < 10; i++) {
  if (cond) {
    ... // <- one more nesting level
  }
}
```

We can write:

```js
for (let i = 0; i < 10; i++) {
  if (!cond) *!*continue*/!*;
  ...  // <- no extra nesting level
}
```

The similar thing can be done with `if/else` and `return`.

For example, two constructs below are identical.

The first one:

```js
function pow(x, n) {
  if (n < 0) {
    alert("Negative 'n' not supported");
  } else {
    let result = 1;

    for (let i = 0; i < n; i++) {
      result *= x;
    }

    return result;
  }  
}
```

And this:

```js
function pow(x, n) {
  if (n < 0) {
    alert("Negative 'n' not supported");
    return;
  }

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

...But the second one is more readable, because the "edge case" is handled early on, and then we have the "main" code flow, without an additional nesting.

## Functions below the code

If you are writing several "helper" functions and the code to use them, then there are three ways to place them.

1. Functions above the code that uses them:

    ```js
    // *!*function declarations*/!*
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }

    // *!*the code which uses them*/!*
    var elem = createElement();
    setHandler(elem);
    walkAround();
    ```
2. Code first, then functions

    ```js
    // *!*the code which uses the functions*/!*
    var elem = createElement();
    setHandler(elem);
    walkAround();

    // --- *!*helper functions*/!* ---

    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }
    ```
3. Mixed, a function is described when it's first used.

Most of time, the second variant is preferred.

That's because when reading a code, we first want to know "what it does". If the code goes first, then it provides that information. And then maybe we won't need to read functions at all, especially if their names are adequate to what they're doing.

## Style guides

There are many peculiar details in the code style.

As the team becomes bigger, a common agreement on them becomes the "team style guide".

There are many open style guides, so there we could just accept the one we like the most.

- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)

There exist more there in the wild.

As you become more mature in Javascript programming, you might want to read them all to pick up the common principles.

## Style checkers

There are great tools that can check the code style automatically. They are called "linters".

Please note, they not only check the style, but sometimes help to find bugs, like a typo in variable name or a function.

So it's really beneficial to install one. Even if you don't want to stick to a "code style". They help to find typos -- and that's already good enough.

Most well known are:

- [JSLint](http://www.jslint.com/) -- one of the oldest open-source solutions.
- [JSHint](http://www.jshint.com/) -- the more "featured" variant of JSLint.
- [ESLint](http://eslint.org/) -- the newest breed.

All of them can do the job. The author uses [ESLint](http://eslint.org/).

Here are simple steps to start using it:

1. Install [Node.JS](https://nodejs.org/), necessary to run them.
2. Install eslint: `npm i -g eslint` (npm is Node.JS package installer).
3. Create a config file `.eslintrc` in your Javascript project (the dot at the start is mandatory).

An example of `.eslintrc`:

```js
{
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "es6": true
  },
  "rules": {
    "no-console": 0,
    "no-constant-condition": ["error", { "checkLoops": false }]
  },
  "indent": 2
}
```

Then install/enable the plugin for your editor that integrates with ESLint. The majority of editors have it.

Also you can see [the manual](http://eslint.org/docs/user-guide/getting-started) for advanced examples, rules and options of ESLint.

## Summary

All syntax rules from this chapter and the style guides aim to increase readability.

All of them are debatable.

When we think about "how to write better?", the sole criterion is "what makes the code  more readable and easier to understand? what helps to evade errors?" The answer helps to pick up best practices. And maybe to abandon some in case if they don't contribute.
