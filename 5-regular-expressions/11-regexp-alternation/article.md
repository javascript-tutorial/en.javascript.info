# Alternation (OR) |

Alternation is the term in regular expression that is actually a simple "OR".

In a regular expression it is denoted with a vertical line character `pattern:|`.

For instance, we need to find programming languages: HTML, PHP, Java or JavaScript.

The corresponding regexp: `pattern:html|php|java(script)?`.

A usage example:

```js run
let reg = /html|php|css|java(script)?/gi;

let str = "First HTML appeared, then CSS, then JavaScript";

alert( str.match(reg) ); // 'HTML', 'CSS', 'JavaScript'
```

We already know a similar thing -- square brackets. They allow to choose between multiple character, for instance `pattern:gr[ae]y` matches `match:gray` or `match:grey`.

Alternation works not on a character level, but on expression level. A regexp `pattern:A|B|C` means one of expressions `A`, `B` or `C`.

For instance:

- `pattern:gr(a|e)y` means exactly the same as `pattern:gr[ae]y`.
- `pattern:gra|ey` means "gra" or "ey".

To separate a part of the pattern for alternation we usually enclose it in parentheses, like this: `pattern:before(XXX|YYY)after`.

## Regexp for time

In previous chapters there was a task to build a regexp for searching time in the form `hh:mm`, for instance `12:00`. But a simple `pattern:\d\d:\d\d` is too vague. It accepts `25:99` as the time.

How can we make a better one?

We can apply more careful matching:

- The first digit must be `0` or `1` followed by any digit.
- Or `2` followed by `pattern:[0-3]`

As a regexp: `pattern:[01]\d|2[0-3]`.

Then we can add a colon and the minutes part.

The minutes must be from `0` to `59`, in the regexp language that means the first digit  `pattern:[0-5]` followed by any other digit `\d`.

Let's glue them together into the pattern: `pattern:[01]\d|2[0-3]:[0-5]\d`.

We're almost done, but there's a problem. The alternation `|` is between the `pattern:[01]\d` and `pattern:2[0-3]:[0-5]\d`. That's wrong, because it will match either the left or the right pattern:


```js run
let reg = /[01]\d|2[0-3]:[0-5]\d/g;

alert("12".match(reg)); // 12 (matched [01]\d)
```

That's rather obvious, but still an often mistake when starting to work with regular expressions.

We need to add parentheses to apply alternation exactly to hours: `[01]\d` OR `2[0-3]`.

The correct variant:

```js run
let reg = /([01]\d|2[0-3]):[0-5]\d/g;

alert("00:00 10:10 23:59 25:99 1:2".match(reg)); // 00:00,10:10,23:59
```
