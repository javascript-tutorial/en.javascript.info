# Альтернация (или) | 

Альтернация -- термин в регулярных выражениях, которому в русском языке соответствует слово "ИЛИ". Она обозначается символом вертикальной черты <code class="pattern">|</code> и позволяет выбирать между вариантами.

[cut]

Например, нам нужно найти языки программирования: HTML, PHP, Java и JavaScript.

Соответствующее регулярное выражение: <code class="pattern">html|php|java(script)?</code>.

Пример использования:

```js
//+ run
var reg = /html|php|css|java(script)?/gi

var str = "Сначала появился HTML, затем CSS, потом JavaScript"

alert( str.match(reg) ) // 'HTML', 'CSS', 'JavaScript'
```

Мы уже знаем похожую вещь -- квадратные скобки. Они позволяют выбирать между символами, например <code class="pattern">gr[ae]y</code> найдёт <code class="match">gray</code>, либо <code class="match">grey</code>.

Альтернация работает уже не посимвольно, а на уровне фраз и подвыражений. Регэксп <code class="pattern">A|B|C</code> обозначает поиск одного из выражений: `A`, `B` или `C`, причём в качестве выражений могут быть другие, сколь угодно сложные регэкспы.

Для указания границ альтернации используют скобки `(...)`, например: <code class="pattern">before(XXX|YYY)after</code> будет искать <code class="match">beforeXXXafter</code> или <code class="match">beforeYYYafter</code>.