Добавим в документ `DIV` с кнопкой:

```html
<div id="updown"></div>
```

Сама кнопка должна иметь `position:fixed`.

```css
#updown {
  position: fixed;
  top: 30px;
  left: 10px;
  cursor: pointer;
}
```

Кнопка является CSS-спрайтом, поэтому мы дополнительно добавляем ей размер и два состояния:

```css
#updown {
  height: 9px;
  width: 14px;
  position: fixed;
  top: 30px;
  left: 10px;
  cursor: pointer;
}

#updown.up {
  background: url(...updown.gif) left top;
}

#updown.down {
  background: url(...updown.gif) left -9px;
}
```

Для решения необходимо аккуратно разобрать все возможные состояния кнопки и указать, что делать при каждом.

Состояние -- это просто класс элемента: `up/down` или пустая строка, если кнопка не видна.

При прокрутке состояния меняются следующим образом:

```js
window.onscroll = function() {
  var pageY = window.pageYOffset || document.documentElement.scrollTop;
  var innerHeight = document.documentElement.clientHeight;

  switch (updownElem.className) {
    case '':
      if (pageY > innerHeight) {
        updownElem.className = 'up';
      }
      break;

    case 'up':
      if (pageY < innerHeight) {
        updownElem.className = '';
      }
      break;

    case 'down':
      if (pageY > innerHeight) {
        updownElem.className = 'up';
      }
      break;
  }
}
```

При клике:

```js
var pageYLabel = 0;

updownElem.onclick = function() {
  var pageY = window.pageYOffset || document.documentElement.scrollTop;

  switch (this.className) {
    case 'up':
      pageYLabel = pageY;
      window.scrollTo(0, 0);
      this.className = 'down';
      break;

    case 'down':
      window.scrollTo(0, pageYLabel);
      this.className = 'up';
  }

}
```

