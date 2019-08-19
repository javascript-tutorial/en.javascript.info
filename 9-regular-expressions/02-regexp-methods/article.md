# Methods of RegExp and String

There are two sets of methods to deal with regular expressions.

1. First, regular expressions are objects of the built-in [RegExp](mdn:js/RegExp) class, which provides many methods.
2. Additionally, there are methods in regular strings that can work with regexps.


## Recipes

Which method to use depends on what we'd like to do.

Methods become much easier to understand if we separate them by their use in real-life tasks.

So, here are general recipes, the details to follow:

**To search for all matches:**

Use regexp `g` flag and:
- Get a flat array of matches -- `str.match(reg)`
- Get an array or matches with details -- `str.matchAll(reg)`.

**To search for the first match only:**
- Get the full first match -- `str.match(reg)` (without `g` flag).
- Get the string position of the first match -- `str.search(reg)`.
- Check if there's a match -- `regexp.test(str)`.
- Find the match from the given position -- `regexp.exec(str)` (set `regexp.lastIndex` to position).

**To replace all matches:**
- Replace with another string or a function result -- `str.replace(reg, str|func)`

**To split the string by a separator:**
- `str.split(str|reg)`

Now you can continue reading this chapter to get the details about every method... But if you're reading for the first time, then you probably want to know more about regexps. So you can move to the next chapter, and then return here if something about a method is unclear.

## str.search(reg)

We've seen this method already. It returns the position of the first match or `-1` if none found:

```js run
let str = "A drop of ink may make a million think";

alert( str.search( *!*/a/i*/!* ) ); // 0 (first match at zero position)
```

**The important limitation: `search` only finds  the first match.**

We can't find next matches using `search`, there's just no syntax for that. But there are other methods that can.

## str.match(reg), no "g" flag

The behavior of `str.match` varies depending on whether `reg` has `g` flag or not.

First, if there's no `g` flag, then `str.match(reg)` looks for the first match only.

The result is an array with that match and additional properties:

- `index` -- the position of the match inside the string,
- `input` -- the subject string.

For instance:

```js run
let str = "Fame is the thirst of youth";

let result = str.match( *!*/fame/i*/!* );

alert( result[0] );    // Fame (the match)
alert( result.index ); // 0 (at the zero position)
alert( result.input ); // "Fame is the thirst of youth" (the string)
```

A match result may have more than one element.

**If a part of the pattern is delimited by parentheses `(...)`, then it becomes a separate element in the array.**

If parentheses have a name, designated by `(?<name>...)` at their start, then `result.groups[name]` has the content. We'll see that later in the chapter [about groups](info:regexp-groups).

For instance:

```js run
let str = "JavaScript is a programming language";

let result = str.match( *!*/JAVA(SCRIPT)/i*/!* );

alert( result[0] ); // JavaScript (the whole match)
alert( result[1] ); // script (the part of the match that corresponds to the parentheses)
alert( result.index ); // 0
alert( result.input ); // JavaScript is a programming language
```

Due to the `i` flag the search is case-insensitive, so it finds `match:JavaScript`. The part of the match that corresponds to `pattern:SCRIPT` becomes a separate array item.

So, this method is used to find one full match with all details.


## str.match(reg) with "g" flag

When there's a `"g"` flag, then `str.match` returns an array of all matches. There are no additional properties in that array, and parentheses do not create any elements.

For instance:

```js run
let str = "HO-Ho-ho!";

let result = str.match( *!*/ho/ig*/!* );

alert( result ); // HO, Ho, ho (array of 3 matches, case-insensitive)
```

Parentheses do not change anything, here we go:

```js run
let str = "HO-Ho-ho!";

let result = str.match( *!*/h(o)/ig*/!* );

alert( result ); // HO, Ho, ho
```

**So, with `g` flag `str.match` returns a simple array of all matches, without details.**

If we want to get information about match positions and contents of parentheses then we should use `matchAll`  method that we'll cover below.

````warn header="If there are no matches, `str.match` returns `null`"
Please note, that's important. If there are no matches, the result is not an empty array, but `null`.

Keep that in mind to evade pitfalls like this:

```js run
let str = "Hey-hey-hey!";

alert( str.match(/Z/g).length ); // Error: Cannot read property 'length' of null
```

Here `str.match(/Z/g)` is `null`, it has no `length` property.
````

## str.matchAll(regexp)

The method `str.matchAll(regexp)` is used to find all matches with all details.

For instance:

