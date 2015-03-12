# Длина коллекции после удаления элементов

[importance 5]

Вот небольшой документ:

```html
<ul id="menu">
  <li>Главная страница</li>
  <li>Форум</li>
  <li>Магазин</li>
</ul>
```

1. Что выведет следующий код (простой вопрос)?

```js
var lis = document.body.getElementsByTagName('li');

document.body.innerHTML = "";

alert( lis.length );
```

2. А такой код (вопрос посложнее)?

```js
var menu = document.getElementById('menu');
var lis = menu.getElementsByTagName('li');

document.body.innerHTML = "";

alert( lis.length );
```

