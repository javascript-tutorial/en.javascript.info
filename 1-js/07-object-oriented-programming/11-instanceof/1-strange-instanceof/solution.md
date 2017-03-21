Yeah, looks strange indeed.

But `instanceof` does not care about the function, but rather about its `prototype`, that it matches against the prototype chain.

And here `a.__proto__ == B.prototype`, so `instanceof` returns `true`.

So, by the logic of `instanceof`, the `prototype` actually defines the type, not the constructor function.
