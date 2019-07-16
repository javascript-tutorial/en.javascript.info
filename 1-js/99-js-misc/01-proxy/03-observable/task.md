
# Observable

Create a function `makeObservable(target)` that "makes the object observable" by returning a proxy.

Here's how it should work:

```js run
function makeObservable(target) {
  /* your code */
}

let user = {};
user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John"; // alerts: SET name=John
```

In other words, an object returned by `makeObservable` has the method `observe(handler)` that allows to add `handler` function to be called on a property change.

Whenever a property changes, `handler(key, value)` is called with the name and value o the property.

P.S. In this task, please handle only writing to a property. Other operations can be implemented in a similar way.
