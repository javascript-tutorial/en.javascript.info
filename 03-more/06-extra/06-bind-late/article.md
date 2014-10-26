# Позднее связывание "bindLate"

Обычный метод `bind` называется "ранним связыванием", поскольку фиксирует привязку сразу же. 

Как только значения привязаны -- они уже не могут быть изменены. В том числе, если метод объекта, который привязали, кто-то переопределит -- "привязанная" функция этого не заметит.

Позднее связывание -- более гибкое, оно позволяет переопределить привязанный метод когда угодно.
[cut]

## Раннее связывание

Например, попытаемся переопределить метод при раннем связывании:

```js
//+ run
function bind(func, context) {  
  return function() { 
    return func.apply(context, arguments); 
  };
}

var user = {                
  sayHi: function() { alert('Привет!'); }
}

// привязали метод к объекту
*!*
var userSayHi = bind(user.sayHi, user);
*/!*

// понадобилось переопределить метод
user.sayHi = function() { alert('Новый метод!'); }

// будет вызван старый метод, а хотелось бы - новый!
userSayHi(); // *!*выведет "Привет!"*/!*
```

...Привязка всё ещё работает со старым методом, несмотря на то что он был переопределён.

## Позднее связывание

При позднем связывании `bind` вызовет не ту функцию, которая была в `sayHi` на момент привязки, а ту, которая есть на момент вызова.**

Встроенного метода для этого нет, поэтому нужно реализовать.

Синтаксис будет таков:

```js
var func = bindLate(obj, "method");
```

<dl>
<dt>`obj`</dt>
<dd>Объект</dd>
<dt>`method`</dt>
<dd>Название метода (строка)</dd>
</dl>

Код:

```js
function bindLate(context, funcName) { 
  return function() {
    return context[funcName].apply(context, arguments);
  };
}
```

Этот вызов похож на обычный `bind`, один из вариантов которого как раз и выглядит как `bind(obj, "method")`, но работает по-другому.

**Поиск метода в объекте: `context[funcName]`, осуществляется при вызове, самой обёрткой**. 

**Поэтому, если метод переопределили -- будет использован всегда последний вариант.**

В частности, пример, рассмотренный выше, станет работать правильно:

```js
//+ run
function bindLate(context, funcName) { 
  return function() {
    return context[funcName].apply(context, arguments);
  };
}

var user = {
  sayHi: function() { alert('Привет!'); }
}

*!*
var userSayHi = bindLate(user, 'sayHi');
*/!*

user.sayHi = function() { alert('Здравствуйте!'); }

userSayHi(); // *!*Здравствуйте!*/!*
```

## Привязка метода, которого нет

**Позднее связывание позволяет привязать к объекту даже метод, которого ещё нет!**

Конечно, предполагается, что к моменту вызова он уже будет определён ;).

Например:

```js
//+ run
function bindLate(context, funcName) { 
  return function() {
    return context[funcName].apply(context, arguments);
  };
}

// *!*метода нет*/!*
var user = {  };

// *!*..а привязка возможна!*/!*
*!*
var userSayHi = bindLate(user, 'sayHi'); 
*/!*

// по ходу выполнения добавили метод..
user.sayHi = function() { alert('Привет!'); }

userSayHi(); // Метод работает: *!*Привет!*/!*
```

В некотором смысле, позднее связывание всегда лучше, чем раннее. Оно удобнее и надежнее, так как всегда вызывает нужный метод, который в объекте сейчас. 

Но оно влечет и небольшие накладные расходы -- поиск метода при каждом вызове.

## Итого

***Позднее связывание* ищет функцию в объекте в момент вызова.**

Оно используется для привязки в тех случаях, когда метод *может быть переопределён* после привязки или *на момент привязки не существует*.

Обёртка для позднего связывания (без карринга):

```js
function bindLate(context, funcName) { 
  return function() {
    return context[funcName].apply(context, arguments);
  };
}
```

[head]
<script>
function bind(func, context /*, args*/) {
  var bindArgs = [].slice.call(arguments, 2); // (1)
  function wrapper() {                        // (2)
    var args = [].slice.call(arguments); 
    var unshiftArgs = bindArgs.concat(args);  // (3)
    return func.apply(context, unshiftArgs);  // (4)
  }
  return wrapper;
}
</script>
[/head]