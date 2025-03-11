importance: 2

---

# What is the result of alert (||=, &&=)?

What is the result of `alert` here?

```js
let value = NaN;

value &&= 10;
value ||= 20;
value &&= 30;
value ||= 40;

alert(value);
```