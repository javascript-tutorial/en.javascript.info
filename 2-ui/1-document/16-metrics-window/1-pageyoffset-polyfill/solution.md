В стандартном режиме IE8 можно получить текущую прокрутку так:

```js
//+ run
alert( document.documentElement.scrollTop );
```

Самым простым, но неверным было бы такое решение:
```js
//+ run
// "полифилл"
window.pageYOffset = document.documentElement.scrollTop;

// использование "полифилла"
alert( window.pageYOffset );
```

Код выше не учитывает текущую прокрутку. Он присваивает `window.pageYOffset` текущую прокрутку, но при её изменении -- не обновляет это свойство автоматически, а поэтому -- бесполезен. 

Более правильное решение -- сделать это свойство геттером. При этом в IE8 для DOM-объектов работает `Object.defineProperty`:

```js
//+ run
// полифилл
Object.defineProperty(window, 'pageYOffset', {
  get: function() {
    return document.documentElement.scrollTop;
  }
});

// использование полифилла
alert( window.pageYOffset );
```






