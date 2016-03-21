# TODO: Date and time

JavaScript has a built-in object [Date](mdn:js/Date) for date/time management.

It contains the date, the time, the timezone, everything.

[cut]

## Creation

To create a new `Date` object use one of the following syntaxes:


`new Date()`
: Create a `Date` object for the current date and time:

    ```js run
    let now = new Date();
    alert( now ); // current date/time
    ```

`new Date(milliseconds)`
: Create a `Date` obeject with the time equal to number of milliseconds (1/1000 of a second) passed after the Jan 1st of 1970 UTC+0.

    ```js run
    // 24 hours after 01.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

`new Date(datestring)`
: If there is a single argument -- a string, then it is parsed with the `Date.parse` algorithm (see below).

`new Date(year, month, date, hours, minutes, seconds, ms)`
: Create the date with the given components in the local time zone. Only two first arguments are obligatory. 

    Note:

    - The `year` must have 4 digits: `2013` is okay, `98` is not.
    - The `month` count starts with `0` (Jan), up to `11` (Dec).
    - The `date` parameter is actually the day of month, if absent then `1` is assumed.
    - If `hours/minutes/seconds/ms` is absent, then it is equal `0`.

    For instance:

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // the same, hours etc are 0 by default
    ```

    The precision is 1 ms (1/1000 sec):

    ```js run
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```

## Access date components

The are many methods to access the year, month etc from the `Date` object. But they can be easily remembered when categorized.

`getFullYear()`
: Get the year (4 digits)

`getMonth()`
: Get the month, **from 0 to 11**.

`getDate()`
: Get the day of month, from 1 to 31, the name of the method does look a little bit strange.

`getHours(), getMinutes(), getSeconds(), getMilliseconds()`
: Get the corresponding time components.

```warn header="Not `getYear()`, but `getFullYear()`"
Many JavaScript engines implement a non-standard method `getYear()`. This method is non-standard. It returns 2-digit year sometimes. Please never use it. There is `getFullYear()` for that.
```

Additionally, we can get a day of week:

`getDay()`
: Get the day of week, from `0` (Sunday) to `6` (Saturday). The first day is always Sunday, in some countries that's not so, but can't be changed.

**All the methods above return the components relative to the local time zone.**

There are also their UTC-counterparts, that return day, month, year etc for the time zone UTC+0: `getUTCFullYear()`, `getUTCMonth()`, `getUTCDay()`. Just insert the `"UTC"` right after `"get"`.

If your local time zone is shifted relative to UTC, then the code below shows different hours:

```js run
// currend date
let date = new Date();

// the hour in your current time zone
alert( date.getHours() );

// what time is it now in London winter time (UTC+0)?
// the hour in UTC+0 time zone
alert( date.getUTCHours() );
```

Besides the given methods, there are two special ones, that do not have a UTC-variant:

`getTime()`
: Returns a number of milliseconds passed from the January 1st of 1970 UTC+0. The same kind of used in  `new Date(milliseconds)` constructor.

`getTimezoneOffset()`
: Returns the difference between the local time zene and UTC, in minutes:

    ```js run
    alert( new Date().getTimezoneOffset() ); // For UTC-1 outputs 60
    ```

## Setting date components

The following methods allow to set date/time components:

- `setFullYear(year [, month, date])`
- `setMonth(month [, date])`
- `setDate(date)`
- `setHours(hour [, min, sec, ms])`
- `setMinutes(min [, sec, ms])`
- `setSeconds(sec [, ms])`
- `setMilliseconds(ms)`
- `setTime(milliseconds)` (sets the whole date by milliseconds since 01.01.1970 UTC)

Every one of them except `setTime()` has a UTC-variant, for instance: `setUTCHours()`.

As we can see, some methods can set multiple components at once, for example `setHours`. Those components that are not mentioned -- are not modified.

For instance:

```js run
let today = new Date();

today.setHours(0);
alert( today ); // today, but the hour is changed to 0

today.setHours(0, 0, 0, 0);
alert( today ); // today, 00:00:00 sharp.
```

## Autocorrection

The *autocorrection* -- is a very handy property of the `Date` objects. We can set out-of-range values, and it will auto-adjust itself.

For instance:

```js run
let date = new Date(2013, 0, *!*32*/!*); // 32 Jan 2013 ?!?
alert(date); // ...is 1st Feb 2013!
```

**Out-of-range date components are distributed around automatically.**

