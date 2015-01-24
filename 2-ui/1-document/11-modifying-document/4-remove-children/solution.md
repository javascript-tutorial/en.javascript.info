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

Не сработает потому, что коллекция `childNodes` всегда начинается с индекса 0 и автоматически обновляется, когда первый потомок удален(т.е. тот, что был вторым, станет первым). А переменная `k` в цикле всё время увеличивается, поэтому такой цикл пропустит половину узлов.

# Решение через DOM

Правильное решение:

```js
function removeChildren(elem) {
  while(elem.lastChild) {
    elem.removeChild(elem.lastChild);
  }
}
```

# Альтернатива через innerHTML

Можно и просто обнулить содержимое через `innerHTML`:

```js
function removeChildren(elem) {
  elem.innerHTML = '';
}
```

Это не будет работать в IE8- для таблиц, так как на большинстве табличных элементов (кроме ячеек `TH/TD`) в старых IE запрещено менять `innerHTML`.

Впрочем, можно завернуть `innerHTML` в `try/catch`:

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

