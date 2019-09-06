A regexp to search 3-digit color `#abc`: `pattern:/#[a-f0-9]{3}/i`.

We can add exactly 3 more optional hex digits. We don't need more or less. The color has either 3 or 6 digits.

Let's use the quantifier `pattern:{1,2}` for that: we'll have `pattern:/#([a-f0-9]{3}){1,2}/i`.

Here the pattern `pattern:[a-f0-9]{3}` is enclosed in parentheses to apply the quantifier `pattern:{1,2}`.

In action:

```js run
let regexp = /#([a-f0-9]{3}){1,2}/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef #abc
```

There's a minor problem here: the pattern found `match:#abc` in `subject:#abcd`. To prevent that we can add `pattern:\b` to the end:

```js run
let regexp = /#([a-f0-9]{3}){1,2}\b/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef
```
