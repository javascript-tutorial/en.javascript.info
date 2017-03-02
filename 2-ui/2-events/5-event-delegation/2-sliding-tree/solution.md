# Схема решения

Дерево устроено как вложенный список.

Клики на все элементы можно поймать, повесив единый обработчик `onclick` на внешний `UL`.

Как поймать клик на заголовке? Элемент `LI` является блочным, поэтому нельзя понять, был ли клик на *тексте*, или справа от него.

Например, ниже -- участок дерева с выделенными рамкой узлами. Кликните справа от любого заголовка. Видите, клик ловится? А лучше бы такие клики (не на тексте) игнорировать.

```html autorun height=190 untrusted
<style>
  li {
    border: 1px solid green;
  }
</style>

<ul onclick="alert(event.target)">
  <li>Млекопетающие
    <ul>
      <li>Коровы</li>
      <li>Ослы</li>
      <li>Собаки</li>
      <li>Тигры</li>
    </ul>
  </li>
</ul>
```

В примере выше видно, что проблема в верстке, в том что `LI` занимает всю ширину. Можно кликнуть справа от текста, это все еще `LI`.

Один из способов это поправить -- обернуть заголовки в дополнительный элемент `SPAN`, и обрабатывать только клики внутри `SPAN'ов`, получать по `SPAN'у` его родителя `LI` и ставить ему класс открыт/закрыт.

Напишите для этого JavaScript-код.

# Оборачиваем заголовки в SPAN

Следующий код ищет все `LI` и оборачивает текстовые узлы в `SPAN`.

```js
var treeUl = document.getElementsByTagName('ul')[0];

var treeLis = treeUl.getElementsByTagName('li');

for (var i = 0; i < treeLis.length; i++) {
  var li = treeLis[i];

  var span = document.createElement('span');
  li.insertBefore(span, li.firstChild); // добавить пустой SPAN
  span.appendChild(span.nextSibling); // переместить в него заголовок
}
```

Теперь можно отслеживать клики *на заголовках*.

Так выглядит дерево с обёрнутыми в `SPAN` заголовками и делегированием:

```html autorun height=190 untrusted
<style>
  span {
    border: 1px solid red;
  }
</style>

<ul onclick="alert(event.target.tagName)">
  <li><span>Млекопетающие</span>
    <ul>
      <li><span>Коровы</span></li>
      <li><span>Ослы</span></li>
      <li><span>Собаки</span></li>
      <li><span>Тигры</span></li>
    </ul>
  </li>
</ul>
```

Так как `SPAN` -- инлайновый элемент, он всегда такого же размера как текст. Да здравствует `SPAN`!

В реальной жизни дерево, скорее всего, будет сразу со `SPAN`: если HTML-код дерева генерируется на сервере, то это несложно, если дерево генерируется в JavaScript -- тем более просто.

# Итоговое решение

Для делегирования нужно по клику понять, на каком узле он произошел.

В нашем случае у `SPAN` нет детей-элементов, поэтому не нужно подниматься вверх по цепочке родителей. Достаточно просто проверить `event.target.tagName == 'SPAN'`, чтобы понять, где был клик, и спрятать потомков.

```js
var tree = document.getElementsByTagName('ul')[0];

tree.onclick = function(event) {
  var target = event.target;

  if (target.tagName != 'SPAN') {
    return; // клик был не на заголовке
  }

  var li = target.parentNode; // получить родительский LI

  // получить UL с потомками -- это первый UL внутри LI
  var childrenContainer = li.getElementsByTagName('ul')[0];

  if (!childrenContainer) return; // потомков нет -- ничего не надо делать

  // спрятать/показать (можно и через CSS-класс)
  childrenContainer.hidden = !childrenContainer.hidden;
}
```

Выделение узлов жирным при наведении делается при помощи CSS-селектора `:hover`.

