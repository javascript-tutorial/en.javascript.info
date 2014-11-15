# Скругленая кнопка со стилями из JavaScript

[importance 3]

Создайте кнопку в виде элемента `<a>` с заданным стилем, используя JavaScript.

В примере ниже такая кнопка создана при помощи HTML/CSS. В вашем решении кнопка должна создаваться, настраиваться и добавляться в документ при помощи *только JavaScript*, без тегов `<style>` и `<a>`.

```html
<!--+ autorun height="50" -->
<style>
  .button {
    -moz-border-radius: 8px;
    -webkit-border-radius: 8px;
    border-radius: 8px;
    border: 2px groove green;
    display: block;
    height: 30px;
    line-height: 30px;
    width: 100px;
    text-decoration: none;
    text-align: center;
    color: red;
    font-weight: bold;
  }
</style>

<a class="button" href="/">Нажми меня</a>
```

**Проверьте себя: вспомните, что означает каждое свойство. В чём состоит эффект его появления здесь?**

[edit src="source" task/] 
