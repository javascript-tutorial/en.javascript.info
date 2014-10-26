# Семантическое меню

[importance 5]

Посмотрите на вёрстку горизонтального меню.

```html
<div class="rounded-horizontal-blocks">
  <div class="item">Главная</div>
  <div class="vertical-splitter">|</div>
  <div class="item">Товары</div>
  <div class="item">Фотографии</div>
  <div class="item">Контакты</div>
</div>
```



```css
/*+ hide="Результат со стилями (показать стили)" */
.rounded-horizontal-blocks .item {
  float: left;
  padding: 6px;
  margin: 0 2px;

  border: 1px solid gray;
  border-radius: 10px;

  cursor: pointer;
  font-size: 90%;
  background: #FFF5EE;
}

.vertical-splitter {
  float: left;
  padding: 6px;
  margin: 0 2px;
}

.item:hover {
  text-decoration: underline;
}
```

[iframe src="task" border=1 height=50 edit link]

Что делает эту вёрстку несемантичной? Найдите 3 ошибки.

Как бы вы сверстали меню правильно?
