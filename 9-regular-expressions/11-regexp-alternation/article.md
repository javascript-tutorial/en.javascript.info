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

Square brackets allow only characters or character sets. Alternation allows any expressions. A regexp `pattern:A|B|C` means one of expressions `A`, `B` or `C`.

For instance:

- `pattern:gr(a|e)y` means exactly the same as `pattern:gr[ae]y`.
- `pattern:gra|ey` means `match:gra` or `match:ey`.

To separate a part of the pattern for alternation we usually enclose it in parentheses, like this: `pattern:before(XXX|YYY)after`.

## Regexp for time

In previous chapters there was a task to build a regexp for searching time in the form `hh:mm`, for instance `12:00`. But a simple `pattern:\d\d:\d\d` is too vague. It accepts `25:99` as the time (99 seconds is valid, but shouldn't be).

How can we make a better one?

We can apply more careful matching. First, the hours:

- If the first digit is `0` or `1`, then the next digit can by anything.
- Or, if the first digit is `2`, then the next must be `pattern:[0-3]`.

As a regexp: `pattern:[01]\d|2[0-3]`.

Next, the minutes must be from `0` to `59`. In the regexp language that means `pattern:[0-5]\d`: the first digit `0-5`, and then any digit.

Let's glue them together into the pattern: `pattern:[01]\d|2[0-3]:[0-5]\d`.

We're almost done, but there's a problem. The alternation `pattern:|` now happens to be between `pattern:[01]\d` and `pattern:2[0-3]:[0-5]\d`.

That's wrong, as it should be applied only to hours `[01]\d` OR `2[0-3]`. That's a common mistake when starting to work with regular expressions.

The correct variant:

```js run
let reg = /([01]\d|2[0-3]):[0-5]\d/g;

alert("00:00 10:10 23:59 25:99 1:2".match(reg)); // 00:00,10:10,23:59
```
