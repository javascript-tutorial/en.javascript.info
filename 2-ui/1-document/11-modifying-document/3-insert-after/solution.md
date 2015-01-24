Для того, чтобы добавить элемент *после* `refElem`, мы можем, используя `insertBefore`, вставить его *перед* `refElem.nextSibling`.

Но что если `nextSibling` нет? Это означает, что `refElem` является последним потомком своего родителя и можем использовать `appendChild`.

Код:

```js
function insertAfter(elem, refElem) {
  var parent = refElem.parentNode;
  var next = refElem.nextSibling;
  if (next) {
      return parent.insertBefore(elem, next);
  } else {
      return parent.appendChild(elem);
  }
}
```

Но код может быть гораздо короче, если вспомнить, что `insertBefore` со вторым аргументом null работает как `appendChild`:

```js
function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}
```

Если нет `nextSibling`, то второй аргумент `insertBefore` становится `null` и тогда `insertBefore(elem, null)` осуществит вставку в конец, как и требуется.

В решении нет проверки на существование `refElem.parentNode`, поскольку вставка после элемента без родителя -- уже ошибка, пусть она возникнет в функции, это нормально.