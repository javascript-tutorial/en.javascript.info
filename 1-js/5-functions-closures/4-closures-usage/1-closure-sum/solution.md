Чтобы вторые скобки в вызове работали - первые должны возвращать функцию. 

Эта функция должна знать про `a` и уметь прибавлять `a` к `b`. Вот так:

```js
//+ run
function sum(a) {

  return function(b) {
    return a + b; // возьмет a из внешнего LexicalEnvironment
  };

}

alert( sum(1)(2) );
alert( sum(5)(-1) );
```

