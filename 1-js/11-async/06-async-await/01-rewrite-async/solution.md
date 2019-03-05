
The notes are below the code:

```js run
async function loadJson(url) { // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }

  throw new Error(response.status);
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404 (4)
```

Notes:

1. The function `loadUrl` becomes `async`.
2. All `.then` inside are replaced with `await`.
3. We can `return response.json()` instead of awaiting for it, like this:

    ```js
    if (response.status == 200) {
      return response.json(); // (3)
    }
    ```

    Then the outer code would have to `await` for that promise to resolve. In our case it doesn't matter.
4. The error thrown from `loadJson` is handled by `.catch`. We can't use `await loadJson(…)` there, because we're not in an `async` function.