Let's say we need to increase the date "28 Feb 2016" by 2 days. It may be "2 Mar" or "1 Mar" in case of a leap-year. We don't need to think about it. Just add 2 days. The `Date` object will do the rest:

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1 Mar 2016
```

That feature is often used to get the date after the given period of time. For instance, let's get the date for "70 seconds after now":

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // shows the correct date
```

We can also set zero or even negative componens. For example:

```js run
let date = new Date(2016, 0, 2); // 2 Jan 2016

date.setDate(1); // set day 1 of month
alert( date );

date.setDate(0); // min day is 1, so the last day of the previous month is assumed
alert( date ); // 31 Dec 2015
```

## Date to number, date diff

A `Date` object can be converted to a number, it becomes the number of milliseconds:

```js run
let date = new Date();
alert( +date ); // will the milliseconds, same as date.getTime()
```

**The important side effect: dates can be substracted, the result is their difference in ms.**

That's some times used for time measurements:

```js run
let start = new Date(); // start counting

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // done

alert( `The loop took ${end - start} ms` );
```

### Benchmarking

Let's say we have several ways to solve a task, each one described as a function.

How to see which one is faster. That's called a "benchmarking".

For instance, let's consider two functions to walk the array:

```js
function walkIn(arr) {
  for (let key in arr) arr[key]++;
}

function walkLength(arr) {
  for (let i = 0; i < arr.length; i++) arr[i]++;
}
```

We can't run each of them once, and check the time difference. A single run is unreliable, a tiny CPU spike will spoil the result.

For the right benchmarking, we need to run each function many times, for the test to take considerable time. Then sudden CPU spikes will not affect it a lot.

A complex function may be run a few times, but here the functions are simple, so we need to run them 1000 times. 

Let's measure which one is faster:

```js run
let arr = [];
for (let i = 0; i < 1000; i++) arr[i] = 0;

function walkIn(arr) {
  for (let key in arr) arr[key]++;
}

function walkLength(arr) {
  for (let i = 0; i < arr.length; i++) arr[i]++;
}

function bench(f) {
  let date = new Date();
  for (let i = 0; i < 10000; i++) f(arr);
  return new Date() - date;
}

alert( 'Time of walkIn: ' + bench(walkIn) + 'ms' );
alert( 'Time walkLength: ' + bench(walkLength) + 'ms' );
```

Now let's improve that a little bit more. Imagine that in the time of the first benchmarking `bench(walkIn)` the CPU was doing something in parallel, and it was taking resources. And at the time of the second benchmark the work was finished.

Is that real? Of course it is, especially for the modern multi-process OS.

As a result, the first benchmark will have less CPU resources than the second. Again, a reason for wrong results.

**For the more reliable benchmarking, the whole pack of benchmarks should be rerun multiple times.**

Here's the code example:

```js run
let arr = [];
for (let i = 0; i < 1000; i++) arr[i] = 0;

function walkIn(arr) {
  for (let key in arr) arr[key]++;
}

function walkLength(arr) {
  for (let i = 0; i < arr.length; i++) arr[i]++;
}

function bench(f) {
  let date = new Date();
  for (let i = 0; i < 1000; i++) f(arr);
  return new Date() - date;
}

let timeWalkIn = 0;
let timeWalkLength = 0;

*!*
// run bench(walkIn) and bench(walkLength) each 100 times alternating
for (let i = 0; i < 100; i++) {
  timeWalkIn += bench(walkIn);
  timeWalkLength += bench(walkLength);
}
*/!*

alert( 'Total time for walkIn: ' + timeWalkIn );
alert( 'Total time for walkLength: ' + timeWalkLength );
```

That's also important because modern JavaScript engines start applying advanced optimizations only to the "hot code" that executes many times (no need to optimize rarely executed things). So, in the example above, first executions are not well-optimized. We may want to throw away the results of the first run.

````smart header="`console.time(метка)` и `console.timeEnd(метка)`"
Modern browsers support the following methods for benchmarking with the immediate output:

- `console.time(label)` -- start the built-in chronometer with the given label.
- `console.timeEnd(label)` -- start the built-in chronometer with the given label and output the result.

The `label` parameter allows to start parallel measurements.

In the code below, there are timers `walkIn`, `walkLength` -- for the individual benchmarks and "All Benchmarks" -- for the whole time:

```js run
let arr = [];
for (let i = 0; i < 1000; i++) arr[i] = 0;

function walkIn(arr) {
  for (let key in arr) arr[key]++;
}

function walkLength(arr) {
  for (let i = 0; i < arr.length; i++) arr[i]++;
}

function bench(f) {
  for (let i = 0; i < 10000; i++) f(arr);
}

console.time("All Benchmarks");

console.time("walkIn");
bench(walkIn);
console.timeEnd("walkIn");

console.time("walkLength");
bench(walkLength);
console.timeEnd("walkLength");

console.timeEnd("All Benchmarks");
```

