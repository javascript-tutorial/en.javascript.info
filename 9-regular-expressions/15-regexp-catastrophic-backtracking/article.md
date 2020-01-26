# Catastrophic backtracking

Some regular expressions are looking simple, but can execute veeeeeery long time, and even "hang" the JavaScript engine.

Sooner or later most developers occasionally face such behavior, because it's quite easy to create such a regexp.

The typical symptom -- a regular expression works fine sometimes, but for certain strings it "hangs", consuming 100% of CPU.

In such case a web-browser suggests to kill the script and reload the page. Not a good thing for sure.

For server-side JavaScript it may become a vulnerability if regular expressions process user data.

## Example

Let's say we have a string, and we'd like to check if it consists of words  `pattern:\w+` with an optional space `pattern:\s?` after each.

We'll use a regexp `pattern:^(\w+\s?)*$`, it specifies 0 or more such words.

In action:

```js run
let regexp = /^(\w+\s?)*$/;

alert( regexp.test("A good string") ); // true
alert( regexp.test("Bad characters: $@#") ); // false
```

It seems to work. The result is correct. Although, on certain strings it takes a lot of time. So long that JavaScript engine "hangs" with 100% CPU consumption.

If you run the example below, you probably won't see anything, as JavaScript will just "hang". A web-browser will stop reacting on events, the UI will stop working. After some time it will suggest to reloaad the page. So be careful with this:

```js run
let regexp = /^(\w+\s?)*$/;
let str = "An input string that takes a long time or even makes this regexp to hang!";

// will take a very long time
alert( regexp.test(str) );
```

Some regular expression engines can handle such search, but most of them can't.

## Simplified example

What's the matter? Why the regular expression "hangs"?

To understand that, let's simplify the example: remove spaces `pattern:\s?`. Then it becomes `pattern:^(\w+)*$`.

And, to make things more obvious, let's replace `pattern:\w` with `pattern:\d`. The resulting regular expression still hangs, for instance:

<!-- let str = `AnInputStringThatMakesItHang!`; -->

```js run
let regexp = /^(\d+)*$/;

let str = "012345678901234567890123456789!";

// will take a very long time
alert( regexp.test(str) );
```

So what's wrong with the regexp?

First, one may notice that the regexp `pattern:(\d+)*` is a little bit strange. The quantifier `pattern:*` looks extraneous. If we want a number, we can use `pattern:\d+`.

Indeed, the regexp is artificial. But the reason why it is slow is the same as those we saw above. So let's understand it, and then the previous example will become obvious.

What happens during the search of `pattern:^(\d+)*$` in the line `subject:123456789!` (shortened a bit for clarity), why does it take so long?

1. First, the regexp engine tries to find a number `pattern:\d+`. The plus `pattern:+` is greedy by default, so it consumes all digits:

    ```
    \d+.......
    (123456789)z
    ```

    Then it tries to apply the star quantifier, but there are no more digits, so it the star doesn't give anything.

    The next in the pattern is the string end `pattern:$`, but in the text we have `subject:!`, so there's no match:

    ```
               X
    \d+........$
    (123456789)!
    ```

2. As there's no match, the greedy quantifier `pattern:+` decreases the count of repetitions, backtracks one character back.

    Now `pattern:\d+` takes all digits except the last one:
    ```
    \d+.......
    (12345678)9!
    ```
3. Then the engine tries to continue the search from the new position (`9`).

    The star `pattern:(\d+)*` can be applied -- it gives the number `match:9`:

    ```

    \d+.......\d+
    (12345678)(9)!
    ```

    The engine tries to match `pattern:$` again, but fails, because meets `subject:!`:

    ```
                 X
    \d+.......\d+
    (12345678)(9)z
    ```


