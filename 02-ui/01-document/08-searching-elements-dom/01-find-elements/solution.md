Есть много вариантов решения, вот некоторые из них:
<ol>
<li>

```js
document.getElementById('age-table').getElementsByTagName('label');
```

</li>
<li>

```js
document.getElementById('age-table').getElementsByTagName('td')[0];
// в современных браузерах можно одним запросом:
var result = document.querySelector('#age-table td');
```

</li>
<li>

```js
document.getElementsByTagName('form')[1];
```

</li>
<li>

```js
document.querySelector('form[name="search"]');
```

</li>
<li>

```js
document.querySelector('form[name="search-person"] input')
```

</li>
<li>

```js
document.getElementsByName("info[0]")[0];
```

</li>
<li>

```js
document.querySelector('form[name="search-person"] [name="info[0]"]');
```

</li>
</ol>
