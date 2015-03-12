# removeChildren

[importance 5]

Напишите функцию `removeChildren`, которая удаляет всех потомков элемента.

```html
<table id="table">
  <tr>
    <td>Это</td>
    <td>Все</td>
    <td>Элементы DOM</td>
  </tr>
</table>

<ol id="ol">
  <li>Вася</li>
  <li>Петя</li>
  <li>Маша</li>
  <li>Даша</li>
</ol>

<script>
  function removeChildren(elem) { /* ваш код */ }

  removeChildren(table); // очищает таблицу
  removeChildren(ol); // очищает список
</script>
```
