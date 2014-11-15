Сгенерируем значение из интервала `0..max-min`, а затем сдвинем на `min`:

```js
//+ run
var min=5, max = 10;

alert( min + Math.random()*(max-min) );
```

