Ответ: **`BODY`**.

```html
<!--+ run -->
<script>
var body = document.body;

body.innerHTML = "<!--" + body.tagName + "-->"; 

alert(body.firstChild.data); // BODY
</script>
```

Происходящее по шагам:
<ol>
<li>Заменяем содержимое `<body>` на комментарий. Он будет иметь вид <code>&lt;!--BODY--&gt;</code>, так как `body.tagName == "BODY"`. Как мы помним, свойство `tagName` в HTML всегда находится в верхнем регистре.</li>
<li>Этот комментарий теперь является первым и единственным потомком `body.firstChild`.</li>
<li>Получим значение `data` для комментария `body.firstChild`. Оно равно содержимому узла для всех узлов, кроме элементов. Содержимое комментария: `"BODY"`.</li>
</ol>