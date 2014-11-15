<ol>
<li>Расставим `__proto__`:

```js
//+ run
var head = {
  glasses: 1
};

var table = {
  pen: 3
};
table.__proto__ = head;

var bed = {
  sheet: 1,
  pillow: 2
};
bed.__proto__ = table;

var pockets = {
  money: 2000
};
pockets.__proto__ = bed;

alert( pockets.pen ); // 3
alert( bed.glasses ); // 1
alert( table.money ); // undefined
```

</li>
<li>**В современных браузерах, с точки зрения производительности, нет разницы, брать свойство из объекта или прототипа.** Они запоминают, где было найдено свойство и в следующий раз при запросе, к примеру, `pockets.glasses` начнут искать сразу в прототипе (`head`).</li>
</ol>