```js run
let str = "Javascript or JavaScript? Should we uppercase 'S'?";

let result = str.matchAll( *!*/java(script)/ig*/!* );

let [match1, match2] = result;

alert( match1[0] ); // Javascript (the whole match)
alert( match1[1] ); // script (the part of the match that corresponds to the parentheses)
alert( match1.index ); // 0
alert( match1.input ); // = str (the whole original string)

alert( match2[0] ); // JavaScript (the whole match)
alert( match2[1] ); // Script (the part of the match that corresponds to the parentheses)
alert( match2.index ); // 14
alert( match2.input ); // = str (the whole original string)
```

````warn header="`matchAll` returns an iterable, not array"
For instance, if we try to get the first match by index, it won't work:

```js run
let str = "Javascript or JavaScript??";

let result = str.matchAll( /javascript/ig );

*!*
alert(result[0]); // undefined (?! there must be a match)
*/!*
```

The reason is that the iterator is not an array. We need to run `Array.from(result)` on it, or use `for..of` loop to get matches.

In practice, if we need all matches, then `for..of` works, so it's not a problem.

And, to get only few matches, we can use destructuring:

```js run
let str = "Javascript or JavaScript??";

*!*
let [firstMatch] = str.matchAll( /javascript/ig );
*/!*

alert(firstMatch); // Javascript
```
````

```warn header="`matchAll` is supernew, may need a polyfill"
The method may not work in old browsers. A polyfill might be needed (this site uses core-js).

Or you could make a loop with `regexp.exec`, explained below.
```

## str.split(regexp|substr, limit)

Splits the string using the regexp (or a substring) as a delimiter.

We already used `split` with strings, like this:

```js run
alert('12-34-56'.split('-')) // array of [12, 34, 56]
```

But we can split by a regular expression, the same way:

```js run
alert('12-34-56'.split(/-/)) // array of [12, 34, 56]
```

## str.replace(str|reg, str|func)

This is a generic method for searching and replacing, one of most useful ones. The swiss army knife for searching and replacing.  

We can use it without regexps, to search and replace a substring:

```js run
// replace a dash by a colon
alert('12-34-56'.replace("-", ":")) // 12:34-56
```

There's a pitfall though.

**When the first argument of `replace` is a string, it only looks for the first match.**

You can see that in the example above: only the first `"-"` is replaced by `":"`.

To find all dashes, we need to use not the string `"-"`, but a regexp `pattern:/-/g`, with an obligatory `g` flag:

```js run
// replace all dashes by a colon
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
```

The second argument is a replacement string. We can use special characters in it:

| Symbol | Inserts |
|--------|--------|
|`$$`|`"$"` |
|`$&`|the whole match|
|<code>$&#096;</code>|a part of the string before the match|
|`$'`|a part of the string after the match|
|`$n`|if `n` is a 1-2 digit number, then it means the contents of n-th parentheses counting from left to right, otherwise it means a parentheses with the given name |


For instance if we use `$&` in the replacement string, that means "put the whole match here".

Let's use it to prepend all entries of `"John"` with `"Mr."`:

```js run
let str = "John Doe, John Smith and John Bull";

// for each John - replace it with Mr. and then John
alert(str.replace(/John/g, 'Mr.$&'));  // Mr.John Doe, Mr.John Smith and Mr.John Bull
```

Quite often we'd like to reuse parts of the source string, recombine them in the replacement or wrap into something.

To do so, we should:
1. First, mark the parts by parentheses in regexp.
2. Use `$1`, `$2` (and so on) in the replacement string to get the content matched by 1st, 2nd and so on parentheses.

For instance:

```js run
let str = "John Smith";

// swap first and last name
alert(str.replace(/(john) (smith)/i, '$2, $1')) // Smith, John
```

**For situations that require "smart" replacements, the second argument can be a function.**

It will be called for each match, and its result will be inserted as a replacement.

For instance:

```js run
let i = 0;

// replace each "ho" by the result of the function
alert("HO-Ho-ho".replace(/ho/gi, function() {
  return ++i;
})); // 1-2-3
```

In the example above the function just returns the next number every time, but usually the result is based on the match.

The function is called with arguments `func(str, p1, p2, ..., pn, offset, input, groups)`:

1. `str` -- the match,
2. `p1, p2, ..., pn` -- contents of parentheses (if there are any),
3. `offset` -- position of the match,
4. `input` -- the source string,
5. `groups` -- an object with named groups (see chapter [](info:regexp-groups)).

If there are no parentheses in the regexp, then there are only 3 arguments: `func(str, offset, input)`.

Let's use it to show full information about matches:

