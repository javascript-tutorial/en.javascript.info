Сначала неправильный способ.

Если перечислить языки один за другим через `|`, то получится совсем не то:

```js run
var reg = /Java|JavaScript|PHP|C|C\+\+/g;

var str = "Java, JavaScript, PHP, C, C++";

alert( str.match(reg) ); // Java,Java,PHP,C,C
```

Как видно, движок регулярных выражений ищет альтернации в порядке их перечисления. То есть, он сначала смотрит, есть ли `match:Java`, а если нет -- ищет `match:JavaScript`.

Естественно, при этом `match:JavaScript` не будет найдено никогда.

То же самое -- с языками `match:C` и `match:C++`.

Есть два решения проблемы:

1. Поменять порядок, чтобы более длинное совпадение проверялось первым: `pattern:JavaScript|Java|C\+\+|C|PHP`.
2. Соединить длинный вариант с коротким: `pattern:Java(Script)?|C(\+\+)?|PHP`.

В действии:

```js run
var reg = /Java(Script)?|C(\+\+)?|PHP/g;

var str = "Java, JavaScript, PHP, C, C++";

alert( str.match(reg) ); // Java,JavaScript,PHP,C,C++
```

