importance: 5

---

# Add method "f.defer(ms)" to functions

Add to the prototype of all functions the method `defer(ms)`, that runs the function after `ms` milliseconds.

After you do it, such code should work:

```js
function f() {
  alert("Hello!");
}

f.defer(1000); // shows "Hello!" after 1 second
```
