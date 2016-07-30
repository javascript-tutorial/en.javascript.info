**Answer: an error.**

Try it:
```js run
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

alert( user.ref.name ); // Error: Cannot read property 'name' of undefined
```

That's because rules that set `this` do not look at object literals. 

Here the value of `this` inside `makeUser()` is `undefined`, because it is called as a function, not as a method.

And the object literal itself has no effect on `this`. The value of `this` is one for the whole function, code blocks and object literals do not affect it.

So `ref: this` actually takes current `this` of the function.

Here's the opposite case:

```js run
function makeUser() {
  return {
    name: "John",
*!*
    ref() {
      return this;
    }
*/!*
  };
};

let user = makeUser();

alert( user.ref().name ); // John
```

Now it works, because `user.ref()` is a method. And the value of `this` is set to the object before dot `.`.


