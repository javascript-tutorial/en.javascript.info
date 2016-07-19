importance: 4

---

# Which script executes first?

In the questions below, there are two scripts: `small.js` and `big.js`.

If we assume that `small.js` loads much faster compared to `big.js` -- which script executes first?

```html
<script src="big.js"></script>
<script src="small.js"></script>
```

What if we add `async`?

```html
<script async src="big.js"></script>
<script async src="small.js"></script>
```

What if we switch to `defer`?

```html
<script defer src="big.js"></script>
<script defer src="small.js"></script>
```

