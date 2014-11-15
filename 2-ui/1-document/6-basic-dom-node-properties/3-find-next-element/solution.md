# Менее эффективный вариант

Цикл по правым соседям в поисках узла-элемента:

```html
<!--+ run -->
<div>Первый</div>
<!-- комментарий... -->
<p>Второй</p>

<script>
*!*
function getNextElement(elem) {
  var current = elem.nextSibling;

  while(current && current.nodeType != 1) {
    current = current.nextSibling;
  }
 
  // два варианта окончания цикла:
  // current == null (нет следующего узла-элемента)
  // current.nodeType == 1 (нашли)
  return current;
}
*/!*

alert(getNextElement(document.body.children[0]).tagName); // "P"
alert(getNextElement(document.body.lastChild)); // null
</script>
```

# Более эффективный вариант

Все браузеры, кроме IE<9, поддерживают свойство `nextElementSibling`. Воспользуемся этим.

```html
<!--+ run -->
<div>Первый</div>
<!-- комментарий... -->
<p>Второй</p>

<script>
function getNextElement(elem) {
*!*
  if (elem.nextElementSibling !== undefined) {
    return elem.nextElementSibling;
  }
*/!*
  var current = elem.nextSibling;

  while(current && current.nodeType != 1) {
    current = current.nextSibling;
  }
 
  // два варианта окончания цикла:
  // current == null (нет следующего узла-элемента)
  // current.nodeType == 1 (нашли)
  return current;
}

alert(getNextElement(document.body.children[0]).tagName); // "P"
alert(getNextElement(document.body.lastChild)); // null
</script>
```

В выделенном фрагменте мы проверяем поддержку этого свойства. Если оно поддерживается, то равно либо элементу-соседу, либо `null`, если такого соседа нет. В любом случае это не `undefined`.

Если же оно не поддерживается, то производим те же вычисления, что в предыдущем решении.

# Ещё более эффективный вариант

Поддержка свойства `nextElementSibling` в браузере либо есть, либо её нет. Зачем проверять её для каждого элемента? Можно сделать это один раз и запомнить результат. А можно поступить ещё лучше -- определить функцию по-разному, в зависимости от того, поддерживается это свойство или нет.

```html
<!--+ run -->
<div>Первый</div>
<!-- комментарий... -->
<p>Второй</p>

<script>
*!*
var getNextElement = 
  document.documentElement.nextElementSibling !== undefined ?
  function(elem) {
    return elem.nextElementSibling;
  }
  :
  function(elem) {
    var current = elem.nextSibling;
    while(current && current.nodeType != 1) {
      current = current.nextSibling;
    }
    return current;
  };
*/!*

alert(getNextElement(document.body.children[0]).tagName); // "P"
alert(getNextElement(document.body.lastChild)); // null
</script>
```

