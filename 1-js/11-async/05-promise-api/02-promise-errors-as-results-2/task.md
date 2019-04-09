# Fault-tolerant fetch with JSON

Improve the solution of the previous task <info:task/promise-errors-as-results>. Now we need not just to call `fetch`, but to load the JSON objects from the given URLs.

Here's the example code to do that:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// make fetch requests
Promise.all(urls.map(url => fetch(url)))
  // map each response to response.json()
  .then(responses => Promise.all(
    responses.map(r => r.json())
  ))
  // show name of each user
  .then(users => {  // (*)
    for(let user of users) {
      alert(user.name);
    }
  });
```

The problem is that if any of requests fails, then `Promise.all` rejects with the error, and we lose results of all the other requests. So the code above is not fault-tolerant, just like the one in the previous task.

Modify the code so that the array in the line `(*)` would include parsed JSON for successful requests and error for errored ones.

Please note that the error may occur both in `fetch` (if the network request fails) and in `response.json()` (if the response is invalid JSON). In both cases the error should become a member of the results object.

The sandbox has both of these cases.
