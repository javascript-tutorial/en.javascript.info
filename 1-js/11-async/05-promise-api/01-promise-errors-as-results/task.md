# Fault-tolerant Promise.all

We'd like to fetch multiple URLs in parallel.

Here's the code to do that:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

Promise.all(urls.map(url => fetch(url)))
  // for each response show its status
  .then(responses => { // (*)
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`);
    }
  });
```

The problem is that if any of requests fails, then `Promise.all` rejects with the error, and we lose the results of all the other requests.

That's not good.

Modify the code so that the array `responses` in the line `(*)` would include the response objects for successful fetches and error objects for failed ones.

For instance, if one of the URLs is bad, then it should be like:

```js
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'http://no-such-url'
];

Promise.all(...) // your code to fetch URLs...
  // ...and pass fetch errors as members of the resulting array...
  .then(responses => {  
    // 3 urls => 3 array members
    alert(responses[0].status); // 200
    alert(responses[1].status); // 200
    alert(responses[2]); // TypeError: failed to fetch (text may vary)
  });
```

P.S. In this task you don't have to load the full response using `response.text()` or `response.json()`. Just handle fetch errors the right way.
