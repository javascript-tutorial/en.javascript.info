Код для полифилла здесь особенно прост. 

Реализовывать ничего не надо, просто записать нужный метод в `Element.prototype.matches`, если его там нет:

```js
(function() {

  // проверяем поддержку
  if (!Element.prototype.matches) {

    // определяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector || 
      Element.prototype.webkitMatchesSelector || 
      Element.prototype.mozMatchesSelector || 
      Element.prototype.msMatchesSelector,

  }

})();
```

