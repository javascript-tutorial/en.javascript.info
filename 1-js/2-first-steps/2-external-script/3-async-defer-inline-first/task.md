# Что выполнится первым из скриптов?

[importance 4]

В этой странице есть три скрипта. 

Какой выполнится первым?

```html
<script defer src="small.js"></script>
<script async src="big.js"></script>

<script defer async>
  alert( "обычный скрипт" );
</script>
```