4. There's no match, so the engine will continue backtracking, decreasing the number of repetitions. Backtracking generally works like this: the last greedy quantifier decreases the number of repetitions until it can. Then the previous greedy quantifier decreases, and so on.

    All possible combinations are attempted. Here are their examples.

    The first number `pattern:\d+` has 7 digits, and then a number of 2 digits:

    ```
                 X
    \d+......\d+
    (1234567)(89)!
    ```

    The first number has 7 digits, and then two numbers of 1 digit each:

    ```
                   X
    \d+......\d+\d+
    (1234567)(8)(9)!
    ```

    The first number has 6 digits, and then a number of 3 digits:

    ```
                 X
    \d+.......\d+
    (123456)(789)!
    ```

    The first number has 6 digits, and then 2 numbers:

    ```
                   X
    \d+.....\d+ \d+
    (123456)(78)(9)!
    ```

    ...And so on.


There are many ways to split a set of digits `123456789` into numbers. To be precise, there are <code>2<sup>n</sup>-1</code>, where `n` is the length of the set.

For `n=20` there are about 1 million combinations, for `n=30` - a thousand times more. Trying each of them is exactly the reason why the search takes so long.

What to do?

Should we turn on the lazy mode?

Unfortunately, that won't help: if we replace `pattern:\d+` with `pattern:\d+?`, the regexp will still hang. The order of combinations will change, but not their total count.

Some regular expression engines have tricky tests and finite automations that allow to avoid going through all combinations or make it much faster, but not all engines, and not in all cases.

## Back to words and strings

The similar thing happens in our first example, when we look words by pattern `pattern:^(\w+\s?)*$` in the string `subject:An input that hangs!`.

The reason is that a word can be represented as one `pattern:\w+` or many:

```
(input)
(inpu)(t)
(inp)(u)(t)
(in)(p)(ut)
...
```

For a human, it's obvious that there may be no match, because the string ends with an exclamation sign `!`, but the regular expression expects a wordly character `pattern:\w` or a space `pattern:\s` at the end. But the engine doesn't know that.

It tries all combinations of how the regexp `pattern:(\w+\s?)*` can "consume" the string, including variants with spaces `pattern:(\w+\s)*` and without them `pattern:(\w+)*` (because spaces `pattern:\s?` are optional). As there are many such combinations, the search takes a lot of time.

## How to fix?

There are two main approaches to fixing the problem.

The first is to lower the number of possible combinations.

Let's rewrite the regular expression as `pattern:^(\w+\s)*\w*` - we'll look for any number of words followed by a space `pattern:(\w+\s)*`, and then (optionally) a word `pattern:\w*`.

This regexp is equivalent to the previous one (matches the same) and works well:

```js run
let regexp = /^(\w+\s)*\w*$/;
let str = "An input string that takes a long time or even makes this regex to hang!";

alert( regexp.test(str) ); // false
```

Why did the problem disappear?

Now the star `pattern:*` goes after `pattern:\w+\s` instead of `pattern:\w+\s?`. It became impossible to represent one word of the string with multiple successive `pattern:\w+`. The time needed to try such combinations is now saved.

For example, the previous pattern `pattern:(\w+\s?)*` could match the word `subject:string` as two `pattern:\w+`:

```js run
\w+\w+
string
```

The previous pattern, due to the optional `pattern:\s` allowed variants `pattern:\w+`, `pattern:\w+\s`, `pattern:\w+\w+` and so on.

With the rewritten pattern `pattern:(\w+\s)*`, that's impossible: there may be  `pattern:\w+\s` or `pattern:\w+\s\w+\s`, but not `pattern:\w+\w+`. So the overall combinations count is greatly decreased.

## Preventing backtracking

It's not always convenient to rewrite a regexp. And it's not always obvious how to do it.

The alternative approach is to forbid backtracking for the quantifier.

The regular expressions engine tries many combinations that are obviously wrong for a human.

E.g. in the regexp `pattern:(\d+)*$` it's obvious for a human, that `pattern:+` shouldn't backtrack. If we replace one `pattern:\d+` with two separate `pattern:\d+\d+`, nothing changes:

