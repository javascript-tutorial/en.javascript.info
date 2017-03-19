# Начало строки ^ и конец $

Знак каретки `pattern:'^'` и доллара `pattern:'$'` имеют в регулярном выражении особый смысл. Их называют "якорями" (anchor - англ.).

[cut]

Каретка `pattern:^` совпадает в начале текста, а доллар `pattern:$` -- в конце.

**Якоря являются не символами, а проверками.**

До этого мы говорили о регулярных выражениях, которые ищут один или несколько символов. Если совпадение есть -- эти символы включаются в результат.

А якоря -- не такие. Когда поиск ходит до якоря -- он проверяет, есть ли соответствие, если есть -- продолжает идти по шаблону, не прибавляя ничего к результату.

Каретку `pattern:^` обычно используют, чтобы указать, что регулярное выражение необходимо проверить именно с начала текста.

Например, без каретки найдёт все числа:

```js run
var str = '100500 попугаев съели 500100 бананов!';
alert( str.match(/\d+/ig) ); // 100500, 500100 (нашло все числа)
```

А с кареткой -- только первое:

```js run
var str = '100500 попугаев съели 500100 бананов!';
alert( str.match(/^\d+/ig) ); // 100500 (только в начале строки)*!*
```

Знак доллара `pattern:$` используют, чтобы указать, что паттерн должен заканчиваться в конце текста.

Аналогичный пример с долларом для поиска числа в конце:

```js run
var str = '100500 попугаев съели 500100';
alert( str.match(/\d+$/ig) ); // 500100
```

Оба якоря используют одновременно, если требуется, чтобы шаблон охватывал текст с начала и до конца. Обычно это требуется при валидации.

Например, мы хотим проверить, что в переменной `num` хранится именно десятичная дробь.

Ей соответствует регэксп `pattern:\d+\.\d+`. Но простой поиск найдёт дробь в любом тексте:

```js run
var num = "ля-ля 12.34";
alert( num.match(/\d+\.\d+/ig) ); // 12.34
```

Наша же задача -- проверить, что `num` *целиком* соответствует паттерну `pattern:\d+\.\d+`.

Для этого обернём шаблон в якоря `pattern:^...$`:

```js run
var num = "ля-ля 12.34";
alert( num.match(/^\d+\.\d+$/ig) ); // null, не дробь

var num = "12.34";
alert( num.match(/^\d+\.\d+$/ig) ); // 12.34, дробь!
```

Теперь поиск ищет начало текста, за которым идёт число, затем точка, ещё число и конец текста. Это как раз то, что нужно.

## TODO

Add y flag here


## The "y" flag

The `y` flag means that the match should start exactly at the position specified by the property `regexp.lastIndex`.

In other words, normally the search is made in the whole string: `pattern:/love/` checks if the word "love" is found on the first position in the string, then in the second etc. In the example above we have a match on the 2nd position.

But with the `y` flag we need to specify the position in `regexp.lastIndex` (`0` by default), and the match must be exactly on that position.

Here, the example:

```js run
let str = "I love Javascript!";

alert( str.search(/love/y) ); // -1 (not found)
alert( str.search(/LOVE/i) ); // 2
```