If you are running the example, please open the developer console, otherwise you won't see the output.
````

```warn header="Be careful doing micro-benchmarking"
Modern JavaScript engines perform many optimizations, like:

1. Move loop invariants -- unchanging values like `arr.length` out of the loop.
2. Try to understand which type of values is stored in the variable and optimize its storage.
3. Try to understand the structure of an object, and if we have many objects with the same structure, optimize the case.
4. Do simple constant folding, calculating expressions like `2 + 3` or `"str1" + "str2"` before the code is executed.
5. See if a variable is not used and remove it.

...And many other stuff. Of course that affects benchmark results, especially when we measure "micro" things like walking an array. 

So if you seriously want to understand performance, then please first study how the JavaScript engine works. And then you probably won't need microbenchmarks at all, or apply them very rarely.

The great pack of articles about V8 can be found at <http://mrale.ph>.
```

## Date.parse from a string

Все современные браузеры, включая IE9+, понимают даты в упрощённом формате ISO 8601 Extended.

Этот формат выглядит так: `YYYY-MM-DDTHH:mm:ss.sssZ`, где:

- `YYYY-MM-DD` -- дата в формате год-месяц-день.
- Обычный символ `T` используется как разделитель.
- `HH:mm:ss.sss` -- время: часы-минуты-секунды-миллисекунды.
- Часть `'Z'` обозначает временную зону -- в формате `+-hh:mm`, либо символ `Z`, обозначающий UTC. По стандарту её можно не указывать, тогда UTC, но в Safari с этим ошибка, так что лучше указывать всегда.

Также возможны укороченные варианты, например `YYYY-MM-DD` или `YYYY-MM` или даже только `YYYY`.

Метод `Date.parse(str)` разбирает строку `str` в таком формате и возвращает соответствующее ей количество миллисекунд. Если это невозможно, `Date.parse` возвращает `NaN`.

Например:

```js run
let msUTC = Date.parse('2012-01-26T13:51:50.417Z'); // зона UTC

alert( msUTC ); // 1327571510417 (число миллисекунд)
```

С таймзоной `-07:00 UTC`:

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert( ms ); // 1327611110417 (число миллисекунд)
```

````smart header="Формат дат для IE8-"
До появления спецификации ECMAScript 5 формат не был стандартизован, и браузеры, включая IE8-, имели свои собственные форматы дат. Частично, эти форматы пересекаются.

Например, код ниже работает везде, включая старые IE:

```js run
let ms = Date.parse("January 26, 2011 13:51:50");

alert( ms );
```

Вы также можете почитать о старых форматах IE в документации к методу  <a href="http://msdn.microsoft.com/en-us/library/k4w173wk%28v=vs.85%29.aspx">MSDN Date.parse</a>.

Конечно же, сейчас лучше использовать современный формат. Если же нужна поддержка IE8-, то метод `Date.parse`, как и ряд других современных методов, добавляется библиотекой [es5-shim](https://github.com/kriskowal/es5-shim).
````

## Метод Date.now()

Метод `Date.now()` возвращает дату сразу в виде миллисекунд.

Технически, он аналогичен вызову `+new Date()`, но в отличие от него не создаёт промежуточный объект даты, а поэтому -- во много раз быстрее.

Его использование особенно рекомендуется там, где производительность при работе с датами критична. Обычно это не на веб-страницах, а, к примеру, в разработке игр на JavaScript.

## Итого

- Дата и время представлены в JavaScript одним объектом: [Date](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/). Создать "только время" при этом нельзя, оно должно быть с датой. Список методов `Date` вы можете найти в справочнике [Date](http://javascript.ru/Date) или выше.
- Отсчёт месяцев начинается с нуля.
- Отсчёт дней недели (для `getDay()`) тоже начинается с нуля (и это воскресенье).
- Объект `Date` удобен тем, что автокорректируется. Благодаря этому легко сдвигать даты.
- При преобразовании к числу объект `Date` даёт количество миллисекунд, прошедших с 1 января 1970 UTC. Побочное следствие -- даты можно вычитать, результатом будет разница в миллисекундах.
- Для получения текущей даты в миллисекундах лучше использовать `Date.now()`, чтобы не создавать лишний объект `Date` (кроме IE8-)
- Для бенчмаркинга лучше использовать `performance.now()` (кроме IE9-), он в 1000 раз точнее.