```js run
// show and replace all matches
function replacer(str, offset, input) {
  alert(`Found ${str} at position ${offset} in string ${input}`);
  return str.toLowerCase();
}

let result = "HO-Ho-ho".replace(/ho/gi, replacer);
alert( 'Result: ' + result ); // Result: ho-ho-ho

// shows each match:
// Found HO at position 0 in string HO-Ho-ho
// Found Ho at position 3 in string HO-Ho-ho
// Found ho at position 6 in string HO-Ho-ho
```

In the example below there are two parentheses, so `replacer` is called with 5 arguments: `str` is the full match, then parentheses, and then `offset` and `input`:

```js run
function replacer(str, name, surname, offset, input) {
  // name is the first parentheses, surname is the second one
  return surname + ", " + name;
}

let str = "John Smith";

alert(str.replace(/(John) (Smith)/, replacer)) // Smith, John
```

Using a function gives us the ultimate replacement power, because it gets all the information about the match, has access to outer variables and can do everything.

## regexp.exec(str)

We've already seen these searching methods:

- `search` -- looks for the position of the match,
- `match` -- if there's no `g` flag, returns the first match with parentheses and all details,
- `match` -- if there's a `g` flag -- returns all matches, without details parentheses,
- `matchAll` -- returns all matches with details.

The `regexp.exec` method is the most flexible searching method of all. Unlike previous methods, `exec` should be called on a regexp, rather than on a string.

It behaves differently depending on whether the regexp has the `g` flag.

If there's no `g`, then `regexp.exec(str)` returns the first match, exactly as `str.match(reg)`. Such behavior does not give us anything new.

But if there's `g`, then:
- `regexp.exec(str)` returns the first match and *remembers* the position after it in `regexp.lastIndex` property.
- The next call starts to search from `regexp.lastIndex` and returns the next match.
- If there are no more matches then `regexp.exec` returns `null` and `regexp.lastIndex` is set to `0`.

We could use it to get all matches with their positions and parentheses groups in a loop, instead of `matchAll`:

```js run
let str = 'A lot about JavaScript at https://javascript.info';

let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at ${result.index}` );
  // shows: Found JavaScript at 12, then:
  // shows: Found javascript at 34
}
```

Surely, `matchAll` does the same, at least for modern browsers. But what `matchAll` can't do -- is to search from a given position.

Let's search from position `13`. What we need is to assign `regexp.lastIndex=13` and call `regexp.exec`:

```js run
let str = "A lot about JavaScript at https://javascript.info";

let regexp = /javascript/ig;
*!*
regexp.lastIndex = 13;
*/!*

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at ${result.index}` );
  // shows: Found javascript at 34
}
```

Now, starting from the given position `13`, there's only one match.


## regexp.test(str)

The method `regexp.test(str)` looks for a match and returns `true/false` whether it finds it.

For instance:

```js run
let str = "I love JavaScript";

// these two tests do the same
alert( *!*/love/i*/!*.test(str) ); // true
alert( str.search(*!*/love/i*/!*) != -1 ); // true
```

An example with the negative answer:

```js run
let str = "Bla-bla-bla";

alert( *!*/love/i*/!*.test(str) ); // false
alert( str.search(*!*/love/i*/!*) != -1 ); // false
```

If the regexp has `'g'` flag, then `regexp.test` advances `regexp.lastIndex` property, just like `regexp.exec`.

So we can use it to search from a given position:

```js run
let regexp = /love/gi;

let str = "I love JavaScript";

// start the search from position 10:
regexp.lastIndex = 10
alert( regexp.test(str) ); // false (no match)
```



````warn header="Same global regexp tested repeatedly may fail to match"
If we apply the same global regexp to different inputs, it may lead to wrong result, because `regexp.test` call advances `regexp.lastIndex` property, so the search in another string may start from non-zero position.

For instance, here we call `regexp.test` twice on the same text, and the second time fails:

```js run
let regexp = /javascript/g;  // (regexp just created: regexp.lastIndex=0)

alert( regexp.test("javascript") ); // true (regexp.lastIndex=10 now)
alert( regexp.test("javascript") ); // false
```

That's exactly because `regexp.lastIndex` is non-zero on the second test.

To work around that, one could use non-global regexps or re-adjust `regexp.lastIndex=0` before a new search.
````

## Summary

There's a variety of many methods on both regexps and strings.

Their abilities and methods overlap quite a bit, we can do the same by different calls. Sometimes that may cause confusion when starting to learn the language.

Then please refer to the recipes at the beginning of this chapter, as they provide solutions for the majority of regexp-related tasks.
