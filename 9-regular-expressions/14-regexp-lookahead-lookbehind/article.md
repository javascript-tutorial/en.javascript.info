# Lookahead and lookbehind

Sometimes we need to find only those matches for a pattern that are followed or preceeded by another pattern.

There's a special syntax for that, called "lookahead" and "lookbehind", together referred to as "lookaround".

For the start, let's find the price from the string like `subject:1 turkey costs 30€`. That is: a number, followed by `subject:€` sign.

## Lookahead

The syntax is: `pattern:X(?=Y)`, it means "look for `pattern:X`, but match only if followed by `pattern:Y`". There may be any pattern instead of `pattern:X` and `pattern:Y`.

For an integer number followed by `subject:€`, the regexp will be `pattern:\d+(?=€)`:

```js run
let str = "1 turkey costs 30€";

alert( str.match(/\d+(?=€)/) ); // 30, the number 1 is ignored, as it's not followed by €
```

Please note: the lookahead is merely a test, the contents of the parentheses `pattern:(?=...)` is not included in the result `match:30`.

When we look for `pattern:X(?=Y)`, the regular expression engine finds `pattern:X` and then checks if there's `pattern:Y` immediately after it. If it's not so, then the potential match is skipped, and the search continues.

More complex tests are possible, e.g. `pattern:X(?=Y)(?=Z)` means:

1. Find `pattern:X`.
2. Check if `pattern:Y` is immediately after `pattern:X` (skip if isn't).
3. Check if `pattern:Z` is also immediately after `pattern:X` (skip if isn't).
4. If both tests passed, then the `pattern:X` is a match, otherwise continue searching.

In other words, such pattern means that we're looking for `pattern:X` followed by `pattern:Y` and `pattern:Z` at the same time.

That's only possible if patterns `pattern:Y` and `pattern:Z` aren't mutually exclusive.

For example, `pattern:\d+(?=\s)(?=.*30)` looks for `pattern:\d+` only if it's followed by a space, and there's `30` somewhere after it:

```js run
let str = "1 turkey costs 30€";

alert( str.match(/\d+(?=\s)(?=.*30)/) ); // 1
```

In our string that exactly matches the number `1`.

## Negative lookahead

Let's say that we want a quantity instead, not a price from the same string. That's a number `pattern:\d+`, NOT followed by `subject:€`.

For that, a negative lookahead can be applied.

The syntax is: `pattern:X(?!Y)`, it means "search `pattern:X`, but only if not followed by `pattern:Y`".

```js run
let str = "2 turkeys cost 60€";

alert( str.match(/\d+(?!€)/) ); // 2 (the price is skipped)
```

## Lookbehind

Lookahead allows to add a condition for "what follows".

Lookbehind is similar, but it looks behind. That is, it allows to match a pattern only if there's something before it.

The syntax is:
- Positive lookbehind: `pattern:(?<=Y)X`, matches `pattern:X`, but only if there's  `pattern:Y` before it.
- Negative lookbehind: `pattern:(?<!Y)X`, matches `pattern:X`, but only if there's no `pattern:Y` before it.

For example, let's change the price to US dollars. The dollar sign is usually before the number, so to look for `$30` we'll use `pattern:(?<=\$)\d+` -- an amount preceded by `subject:$`:

```js run
let str = "1 turkey costs $30";

// the dollar sign is escaped \$
alert( str.match(/(?<=\$)\d+/) ); // 30 (skipped the sole number)
```

And, if we need the quantity -- a number, not preceded by `subject:$`, then we can use a negative lookbehind `pattern:(?<!\$)\d+`:

```js run
let str = "2 turkeys cost $60";

alert( str.match(/(?<!\$)\d+/) ); // 2 (skipped the price)
```

## Capturing groups

Generally, the contents inside lookaround parentheses does not become a part of the result.

E.g. in the pattern `pattern:\d+(?=€)`, the `pattern:€` sign doesn't get captured as a part of the match. That's natural: we look for a number `pattern:\d+`, while `pattern:(?=€)` is just a test that it should be followed by `subject:€`.

But in some situations we might want to capture the lookaround expression as well, or a part of it. That's possible. Just wrap that part into additional parentheses.

In the example below the currency sign `pattern:(€|kr)` is captured, along with the amount:

```js run
let str = "1 turkey costs 30€";
let regexp = /\d+(?=(€|kr))/; // extra parentheses around €|kr

alert( str.match(regexp) ); // 30, €
```

And here's the same for lookbehind:

```js run
let str = "1 turkey costs $30";
let regexp = /(?<=(\$|£))\d+/;

alert( str.match(regexp) ); // 30, $
```

## Summary

Lookahead and lookbehind (commonly referred to as "lookaround") are useful when we'd like to match something depending on the context before/after it.

For simple regexps we can do the similar thing manually. That is: match everything, in any context, and then filter by context in the loop.

Remember, `str.match` (without flag `pattern:g`) and `str.matchAll` (always) return matches as arrays with `index` property, so we know where exactly in the text it is, and can check the context.

But generally lookaround is more convenient.

Lookaround types:

| Pattern            | type             | matches |
|--------------------|------------------|---------|
| `X(?=Y)`   | Positive lookahead | `pattern:X` if followed by `pattern:Y` |
| `X(?!Y)`   | Negative lookahead | `pattern:X` if not followed by `pattern:Y` |
| `(?<=Y)X` |  Positive lookbehind | `pattern:X` if after `pattern:Y` |
| `(?<!Y)X` | Negative lookbehind | `pattern:X` if not after `pattern:Y` |
