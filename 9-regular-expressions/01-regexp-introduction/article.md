# Patterns and flags

A regular expression (also "regexp", or just "reg") consists of a *pattern* and optional *flags*.

There are two syntaxes to create a regular expression object.

The long syntax:

```js
regexp = new RegExp("pattern", "flags");
```

...And the short one, using slashes `"/"`:

```js
regexp = /pattern/; // no flags
regexp = /pattern/gmi; // with flags g,m and i (to be covered soon)
```

Slashes `"/"` tell JavaScript that we are creating a regular expression. They play the same role as quotes for strings.

## Usage

To search inside a string, we can use method [search](mdn:js/String/search).

Here's an example:

```js run
let str = "I love JavaScript!"; // will search here

let regexp = /love/;
alert( str.search(regexp) ); // 2
```

The `str.search` method looks for the pattern `pattern:/love/` and returns the position inside the string. As we might guess, `pattern:/love/` is the simplest possible pattern. What it does is a simple substring search.

The code above is the same as:

```js run
let str = "I love JavaScript!"; // will search here

let substr = 'love';
alert( str.search(substr) ); // 2
```

So searching for `pattern:/love/` is the same as searching for `"love"`.

But that's only for now. Soon we'll create more complex regular expressions with much more searching power.

```smart header="Colors"
From here on the color scheme is:

- regexp -- `pattern:red`
- string (where we search) -- `subject:blue`
- result -- `match:green`
```


````smart header="When to use `new RegExp`?"
Normally we use the short syntax `/.../`. But it does not support variable insertions `${...}`.

On the other hand, `new RegExp` allows to construct a pattern dynamically from a string, so it's more flexible.

Here's an example of a dynamically generated regexp:

```js run
let tag = prompt("Which tag you want to search?", "h2");
let regexp = new RegExp(`<${tag}>`);

// finds <h2> by default
alert( "<h1> <h2> <h3>".search(regexp));
```
````


## Flags

Regular expressions may have flags that affect the search.

There are only 6 of them in JavaScript:

`i`
: With this flag the search is case-insensitive: no difference between `A` and `a` (see the example below).

`g`
: With this flag the search looks for all matches, without it -- only the first one (we'll see uses in the next chapter).

`m`
: Multiline mode (covered in the chapter <info:regexp-multiline-mode>).

`s`
: "Dotall" mode, allows `.` to match newlines (covered in the chapter <info:regexp-character-classes>).

`u`
: Enables full unicode support. The flag enables correct processing of surrogate pairs. More about that in the chapter <info:regexp-unicode>.

`y`
: Sticky mode (covered in the chapter <info:regexp-sticky>)

We'll cover all these flags further in the tutorial.

For now, the simplest flag is `i`, here's an example:

```js run
let str = "I love JavaScript!";

alert( str.search(/LOVE/i) ); // 2 (found lowercased)

alert( str.search(/LOVE/) ); // -1 (nothing found without 'i' flag)
```

So the `i` flag already makes regular expressions more powerful than a simple substring search. But there's so much more. We'll cover other flags and features in the next chapters.


## Summary

- A regular expression consists of a pattern and optional flags: `g`, `i`, `m`, `u`, `s`, `y`.
- Without flags and special symbols that we'll study later, the search by a regexp is the same as a  substring search.
- The method `str.search(regexp)` returns the index where the match is found or `-1` if there's no match. In the next chapter we'll see other methods.
