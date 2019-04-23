
# Generators

Regular functions return only one, single value (or nothing).

Generators can return ("yield") multiple values, possibly an infinite number of values, one after another, on-demand. They work great with [iterables](info:iterable), allowing to create data streams with ease.

## Generator functions

To create a generator, we need a special syntax construct: `function*`, so-called "generator function".

It looks like this:

```js
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
```

When `generateSequence()` is called, it does not execute the code. Instead, it returns a special object, called "generator".

```js
// "generator function" creates "generator object"
let generator = generateSequence();
```

The `generator` object can be perceived as a "frozen function call":

![](generateSequence-1.png)

Upon creation, the code execution is paused at the very beginning.

The main method of a generator is `next()`. When called, it resumes execution till the nearest `yield <value>` statement. Then the execution pauses, and the value is returned to the outer code.

For instance, here we create the generator and get its first yielded value:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

*!*
let one = generator.next();
*/!*

alert(JSON.stringify(one)); // {value: 1, done: false}
```

The result of `next()` is always an object:
- `value`: the yielded value.
- `done`: `false` if the code is not finished yet, otherwise `true`.

As of now, we got the first value only:

![](generateSequence-2.png)

Let's call `generator.next()` again. It resumes the execution and returns the next `yield`:

```js
let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false}
```

![](generateSequence-3.png)

And, if we call it the third time, then the execution reaches `return` statement that finishes the function:

```js
let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, *!*done: true*/!*}
```

![](generateSequence-4.png)

Now the generator is done. We should see it from `done:true` and process `value:3` as the final result.

New calls `generator.next()` don't make sense any more. If we make them, they return the same object: `{done: true}`.

There's no way to "roll back" a generator. But we can create another one by calling `generateSequence()`.

So far, the most important thing to understand is that generator functions, unlike regular function, do not run the code. They serve as "generator factories". Running `function*` returns a generator, and then we ask it for values.

```smart header="`function* f(…)` or `function *f(…)`?"
That's a minor religious question, both syntaxes are correct.

But usually the first syntax is preferred, as the star `*` denotes that it's a generator function, it describes the kind, not the name, so it should stick with the `function` keyword.
```

## Generators are iterable

As you probably already guessed looking at the `next()` method, generators are [iterable](info:iterable).

We can get loop over values by `for..of`:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, then 2
}
```

That's a much better-looking way to work with generators than calling `.next().value`, right?

...But please note: the example above shows `1`, then `2`, and that's all. It doesn't show `3`!

It's because for-of iteration ignores the last `value`, when `done: true`. So, if we want all results to be shown by `for..of`, we must return them with `yield`:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
*!*
  yield 3;
*/!*
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, then 2, then 3
}
```

Naturally, as generators are iterable, we can call all related functionality, e.g. the spread operator `...`:

```js run
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let sequence = [0, ...generateSequence()];

