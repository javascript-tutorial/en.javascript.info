importance: 3

---

# Отследить одновременное нажатие

Создайте функцию `runOnKeys(func, code1, code2, ... code_n)`, которая запускает `func` при одновременном нажатии клавиш со скан-кодами `code1`, `code2`, ..., `code_n`.

Например, код ниже выведет `alert` при одновременном нажатии клавиш `"Q"` и `"W"` (в любом регистре, в любой раскладке)

```js no-beautify
runOnKeys(
  function() { alert("Привет!") },
  "Q".charCodeAt(0),
  "W".charCodeAt(0)
);
```

[demo src="solution"]
