# Comparisons and boolean values

In this chapter we'll meet the comparison operators and boolean values that are their results.

[cut]

Many comparison operators we know from maths:

<ul>
<li>Greater/less than: <code>a &gt; b</code>, <code>a &lt; b</code>.</li>
<li>Greater/less than or equals: <code>a &gt;= b</code>, <code>a &lt;= b</code>.</li>
<li>Equals: `a == b` (please note the double equation sign `'='`. A single symbol `a = b` would mean an assignment).</li>
<li>Not equals. In maths the sign is <code>&ne;</code>, in JavaScript we use an assignment with an exclamation before it: <code>a != b</code>.</li>
</ul>

## Boolean values

Just as other operators, a comparison returns a value.

The value has the boolean type. The term "logical type" is also used and means the same.

There are only two logical values:

<ul>
<li>`true` -- means "yes", "correct" or "the truth".</li>
<li>`false` -- means "no", "wrong" or "a lie".</li>
</ul>

For example:

```js
//+ run
alert( 2 > 1 ); // true (correct)
alert( 2 == 1 ); // false (wrong)
alert( 2 != 1 ); // true (correct)
```

Boolean values can be assigned directly, just like any other values:

```js
//+ run
var a = true; // assign directly

var b = 3 > 4; // assign the result of the comparison
alert( b ); // false

alert( a == b ); // false (cause a=true, b=false)
```

## Strings comparison

Strings are compared letter-by-letter, alphabetically.

For example: 

```js
//+ run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

The algorithm to compare two strings is simple:
<ol>
<li>Compare the first characters of both strings. If the first one is greater(or less), then the first string is greater(or less).</li>
<li>If first characters are equal, compare the second characters the same way.</li>
<li>Repeat until the end of any string.</li>
<li>If both strings ended simultaneously, then they are equal. Otherwise the longer string is greater.</li>
</ol>

In the example above, the comparison `'Z' > 'A'` gets the result at the first step.

Strings `"Glow"` and `"Glee"` are compared character-by-character:
<ol>
<li>`G` is the same as `G`.</li>
<li>`l` is the same as `l`.</li>
<li>`o` is greater than `e`. Stop here. The first string is greater.</li>
</ol>

[smart header="Lexicographical ordering"]
The strings are compared in the so-called "lexicographical" or "dictionary" order.

It implies that the greater string is the one which goes further in the dictionary. So, for example, `Z` goes after `A` in a dictionary. And `Glow` goes after `Glee`.

But the actual situation is a little bit more complex with that, because of internal encoding details. We'll get back in the chapter [](/strings) where we study strings specifically.
[/smart]


## Comparison of different types

When compared values are of different types, they get autoconverted to numbers.

Strings are converted the same way as unary plus does. We discussed that in the chapter [](/operators).

For example:

```js
//+ run
alert( '2' > 1 ); // true, string '2' becomes a number 2
alert( '01' == 1 ); // true, string '01' becomes a number 1
```

For boolean values, `true` becomes `1` and `false` becomes `0`, so:

```js
//+ run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

Rules for numeric conversion are to be discussed in more details in the chapter [](/types-conversion). 

## Strict equality

A regular equality `==` has a "problem": it cannot differ `0` from `false`:

```js
//+ run
alert( 0 == false ); // true
```

The same thing with an empty string:

```js
//+ run
alert( '' == false ); // true
```

That's the natural consequence of what we've seen before. Operands of different types are converted to a number. An empty string, just like `false`, becomes a zero.

What to do if we'd like to differentiate `0` from `false`?

**A strict equality operator `===` checks the equality without type conversion.**

In other words, `a === b` always returns `false` if `a` and `b` belong to differnt types.

Let's try it:

```js
//+ run
alert( 0 === false ); // false, because the types are different
```

There also exists a "strict non-equality" operator `!==`, as an analogy for `!=`.

The string equality is one character longer, but it's more obvious what's going on.

## Comparison with null and undefined

Проблемы со специальными значениями возможны, когда к переменной применяется операция сравнения `> < <= >=`, а у неё может быть как численное значение, так и `null/undefined`. 

**Интуитивно кажется, что `null/undefined` эквивалентны нулю, но это не так.**

Они ведут себя по-другому.
 
<ol>
<li>Значения `null` и `undefined` равны `==` друг другу и не равны чему бы то ни было ещё. 
Это жёсткое правило буквально прописано в спецификации языка.</li>
<li>При преобразовании в число `null` становится `0`, а `undefined` становится `NaN`.</li>
</ol>

Посмотрим забавные следствия.

### Некорректный результат сравнения null с 0
Сравним `null` с нулём:

```js
//+ run
alert( null > 0 ); // false
alert( null == 0 ); // false
```

Итак, мы получили, что `null` не больше и не равен нулю. А теперь...

```js
//+ run
alert(null >= 0); // *!*true*/!*
```

Как такое возможно? Если нечто *"больше или равно нулю"*, то резонно полагать, что оно либо *больше*, либо *равно*. Но здесь это не так.

Дело в том, что алгоритмы проверки равенства `==` и сравнения `>= > < <=` работают по-разному.

Сравнение честно приводит к числу, получается ноль. А при проверке равенства значения `null` и `undefined` обрабатываются особым образом: они равны друг другу, но не равны чему-то ещё. 

В результате получается странная с точки зрения здравого смысла ситуация, которую мы видели в примере выше. 

### Несравнимый undefined

Значение `undefined` вообще нельзя сравнивать:

```js
//+ run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

<ul>
<li>Сравнения `(1)` и `(2)` дают `false` потому, что `undefined` при преобразовании к числу даёт `NaN`. А значение `NaN` по стандарту устроено так, что сравнения `==`, `<`, `>`, `<=`, `>=` и даже `===` с ним возвращают `false`.</li>
<li>Проверка равенства `(3)` даёт `false`, потому что в стандарте явно прописано, что `undefined` равно лишь `null` и ничему другому.</li>
</ul>


**Вывод: любые сравнения с `undefined/null`, кроме точного `===`, следует делать с осторожностью.**

Желательно не использовать сравнения `>= > < <=` с ними, во избежание ошибок в коде.


## Итого

<ul>
<li>В JavaScript есть логические значения `true` (истина) и `false` (ложь). Операторы сравнения возвращают их.</li>
<li>Строки сравниваются побуквенно.</li>
<li>Значения разных типов приводятся к числу при сравнении, за исключением строгого равенства `===` (`!==`).</li>
<li>Значения `null` и `undefined` равны `==` друг другу и не равны ничему другому. В других сравнениях (с участием `>`,`<`) их лучше не использовать, так как они ведут себя не как `0`.</li>
</ul>

Мы ещё вернёмся к теме сравнения позже, когда лучше изучим различные типы данных в JavaScript.
