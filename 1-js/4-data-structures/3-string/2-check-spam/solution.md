Метод `indexOf` ищет совпадение с учетом регистра. То есть, в строке `'xXx'` он не найдет `'XXX'`.

Для проверки приведем к нижнему регистру и строку `str` а затем уже будем искать.

```js run
function checkSpam(str) {
  var lowerStr = str.toLowerCase();

  return !!(~lowerStr.indexOf('viagra') || ~lowerStr.indexOf('xxx'));
}

alert( checkSpam('buy ViAgRA now') );
alert( checkSpam('free xxxxx') );
alert( checkSpam("innocent rabbit") );
```

