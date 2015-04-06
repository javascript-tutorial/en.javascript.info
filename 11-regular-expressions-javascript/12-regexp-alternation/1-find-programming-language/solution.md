Сначала неправильный способ.

Если перечислить языки один за другим через `|`, то получится совсем не то:

```js
//+ run
var reg = /Java|JavaScript|PHP|C|C\+\+/g;

var str = "Java, JavaScript, PHP, C, C++";

alert( str.match(reg) ); // Java,Java,PHP,C,C
```

Как видно, движок регулярных выражений ищет альтернации в порядке их перечисления. То есть, он сначала смотрит, есть ли <code class="match">Java</code>, а если нет -- ищет <code class="match">JavaScript</code>.

Естественно, при этом <code class="match">JavaScript</code> не будет найдено никогда. 

То же самое -- с языками <code class="match">C</code> и <code class="match">C++</code>.

Есть два решения проблемы:

<ol>
<li>Поменять порядок, чтобы более длинное совпадение проверялось первым: <code class="pattern">JavaScript|Java|C\+\+|C|PHP</code>.</li>
<li>Соединить длинный вариант с коротким: <code class="pattern">Java(Script)?|C(\+\+)?|PHP</code>.</li>
</ol>

В действии:

```js
//+ run
var reg = /Java(Script)?|C(\+\+)?|PHP/g;

var str = "Java, JavaScript, PHP, C, C++";

alert( str.match(reg) ); // Java,JavaScript,PHP,C,C++
```
