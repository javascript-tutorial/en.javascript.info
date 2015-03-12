# Тег в комментарии

[importance 3]

Что выведет этот код?

```html
<script>
  var body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // что выведет?
</script>
```

