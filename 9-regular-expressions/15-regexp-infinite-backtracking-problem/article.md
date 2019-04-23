# Infinite backtracking problem

Some regular expressions are looking simple, but can execute veeeeeery long time, and even "hang" the JavaScript engine.

Sooner or later most developers occasionally face such behavior.

The typical situation -- a regular expression works fine sometimes, but for certain strings it "hangs"  consuming 100% of CPU.

In a web-browser it kills the page. Not a good thing for sure.

For server-side JavaScript it may become a vulnerability, and it uses regular expressions to process user data. Bad input will make the process hang, causing denial of service. The author personally saw and reported such vulnerabilities even for very well-known and widely used programs.

So the problem is definitely worth to deal with.

## Introduction

The plan will be like this:

1. First we see the problem how it may occur.
2. Then we simplify the situation and see why it occurs.
3. Then we fix it.

For instance let's consider searching tags in HTML.

We want to find all tags, with or without attributes -- like `subject:<a href="..." class="doc" ...>`. We need the regexp to work reliably, because HTML comes from the internet and can be messy.

In particular, we need it to match tags like `<a test="<>" href="#">` -- with `<` and `>` in attributes. That's allowed by [HTML standard](https://html.spec.whatwg.org/multipage/syntax.html#syntax-attributes).

Now we can see that a simple regexp like `pattern:<[^>]+>` doesn't work, because it stops at the first `>`, and we need to ignore `<>` if inside an attribute.

```js run
// the match doesn't reach the end of the tag - wrong!
alert( '<a test="<>" href="#">'.match(/<[^>]+>/) ); // <a test="<>
```

To correctly handle such situations we need a more complex regular expression. It will have the form  `pattern:<tag (key=value)*>`.

1. For the `tag` name: `pattern:\w+`,
2. For the `key` name: `pattern:\w+`,
3. And the `value`: a quoted string `pattern:"[^"]*"`.

If we substitute these into the pattern above and throw in some optional spaces `pattern:\s`, the full regexp becomes: `pattern:<\w+(\s*\w+="[^"]*"\s*)*>`.

That regexp is not perfect! It doesn't yet support all details of HTML, for instance unquoted values, and there are other ways to improve, but let's not add complexity. It will demonstrate the problem for us.

The regexp seems to work:

```js run
let reg = /<\w+(\s*\w+="[^"]*"\s*)*>/g;

let str='...<a test="<>" href="#">... <b>...';

alert( str.match(reg) ); // <a test="<>" href="#">, <b>
```

Great! It found both the long tag `match:<a test="<>" href="#">` and the short one `match:<b>`.

Now, that we've got a seemingly working solution, let's get to the infinite backtracking itself.

## Infinite backtracking

If you run our regexp on the input below, it may hang the browser (or another JavaScript host):

```js run
let reg = /<\w+(\s*\w+="[^"]*"\s*)*>/g;

let str = `<tag a="b"  a="b"  a="b"  a="b"  a="b"  a="b"  a="b"  a="b"
  a="b"  a="b"  a="b"  a="b"  a="b"  a="b"  a="b"  a="b"  a="b" a="b"  a="b"  a="b"  a="b"`;

*!*
// The search will take a long, long time
alert( str.match(reg) );
*/!*
```

Some regexp engines can handle that search, but most of them can't.

What's the matter? Why a simple regular expression "hangs" on such a small string?

Let's simplify the regexp by stripping the tag name and the quotes. So that we look only for `key=value` attributes: `pattern:<(\s*\w+=\w+\s*)*>`.

Unfortunately, the regexp still hangs:

```js run
// only search for space-delimited attributes
let reg = /<(\s*\w+=\w+\s*)*>/g;

let str = `<a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b
  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b`;

*!*
// the search will take a long, long time
alert( str.match(reg) );
*/!*
```

Here we end the demo of the problem and start looking into what's going on, why it hangs and how to fix it.

## Detailed example

To make an example even simpler, let's consider `pattern:(\d+)*$`.

This regular expression also has the same problem. In most regexp engines that search takes a very long time (careful -- can hang):

```js run
alert( '12345678901234567890123456789123456789z'.match(/(\d+)*$/) );
```

So what's wrong with the regexp?

First, one may notice that the regexp is a little bit strange. The quantifier `pattern:*` looks extraneous. If we want a number, we can use `pattern:\d+$`.

Indeed, the regexp is artificial. But the reason why it is slow is the same as those we saw above. So let's understand it, and then the previous example will become obvious.

What happen during the search of `pattern:(\d+)*$` in the line `subject:123456789z`?

1. First, the regexp engine tries to find a number `pattern:\d+`. The plus `pattern:+` is greedy by default, so it consumes all digits:

    ```
    \d+.......
    (123456789)z
    ```
2. Then it tries to apply the star quantifier, but there are no more digits, so it the star doesn't give anything.

3. Then the pattern expects to see the string end `pattern:$`, and in the text we have `subject:z`, so there's no match:

    ```
               X
    \d+........$
    (123456789)z
    ```

4. As there's no match, the greedy quantifier `pattern:+` decreases the count of repetitions (backtracks).

    Now `\d+` doesn't take all digits, but all except the last one:
    ```
    \d+.......
    (12345678)9z
    ```
5. Now the engine tries to continue the search from the new position (`9`).

    The star `pattern:(\d+)*` can be applied -- it gives the number `match:9`:

    ```

    \d+.......\d+
    (12345678)(9)z
    ```

    The engine tries to match `$` again, but fails, because meets `subject:z`:

    ```
                 X
    \d+.......\d+
    (12345678)(9)z
    ```


