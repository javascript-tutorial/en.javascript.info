# XMLHttpRequest и POST, отсылка форм

Во время обычной отправки формы браузер сам кодирует значения полей и составляет тело GET/POST-запроса для посылки на сервер. 

При отправке данных через `XMLHttpRequest`, это нужно делать самим, в javascript-коде. Большинство проблем и вопросов здесь связано с непониманием, где и какое кодирование нужно осуществлять.

[cut]

## Кодировка urlencoded

Основной способ кодировки запросов -- это [:urlencoded], то есть -- стандартное кодирование URL. При этом пробел представляется как `%20`, русские буквы и большинство спецсимволов кодируются, английские буквы и дефис оставляются как есть.

Способ, которым следует кодировать данные формы при отправке, задаётся в её HTML-теге. 

Например:

```html
<form method="get">  метод GET с кодировкой по умолчанию
<form method="post"> метод POST с кодировкой по умолчанию 
<form method="post" enctype="application/x-www-form-urlencoded">
```

Во всех этих случаях будет использована кодировка `urlencoded`.

Если форма отправляется обычным образом, то браузер сам кодирует (urlencode) название и значение каждого поля данных, и отсылает форму на сервер в закодированном виде.

Например, форма:

```html
<form action="/submit" method="GET"> 
  <input name="*!*name*/!*" value="*!*Виктор*/!*">
  <input name="*!*surname*/!*" value="*!*Цой*/!*">
</form>
```

Будет отправлена как: `/submit?name=%D0%92%D0%B8%D0%BA%D1%82%D0%BE%D1%80&surname=%D0%A6%D0%BE%D0%B9`.

### GET-запрос

Формируя XMLHttpRequest, мы должны формировать запрос "руками", кодируя поля функцией [:encodeURIComponent].

Например, для посылки GET-запроса с произвольными параметрами `name` и `surname`, их необходимо закодировать вот так:

```js
// Передаём name и surname в параметрах запроса

var xhr = new XMLHttpRequest();

var params = 'name=' + encodeURIComponent(name) + 
  '&surname=' + encodeURIComponent(surname);

xhr.open("GET", '/submit?'+params, true);

xhr.onreadystatechange = ...;

xhr.send('');
```

[smart header="Прочие заголовки"]
Заголовки `Content-Length`, `Connection` не нужны.

Более того, по спецификации браузер запрещает их явную установку, как и некоторых других низкоуровневых HTTP-заголовков, которые могли бы ввести в заблуждение сервер относительно того, кто и сколько данных ему прислал, например `Referer`. Это сделано в целях контроля правильности запроса и для безопасности. 
[/smart]

[smart header="AJAX или не AJAX?"]
**Запрос, отправленный кодом выше через `XMLHttpRequest`, никак не отличается от обычной отправки формы.** 

Поэтому в некоторых фреймворках, чтобы сказать серверу, что это AJAX, добавляют специальный заголовок.

Например:

```js
xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
```

Сервер может, увидев заголовок, отправить данные в JSON-формате, а без него -- генерировать полноценную страницу. Получится, что один URL работает и как страница и как AJAX-сервис.
[/smart]

### POST-запрос

В методе POST параметры передаются не в URL, а в теле, посылаемом через `send(body)`. Поэтому `params` нужно указывать не в `open`, а в `send`.

Кроме того, при POST обязателен заголовок `Content-Type`, содержащий кодировку. Это указание для сервера -- как обрабатывать (раскодировать) пришедший запрос.

```js
// Пример с POST
var xhr = new XMLHttpRequest();

var params = 'name=' + encodeURIComponent(name) + 
  '&surname=' + encodeURIComponent(surname);

xhr.open("POST", '/submit', true)
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

xhr.onreadystatechange = ...;

xhr.send(params);
```

[warn header="Только UTF-8"]
Всегда используется только UTF-8, независимо от языка страницы.

Если сервер вдруг ожидает данные в windows-1251 (к примеру), то их нужно будет перекодировать.
[/warn]

## Кодировка multipart/form-data

Второй способ кодирования называется "[multipart/form-data](http://ru.wikipedia.org/wiki/Multipart_form-data)". При этом поля пересылаются одно за другим, через строку-разделитель.

Этот способ используется в методе `POST` и указывается атрибутом `enctype="multipart/form-data"`.

Пример формы

```html
<form action="/submit" method="POST" enctype="multipart/form-data"> 
  <input name="*!*name*/!*" value="*!*Виктор*/!*">
  <input name="*!*surname*/!*" value="*!*Цой*/!*">
</form>
```

