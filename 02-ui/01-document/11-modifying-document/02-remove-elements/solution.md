Родителя `parentNode` можно получить из `elem`.

Нужно учесть два момента.
<ol>
<li>Родителя может не быть (элемент уже удален или еще не вставлен).</li>
<li>Для совместимости со стандартным методом нужно вернуть удаленный элемент.</li>
</ol>

Вот так выглядит решение:

```js
function remove(elem) {
  return elem.parentNode ? elem.parentNode.removeChild(elem) : elem;
}
```