alert(sequence); // 0, 1, 2, 3
```

In the code above, `...generateSequence()` turns the iterable into array of items (read more about the spread operator in the chapter [](info:rest-parameters-spread-operator#spread-operator))

## Using generators instead of iterables

Some time ago, in the chapter [](info:iterable) we created an iterable `range` object that returns values `from..to`.

Here, let's remember the code:

```js run
let range = {
  from: 1,
  to: 5,

  // for..of calls this method once in the very beginning
  [Symbol.iterator]() {
    // ...it returns the iterator object:
    // onward, for..of works only with that object, asking it for next values
    return {
      current: this.from,
      last: this.to,

      // next() is called on each iteration by the for..of loop
      next() {
        // it should return the value as an object {done:.., value :...}
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

alert([...range]); // 1,2,3,4,5
```

Using a generator to make iterable sequences is so much more elegant:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

let sequence = [...generateSequence(1,5)];

alert(sequence); // 1, 2, 3, 4, 5
```

...But what if we'd like to keep a custom `range` object?

## Converting Symbol.iterator to generator

We can get the best from both worlds by providing a generator as `Symbol.iterator`:

```js run
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

alert( [...range] ); // 1,2,3,4,5
```

The `range` object is now iterable.

That works pretty well, because when `range[Symbol.iterator]` is called:
- it returns an object (now a generator)
- that has `.next()` method (yep, a generator has it)
- that returns values in the form `{value: ..., done: true/false}` (check, exactly what generator does).

That's not a coincidence, of course. Generators aim to make iterables easier, so we can see that.

The last variant with a generator is much more concise than the original iterable code, and keeps the same functionality.

```smart header="Generators may continue forever"
In the examples above we generated finite sequences, but we can also make a generator that yields values forever. For instance, an unending sequence of pseudo-random numbers.

That surely would require a `break` in `for..of`, otherwise the loop would repeat forever and hang.
```

## Generator composition

Generator composition is a special feature of generators that allows to transparently "embed" generators in each other.

For instance, we'd like to generate a sequence of:
- digits `0..9` (character codes 48..57),
- followed by alphabet letters `a..z` (character codes 65..90)
- followed by uppercased letters `A..Z` (character codes 97..122)

Then we plan to create passwords by selecting characters from it (could add syntax characters as well), but need to generate the sequence first.

We already have `function* generateSequence(start, end)`. Let's reuse it to deliver 3 sequences one after another, together they are exactly what we need.

In a regular function, to combine results from multiple other functions, we call them, store the results, and then join at the end.

For generators, we can do better, like this:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

*!*
  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);
*/!*

}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```

The special `yield*` directive in the example is responsible for the composition. It *delegates* the execution to another generator. Or, to say it simple, it runs generators and transparently forwards their yields outside, as if they were done by the calling generator itself.

The result is the same as if we inlined the code from nested generators:

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generateAlphaNum() {

*!*
  // yield* generateSequence(48, 57);
  for (let i = 48; i <= 57; i++) yield i;

  // yield* generateSequence(65, 90);
  for (let i = 65; i <= 90; i++) yield i;

  // yield* generateSequence(97, 122);
  for (let i = 97; i <= 122; i++) yield i;
*/!*

}

let str = '';

for(let code of generateAlphaNum()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```

A generator composition is a natural way to insert a flow of one generator into another.

It works even if the flow of values from the nested generator is infinite. It's simple and doesn't use extra memory to store intermediate results.

## "yield" is a two-way road

Till this moment, generators were like "iterators on steroids". And that's how they are often used.

But in fact they are much more powerful and flexible.

That's because `yield` is a two-way road: it not only returns the result outside, but also can pass the value inside the generator.

To do so, we should call `generator.next(arg)`, with an argument. That argument becomes the result of `yield`.

Let's see an example:

```js run
function* gen() {
*!*
  // Pass a question to the outer code and wait for an answer
  let result = yield "2 + 2?"; // (*)
*/!*

  alert(result);
}

let generator = gen();

let question = generator.next().value; // <-- yield returns the value

generator.next(4); // --> pass the result into the generator  
```

![](genYield2.png)

1. The first call `generator.next()` is always without an argument. It starts the execution and returns the result of the first `yield` ("2+2?"). At this point the generator pauses the execution (still on that line).
2. Then, as shown at the picture above, the result of `yield` gets into the `question` variable in the calling code.
3. On `generator.next(4)`, the generator resumes, and `4` gets in as the result: `let result = 4`.

Please note, the outer code does not have to immediately call`next(4)`. It may take time to calculate the value. This is also a valid code:

```js
// resume the generator after some time
setTimeout(() => generator.next(4), 1000);
```

The syntax may seem a bit odd. It's quite uncommon for a function and the calling code to pass values around to each other. But that's exactly what's going on.

To make things more obvious, here's another example, with more calls:

```js run
function* gen() {
  let ask1 = yield "2 + 2?";

  alert(ask1); // 4

  let ask2 = yield "3 * 3?"

  alert(ask2); // 9
}

let generator = gen();

alert( generator.next().value ); // "2 + 2?"

alert( generator.next(4).value ); // "3 * 3?"

alert( generator.next(9).done ); // true
```

The execution picture:

![](genYield2-2.png)

1. The first `.next()` starts the execution... It reaches the first `yield`.
2. The result is returned to the outer code.
3. The second `.next(4)` passes `4` back to the generator as the result of the first `yield`, and resumes the execution.
4. ...It reaches the second `yield`, that becomes the result of the generator call.
5. The third `next(9)` passes `9` into the generator as the result of the second `yield` and resumes the execution that reaches the end of the function, so `done: true`.

It's like a "ping-pong" game. Each `next(value)` (excluding the first one) passes a value into the generator, that becomes the result of the current `yield`, and then gets back the result of the next `yield`.

## generator.throw

As we observed in the examples above, the outer code may pass a value into the generator, as the result of `yield`.

...But it can also initiate (throw) an error there. That's natural, as an error is a kind of result.

To pass an error into a `yield`, we should call `generator.throw(err)`. In that case, the `err` is thrown in the line with that `yield`.

For instance, here the yield of `"2 + 2?"` leads to an error:

```js run
function* gen() {
  try {
    let result = yield "2 + 2?"; // (1)

    alert("The execution does not reach here, because the exception is thrown above");
  } catch(e) {
    alert(e); // shows the error
  }
}

let generator = gen();

let question = generator.next().value;

*!*
generator.throw(new Error("The answer is not found in my database")); // (2)
*/!*
```

The error, thrown into the generator at the line `(2)` leads to an exception in the line `(1)` with `yield`. In the example above, `try..catch` catches it and shows.

If we don't catch it, then just like any exception, it "falls out" the generator into the calling code.

The current line of the calling code is the line with `generator.throw`, labelled as `(2)`. So we can catch it here, like this:

```js run
function* generate() {
  let result = yield "2 + 2?"; // Error in this line
}

let generator = generate();

let question = generator.next().value;

*!*
try {
  generator.throw(new Error("The answer is not found in my database"));
} catch(e) {
  alert(e); // shows the error
}
*/!*
```

If we don't catch the error there, then, as usual, it falls through to the outer calling code (if any) and, if uncaught, kills the script.

## Summary

- Generators are created by generator functions `function*(…) {…}`.
- Inside generators (only) there exists a `yield` operator.
- The outer code and the generator may exchange results via `next/yield` calls.

In modern JavaScript, generators are rarely used. But sometimes they come in handy, because the ability of a function to exchange data with the calling code during the execution is quite unique.

Also, in the next chapter we'll learn async generators, which are used to read streams of asynchronously generated data in `for` loop.

In web-programming we often work with streamed data, e.g. need to fetch paginated results, so that's a very important use case.
