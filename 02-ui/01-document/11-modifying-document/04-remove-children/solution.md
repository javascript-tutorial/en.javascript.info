# Неправильное решение 

Для начала рассмотрим забавный пример того, как делать *не надо*:

```js
function removeChildren(elem) {
  for(var k=0; k<elem.childNodes.length;k++) {
    elem.removeChild(elem.childNodes[k]);
  }
}
```

Если вы попробуете это на практике, то увидите, то это не сработает.

Не сработает потому, что `childNodes` всегда начинается 0 и автоматически смещается, когда первый потомок удален(т.е. тот, что был вторым, станет первым), поэтому такой цикл по `k` пропустит половину узлов.

# Решение через DOM

Правильное решение:

```js
function removeChildren(elem) {
  while(elem.lastChild) {
    elem.removeChild(elem.lastChild);
  }
}
```

# Неправильное решение (innerHTML)

Прямая попытка использовать `innerHTML` была бы неправильной:

```js
function removeChildren(elem) {
  elem.innerHTML = '';
}
```

Дело в том, что в IE8- свойство `innerHTML` на большинстве табличных элементов (кроме ячеек `TH/TD`) не работает. Будет ошибка.

# Верное решение (innerHTML)

Можно завернуть `innerHTML` в `try/catch`:

```js
function removeChildren(elem) {
  try {
    elem.innerHTML = '';
  } catch(e) {
    while(elem.firstChild) { 
      elem.removeChild(elem.firstChild);
    }
  }
}
```

