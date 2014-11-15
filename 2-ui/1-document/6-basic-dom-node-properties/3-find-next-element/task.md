# Найти следующий элемент

[importance 5]

Напишите функцию `getNextElement(elem)`, которая возвращает следующий за `elem` узел-элемент (игнорирует остальные узлы).


Пример:

```html
<div>Первый</div>
<!-- комментарий... -->
<p>Второй</p>

<script>
function getNextElement(elem) { /* ваш код */ }

*!*
alert(getNextElement(document.body.children[0]).tagName); // P
alert(getNextElement(document.body.lastChild)); // null
*/!*
</script>
```

[edit src="source" /]

P.S. Функция должна работать максимально эффективно и учитывать возможности современных браузеров.