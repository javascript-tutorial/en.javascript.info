# Подсказки

<ul>
<li>Проверить поддержку `insertAdjacentHTML` можно так:

```js
if (elem.insertAdjacentHTML) { ... }
```

</li>
<li>Если этот метод не поддерживается, то сделайте временный элемент, через `innerHTML` поставьте туда `html`, а затем переместите содержимое в `DocumentFragment`. Последнее действие -- вставка в документ.</li>
</ul>

# Решение

```html
<!--+ run -->
<ul>
  <li>1</li>
  <li>2</li>
  <li>5</li>
</ul>

<script>
var ul = document.body.children[0];
var li5 = ul.children[2];

function insertBefore(elem, html) {
  if (elem.insertAdjacentHTML) {
    elem.insertAdjacentHTML("beforeBegin", html);
  } else {
    var fragment = document.createDocumentFragment();

    var tmp = document.createElement('DIV');

    tmp.innerHTML = html;

    while(tmp.firstChild) {
      // перенести все узлы во fragment
      fragment.appendChild(tmp.firstChild);
    }
    elem.parentNode.insertBefore(fragment, elem);
  }
}

insertBefore(li5, "<li>3</li><li>4</li>")
</script>
```

