# Координаты внешних углов

Координаты элемента возвращаются функцией [elem.getBoundingClientRect](https://developer.mozilla.org/en-US/docs/DOM/element.getBoundingClientRect). Она возвращает все координаты относительно окна в виде объекта со свойствами `left`, `top`, `right`, `bottom`.  Некоторые браузеры также добавляют `width`, `height`.

Так что координаты верхнего-левого `coords1` и правого-нижнего `coords4` внешних углов:

```js
var coords = elem.getBoundingClientRect();

var coords1 = [coords.left, coords.top];
var coords2 = [coords.right, coords.bottom];
```

# Левый-верхний угол внутри

Этот угол отстоит от наружных границ на размер рамки, который доступен через `clientLeft/clientTop`:

```js
var coords3 = [coords.left + field.clientLeft, coords.top + field.clientTop];
```

# Правый-нижний угол внутри

Этот угол отстоит от правой-нижней наружной границы на размер рамки. Так как нужная рамка находится справа-внизу, то специальных свойств для нее нет, но мы можем получить этот размер из CSS:

```js
var coords4 = [
  coords.right - parseInt(getComputedStyle(field).borderRightWidth) ,
  coords.bottom - parseInt(getComputedStyle(field).borderBottomWidth) 
]
```

Можно получить их альтернативным путем, прибавив `clientWidth/clientHeight` к координатам левого-верхнего внутреннего угла. Получится то же самое, пожалуй даже быстрее и изящнее.

```js
var coords4 = [
  coords.left + elem.clientLeft + elem.clientWidth ,
  coords.top + elem.clientTop + elem.clientHeight
]
```

[edit src="solution"]Полный код решения[/edit]