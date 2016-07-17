importance: 5

---

# Calling in an array context

What is the result? Why?

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2](); // ?
```

