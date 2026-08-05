
To fetch a user we need: `fetch('https://api.github.com/users/USERNAME')`.

If the response has status `200`, call `.json()` to read the JS object.

Otherwise, if a `fetch` fails, or the response has non-200 status, we just return `null` in the resulting array.

So here's the code:

```js demo
async function getUsers(names) {
  let jobs = [];

  for(let name of names) {
    let job = fetch(`https://api.github.com/users/${name}`).then(
      successResponse => {
        if (successResponse.status != 200) {
          return null;
        } else {
          return successResponse.json();
        }
      },
      failResponse => {
        return null;
      }
    );
    jobs.push(job);
  }

  let results = await Promise.all(jobs);

  return results;
}
```

Please note: `.then` call is attached directly to `fetch`, so that when we have the response, it doesn't wait for other fetches, but starts to read `.json()` immediately.

If we used `await Promise.all(names.map(name => fetch(...)))`, and call `.json()` on the results, then it would wait for all fetches to respond. By adding `.json()` directly to each `fetch`, we ensure that individual fetches start reading data as JSON without waiting for each other.

That's an example of how low-level Promise API can still be useful even if we mainly use `async/await`.

**Alternative modern approach**

Nowadays, we can achieve the same parallel execution cleanly using pure `async/await` combined with `Promise.allSettled`. 

By wrapping the `fetch` and `.json()` calls inside an `async` callback for `.map()`, we ensure the requests execute independently. `Promise.allSettled` guarantees that a hard network failure in one request won't reject the entire batch, and using `.ok` simplifies the status check:

```js demo
const getUsers = async (names) => (await Promise.allSettled(
  names.map(async (name) => {
    const response = await fetch(`[https://api.github.com/users/$](https://api.github.com/users/$){name}`);
    return response.ok ? await response.json() : null;
  })
)).map(({ value = null }) => value);
```
