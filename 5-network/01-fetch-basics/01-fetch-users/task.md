# Fetch users from GitHub

Create an async function `getUsers(names)`, that gets an array of GitHub user names, fetches them from GitHub and returns an array of GitHub users instead.

The GitHub url with user informaiton is: `https://api.github.com/users/USERNAME`.

There's a test example in the sandbox.

Important details:

1. There should be one `fetch` request per user. And requests shouldn't wait for each other. So that the data arrives as soon as possible.
2. If a request fails, or if there's no such user, the function should return `null` in the resulting array.
