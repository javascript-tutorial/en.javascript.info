**Первый код выведет `function ...`, второй -- ошибку во всех браузерах, кроме IE8-.**

```js
//+ run untrusted no-beautify
// обычное объявление функции (Function Declaration)
function g() { return 1; }; 

alert(g); // функция
```

Во втором коде скобки есть, значит функция внутри является не `Function Declaration`, а частью выражения, то есть `Named Function Expression`. Его имя видно только внутри, снаружи переменная `g` не определена.

```js
//+ run untrusted no-beautify
// Named Function Expression!
(function g() { return 1; }); 

alert(g);  // Ошибка!
```

Все браузеры, кроме IE8-, поддерживают это ограничение видимости и выведут ошибку, `"undefined variable"`.