importance: 5

---

# Extended hotkeys

Create a function `runOnKeys(func, key1, key2, ... key_n)` that runs `func` on simultaneous pressing of keys with values `key1`, `key2`, ..., `key_n`.

For instance, the code below shows `alert` when `"Q"` and `"W"` are pressed together (in any language, with or without CapsLock)

```js no-beautify
runOnKeys(
  () => alert("Hello!"),
  "Q",
  "W"
);
```

[demo src="solution"]
