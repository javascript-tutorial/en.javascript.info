
That's the case when knowing how it works inside is helpful.

Just treat `async` call as promise and attach `.then` to it:
```js run
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // shows 10 after 1 second
*!*
  wait().then(result => alert(result));
*/!*
}

f();
```
