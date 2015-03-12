# Подсказка

Центрирование не работает из-за `position: absolute`.

# Решение

Центрирование не работает потому, что `position: absolute` автоматически меняет элементу `display` на `block`. 

В однострочном случае можно сделать центрирование при помощи `line-height`:

```html
<!--+ run  no-beautify -->
<style>
  .arrow {
    position: absolute;
    height: 60px;
    border: 1px solid black;
    font-size: 28px;

*!*
    line-height: 60px;
*/!*
  }
</style>

<div class="arrow">«</div>
```

Если же центрировать нужно несколько строк или блок, то есть и другие [техники центрирования](/css-center), которые сработают без `display:table-cell`.