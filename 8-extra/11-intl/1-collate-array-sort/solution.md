Здесь подойдут стандартные параметры сравнения:

```js
//+ run
var animals = ["тигр", "ёж", "енот", "ехидна", "АИСТ", "ЯК"];

*!*
var collator = new Intl.Collator();
animals.sort(function(a, b) {
  return collator.compare(a, b);
});
*/!*

alert(animals); // АИСТ,ёж,енот,ехидна,тигр,ЯК
```

А вот, что было бы при обычном вызове `sort()`:

```js
//+ run
var animals = ["тигр", "ёж", "енот", "ехидна", "АИСТ", "ЯК"];

*!*
alert( animals.sort() ); // АИСТ,ЯК,енот,ехидна,тигр,ёж
*/!*
```