```
\d+........
(123456789)!

\d+...\d+....
(1234)(56789)!
```

And in the original example `pattern:^(\w+\s?)*$` we may want to forbid backtracking in `pattern:\w+`. That is: `pattern:\w+` should match a whole word, with the maximal possible length. There's no need to lower the repetitions count in `pattern:\w+`, try to split it into two words `pattern:\w+\w+` and so on.

Modern regular expression engines support possessive quantifiers for that. They are like greedy ones, but don't backtrack (so they are actually simpler than regular quantifiers).

There are also so-called "atomic capturing groups" - a way to disable backtracking inside parentheses.

Unfortunately, in JavaScript they are not supported. But there's another way.

### Lookahead to the rescue!

We can prevent backtracking using lookahead.

The pattern to take as much repetitions of `pattern:\w` as possible without backtracking is: `pattern:(?=(\w+))\1`.

Let's decipher it:
- Lookahead `pattern:?=` looks forward for the longest word `pattern:\w+` starting at the current position.
- The contents of parentheses with `pattern:?=...` isn't memorized by the engine, so wrap `pattern:\w+` into parentheses. Then the engine will memorize their contents
- ...And allow us to reference it in the pattern as `pattern:\1`.

That is: we look ahead - and if there's a word `pattern:\w+`, then match it as `pattern:\1`.

Why? That's because the lookahead finds a word `pattern:\w+` as a whole and we capture it into the pattern with `pattern:\1`. So we essentially implemented a possessive plus `pattern:+` quantifier. It captures only the whole word `pattern:\w+`, not a part of it.

For instance, in the word `subject:JavaScript` it may not only match `match:Java`, but leave out `match:Script` to match the rest of the pattern.

Here's the comparison of two patterns:

```js run
alert( "JavaScript".match(/\w+Script/)); // JavaScript
alert( "JavaScript".match(/(?=(\w+))\1Script/)); // null
```

1. In the first variant `pattern:\w+` first captures the whole word `subject:JavaScript` but then `pattern:+` backtracks character by character, to try to match the rest of the pattern, until it finally succeeds (when `pattern:\w+` matches `match:Java`).
2. In the second variant `pattern:(?=(\w+))` looks ahead and finds the word  `subject:JavaScript`, that is included into the pattern as a whole by `pattern:\1`, so there remains no way to find `subject:Script` after it.

We can put a more complex regular expression into `pattern:(?=(\w+))\1` instead of `pattern:\w`, when we need to forbid backtracking for `pattern:+` after it.

```smart
There's more about the relation between possessive quantifiers and lookahead in articles [Regex: Emulate Atomic Grouping (and Possessive Quantifiers) with LookAhead](http://instanceof.me/post/52245507631/regex-emulate-atomic-grouping-with-lookahead) and [Mimicking Atomic Groups](http://blog.stevenlevithan.com/archives/mimic-atomic-groups).
```

Let's rewrite the first example using lookahead to prevent backtracking:

```js run
let regexp = /^((?=(\w+))\2\s?)*$/;

alert( regexp.test("A good string") ); // true

let str = "An input string that takes a long time or even makes this regex to hang!";

alert( regexp.test(str) ); // false, works and fast!
```

Here `pattern:\2` is used instead of `pattern:\1`, because there are additional outer parentheses. To avoid messing up with the numbers, we can give the parentheses a name, e.g. `pattern:(?<word>\w+)`.

```js run
// parentheses are named ?<word>, referenced as \k<word>
let regexp = /^((?=(?<word>\w+))\k<word>\s?)*$/;

let str = "An input string that takes a long time or even makes this regex to hang!";

alert( regexp.test(str) ); // false

alert( regexp.test("A correct string") ); // true
```

The problem described in this article is called "catastrophic backtracking".

We covered two ways how to solve it:
- Rewrite the regexp to lower the possible combinations count.
- Prevent backtracking.
