# Сделайте меню ссылками

[importance 5]

Возьмите в качестве исходного кода меню на шаблонах и модифицируйте его, чтобы оно выводило не просто список, а список ссылок.

<ol>
<li>Вместо массива `items` меню должно принимать *объект* `items`, вот так:

```js
var menu = new Menu({ 
  title: "Сладости",
  template: _.template(document.getElementById('menu-template').innerHTML),
  listTemplate: _.template(document.getElementById('menu-list-template').innerHTML),
*!*
  items: {
    "donut": "Пончик", 
    "cake": "Пирожное", 
    "chocolate": "Шоколадка"
  }
*/!*
});
```
</ol>
<li>Вывод в шаблоне пусть будет не просто `<li>Пончик</li>`, а через ссылку: `<a href="#donut">Пончик</a>`. При клике на ссылку должно выводиться название из её `href`.</li>
</ol>

Демо:

[iframe src="solution" height="130" border="1"]
