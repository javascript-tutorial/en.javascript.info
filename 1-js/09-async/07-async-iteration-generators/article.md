
# Async iteration and generators

Asynchronous iterators allow to iterate over data that comes asynchronously, on-demand.

For instance, when we download something chunk-by-chunk, or just expect a events to come asynchronously and would like to iterate over that -- async iterators and generators may come in handy.

Let's see a simple example first, to grasp the syntax, and then build a real-life example.

## Async iterators

Asynchronous iterators are totally similar to regular iterators, with a few syntactic differences.

Here's a small cheatsheet:

|       | Iterators | Async iterators |
|-------|-----------|-----------------|
| Object method to provide iteraterable | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` return value is              | any value         | `Promise`  |
| to loop, use                          | `for..of`         | `for await..of` |

Let's make an iterable `range` object, like we did in the chapter [](info:iterable), but now it will return values asynchronously, one per second:

```js run
let range = {
  from: 1,
  to: 5,

  // for await..of calls this method once in the very beginning
*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    // ...it returns the iterator object:
    // onward, for await..of works only with that object, asking it for next values
    return {
      current: this.from,
      last: this.to,

      // next() is called on each iteration by the for..of loop
*!*
      async next() { // (2)
        // it should return the value as an object {done:.., value :...}
        // (automatically wrapped into a promise by async)
*/!*

        // can use await inside, do async stuff:
        await new Promise(resolve => setTimeout(resolve, 1000)); // (4)

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

*!*
  for await (let value of range) { // (3)
    alert(value); // 1,2,3,4,5
  }
*/!*

})()
```

As we can see, the components are similar to regular iterators:

1. To make an object asynchronously iterable, it must have a method `Symbol.asyncIterator` `(1)`.
2. To iterate, we use `for await(let value of range)` `(3)`, namely add "await" after "for".
3. It calls `range[Symbol.asyncIterator]` and expects it to return an object with `next` `(3)` method returning a promise.
4. Then `next()` is called to obtain values. In that example values come with a delay of 1 second `(4)`.

````warn header="A spread operator doesn't work asynchronously"
Features that require regular, synchronous iterators, don't work with asynchronous ones.

For instance, a spread operator won't work:
```js
alert( [...range] ); // Error, no Symbol.iterator
```

That's natural, as it expects to find `Symbol.iterator`, and there's none.
````

## Async generators

Javascript also provides generators, that are also iterable.

Let's recall a sequence generator from the chapter [](info:generators):

```js run
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}
```

Normally, we can't use `await` in generators. But what if we need to?

No problem, let's make an async generator, like this:

```js run
*!*async*/!* function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

*!*
    // yay, can use await!
    await new Promise(resolve => setTimeout(resolve, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for *!*await*/!* (let value of generator) {
    alert(value); // 1, then 2, then 3, then 4, then 5
  }

})();
```

So simple, a little bit magical. We add the `async` keyword, and the generator now can use `await` inside of it, rely on promises and other async functions.

Technically, the difference of such generator is that `generator.next()` method is now asynchronous.

Instead of `result = generator.next()` for a regular, non-async generator, values can be obtained like this:

```js
result = await generator.next(); // result = {value: ..., done: true/false}
```

## Iterables via async generators

When we'd like to make an object iterable, we should add `Symbol.iterator` to it. A common practice is to implement it via a generator, just because that's simple.

Let's recall an example from the chapter [](info:generators):

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

for(let value of range) {
  alert(value); // 1, then 2, then 3, then 4, then 5
}
```

Here a custom object `range` was made iterable, the generator `*[Symbol.iterator]` implements the logic behind listing values.

We can make it iterable asynchronously by replacing `Symbol.iterator` with `Symbol.asyncIterator` and marking it `async`:

```js run
let range = {
  from: 1,
  to: 5,

*!*
  async *[Symbol.asyncIterator]() { // same as [Symbol.asyncIterator]: async function*()
*/!*
    for(let value = this.from; value <= this.to; value++) {

      // make a pause between values, wait for something  
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for *!*await*/!* (let value of range) {
    alert(value); // 1, then 2, then 3, then 4, then 5
  }

})();
```

## Real-life example

There are many online APIs that deliver paginated data. For instance, when we need a list of users, then we can fetch it page-by-page: a request returns a pre-defined count (e.g. 100 users), and provides an URL to the next page.

The pattern is very common, it's not about users, but just about anything. For instance, Github allows to retrieve commits in the same, paginated fasion:

- We should make a request to URL in the form `https://api.github.com/repos/(repo)/commits`.
- It responds with a JSON of 30 commits, and also provides a link to the next page in the `Link` header.
- Then we can use it for the next request, if need more commits, and so on.

What we'd like to have is an iterable source of commits, so that we could do it like this:

```js
let repo = 'iliakan/javascript-tutorial-en'; // Github repository to get commits from

for await (let commit of fetchCommits(repo)) {
  // process commit
}
```

We'd like `fetchCommits` to get commits for us, making requests whenever needed. And let it care about all pagination stuff.

With async generators that's pretty easy to implement:

```js
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github requires user-agent header
    });

    const body = await response.json(); // (2) parses response as JSON (array of commits)

    // (3) the URL of the next page is in the headers, extract it
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage && nextPage[1];

    url = nextPage;

    for(let commit of body) { // (4) yield commits one by one, until the page ends
      yield commit;
    }
  }
}
```

1. We use the browser `fetch` method to download from a remote URL. It allows to supply authorization and other headers if needed (Github requires User-Agent).
2. The result is parsed as JSON.
3. ...And we extract the next page URL from the `Link` header of the response. It has a special format, so we use a regexp for that. The next page URL may look like this: `https://api.github.com/repositories/93253246/commits?page=2`, it's generatd by Github itself.
4. Then we yield all commits received, and when they finish -- the next `while(url)` iteration will trigger, making one more request.

An example of use (shows commit authors in console):

```js run
(async () => {

  let count = 0;

  for await (const commit of fetchCommits('iliakan/javascript-tutorial-en')) {

    console.log(commit.author.login);

    if (++count == 100) { // let's stop at 100 commits
      break;
    }
  }

})();
```

The internal mechanics is invisible from the outside. What we see -- is an async generator that returns commits, just what we need.

## Summary

Regular iterators and generators work fine with the data that doesn't take time to generate.

When we expect the data to come asynchronously, with delays, their async counterparts can be used, and `for await..of` instead of `for..of`.

Syntax differences between async and regular iterators:

|       | Iterators | Async iterators |
|-------|-----------|-----------------|
| Object method to provide iteraterable | `Symbol.iterator` | `Symbol.asyncIterator` |
| `next()` return value is              | any value         | `Promise`  |

Syntax differences between async and regular generators:

|       | Generators | Async generators |
|-------|-----------|-----------------|
| Declaration | `function*` | `async function*` |
| `generator.next()` returns              | `{value:…, done: true/false}`         | `Promise` that resolves to `{value:…, done: true/false}`  |

In web-development we often meet streams of data, when it flows chunk-by-chunk. For instance, downloading or uploading a big file.

We could use async generators to process such data, but there's also another API called Streams, that may be more convenient. It's not a part of Javascript language standard though.

Streams and async generators complement each other, both are great ways to handle async data flows.
