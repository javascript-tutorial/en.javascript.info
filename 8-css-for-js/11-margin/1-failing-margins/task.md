# Нерабочие margin?

[importance 3]

В примере ниже находится блок `.block` фиксированной высоты, а в нём -- прямоугольник `.spacer`.

При помощи `margin-left: 20%` и `margin-right: 20%`, прямоугольник центрирован в родителе по горизонтали. Это работает.

Далее делается попытка при помощи свойств `height: 80%`, `margin-top: 10%` и  `margin-bottom: 10%` расположить прямоугольник в центре по вертикали, чтобы сам элемент занимал `80%` высоты родителя, а сверху и снизу был одинаковый отступ.

Однако, как видите, это не получается. Почему? Как поправить?

```html
<!--+ autorun run  no-beautify -->
  
<style>
  .block {
    height: 150px;

    border: 1px solid #CCC;
    background: #eee;
  }

  .spacer {
    margin-left: 20%;
    margin-right: 20%;

*!*   
    height: 80%;
    margin-top: 10%;
    margin-bottom: 10%;
*/!*

    border: 1px solid black;
    background: #FFF;
  }
</style>
 
<div class="block">
  <div class="spacer"></div>
</div>
```

