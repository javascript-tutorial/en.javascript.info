# XMLHttpRequest и POST, отсылка форм

Во время обычной отправки формы `<form>` браузер собирает значения её полей, делает из них строку и составляет тело GET/POST-запроса для посылки на сервер. 

При отправке данных через `XMLHttpRequest`, это нужно делать самим, в JS-коде. Большинство проблем и вопросов здесь связано с непониманием, где и какое кодирование нужно осуществлять.

[cut]

## Кодировка urlencoded

Основной способ кодировки запросов -- это *urlencoded*, то есть -- стандартное кодирование URL. 

Например, форма:

```html
<form action="/submit" method="GET"> 
  <input name="*!*name*/!*" value="*!*Ivan*/!*">
  <input name="*!*surname*/!*" value="*!*Ivanov*/!*">
</form>
```

Здесь есть два поля: `name=Ivan` и `surname=Ivanov`. 

Браузер перечисляет такие пары "имя=значение" через символ амперсанда `&` и, так как метод GET, итоговый запрос выглядит как `/submit?name=Ivan&surname=Ivanov`.

Все символы, кроме английских букв, цифр и `- _ . ! ~ * ' ( )` заменяются на их цифровой код в UTF-8 со знаком %.

Например, пробел заменяется на `%20`, символ `/` на `%2F`, русские буквы кодируются двумя байтами в UTF-8, поэтому, к примеру, `Ц` заменится на `%D0%A6`.

Например, форма:

```html
<form action="/submit" method="GET"> 
  <input name="*!*name*/!*" value="*!*Виктор*/!*">
  <input name="*!*surname*/!*" value="*!*Цой*/!*">
</form>
```

Будет отправлена так: `/submit?name=%D0%92%D0%B8%D0%BA%D1%82%D0%BE%D1%80&surname=%D0%A6%D0%BE%D0%B9`.

в JavaScript есть функция [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) для получения такой кодировки "вручную":

```js
//+ run
alert( encodeURIComponent(' ') ); // %20 
alert( encodeURIComponent('/') ); // %2F
alert( encodeURIComponent('В') ); // %D0%92
alert( encodeURIComponent('Виктор') ); // %D0%92%D0%B8%D0%BA%D1%82%D0%BE%D1%80
```

Формы с `method="GET"` всегда кодируются указанным образом.

Для `method="POST"` существует альтернативная кодировка, которую мы рассмотрим позже.


## GET-запрос 

Формируя XMLHttpRequest, мы должны формировать запрос "руками", кодируя поля функцией `encodeURIComponent`.

Например, для посылки GET-запроса с параметрами `name` и `surname`, аналогично форме выше, их необходимо закодировать так:

```js
// Передаём name и surname в параметрах запроса

var xhr = new XMLHttpRequest();

var params = 'name=' + encodeURIComponent(name) + 
  '&surname=' + encodeURIComponent(surname);

xhr.open("GET", '/submit?' + params, true);

xhr.onreadystatechange = ...;

xhr.send();
```

[smart header="Прочие заголовки"]
Браузер автоматически добавит к запросу важнейшие HTTP-заголовки, такие как `Content-Length` и `Connection`.

По спецификации браузер запрещает их явную установку, как и некоторых других низкоуровневых HTTP-заголовков, которые могли бы ввести в заблуждение сервер относительно того, кто и сколько данных ему прислал, например `Referer`. Это сделано в целях контроля правильности запроса и для безопасности. 
[/smart]

[smart header="Сообщаем про AJAX"]
Запрос, отправленный кодом выше через `XMLHttpRequest`, никак не отличается от обычной отправки формы. Сервер не в состоянии их отличить.

Поэтому в некоторых фреймворках, чтобы сказать серверу, что это AJAX, добавляют специальный заголовок, например такой:

```js
xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
```
[/smart]

## POST-запрос 

В методе POST параметры передаются не в URL, а в теле, посылаемом через `send(body)`. Поэтому `params` нужно указывать не в `open`, а в `send`.

Кроме того, при POST обязателен заголовок `Content-Type`, содержащий кодировку. Это указание для сервера -- как обрабатывать (раскодировать) пришедший запрос.

Полный код для POST:
```js
var xhr = new XMLHttpRequest();

var body = 'name=' + encodeURIComponent(name) + 
  '&surname=' + encodeURIComponent(surname);

xhr.open("POST", '/submit', true)
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

xhr.onreadystatechange = ...;

xhr.send(body);
```

[warn header="Только UTF-8"]
Всегда используется только кодировка UTF-8, независимо от языка и кодировки страницы.

Если сервер вдруг ожидает данные в другой кодировке, к примеру windows-1251, то их нужно будет перекодировать.
[/warn]

## Кодировка multipart/form-data

Кодировка urlencoded за счёт замены символов на `%код` может сильно "раздуть" общий объём пересылаемых данных. Поэтому для пересылки файлов используется другая кодировка: [multipart/form-data](http://ru.wikipedia.org/wiki/Multipart_form-data). 

В этой кодировке поля пересылаются одно за другим, через строку-разделитель.




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