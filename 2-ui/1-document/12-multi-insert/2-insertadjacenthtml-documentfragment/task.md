# Вставка insertAdjacentHTML/DocumentFragment

[importance 4]

Напишите кроссбраузерную функцию `insertBefore(elem, html)`, которая:

<ul>
<li>Вставляет HTML-строку `html` перед элементом `elem`, используя `insertAdjacentHTML`,</li>
<li>Если он не поддерживается (старый Firefox) -- то через `DocumentFragment`.</li>
</ul>

В обоих случаях должна быть лишь одна операция с DOM документа.

Следующий код должен вставить два пропущенных элемента списка `<li>3</li><li>4</li>`:

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>5</li>
</ul>

<script>
var ul = document.body.children[0];
var li5 = ul.children[2];

function insertBefore(elem, html) {
  /* ваш код */
}

insertBefore(li5, "<li>3</li><li>4</li>")
</script>
```

