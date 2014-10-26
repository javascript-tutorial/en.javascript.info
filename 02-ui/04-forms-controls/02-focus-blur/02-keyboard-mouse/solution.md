# Алгоритм

Самый естественный алгоритм решения:
<ol>
<li>При клике мышонок получает фокус. Для этого нужно либо заменить `DIV` на другой тег, либо добавить ему `tabindex="-1"`.</li>
<li>Когда на элементе фокус, то клавиатурные события будут срабатывать прямо на нём. То есть ловим `mousie.onkeydown`.

Мы выбираем `keydown`, потому что он позволяет во-первых отлавливать нажатия на спец. клавиши (стрелки), а во-вторых, отменить действие браузера, которым по умолчанию является прокрутка страницы.
</li>
<li>При нажатии на стрелки двигаем мышонка через `position:absolute` и `top/left`.</li>
</ol>

Дальше решение -- попробуйте сделать сами. Возможны подводные камни :)

# Решение

<ol>
<li>
При получении фокуса -- готовим мышонка к перемещению:

```js
mousie.onfocus = function() {
  this.style.position = 'relative';
  this.style.left = '0px';
  this.style.top = '0px';
}
```

</li>
<li>Коды для клавиш стрелок можно узнать, нажимая на них на [тестовом стенде](#keyboard-test-stand). Вот они: 37-38-39-40 (влево-вверх-вправо-вниз).

При нажатии стрелки -- двигаем мышонка:

```js
mousie.onkeydown = function(e) {
  switch(e.keyCode) {
  case 37: // влево
    this.style.left = parseInt(this.style.left)-this.offsetWidth+'px';
    return false;
  case 38: // вверх
    this.style.top = parseInt(this.style.top)-this.offsetHeight+'px';
    return false;
  case 39: // вправо
    this.style.left = parseInt(this.style.left)+this.offsetWidth+'px';
    return false;
  case 40: // вниз
    this.style.top = parseInt(this.style.top)+this.offsetHeight+'px';
    return false;
  }
}
```

Обратите внимание, что действием по умолчанию для стрелок является прокрутка страницы. Поэтому, чтобы её отменить, нужно использовать `return false`.

Когда пользователь убирает фокус с мышки, то она перестает реагировать на клавиши. Нет нужды удалять обработчики на `blur`, потому что браузер перестанет вызывать `keydown`.
</li>
</ol>

**В решении выше есть проблема. Мышонок находится в `DIV` с `position:relative`.** Это означает, что его `left/top` являются координатами не относительно документа, а относительно позиционированного предка.

Что делать? Решений три.

<ol><li>Первое -- учесть этого позиционированного предка  при вычислении `left/top`, вычитать его координаты из координат относительно документа.</li>
<li>Второе -- сделать `position:fixed`. При этом координаты мышонка можно взять напрямую из [mousie.getBoundingClientRect()](https://developer.mozilla.org/en/DOM/element.getBoundingClientRect), т.е. все вычисления выполнять относительно окна. Это больше компьютерно-игровой подход, чем работа с документом.</li>
<li>Третье -- переместить мышонка под `document.body` в начале движения. Тогда и с координатами всё будет в порядке. Но при этом могут "слететь" стили.</li>
</ol>

Хочется верить, что первое и второе решения понятны. А вот третье более интересно, так как скрывает новые тонкости.

Если пойти этим путём, то в обработчик `onfocus` следует добавить перемещение мышонка под `BODY`:

```js
mousie.onfocus = function() {
  var coords = getCoords(this);

*!*
  document.body.appendChild(this);
*/!*
  
  this.style.position = 'absolute';
  this.style.left = coords.left + 'px';
  this.style.top = coords.top + 'px';
};
```

...Но вот беда! **При `document.body.appendChild(this)` с элемента слетает фокус!** 

Фокус нужно восстановить, чтобы ловить `keydown`. Однако некоторые браузеры, например FF и IE, не дают вызвать метод `focus()` элемента из его обработчика `onfocus`. То есть сделать это нельзя.

Чтобы это обойти, можно поставить обработчик не `onfocus`, а `onclick`:

```js
mousie.onclick = function() {
  var coords = getCoords(this);
  this.style.position = 'absolute';
  this.style.left = coords.left + 'px';
  this.style.top = coords.top + 'px';

*!*
  if (this.parentNode != document.body) {
    document.body.appendChild(this);
    this.focus();
  }
*/!*
};
```

Обычно событие `focus` всё равно происходит *после* `click`, но здесь элемент перемещается, поэтому оно "съедается" и мы инициируем его сами вызовом `focus()`.

[edit src="solution"]Окончательное решение[/edit]