# Сделайте меню ссылками

[importance 5]

Возьмите в качестве исходного кода меню на шаблонах и модифицируйте его, чтобы вместо массива `items` оно принимало *объект* `items`, вот так:

```js
var menu = new Menu({ 
  title: "Сладости",
  template: _.template($('#menu-template').html()),
  listTemplate: _.template($('#menu-list-template').html()),
*!*
  items: {
    "donut": "Пончик", 
    "cake": "Пирожное", 
    "chocolate": "Шоколадка"
  }
*/!*
});
```

Вывод в шаблоне пусть будет не просто `<li>Пончик</li>`, а через ссылку: `<a href="#donut">Пончик</a>`.

При клике на ссылку должно выводиться название из её `href`. Демо:

[iframe src="solution" height="130" border="1"]

[edit src="task"]Исходное меню[/edit]
