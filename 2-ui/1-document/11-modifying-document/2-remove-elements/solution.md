Родителя `parentNode` можно получить из `elem`.

Нужно учесть два момента.
<ol>
<li>Родителя может не быть (элемент уже удален или еще не вставлен). В этом случае мы не будем ничего делать.</li>
<li>Для совместимости со стандартным методом нужно вернуть удаленный элемент.</li>
</ol>

Вот так выглядит решение:

```js
function remove(elem) {
  var parent = elem.parentNode;
  if (parent) elem.parentNode.removeChild(elem);
  return elem;
}
```

