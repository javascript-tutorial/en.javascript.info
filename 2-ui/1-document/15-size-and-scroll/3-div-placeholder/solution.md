Нам нужно создать `div` с такими же размерами и вставить его на место "переезжающего".

Один из вариантов -- это просто клонировать элемент.

Если делать это при помощи `div.cloneNode(true)`, то склонируется все содержимое, которого может быть много. Обычно нам это не нужно, поэтому можно использовать `div.cloneNode(false)` для клонирования элемента со стилями, и потом поправить его `width/height`.

Можно и просто создать новый `div` и поставить ему нужные размеры.

**Всё, кроме `margin`, можно получить из свойств DOM-элемента, а `margin` -- только через `getComputedStyle`.**

Причём `margin` мы обязаны поставить, так как иначе наш элемент при вставке будет вести себя иначе, чем исходный.

Код:

```js
var div = document.getElementById('moving-div');

var placeHolder = document.createElement('div');
placeHolder.style.height = div.offsetHeight + 'px';
// можно и width, но в этом примере это не обязательно

// IE || другой браузер
var computedStyle = div.currentStyle || getComputedStyle(div, '');

placeHolder.style.marginTop = computedStyle.marginTop; // (1)
placeHolder.style.marginBottom = computedStyle.marginBottom;
```

В строке `(1)` использование полного название свойства `"marginTop"` гарантирует, что полученное значение будет корректным.