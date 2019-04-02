A regexp to search 3-digit color `#abc`: `pattern:/#[a-f0-9]{3}/i`.

We can add exactly 3 more optional hex digits. We don't need more or less. Either we have them or we don't.

The simplest way to add them -- is to append to the regexp: `pattern:/#[a-f0-9]{3}([a-f0-9]{3})?/i`

We can do it in a smarter way though: `pattern:/#([a-f0-9]{3}){1,2}/i`.

Here the regexp `pattern:[a-f0-9]{3}` is in parentheses to apply the quantifier `pattern:{1,2}` to it as a whole.

In action:

```js run
let reg = /#([a-f0-9]{3}){1,2}/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(reg) ); // #3f3 #AA00ef #abc
```

There's a minor problem here: the pattern found `match:#abc` in `subject:#abcd`. To prevent that we can add `pattern:\b` to the end:

```js run
let reg = /#([a-f0-9]{3}){1,2}\b/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(reg) ); // #3f3 #AA00ef
```
