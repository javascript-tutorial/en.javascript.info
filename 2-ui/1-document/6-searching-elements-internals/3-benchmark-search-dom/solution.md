Для бенчмаркинга будем использовать функцию `bench(f, times)`, которая запускает функцию `f` `times` раз и возвращает разницу во времени:

```js
function bench(f, times) {
  var d = new Date();
  for(var i=0; i<times; i++) f();
  return new Date() - d;
}
```

Первый вариант (неверный) -- замерять разницу между функциями `runGet/runQuery`, вот так:

```js
function runGet() {
  var results = document.getElementsByTagName('p');
}

function runQuery() {
  var results = document.querySelectorAll('p');
}

alert( bench(runGet, 10000) ); // вывести время 1000*runGet
```

Он даст неверные результаты, т.к. `getElementsByTagName` является "живым поисковым запросом". Если не обратиться к его результатам, то поиска не произойдет вообще, т.е. `runGet` ничего по сути не ищет.

...А `querySelectorAll` всегда производит поиск и формирует список элементов.

Более правильный тест -- это не только запустить поиск, но и получить все элементы, как это делается в реальной жизни.


