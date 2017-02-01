Есть много вариантов решения, вот некоторые из них:

```js
// 1
document.getElementById('age-table').getElementsByTagName('label');

// 2
document.getElementById('age-table').getElementsByTagName('td')[0];
// в современных браузерах можно одним запросом:
var result = document.querySelector('#age-table td');

// 3
document.getElementsByTagName('form')[1];

// 4
document.querySelector('form[name="search"]');

// 5
document.querySelector('form[name="search"] input')

// 6
document.getElementsByName("info[0]")[0];

// 7
document.querySelector('form[name="search-person"] [name="info[0]"]');
```

