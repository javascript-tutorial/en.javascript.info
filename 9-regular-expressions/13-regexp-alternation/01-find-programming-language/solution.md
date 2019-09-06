
The first idea can be to list the languages with `|` in-between.

But that doesn't work right:

```js run
let regexp = /Java|JavaScript|PHP|C|C\+\+/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(regexp) ); // Java,Java,PHP,C,C
```

The regular expression engine looks for alternations one-by-one. That is: first it checks if we have  `match:Java`, otherwise -- looks for `match:JavaScript` and so on.

As a result, `match:JavaScript` can never be found, just because `match:Java` is checked first.

The same with `match:C` and `match:C++`.

There are two solutions for that problem:

1. Change the order to check the longer match first: `pattern:JavaScript|Java|C\+\+|C|PHP`.
2. Merge variants with the same start: `pattern:Java(Script)?|C(\+\+)?|PHP`.

In action:

```js run
let regexp = /Java(Script)?|C(\+\+)?|PHP/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(regexp) ); // Java,JavaScript,PHP,C,C++
```
