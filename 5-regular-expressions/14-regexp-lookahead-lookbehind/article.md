# Lookahead and lookbehind

Sometimes we need to match a pattern only if followed by another pattern. For instance, we'd like to get the price from a string like `subject:1 turkey costs 30€`.

We need a number (let's say a price has no decimal point) followed by `subject:€` sign.

That's what lookahead is for.

## Lookahead

The syntax is: `pattern:x(?=y)`, it means "look for `pattern:x`, but match only if followed by `pattern:y`".

For an integer amount followed by `subject:€`, the regexp will be `pattern:\d+(?=€)`:

```js run
let str = "1 turkey costs 30€";

alert( str.match(/\d+(?=€)/) ); // 30 (correctly skipped the sole number 1)
```

Let's say we want a quantity instead, that is a number, NOT followed by `subject:€`.

Here a negative lookahead can be applied.

The syntax is: `pattern:x(?!y)`, it means "search `pattern:x`, but only if not followed by `pattern:y`".

```js run
let str = "2 turkeys cost 60€";

alert( str.match(/\d+(?!€)/) ); // 2 (correctly skipped the price)
```

## Lookbehind

Lookahead allows to add a condition for "what goes after".

Lookbehind is similar, but it looks behind. That is, it allows to match a pattern only if there's something before.

The syntax is:
- Positive lookbehind: `pattern:(?<=y)x`, matches `pattern:x`, but only if it follows after `pattern:y`.
- Negative lookbehind: `pattern:(?<!y)x`, matches `pattern:x`, but only if there's no `pattern:y` before.

For example, let's change the price to US dollars. The dollar sign is usually before the number, so to look for `$30` we'll use `pattern:(?<=\$)\d+` -- an amount preceeded by `subject:$`:

```js run
let str = "1 turkey costs $30";

alert( str.match(/(?<=\$)\d+/) ); // 30 (skipped the sole number)
```

And, to find the quantity -- a number, not preceeded by `subject:$`, we can use a negative lookbehind `pattern:(?<!\$)\d+`:

```js run
let str = "2 turkeys cost $60";

alert( str.match(/(?<!\$)\d+/) ); // 2 (skipped the price)
```

## Capture groups

Generally, what's inside the lookaround (a common name for both lookahead and lookbehind) parentheses does not become a part of the match.

E.g. in the pattern `pattern:\d+(?!€)`, the `pattern:€` sign doesn't get captured as a part of the match.

But if we want to capture the whole lookaround expression or a part of it, that's possible. Just need to wrap that into additional parentheses.

For instance, here the currency `pattern:(€|kr)` is captured, along with the amount:

```js run
let str = "1 turkey costs 30€";
let reg = /\d+(?=(€|kr))/; // extra parentheses around €|kr

alert( str.match(reg) ); // 30, €
```

And here's the same for lookbehind:

```js run
let str = "1 turkey costs $30";
let reg = /(?<=(\$|£))\d+/;

alert( str.match(reg) ); // 30, $
```

Please note that for lookbehind the order stays be same, even though lookahead parentheses are before the main pattern.

Usually parentheses are numbered left-to-right, but lookbehind is an exception, it is always captured after the main pattern. So the match for `pattern:\d+` goes in the result first, and then for `pattern:(\$|£)`.


## Summary

Lookahead and lookbehind (commonly referred to as "lookaround") are useful for simple regular expressions, when we'd like not to take something into the match depending on the context before/after it.

Sometimes we can do the same manually, that is: match all and filter by context in the loop. Remember, `str.matchAll` and `reg.exec` return matches with `.index` property, so we know where exactly in the text it is. But generally regular expressions can do it better.

Lookaround types:

| Pattern            | type             | matches |
|--------------------|------------------|---------|
| `pattern:x(?=y)`   | Positive lookahead | `x` if followed by `y` |
| `pattern:x(?!y)`   | Negative lookahead | `x` if not followed by `y` |
| `pattern:(?<=y)x` |  Positive lookbehind | `x` if after `y` |
| `pattern:(?<!y)x` | Negative lookbehind | `x` if not after `y` |

Lookahead can also used to disable backtracking. Why that may be needed -- see in the next chapter.
