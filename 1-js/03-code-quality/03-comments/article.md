# Comments

Comments are generally a good thing. But novices in programming generally get that wrong. They write comments explaining "what is going on in the code".

**But the amount of such "explanatory" comments should be minimal.**

Seriously, a good code should be easy to understand without them.

There's a great rule about that: "if the code is not clear without a comment, then may be it should be rewritten instead".

[cut]

Sometimes it's beneficial to replace a code piece with a function, like here:

```js
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {

*!*
    // check if i is a prime number
*/!*
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert(i);
  }
}
```

The better variant:


```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if ( n % i == 0) return false;
  }
  return true;
}
```

Now we can understand the code easily without the comment. Such code is called *self-descriptive*.

And if we have a long "code sheet" like this:

```js
// here we add whiskey
for(let i = 0; i < 10; i++) {
  let drop = getWhiskey();
  smell(drop);
  add(drop, glass);
}

// here we add juice
for(let t = 0; t < 3; t++) {
  let tomato = getTomato();
  examine(tomato);
  let juice = press(tomato);
  add(juice, glass);
}

// ...
```

Then it might be a better variant to refactor it into functions like:

```js
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
  for(let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    //...
  }
}

function addJuice(container) {
  for(let t = 0; t < 3; t++) {
    let tomato = getTomato();
    //...
  }
}
```

That's readable without comments. And also the code structure is better when split. It's clear what every function does, what it takes and what it returns.

In reality, we can't totally evade "explanatory" comments. There are complex algorithms. And there are smart code tweaks made for optimization. But generally we should try to keep the code as simple as possible, and apply those only when needed.

## Good comments

Which comments are good?

Describe the architecture
: That's the list of components, how they interact, what's the control flow in various situations... In short -- the bird's eye view of the code. There's a special diagram language [UML](http://wikipedia.org/wiki/Unified_Modeling_Language) for high-level architecture diagrams. Definitely worth studying.

Document a function usage
: There's a special syntax [JSDoc](http://en.wikipedia.org/wiki/JSDoc) to document a function: usage, parameters, returned value.

    For instance:
    ```js
    /**
     * Returns x raised to the n-th power.
     *
     * @param {number} x The number to raise.
     * @param {number} n The power, must be a natural number.
     * @return {number} x raised to the n-th power.
     */
    function pow(x, n) {
      ...
    }
    ```

    Such comments allow to understand the purpose of the function and use it the right way. Even without looking in its code.

    By the way, many editors like [WebStorm](https://www.jetbrains.com/webstorm/) can understand them as well and use them to provide autocomplete and some automatic code-checking.

    Also, there are tools like [JSDoc 3](https://github.com/jsdoc3/jsdoc) that can generate HTML-documentation from the comments. You can read more information about JSDoc at <http://usejsdoc.org/>.

Why the task is solved this way?
: What's written is important. But what's *not* written maybe even more important to understand what's going on. Why the task is solved exactly this way? The code gives no answer.

    If there are many ways to solve the task, why this one? Especially when it's not the most obvious one.

    Without such comments the following situation is possible:
    1. You (or your colleague) open the code written some time ago, and see it's "suboptimal".
    2. You think: "How stupid I was then, and how much smarter I'm now", and rewrite using the "more obvious and correct" variant.
    3. ...The urge to rewrite was good. But in the process you see that the "more obvious" solution is actually lacking. Hopefully, you revert to the correct variant, but the time was spent.

    Comments that explain the solution are very important. They help to understand what happens and continue development the right way.

Any subtle features of the code? Where they are used?
: If the code has anything subtle, it's definitely worth commenting.

One of signs of a good developer is his comments. Good comments allow to maintain the code well, return to it after a long delay and use features more effectively.

## Style guides

A style guide contains general rules about "how to write": which quotes to use, how many spaces to indent, where to put line breaks etc. A lot of minor things.

In total, when all members of a team use the same style guide, the code looks uniform. No matter who of the team wrote it, still the same style.

Surely, a team may think out a style guide themselves. But as of now, there's no need to. There are many tried, worked out style guides, easy to adopt.

For instance:

- [Google JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- (there are more)

If you're a novice developer, then you could start with the cheatsheet in the chapter <info:coding-style>, and later browse the style guides to see what looks best.

Also consider the automatic style checkers, described below.

## Automated style linters

There are tools that automate style checking, called "linters".

Most known are:

- [JSLint](http://www.jslint.com/) -- one of the first linters.
- [JSHint](http://www.jshint.com/) -- more settings than JSHint.
- [ESLint](http://eslint.org/) -- probably the newest one.

The author of this chapter uses ESLint.

Most linters are integrated with editors: just enable the plugin in the editor and configure the style.

For instance, for ESLint you should do the following:

1. Install Node.JS (can take from the <http://nodejs.org>).
2. Install ESLint with the command `npm install -g eslint`.
3. Create a config file named `.eslintrc` in the root of your JavaScript project (in the folder that contains all your files).

Here's an example of `.eslintrc`:

```js
{
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "no-console": 0,
  },
  "indent": 2
}
```

Here the directive `"extends"` denotes that we base on the "eslint:recommended" set of settings, and then we specify our own.

It is possible to download style rule sets from the web and extend them instead. See <http://eslint.org/docs/user-guide/getting-started> for more details about installation.

Using a linter has the great side-effect. Linters catch typos. For instance, when an undefined variable is accessed, a linter detects it and (if integrated with an editor) highlights. In most cases that's a mistype. So we can fix it right ahead.

For that reason even if you're not concerned about styles, using a linter is really recommended.


## Summary

Code style is important, especially in the team. When other people look at your code, the impression is largely defined by the style. Good code is easier to read and understand.

Speaking about style rules: quotes, spaces etc, we should keep in mind that all of them are good *only* if they make the code better. More readable, easier to maintain. That's the main thing to keep in mind when choosing the style or discussing which one is better.
