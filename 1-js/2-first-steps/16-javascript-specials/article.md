# JavaScript specials: all together

This chapter aims to list features of JavaScript that we've learned, paying special attention to unobvious moments.

That's especially useful if you came from another language or, just as a recap.

[cut]

## Code structure

Statements are delimited with a semicolon:

```js run no-beautify
alert('Hello'); alert('World');
```

Usually, a line-break is also treated as a delimiter, so that would also work:

```js run no-beautify
alert('Hello')
alert('World')
```

That's called "automatic semicolon insertion". Sometimes it doesn't work, for instance:

```js run
alert("There will be an error after this message")

[1, 2].forEach(alert)
```

Most codestyle guides agree that we should put a semicolon after each statement.

Semicolons are not required after code blocks `{...}` and syntax constructs with them:

```js
function f() {
  // no semicolon after function declaration
}

for(;;) { /* no semicolon */ }
```

...But even if we can put a semicolon there, that's not an error, extra semicolons do nothing.

More in: <info:structure>.

## Strict mode

To fully enable all features of modern JavaScript, we should start scripts with `"use strict"`.

```js
'use strict';

...
```

The directive must be at the top of a script or at the beginning of a function.

Without `"use strict"`, everything still works, but some features behave in old-fasion, "compatible" way. We'd generally prefer the modern behavior. 

Later we'll get acquanted with advanced features of the language that enable strict mode implicitly.

More in: <info:strict-mode>.

## Variables

Can be declared using:

