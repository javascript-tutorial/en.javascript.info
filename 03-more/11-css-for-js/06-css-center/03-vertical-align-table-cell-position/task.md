# vertical-align + table-cell + position = ?

[importance 5]

В коде ниже используется вертикальное центрирование при помощи `table-cell + vertical-align`.

Почему оно не работает? Нажмите на просмотр, чтобы увидеть (стрелка должна быть в центре по вертикали).

```html
<!--+ run height=70 -->
<style>
  .arrow {
    position: absolute;
    height: 60px;
    border: 1px solid black;
    font-size: 28px;

*!*
    display: table-cell;
    vertical-align: middle;
*/!*
  }
</style>

<div class="arrow">«</div>
```

Как починить центрирование при помощи CSS? Свойства `position/height` менять нельзя.