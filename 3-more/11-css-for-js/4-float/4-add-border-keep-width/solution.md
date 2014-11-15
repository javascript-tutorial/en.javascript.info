# Подсказка

Используйте свойство `box-sizing`.

# Решение

Да, можно -- указываем `box-sizing: border-box` и добавляем свойства:

```html
<!--+ run -->
<style>
  .left {
    float:left; 
    width:30%; 
    background: #aef;
  }

  .right {
    float:right; 
    width:70%;

*!*
    box-sizing: border-box;
    -moz-box-sizing: border-box;

    border-left: 2px solid green;
    padding-left: 10px;
*/!*

    background: tan;
  }
</style>

<div class="left">
 Левая<br>Колонка
</div>
<div class="right">
 Правая<br>Колонка<br>...
</div>
```

