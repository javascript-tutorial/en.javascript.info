Для определения примитивного типа строка/число подойдет оператор [typeof](#type-typeof).

Примеры его работы:

```js
//+ run
alert( typeof 123 ); // "number"
alert( typeof "строка" ); // "string"
alert( typeof new Date() ); // "object"
alert( typeof [] ); // "object"
```

Оператор `typeof` не умеет различать разные типы объектов, они для него все на одно лицо: `"object"`. Поэтому он не сможет отличить `Date` от `Array`.

Для отличия `Array` используем вызов `Array.isArray`. Если он неверен, значит у нас дата.