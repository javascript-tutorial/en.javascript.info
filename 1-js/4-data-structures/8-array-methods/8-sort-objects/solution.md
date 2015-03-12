Для сортировки объявим и передадим в `sort` анонимную функцию, которая сравнивает объекты по полю `age`:

```js
//+ run no-beautify
*!*
// Наша функция сравнения
function compareAge(personA, personB) {
  return personA.age - personB.age;
}
*/!*

// проверка
var vasya = { name: "Вася", age: 23 };
var masha = { name: "Маша", age: 18 };
var vovochka = { name: "Вовочка", age: 6 };

var people = [ vasya , masha , vovochka ];

people.sort(compareAge);

// вывести
for(var i = 0; i < people.length; i++) {
  alert(people[i].name); // Вовочка Маша Вася
}
```

