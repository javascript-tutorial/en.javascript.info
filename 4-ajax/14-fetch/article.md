
# Метод fetch: замена XMLHttpRequest

Метод [fetch](https://fetch.spec.whatwg.org/) -- это `XMLHttpRequest` нового поколения. Он предоставляет улучшенный интерфейс для осуществления запросов к серверу: как по части возможностей и контроля над происходящим, так и по синтаксису, так как построен на [промисах](/promise).

Поддержка в браузерах пока не очень распространена, но есть [полифилл](https://github.com/github/fetch) и не один. 

## Синтаксис

Синтаксис метода `fetch`:
```js
let promise = fetch(url[, options]);
```

<ul>
<li>`url` -- URL, на который сделать запрос,</li>
<li>`options` -- необязательный объект с настройками запроса.</li>
</ul>

Свойства `options`:
<ul>
<li>`method` -- метод запроса,</li>
<li>`headers` -- заголовки запроса (объект),</li>
<li>`body` -- тело запроса: `FormData`, `Blob`, строка и т.п.</li>
<li>`mode` -- одно из: "same-origin", "no-cors", "cors", указывает режим в каком режиме кросс-доменности предполагается делать запрос.</li>
<li>`credentials` -- одно из: "omit", "same-origin", "include", указывает, пересылать ли куки и заголовки авторизации вместе с запросом.</li>
<li>`cache` -- одно из "default", "no-store", "reload", "no-cache", "force-cache", "only-if-cached", указывает, как кешировать запрос.</li>
<li>`redirect` -- можно поставить "follow" для обычного поведения при коде 30x (следовать редиректу) или "error" для интерпретации редиректа как ошибки.</li>
</ul>

Как видно, всевозможных настроек здесь больше, чем в `XMLHttpRequest`. Вместе с тем, надо понимать, что если мы используем полифилл, то ничего более гибкого, чем оригинальный `XMLHttpRequest` мы из этого не получим.

Разве что, `fetch`, возможно, будет удобнее пользоваться. 

## Использование

При вызове `fetch` возвращает промис, который, когда получен ответ, выполняет коллбэки с объектом [Response](https://fetch.spec.whatwg.org/#response) или с ошибкой, если запрос не удался.

Пример использования:

```js
//+ run
'use strict';

fetch('/article/fetch/user.json')
  .then(function(response) {
    alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
    alert(response.status); // 200

    return response.json();
   })
  .then(function(user) {
    alert(user.name); // iliakan
  })
  .catch( alert );
```

Объект `response` кроме доступа к заголовкам `headers`, статусу `status` и некоторым другим полям ответа, даёт возможность прочитать его тело, в желаемом формате.

Варианты описаны в спецификации [Body](https://fetch.spec.whatwg.org/#body), они включают в себя:

<ul>
<li>`response.arrayBuffer()`</li>
<li>`response.blob()`</li>
<li>`response.formData()`</li>
<li>`response.json()`</li>
<li>`response.text()`</li>
</ul>

Соответствующий вызов возвращает промис, который, когда ответ будет получен, вызовет коллбэк с результатом.

В примере выше мы можем в первом `.then` проанализировать ответ и, если он нас устроит -- вернуть промис с нужным форматом. Следующий `.then` уже будет содержать полный ответ сервера.

Больше примеров вы можете найти в описании [полифилла для fetch](https://github.com/github/fetch).

## Итого

Метод `fetch` -- уже сейчас удобная альтернатива `XMLHttpRequest` для тех, кто не хочет ждать и любит промисы.

Детальное описание этого метода есть в стандарте [Fetch](https://fetch.spec.whatwg.org/), а простейшие примеры запросов -- в описании к [полифиллу](https://github.com/github/fetch). 