Можно прототипно унаследовать от `options` и добавлять/менять опции в наследнике:

```js
//+ run
function Menu(options) {
  options = Object.create(options);
  options.width = options.width || 300;

  alert(options.width);  // возьмёт width из наследника
  alert(options.height); // возьмёт height из исходного объекта
  ...
}
```

Все изменения будут происходить не в самом `options`, а в его наследнике, при этом исходный объект останется незатронутым.
