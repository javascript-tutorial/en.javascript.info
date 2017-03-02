importance: 5

---

# Which handlers run?

There's a button in the variable. There are no handlers on it.

Which handlers run on click after the following code? Which alerts show up?

```js no-beautify
button.addEventListener("click", () => alert("1"));

button.removeEventListener("click", () => alert("1"));

button.onclick = () => alert(2);
```