5. There's no match, so the engine will continue backtracking, decreasing the number of repetitions for `pattern:\d+` down to 7 digits. So the rest of the string `subject:89` becomes the second `pattern:\d+`:

    ```
                 X
    \d+......\d+
    (1234567)(89)z
    ```

    ...Still no match for `pattern:$`.

    The search engine backtracks again. Backtracking generally works like this: the last greedy quantifier decreases the number of repetitions until it can. Then the previous greedy quantifier decreases, and so on. In our case the last greedy quantifier is the second `pattern:\d+`, from `subject:89` to `subject:8`, and then the star takes `subject:9`:

    ```
                   X
    \d+......\d+\d+
    (1234567)(8)(9)z
    ```
6. ...Fail again. The second and third `pattern:\d+` backtracked to the end, so the first quantifier shortens the match to `subject:123456`, and the star takes the rest:

    ```
                 X
    \d+.......\d+
    (123456)(789)z
    ```

    Again no match. The process repeats: the last greedy quantifier releases one character (`9`):

    ```
                   X
    \d+.....\d+ \d+
    (123456)(78)(9)z
    ```
7. ...And so on.

The regular expression engine goes through all combinations of `123456789` and their subsequences. There are a lot of them, that's why it takes so long.

What to do?

Should we turn on the lazy mode?

Unfortunately, it doesn't: if we replace `pattern:\d+` with `pattern:\d+?`, that still hangs:

```js run
// sloooooowwwwww
alert( '12345678901234567890123456789123456789z'.match(/(\d+?)*$/) );
```

Lazy quantifiers actually do the same, but in the reverse order.

Just think about how the search engine would work in this case.

Some regular expression engines have tricky built-in checks to detect infinite backtracking or other means to work around them, but there's no universal solution.

## Back to tags

In the example above, when we search `pattern:<(\s*\w+=\w+\s*)*>` in the string `subject:<a=b  a=b  a=b  a=b` -- the similar thing happens.

The string has no `>` at the end, so the match is impossible, but the regexp engine doesn't know about it. The search backtracks trying different combinations of `pattern:(\s*\w+=\w+\s*)`:

```
(a=b a=b a=b) (a=b)
(a=b a=b) (a=b a=b)
(a=b) (a=b a=b a=b)
...
```

## How to fix?

The backtracking checks many variants that are an obvious fail for a human.

For instance, in the pattern `pattern:(\d+)*$` a human can easily see that `pattern:(\d+)*` does not need to backtrack `pattern:+`. There's no difference between one or two `\d+`:

```
\d+........
(123456789)z

\d+...\d+....
(1234)(56789)z
```

Let's get back to more real-life example: `pattern:<(\s*\w+=\w+\s*)*>`. We want it to find pairs `name=value` (as many as it can).

What we would like to do is to forbid backtracking.

There's totally no need to decrease the number of repetitions.

In other words, if it found three `name=value` pairs and then can't find `>` after them, then there's no need to decrease the count of repetitions. There are definitely no `>` after those two (we backtracked one `name=value` pair, it's there):

```
(name=value) name=value
```

Modern regexp engines support so-called "possessive" quantifiers for that. They are like greedy, but don't backtrack at all. Pretty simple, they capture whatever they can, and the search continues. There's also another tool called "atomic groups" that forbid backtracking inside parentheses.

Unfortunately, but both these features are not supported by JavaScript.

### Lookahead to the rescue

We can forbid backtracking using lookahead.

The pattern to take as much repetitions as possible without backtracking is: `pattern:(?=(a+))\1`.

In other words:
- The lookahead `pattern:?=` looks for the maximal count `pattern:a+` from the current position.
- And then they are "consumed into the result" by the backreference `pattern:\1` (`pattern:\1` corresponds to the content of the second parentheses, that is `pattern:a+`).

There will be no backtracking, because lookahead does not backtrack. If it found like 5 times of `pattern:a+` and the further match failed, then it doesn't go back to 4.

```smart
There's more about the relation between possessive quantifiers and lookahead in articles [Regex: Emulate Atomic Grouping (and Possessive Quantifiers) with LookAhead](http://instanceof.me/post/52245507631/regex-emulate-atomic-grouping-with-lookahead) and [Mimicking Atomic Groups](http://blog.stevenlevithan.com/archives/mimic-atomic-groups).
```

So this trick makes the problem disappear.

Let's fix the regexp for a tag with attributes from the beginning of the chapter`pattern:<\w+(\s*\w+=(\w+|"[^"]*")\s*)*>`. We'll use lookahead to prevent backtracking of `name=value` pairs:

```js run
// regexp to search name=value
let attrReg = /(\s*\w+=(\w+|"[^"]*")\s*)/

// use new RegExp to nicely insert its source into (?=(a+))\1
let fixedReg = new RegExp(`<\\w+(?=(${attrReg.source}*))\\1>`, 'g');

let goodInput = '...<a test="<>" href="#">... <b>...';

let badInput = `<tag a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b
  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b  a=b`;

alert( goodInput.match(fixedReg) ); // <a test="<>" href="#">, <b>
alert( badInput.match(fixedReg) ); // null (no results, fast!)
```

Great, it works! We found both a long tag  `match:<a test="<>" href="#">` and a small one `match:<b>`, and (!) didn't hang the engine on the bad input.

Please note the `attrReg.source` property. `RegExp` objects provide access to their source string in it. That's convenient when we want to insert one regexp into another.