Форма при такой кодировке пересылается в теле запроса, поля разделены случайно сгенерированной строкой `boundary`, вот так:

```
...Заголовки...
Content-Type: *!*multipart/form-data; boundary=RaNdOmDeLiMiTeR*/!*

--RaNdOmDeLiMiTeR
Content-Disposition: form-data; name="*!*name*/!*"

*!*Виктор*/!*
--RaNdOmDeLiMiTeR
Content-Disposition: form-data; name="*!*surname*/!*"

*!*Цой*/!*
--RaNdOmDeLiMiTeR--
```

Сервер видит заголовок `Content-Type: multipart/form-data` и раскодирует поля формы.

**Как видно, само содержимое полей при этом оставляется "как есть". Поэтому такой способ используется в первую очередь при пересылке файла.**


### POST-запрос

В `XMLHttpRequest` можно указать кодировку `multipart/form-data` и вручную сформировать тело запроса, удовлетворяющее требованиям кодировки.

Пример кода для формирования запроса в кодировке `multipart/form-data`:

```js
var data = {
  name: 'Виктор',
  surname: 'Цой'
};

var boundary = String(Math.random()).slice(2);
var boundaryMiddle = '--' + boundary + '\r\n';
var boundaryLast = '--' + boundary + '--\r\n'

var body = ['\r\n'];
for (var key in data) {
  // добавление поля
  body.push('Content-Disposition: form-data; name="'+key+'"\r\n\r\n'+data[key]+'\r\n');
}

body = body.join(boundaryMiddle) + boundaryLast;

// Тело запроса готово, отправляем

var xhr = new XMLHttpRequest();
xhr.open('POST', '/submit', true);

xhr.setRequestHeader('Content-Type','multipart/form-data; boundary=' + boundary);

xhr.onreadystatechange = function() {
  if (this.readyState != 4) return;

  alert(this.responseText);
}

xhr.send(body);
```

Тело запроса будет иметь вид, описанный выше, то есть поля через разделитель. 

[smart header="Отправка файла"]
**Можно создать запрос, который сервер воспримет как загрузку файла.**

Для этого текст файла должен быть уже доступен JavaScript, т.е. произвольный файл прочитать и переслать, конечно же, нельзя.

Для добавления файла нужно использовать тот же код, что выше, но при добавлении поля  вместо строки `body.push('Content-Disposition: form-data; name=...')` указать расширенные заголовки:

```js
Content-Disposition: form-data; name="myfile"; filename="pic.jpg"
Content-Type: image/jpeg
(пустая строка)
содержимое файла
```

Код будет выглядеть так:

```js
body.push('Content-Disposition: form-data; name="'+key+'"; filename="pic.jpg"\r\nContent-Type: image/jpeg\r\n\r\n'+data[key]+'\r\n');
```

Имя файла `pic.jpg` здесь задано явно, но вам не составит труда его заменить.
[/smart]

## FormData

Современные браузеры, исключая IE<10, поддерживают объект [FormData](https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest/FormData/Using_FormData_Objects), который позволяет загружать формы напрямую.

**В форме могут быть любые поля, в том числе файловые.** 

Лучше всего это показывает пример:

```html
<form name="user">
  <input name="firstname" value="Вася">
</form>

<script>
// создать объект из формы
// в форме могут быть любые поля
var form = document.forms.user;
*!*
var formData = new FormData(form);  
*/!*

// добавить к пересылке ещё пару ключ - значение
formData.append("lastname", "Пупкин");

// отослать
var xhr = new XMLHttpRequest();
xhr.open("POST", "/url");
*!*
xhr.send(formData);
*/!*
</script>
```

Этот код отправит на сервер форму с полями `firstname` и `lastname`.

Интерфейс:
<ul>
<li>Конструктор `new FormData([form])` вызывается либо без аргументов, либо с DOM-элементом формы. </li>
<li>Метод `formData.append(name, value)` добавляет данные к форме.</li>
</ul>

Интеграция `FormData` с `XMLHttpRequest` встроена в браузер.
[head]
<script>
function voteSync(outputElem) {
  var xhr = new XMLHttpRequest(); // (1)

  xhr.open('GET', '/files/tutorial/ajax/xhr/vote.php', false); 
  xhr.send(null);   // (2)

  outputElem.innerHTML = xhr.responseText;  // (3)
}

function vote(outputElem) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', '/files/tutorial/ajax/xhr/vote.php', true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
debugger
    outputElem.innerHTML = xhr.responseText;
  }

  xhr.send(null);
}
</script>
[/head]