# Мышь: IE8-, исправление события

Ранее мы говорили о различных несовместимостях при работе с событиями для IE8-. Самая главная -- это, конечно, назначение событий при помощи `attachEvent/detachEvent` вместо `addEventListener/removeEventListener` и отсутствие фазы перехвата. Но и в самом объекте события есть различия.

Что касается событий мыши, различия в свойствах можно легко исправить при помощи функции `fixEvent`, которая описана в этой главе.

[cut]

```warn header="Только IE8-"
Эта глава и описанная далее функция `fixEvent` нужны только для поддержки IE8-.

Если IE8- для Вас неактуален, то пролистывайте дальше, это читать Вам не надо.
```

Функция `fixEvent` предназначена для запуска в начале обработчика, вот так:

```js
elem.onclick = function(event) {
*!*
  // если IE8-, то получить объект события window.event и исправить его
  event = event || fixEvent.call(this, window.event);
*/!*
  ...
}
```

Она добавит объекту события в IE8- следующие стандартные свойства:

- `target`
- `currentTarget` -- если обработчик назначен не через `attachEvent`.
- `relatedTarget` -- для `mouseover/mouseout` и `mouseenter/mouseleave`.
- `pageX/pageY`
- `which`

Код функции:

```js
function fixEvent(e) {

  e.currentTarget = this;
  e.target = e.srcElement;

  if (e.type == 'mouseover' || e.type == 'mouseenter') e.relatedTarget = e.fromElement;
  if (e.type == 'mouseout' || e.type == 'mouseleave') e.relatedTarget = e.toElement;

  if (e.pageX == null && e.clientX != null) {
    var html = document.documentElement;
    var body = document.body;

    e.pageX = e.clientX + (html.scrollLeft || body && body.scrollLeft || 0);
    e.pageX -= html.clientLeft || 0;

    e.pageY = e.clientY + (html.scrollTop || body && body.scrollTop || 0);
    e.pageY -= html.clientTop || 0;
  }

  if (!e.which && e.button) {
    e.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0));
  }

  return e;
}
```

Эта функция может быть полезна, если не используются JavaScript-фреймворки, в которых есть свои средства сглаживания кросс-браузерных различий.
