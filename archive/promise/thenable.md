````smart header="Thenables"
To be precise, any object that has a method `.then` is treated as a promise here. So we can use custom "promise-compatible" objects in the chain. Such objects are called "thenable".

Here's an example:

```js run
class Thenable {
  constructor(result, delay) {
    this.result = result;
  }
  then(resolve, reject) {
    setTimeout(() => resolve(this.result * 2), delay);
  }
};

new Promise(resolve => resolve(1))
  .then(result => {
    return new Thenable(result, 1000);
  })
  .then(alert); // shows 2 after 1000ms
```

That allows to use custom implementations of promises from 3rd-party libraries along with native promises.
````

