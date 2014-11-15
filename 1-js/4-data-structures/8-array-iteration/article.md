# Массив: перебирающие методы

Современный стандарт JavaScript предоставляет много методов для "умного" перебора массивов, которые есть в современных браузерах...

...Ну а для их поддержки в IE8- просто подключите библиотеку [ES5-shim](https://github.com/kriskowal/es5-shim).
[cut]
## forEach

Метод ["arr.forEach(callback[, thisArg])"](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach) используется для перебора массива.

Он позволяет перебрать массив при помощи функции `callback`, что зачастую гораздо элегантнее, нежели цикл `for`.

Функция `callback` вызывается для каждого элемента с тремя параметрами `callback(item, i, arr)`:

<ul>
<li>`item` -- очередной элемент массива.</li>
<li>`i` -- его номер.</li>
<li>`arr` -- массив, который перебирается.</li>
</ul>

Например:

```js
//+ run
var arr = ["Яблоко", "Апельсин", "Груша"];

function show(item, i, arr) {
  alert(i + ": " + item + " (массив:" + arr + ")");
}

arr.forEach(show);
```

Второй, необязательный аргумент `forEach` позволяет указать контекст `this` для `callback`. Мы обсудим его в деталях чуть позже, сейчас он нам не важен.

Метод `forEach` ничего не возвращает, его используют только для перебора.

## filter

Метод ["arr.filter(callback[, thisArg])"](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter) используется для *фильтрации* массива через функцию.

Он создаёт новый массив, в который войдут только те элементы `arr`, для которых вызов `callback(item, i, arr)` возвратит `true`.

Например:

```js
//+ run
var arr = [1, -1, 2, -2, 3];

function isPositive(number) {
  return number > 0;
}

*!*
var positiveArr = arr.filter(isPositive);
*/!*

alert(positiveArr); // 1,2,3
```

## map

Метод ["arr.map(callback[, thisArg])"](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map) используется для *трансформации* массива.

Он создаёт новый массив, который будет состоять из результатов вызова `callback(item, i, arr)` для каждого элемента `arr`.

Например:

```js
//+ run
var arr = [1, 2, 3, 4];

function square(number) {
  return number * number;
}

*!*
var squaredArr = arr.map(square);
*/!*

alert(squaredArr); // получили массив квадратов чисел: 1, 4, 9, 16
```

## every/some

Эти методы используется для проверки массива.

Метод ["arr.every(callback[, thisArg])"](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every) возвращает `true`, если вызов `callback` вернёт `true` для *каждого* элемента `arr`.

 
Метод ["arr.some(callback[, thisArg])"](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some) возвращает `true`, если вызов `callback` вернёт `true` для *какого-нибудь* элемента `arr`.

```js
//+ run
var arr = [1, -1, 2, -2, 3];

function isPositive(number) {
  return number > 0;
}

*!*
alert( arr.every(isPositive) ); // false, не все положительные
alert( arr.some(isPositive) ); // true, есть хоть одно положительное
*/!*
```

## reduce/reduceRight

Метод ["arr.reduce(callback[, initialValue])"](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reduce) используется для последовательной обработки каждого элемента массива с сохранением промежуточного результата.

Это один из самых сложных методов для работы с массивами. Но его стоит освоить, потому что временами с его помощью можно в несколько строк решить задачу, которая иначе потребовала бы в разы больше места и времени.

Метод `reduce` используется для вычисления на основе массива какого-либо единого значения, иначе говорят "для свёртки массива". Чуть далее мы разберём пример для вычисления суммы.

Он применяет функцию `callback` по очереди к каждому элементу массива слева направо, сохраняя при этом промежуточный результат.

Аргументы функции `callback(previousValue, currentItem, index, arr)`:

<ul>
<li>`previousValue` -- последний результат вызова функции, он же "промежуточный результат". Значение `previousValue` при первом вызове равно `initialValue` (второй аргумент `reduce`) или, если у `reduce` нет второго аргумента, то оно равно первому элементу массива, а перебор начинается со второго.</li>
<li>`currentItem` -- текущий элемент массива, элементы перебираются по очереди слева-направо. </li>
<li>`index` -- номер текущего элемента.</li>
<li>`arr` -- обрабатываемый массив.</li>
</ul>

Разберём работу метода `reduce` на примере. 

Пусть мы хотим вычислить сумму всех элементов массива. Можно сделать это при помощи цикла, но это как раз подходящий повод познакомиться с `reduce`.

Вот решение в одну строку:

```js
//+ run
var arr = [1, 2, 3, 4, 5]

var result = arr.reduce(function(prev, current) { return prev + current }, 0);

alert(result); // 15
```

Разберём, что в нём происходит.

Здесь начальное значение, с которого начинаются вычисления, равно нулю (второй аргумент `reduce`).

Сначала анонимная функция вызывается с этим начальным значением и первым элементом массива, результат запоминается и передаётся в следующий вызов, уже со вторым аргументом массива, затем новое значение участвует в вычислениях с третьим аргументом и так далее.

Таблица вычислений получается такая:
<table class="bordered">
 <thead>
  <tr>
   <th></th>
   <th>`prev`</th>
   <th>`current`</th>
   <th>результат</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <th>первый вызов</th>
   <td>`0`</td>
   <td>`1`</td>
   <td>`1`</td>
  </tr>
  <tr>
   <th>второй вызов</th>
   <td>`1`</td>
   <td>`2`</td>
   <td>`3`</td>
  </tr>
  <tr>
   <th>третий вызов</th>
   <td>`3`</td>
   <td>`3`</td>
   <td>`6`</td>
  </tr>
  <tr>
   <th>четвёртый вызов</th>
   <td>`6`</td>
   <td>`4`</td>
   <td>`10`</td>
  </tr>
  <tr>
   <th>пятый вызов</th>
   <td>`10`</td>
   <td>`5`</td>
   <td>`15`</td>
  </tr>
 </tbody>
</table>

Функция-аргумент `reduce` могла бы также использовать параметры `i` и `array`, но здесь в них нет нужды.

**Можно сделать ещё короче!**

Посмотрим, что будет, если не указать `initialValue` в вызове `arr.reduce`:

```js
//+ run
var arr = [1, 2, 3, 4, 5]

// убрали 0 в конце
var result = arr.reduce(function(prev, current) { return prev + current });

alert(result); // 15
```

Результат -- точно такой же! Это потому, что при отсутствии `initialValue` в качестве первого значения берётся первый элемент массива, а перебор стартует со второго. 

Таблица вычислений будет такая же, за вычетом первой строки.

**Метод [arr.reduceRight](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reduceRight) работает аналогично, но идёт по массиву справа-налево:**



## Итого

Мы рассмотрели методы:
<ul>
<li>`forEach` -- для *перебора* массива.</li>
<li>`filter` -- для *фильтрации* массива.</li>
<li>`every/some` -- для *проверки* массива.</li>
<li>`map` -- для *трансформации* массива в массив.</li>
<li>`reduce/reduceRight` -- для *прохода по массиву с вычислением значения*.</li>
</ul>

Во многих ситуациях их использование позволяет написать код короче и понятнее, чем обычный перебор через `for`.
 