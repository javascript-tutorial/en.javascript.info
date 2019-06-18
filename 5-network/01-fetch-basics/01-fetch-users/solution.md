
To fetch a user we need:

1. `fetch('https://api.github.com/users/USERNAME')`.
2. If the response has status `200`, call `.json()` to read the JS object.

If a `fetch` fails, or the response has non-200 status, we just return `null` in the resulting arrray.

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

That's an example of how low-level `Promise` API can still be useful even if we mainly use `async/await`.
