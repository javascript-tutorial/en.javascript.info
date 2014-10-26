# Подсказка
Надвиньте элемент с текстом на `INPUT` при помощи отрицательного `margin`.

# Решение

Надвинем текст на `INPUT` при помощи отрицательного `margin-top`. Поднять следует на одну строку, т.е. на `1.25em`, можно для красоты чуть больше -- `1.3em`:

Также нам понадобится обнулить "родной" `margin` у `INPUT`, чтобы не сбивал вычисления.

```html
<!--+ run -->
<style>
  input {
    *!*margin: 0;*/!* 
    width: 12em;
  }

  #placeholder {
    color: red;
*!*
    margin: -1.3em 0 0 0.2em;
*/!*
  }
</style>

<input type="password" id="input">
<div id="placeholder">Скажи пароль, друг</div>
```

[edit src="solution"]Полный код решения[/edit]