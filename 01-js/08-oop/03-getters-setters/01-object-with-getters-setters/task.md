# Написать объект с геттерами и сеттерами

[importance 4]

Напишите конструктор `User` для создания объектов:
<ul>
<li>С приватными свойствами имя `firstName` и фамилия `surname`.</li>
<li>С сеттерами для этих свойств.</li>
<li>С геттером `getFullName()`, который возвращает полное имя.</li>
</ul>

Должен работать так:

```js
function User() {
  /* ваш код */
}

var user = new User();
user.setFirstName("Петя");
user.setSurname("Иванов");

alert( user.getFullName() ); // Петя Иванов
```

