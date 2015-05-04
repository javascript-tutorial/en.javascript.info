Код для этого полифилла имеет стандартный вид:

```js
(function() {

  // проверяем поддержку
  if (!Element.prototype.closest) {

    // реализуем
    Element.prototype.closest = function(css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }

})();
```

Обратим внимание, что код этого полифилла использует `node.matches`, то есть может в свою очередь потребовать полифилла для него. Это типичная ситуация -- один полифилл тянет за собой другой. Именно поэтому сервисы и библиотеки полифиллов очень полезны.