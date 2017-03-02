Это -- классическая задача на тему делегирования.

В реальной жизни, мы можем перехватить событие и создать AJAX-запрос к серверу, который сохранит информацию о том, по какой ссылке ушел посетитель.

Мы перехватываем событие на `contents` и поднимаемся до `parentNode` пока не получим `A` или не упремся в контейнер.

```js
contents.onclick = function(evt) {
  var target = evt.target;

  function handleLink(href) {
    var isLeaving = confirm('Уйти на ' + href + '?');
    if (!isLeaving) return false;
  }

  while (target != this) {
    if (target.nodeName == 'A') {
*!*
      return handleLink(target.getAttribute('href')); // (*)
*/!*
    }
    target = target.parentNode;
  }
};
```

В строке `(*)` используется атрибут, а не свойство `href`, чтобы показать в `confirm` именно то, что написано в HTML-атрибуте, так как свойство может отличаться, оно обязано содержать полный валидный адрес.

