# Функция removeClass

[importance 5]

У объекта есть свойство `className`, которое хранит список "классов" - слов, разделенных пробелами:

```js
var obj = { 
  className: 'open menu'
};
```

Напишите функцию `removeClass(obj, cls)`, которая удаляет класс `cls`, если он есть:

```js
removeClass(obj, 'open'); // obj.className='menu'
removeClass(obj, 'blabla'); // без изменений (нет такого класса)
```

P.S. Дополнительное усложнение. Функция должна корректно обрабатывать дублирование класса в строке:

```js
obj = { className: 'my menu menu' };
removeClass(obj, 'menu');
alert(obj.className); // 'my'
```

Лишних пробелов после функции образовываться не должно.