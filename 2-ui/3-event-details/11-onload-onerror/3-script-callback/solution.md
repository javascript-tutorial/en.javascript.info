# Подсказка

Добавляйте `SCRIPT` при помощи методов `DOM`:

```js
var script = document.createElement('script');
script.src = src;

// в документе может не быть HEAD или BODY,
// но хотя бы один (текущий) SCRIPT в документе есть
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(script, s); // перед ним и вставим
```

На скрипт повесьте обработчики `onload/onreadystatechange`.

# Решение

