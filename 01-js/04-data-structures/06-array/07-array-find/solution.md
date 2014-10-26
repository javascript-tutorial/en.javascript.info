Возможное решение:

```js
function find(array, value) {

  for(var i=0; i<array.length; i++) {
    if (array[i] == value) return i;
  }
   
  return -1;
}
```

Однако, в нем ошибка, т.к. сравнение `==` не различает `0` и `false`. 

Поэтому лучше использовать `===`. Кроме того, в современном стандарте JavaScript существует встроенная фунция <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf">Array#indexOf</a>, которая работает именно таким образом. Имеет смысл ей воспользоваться, если браузер ее поддерживает.

```js
//+ run
function find(array, value) {
  if (array.indexOf) { // если метод существует
    return array.indexOf(value);
  }

  for(var i=0; i<array.length; i++) {
    if (array[i] === value) return i;
  }
   
  return -1;
}

var arr = ["a", -1, 2, "b"];

var index = find(arr, 2);

alert(index);
```

... Но еще лучшим вариантом было бы определить `find` по-разному в зависимости от поддержки браузером метода `indexOf`:

```js
// создаем пустой массив и проверяем поддерживается ли indexOf
if ( [].indexOf ) { 

  var find = function(array, value) {
    return array.indexOf(value);
  }

} else {
  var find = function(array, value) {
    for(var i=0; i<array.length; i++) {
      if (array[i] === value) return i;
    }
   
    return -1;
  }

}
```

Этот способ - лучше всего, т.к. не требует при каждом запуске `find` проверять поддержку `indexOf`.
