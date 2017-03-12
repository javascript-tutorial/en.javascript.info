importance: 5

---

# Extended hotkeys

Create a function `runOnKeys(func, code1, code2, ... code_n)` that runs `func` on simultaneous pressing of keys with codes `code1`, `code2`, ..., `code_n`.

For instance, the code below shows `alert` when `"Q"` and `"W"` are pressed together (in any language, with or without CapsLock)

```js no-beautify
runOnKeys(
  () => alert("Hello!"),
  "KeyQ",
  "KeyW"
);
```

[demo src="solution"]
