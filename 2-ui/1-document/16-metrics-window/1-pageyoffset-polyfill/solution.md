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

Код выше не учитывает текущую прокрутку. Он присваивает `window.pageYOffset` один раз и в дальнейшем, чтобы получить текущую прокрутку, нужно снова обратиться к `document.documentElement.scrollTop` не меняет его. А задача как раз -- сделать полифилл, то есть дать возможность использовать `window.pageYOffset` для получения текущего состояния прокрутки без "танцев  бубном", так же как в современных браузерах.

Для этого создадим свойство через геттер. 

В IE8 для DOM-объектов работает `Object.defineProperty`:

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






