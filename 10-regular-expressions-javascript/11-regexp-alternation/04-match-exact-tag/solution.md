
The pattern start is obvious: `pattern:<style`.

...But then we can't simply write `pattern:<style.*?>`, because `match:<styler>` would match it.

We need either a space after `match:<style` and then optionally something else or the ending `match:>`.

In the regexp language: `pattern:<style(>|\s.*?>)`.

In action:

```js run
let reg = /<style(>|\s.*?>)/g;

alert( '<style> <styler> <style test="...">'.match(reg) ); // <style>, <style test="...">
```
