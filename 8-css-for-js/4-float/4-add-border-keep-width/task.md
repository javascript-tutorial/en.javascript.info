# Добавить рамку, сохранив ширину

[importance 4]

Есть две колонки `30%/70%`:

```html
<!--+ autorun height=70 run play  no-beautify -->
<style>
  .left {
    float:left; 
    width:30%; 
    background: #aef;
  }

  .right {
    float:right; 
    width:70%;
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

Добавьте к правой колонке рамку `border-left` и отступ `padding-left`.

Двухколоночная вёрстка при этом не должна сломаться! 

Желательно не трогать свойство `width` ни слева ни справа и не создавать дополнительных элементов. 