- `let` (block-level visibility)
- `const` (can't be changed)
- `var` (old-style, will see later)

A variable name can include:
- Letters and digits, but the first character may not be a digit. 
- Characters `$` and `_` are normal, on par with letters.
- Non-latin alphabets and hieroglyphs are also allowed, but commonly not used.

Variables are dynamically typed -- they can store any value:

```js
let x = 5;
x = "John";
```

There are 7 data types: 

- `number` for both floating-point and integer numbers,
- `string` for strings,
- `boolean` for logical values: `true/false`,
- `null` -- a type with a single value `null`, meaning "empty" or "does not exist",
- `undefined` -- a type with a single value `undefined`, meaning "not assigned",
- `object` and `symbol` -- for complex data structures and unique identifiers, we didn't learn them yet.

More in: <info:variables>, <info:types>.

## Interaction

We're using a browser as a working environment, so basic UI functions will be:

[`prompt(question[, default])`](mdn:api/Window/prompt)
: Ask a `question`, and return either what the visitor entered or `null` if he pressed "cancel".

[`confirm(question)`](mdn:api/Window/confirm)
: Ask a `question` and suggest to choose between Ok and Cancel. The choice is returned as `true/false`.

[`alert(message)`](mdn:api/Window/alert)
: Output a `message`.

All these functions are *modal*, they pause the code execution and prevent the visitor from interaction with the page until he answers.

For instance:

```js run
let userName = prompt("Your name?", "Alice");
let isTeaWanted = confirm("Do you want some tea?");

alert( "Visitor: " + userName );
alert( "Tea wanted: " + isTeaWanted );
```

More in: <info:uibasic>.

## Operators

JavaScript supports following operators:

Arithmetical
: Regular: `* + - /`, also `%` for the remainder and `**` for power of a number.

    Binary plus `+` contatenates strings.

    If any of the operands is a string -- the other one is converted to string too:

    ```js run
    alert( '1' + 2 ); // '12', string
    alert( 1 + '2' ); // '12', string
    ```

Assignments
: There is a simple assignment: `a = b` and combined ones like `a *= 2`.

Bitwise
: Bitwise operators work with integers on bit-level: see the [docs](mdn:JavaScript/Reference/Operators/Bitwise_Operators) when they are needed.

Ternary
: The only operator with three parameters:  `cond ? resultA : result B`

Logical operators
: Logical AND `&&` and OR `||` perform short-circuit evaluation and then return the value where it stopped. 

Comparisons
: Equality check `===` immediately fails if types are different. 

    Other comparisons perform type conversions, usually to a number:

    ```js run
    alert( 0 == false ); // true
    alert( true > 0 ); // true
    ```

    Values `null` and `undefined` are special: they equal `==` each other and don't equal anything else. 

    Greater/less comparisons compare strings character-by-character, other types are converted to a number.

Others
: There are few others, like a comma operator.

More in: <info:operators>, <info:comparison>.

## Логические операторы

В JavaScript есть логические операторы: И (обозначается `&&`), ИЛИ (обозначается `||`) и НЕ (обозначается `!`). Они интерпретируют любое значение как логическое.

Не стоит путать их с [побитовыми операторами](/bitwise-operators) И, ИЛИ, НЕ, которые тоже есть в JavaScript и работают с числами на уровне битов.

Как и в большинстве других языков, в логических операторах используется "короткий цикл" вычислений. Например, вычисление выражения `1 && 0 && 2` остановится после первого И `&&`, т.к. понятно что результат будет ложным (ноль интерпретируется как `false`).

**Результатом логического оператора служит последнее значение в коротком цикле вычислений.**

Можно сказать и по-другому: значения хоть и интерпретируются как логические, но то, которое в итоге определяет результат, возвращается без преобразования.

Например:

```js run
alert( 0 && 1 ); // 0
alert( 1 && 2 && 3 ); // 3
alert( null || 1 || 2 ); // 1
```

Подробнее: <info:logical-ops>.

## Циклы

- Поддерживаются три вида циклов:

    ```js
    // 1
    while (условие) {
      ...
    }

    // 2
    do {
      ...
    } while (условие);

    // 3
    for let i = 0; i < 10; i++) {
      ...
    }
    ```
- Переменную можно объявлять прямо в цикле, но видна она будет и за его пределами.
- Поддерживаются директивы `break/continue` для выхода из цикла/перехода на следующую итерацию.

    Для выхода одновременно из нескольких уровней цикла можно задать метку.

    Синтаксис: "`имя_метки:`", ставится она только перед циклами и блоками, например:

    ```js
    *!*outer:*/!*
    for(;;) {
        ...
      for(;;) {
        ...
        *!*break outer;*/!*
      }
    }
    ```

    Переход на метку возможен только изнутри цикла, и только на внешний блок по отношению к данному циклу. В произвольное место программы перейти нельзя.

Подробнее: <info:while-for>.

## Конструкция switch

При сравнениях в конструкции `switch` используется оператор `===`.

Например:

```js run
let age = prompt('Ваш возраст', 18);

switch (age) {
  case 18:
    alert( 'Никогда не сработает' ); // результат prompt - строка, а не число

  case "18": // вот так - сработает!
    alert( 'Вам 18 лет!' );
    break;

  default:
    alert( 'Любое значение, не совпавшее с case' );
}
```

Подробнее: <info:switch>.

## Функции

Синтаксис функций в JavaScript:

```js run
// function имя(список параметров) { тело }
function sum(a, b) {
  let result = a + b;

  return result;
}

// использование:
alert( sum(1, 2) ); // 3
```

- `sum` -- имя функции, ограничения на имя функции -- те же, что и на имя переменной.
- Переменные, объявленные через `let` внутри функции, видны везде внутри этой функции, блоки `if`, `for` и т.п. на видимость не влияют.
- Параметры копируются в локальные переменные `a`, `b`.
- Функция без `return` считается возвращающей `undefined`. Вызов  `return` без значения также возвращает `undefined`:

    ```js run no-beautify
    function f() { }
    alert( f() ); // undefined
    ```

Подробнее: <info:function-basics>.

## Function Declaration и Expression

Функция в JavaScript является обычным значением.

Её можно создать в любом месте кода и присвоить в переменную, вот так:

```js run
let sum = function(a, b) {
  let result = a + b;

  return result;
}

alert( sum(1, 2) ); // 3
```

Такой синтаксис, при котором функция объявляется в контексте выражения (в данном случае, выражения присваивания), называется Function Expression, а обычный синтаксис, при котором функция объявляется в основном потоке кода -- Function Declaration.

Функции, объявленные через Function Declaration, отличаются от Function Expression тем, что интерпретатор создаёт их при входе в область видимости (в начале выполнения скрипта), так что они работают до объявления.

Обычно это удобно, но может быть проблемой, если нужно объявить функцию в зависимости от условия. В этом случае, а также в других ситуациях, когда хочется создать функцию "здесь и сейчас", используют Function Expression.

Детали: <info:function-declaration-expression>.

## Named Function Expression

Если объявление функции является частью какого-либо выражения, например `let f = function...` или любого другого, то это Function Expression.

В этом случае функции можно присвоить "внутреннее" имя, указав его после `function`. Оно будет видно только внутри этой функции и позволяет обратиться к функции изнутри себя. Обычно это используется для рекурсивных вызовов.

Например, создадим функцию для вычисления факториала как Function Expression и дадим ей имя `me`:

```js run
let factorial = function me(n) {
  return (n == 1) ? n : n * me(n - 1);
}

alert( factorial(5) ); // 120
*!*
alert( me ); // ошибка, нет такой переменной
*/!*
```

Ограничение видимости для имени не работает в IE8-, но вызов с его помощью работает во всех браузерах.

Более развёрнуто: <info:named-function-expression>.

## Итого

В этой главе мы повторили основные особенности JavaScript, знание которых необходимо для обхода большинства "граблей", да и просто для написания хорошего кода.

Это, конечно, лишь основы. Дальше вы узнаете много других особенностей и приёмов программирования на этом языке.
