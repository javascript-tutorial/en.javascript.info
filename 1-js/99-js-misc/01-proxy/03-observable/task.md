
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

In other words, an object returned by `makeObservable` is just like the original one, but also has the method `observe(handler)` that sets `handler` function to be called on any property change.

Whenever a property changes, `handler(key, value)` is called with the name and value of the property.

P.S. In this task, please only take care about writing to a property. Other operations can be implemented in a similar way.
