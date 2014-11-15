# Какие обработчики сработают?

[importance 5]

В переменной `button` находится кнопка. 

Изначально обработчиков на ней нет.
 
Что будет выведено при клике после выполнения кода?

```js
button.addEventListener("click", function() { alert("1"); }, false);

button.removeEventListener("click", function() { alert("1"); }, false);

button.onclick = function() { alert(2); };
```

