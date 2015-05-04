Код для полифилла здесь имеет стандартный вид:

```js
(function() {

  // проверяем поддержку
  if (document.documentElement.textContent === undefined) {

    // определяем свойство
    Object.defineProperty(HTMLElement.prototype, "textContent", {
      get: function() {
        return this.innerText;
      },
      set: function(value) {
        this.innerText = value;
      }
    });
  }

})();
```

Единственный тонкий момент -- в проверке поддержки.

Мы часто можем использовать уже существующий элемент. В частности, при проверке `firstElementChild` мы можем проверить его наличие в `document.documentElement`. 

Однако, в данном случае попытка получить `document.documentElement.textContent` при поддержке этого свойства приведёт к совершенно лишним затратам времени и памяти, так как браузер будет динамически генерировать строку из содержимого документа.

Поэтому лучше бы использовать пустой DOM-элемент. Но это лишь оптимизация, общий подход верен.
