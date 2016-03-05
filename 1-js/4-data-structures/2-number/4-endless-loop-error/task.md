importance: 4

---

# An occasional infinite loop

This loop is infinite. It never ends. Why?

```js
let i = 0;
while (i != 10) {
  i += 0.2;
}
```

