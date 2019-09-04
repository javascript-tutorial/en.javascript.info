# Word boundary: \b

A word boundary `pattern:\b` is a test, just like `pattern:^` and `pattern:$`.

When the regexp engine (program module that implements searching for regexps) comes across `pattern:\b`, it checks that the position in the string is a word boundary.

There are three different positions that qualify as word boundaries:

- At string start, if the first string character is a word character `pattern:\w`.
- Between two characters in the string, where one is a word character `pattern:\w` and the other is not.
- At string end, if the last string character is a word character `pattern:\w`.

For instance, regexp `pattern:\bJava\b` will be found in `subject:Hello, Java!`, where `subject:Java` is a standalone word, but not in `subject:Hello, JavaScript!`.

```js run
alert( "Hello, Java!".match(/\bJava\b/) ); // Java
alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null
```

In the string `subject:Hello, Java!` following positions correspond to `pattern:\b`:

![](hello-java-boundaries.svg)

So, it matches the pattern `pattern:\bHello\b`, because:

1. At the beginning of the string matches the first test `pattern:\b`.
2. Then matches the word `pattern:Hello`.
3. Then the test `pattern:\b` - matches again, as we're between `subject:o` and a space.

Шаблон `pattern:\bJava\b` также совпадёт. Но не `pattern:\bHell\b` (потому что после `subject:l` нет границы слова), и не `pattern:Java!\b` (восклицательный знак не является "символом слова" `pattern:\w`, поэтому после него нет границы слова).

```js run
alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
alert( "Hello, Java!".match(/\bJava\b/) );  // Java
alert( "Hello, Java!".match(/\bHell\b/) );  // null (нет совпадения)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (нет совпадения)
```

Так как `pattern:\b` является проверкой, то не добавляет символ после границы к результату.

Мы можем использовать `pattern:\b` не только со словами, но и с цифрами.

Например, регулярное выражение `pattern:\b\d\d\b` ищет отдельно стоящие двузначные числа. Другими словами, оно требует, чтобы до и после `pattern:\d\d` был символ, отличный от `pattern:\w` (или начало/конец строки)

```js run
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
```

```warn header="Граница слова `pattern:\b` не работает для алфавитов, не основанных на латинице"
Проверка границы слова `pattern:\b` проверяет границу, должно быть `pattern:\w` с одной стороны и "не `pattern:\w`" - с другой.

Но `pattern:\w` означает латинскую букву (или цифру или знак подчёркивания), поэтому проверка не будет работать для других символов (например, кириллицы или иероглифов).
```
