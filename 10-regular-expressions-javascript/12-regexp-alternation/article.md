# Альтернация (или) | 

Альтернация -- термин в регулярных выражениях, которому в русском языке соответствует слово "ИЛИ". Она обозначается символом вертикальной черты <code class="pattern">|</code> и позволяет выбирать между вариантами.

[cut]

Например, нам нужно найти языки программирования: HTML, PHP, Java и JavaScript.

Соответствующее регулярное выражение: <code class="pattern">/html|php/java(script)?/</code>:

```js
//+ run
var reg = /html|php|css|java(script)?/gi

var str = "Сначала появился HTML, затем CSS, потом JavaScript"

alert( str.match(reg) )  // 'HTML', 'CSS', 'JavaScript'
```

**Альтернация имеет очень низкий приоритет.**

Чтобы регэксп находил одновременно <code class="match">gr<b>a</b>y</code> и <code class="match">gr<b>e</b>y</code>, можно использовать <code class="pattern">gr(a|e)y</code> или <code class="pattern">gr[ae]y</code>, но не <code class="pattern">gra|ey</code>. Последний регэксп применит альтернацию к подвыражениям: <code class="pattern">gra</code> (ИЛИ) <code class="pattern">ey</code>.




