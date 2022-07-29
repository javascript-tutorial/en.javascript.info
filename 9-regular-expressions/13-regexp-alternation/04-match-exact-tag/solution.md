
The pattern start is obvious: `pattern:<style`.

...But then we can't simply write `pattern:<style.*?>`, because `match:<styler>` would match it.

We need either a space after `match:<style` and then optionally something else or the ending `match:>`.

In the regexp language: `pattern:<style(>|\s.*?>)`.

In action:

```js run
let regexp = /<style(>|\s.*?>)/g;

alert( '<style> <styler> <style test="...">'.match(regexp) ); // <style>, <style test="...">
```

Also another solution could be to use `\b`:

```js run
let regexp = /<style\b.*?>/gs; // please note `s` flag, for times there is a `\n` in place `.`

alert( '<style> <styler> <style test="...">'.match(regexp) ); // <style>, <style test="...">
```
