# Многострочный режим, флаг "m"

Многострочный режим включается, если у регэкспа есть флаг <code class="pattern">/m</code>. 
[cut]

В этом случае изменяется поведение <code class="pattern">^</code> и <code class="pattern">$</code>.

**В многострочном режиме якоря означают не только начало/конец текста, но и начало/конец строки.**

В примере ниже текст состоит из нескольких строк. Паттерн <code class="pattern">/^\d+/gm</code> берёт число с начала каждой строки:

```js
//+ run
var str = '1е место: Винни-пух\n' +
  '2е место: Пятачок\n' +
  '33е место: Слонопотам';

alert( str.match(/^\d+/gm) ); // 1, 2, 33*!*
```

Обратим внимание -- без флага <code class="pattern">/m</code> было бы только первое число:

```js
//+ run
var str = '1е место: Винни-пух\n' +
  '2е место: Пятачок\n' +
  '33е место: Слонопотам';

alert( str.match(/^\d+/g) ); // 1
```

Это потому что в обычном режиме каретка <code class="pattern">^</code> -- это только начало текста.

Символ доллара <code class="pattern">$</code> ведёт себя точно так же.

Следующий пример находит последнее слово в строке:

TODO: указать на коренное отличие $ от \n: доллар не матчит символ, а \n матчит!!!!

```js
//+ run
showMatch( 
  '1st: *!*John*!*\n' +
  '2nd: *!*Mary*/!*\n' +
  '33rd: *!*Peter*/!*', /\w+$/gm )  // John, Mary, Peter
```

Please note that <code class="pattern">$</code> as well as <code class="pattern">^</code> doesn't add <code class="match">\n</code> to the match. They only check that the position is right.


[summary]
<ul>
<li>The caret <code class="pattern">'^'</code> matches the position at the the text start. *In multiline mode* it also matches after the newline symbol.</li>
<li>The dollar <code class="pattern">'$'</code> matches the position at the text end. *In multiline mode* it also matches before the newline symbol.</li>
</ul>

**For both anchors, the regexp engine only checks the position, and doesn't match a character.**
[/summary]

