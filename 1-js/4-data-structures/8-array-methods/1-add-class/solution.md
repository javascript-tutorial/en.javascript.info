Решение заключается в превращении `obj.className` в массив при помощи `split`.
После этого в нем можно проверить наличие класса, и если нет - добавить.

```js run
function addClass(obj, cls) {
  var classes = obj.className ? obj.className.split(' ') : [];

  for (var i = 0; i < classes.length; i++) {
    if (classes[i] == cls) return; // класс уже есть
  }

  classes.push(cls); // добавить

  obj.className = classes.join(' '); // и обновить свойство
}

var obj = {
  className: 'open menu'
};

addClass(obj, 'new');
addClass(obj, 'open');
addClass(obj, 'me');
alert(obj.className) // open menu new me
```

P.S. "Альтернативный" подход к проверке наличия класса вызовом `obj.className.indexOf(cls)` был бы неверным. В частности, он найдёт `cls = "menu"` в строке классов `obj.className = "open mymenu"`.

P.P.S. Проверьте, нет ли в вашем решении присвоения `obj.className += " " + cls`. Не добавляет ли оно лишний пробел в случае, если изначально `obj.className = ""`?