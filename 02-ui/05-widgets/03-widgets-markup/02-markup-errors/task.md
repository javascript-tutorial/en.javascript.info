# Ошибки в вёрстке

[importance 5]

Посмотрите на вёрстку "табов" (вкладок). Какие ошибки вы в ней видите? Как правильно?

```html
<div id="tabs" class="tabs">
  <ul class="headers">
    <li><a href="#tabs-1">Вкладка 1</a></li>
    <li><a href="#tabs-2">Вкладка 2</a></li>
    <li><a href="#tabs-3" class="selected">Открытая вкладка</a></li>
  </ul>
  <div id="tabs-1">Содержимое в первой вкладке.</div>
  <div id="tabs-2">Содержимое во второй вкладке.</div>
  <div id="tabs-3" class="selected">
    Посетитель видит содержимое третьей вкладки.
  </div>
</div>
```



```css
.tabs .headers { 
  /* стиль для заголовков вкладок */ 
}

.tabs .headers .selected {
  /* стиль для заголовка выбранной вкладки */
}

.tabs > div {
  /* стиль для обычной вкладки */
}

.tabs > div.selected {
  /* стиль для выбранной вкладки */
}
```

Примерный внешний вид:

<img src="tabs-example.png">