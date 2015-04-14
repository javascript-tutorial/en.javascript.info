# Добавление и удаление узлов

Изменение DOM -- ключ к созданию "живых" страниц. 

В этой главе мы рассмотрим, как создавать новые элементы "на лету" и заполнять их данными.

[cut]

## Пример: показ сообщения

В качестве примера рассмотрим добавление сообщения на страницу, чтобы оно было оформленно красивее чем обычный `alert`.

HTML-код для сообщения:

```html
<!--+ autorun height="100" -->
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

*!*
<div class="alert">
  <strong>Ура!</strong> Вы прочитали это важное сообщение.
</div>
*/!*
```

## Создание элемента

Для создания элементов используются следующие методы:

<dl>
<dt>`document.createElement(tag)`</dt>
<dd>Создает новый элемент с указанным тегом:

```js
var div = document.createElement('div');
```

</dd>
<dt>`document.createTextNode(text)`</dt>
<dd>Создает новый *текстовый* узел с данным текстом:

```js
var textElem = document.createTextNode('Тут был я');
```

</dl>

### Создание сообщения

В нашем случае мы хотим сделать DOM-элемент `div`, дать ему классы и заполнить текстом:

```js
var div = document.createElement('div');
div.className = "alert alert-success";
div.innerHTML = "<strong>Ура!</strong> Вы прочитали это важное сообщение.";
```

После этого кода у нас есть готовый DOM-элемент. Пока что он присвоен в переменную `div`, но не виден, так как никак не связан со страницей. 

## Добавление элемента: appendChild, insertBefore

Чтобы DOM-узел был показан на странице, его необходимо вставить в `document`.

Для этого первым делом нужно решить, куда мы будем его вставлять. Предположим, что мы решили, что вставлять будем в некий элемент `parentElem`, например `var parentElem = document.body`.

Для вставки внутрь `parentElem` есть следующие методы:

<dl>
<dt>`parentElem.appendChild(elem)`</dt>
<dd>Добавляет `elem` в конец дочерних элементов `parentElem`. 

Следующий пример добавляет новый элемент в конец `<ol>`:

```html
<!--+ run height=100 -->
<ol id="list">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
  var newLi = document.createElement('li');
  newLi.innerHTML = 'Привет, мир!';

  list.appendChild(newLi);
</script>
```

</dd>
<dt>`parentElem.insertBefore(elem, nextSibling)`</dt>
<dd>Вставляет `elem` в коллекцию детей `parentElem`, перед элементом `nextSibling`.

Следующий код вставляет новый элемент перед вторым `<li>`:

```html
<!--+ run height=100 -->
<ol id="list">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>
<script>
  var newLi = document.createElement('li');
  newLi.innerHTML = 'Привет, мир!';

*!*
  list.insertBefore(newLi, list.children[1]);
*/!*
</script>
```

Для вставки элемента в начало достаточно указать, что вставлять будем перед первым потомком:

```js
list.insertBefore(newLi, list.firstChild);
```

У читателя, который посмотрит на этот код внимательно, наверняка возникнет вопрос: "А что, если `list` вообще пустой, в этом случае ведь `list.firstChild = null`, произойдёт ли вставка?"

Ответ -- да, произойдёт.

**Дело в том, что если вторым аргументом указать `null`, то `insertBefore` сработает как `appendChild`:**

```js
parentElem.insertBefore(elem, null);
// то же, что и:
parentElem.appendChild(elem)
```

Так что `insertBefore` универсален.
</dd>
</dl>

[smart]
Все методы вставки возвращают вставленный узел.

Например, `parentElem.appendChild(elem)` возвращает `elem`. 
[/smart]


### Пример использования

Добавим сообщение в конец `<body>`:

```html
<!--+ height=150 run autorun -->
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<body>
  <h3>Моя страница</h3>
</body>

<script>
  var div = document.createElement('div');
  div.className = "alert alert-success";
  div.innerHTML = "<strong>Ура!</strong> Вы прочитали это важное сообщение.";

*!*
  document.body.appendChild(div);
*/!*
</script>
```

...А теперь -- в начало `<body>`:

```html
<!--+ height=150 run autorun -->
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<body>
  <h3>Моя страница</h3>
</body>

<script>
  var div = document.createElement('div');
  div.className = "alert alert-success";
  div.innerHTML = "<strong>Ура!</strong> Вы прочитали это важное сообщение.";

*!*
  document.body.insertBefore(div, document.body.firstChild);
*/!*
</script>
```

## Клонирование узлов: cloneNode

А как бы вставить второе похожее сообщение?

Конечно, можно сделать функцию для генерации сообщений и поместить туда этот код, но в ряде случаев гораздо эффективнее -- *клонировать* существующий `div`, а потом изменить текст внутри. В частности, если элемент большой, то клонировать его будет гораздо быстрее, чем пересоздавать.

Вызов `elem.cloneNode(true)` создаст "глубокую" копию элемента -- вместе с атрибутами, включая подэлементы. Если же вызвать с аргумнтом `false`, то он копия будет без подэлементов, но это нужно гораздо реже.

### Копия сообщения 

Пример со вставкой копии сообщения:

```html
<!--+ height=200 run autorun -->
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<body>
  <h3>Моя страница</h3>
</body>

<script>
  var div = document.createElement('div');
  div.className = "alert alert-success";
  div.innerHTML = "<strong>Ура!</strong> Вы прочитали это важное сообщение.";

  document.body.insertBefore(div, document.body.firstChild);

*!*
  // создать копию узла
  var div2 = div.cloneNode(true);
  // копию можно подправить
  div2.querySelector('strong').innerHTML = 'Супер!';
  // вставим её после текущего сообщения
  div.parentNode.insertBefore(div2, div.nextSibling);
*/!*
</script>
```

Обратите внимание на последнюю строку, которая вставляет `div2` после `div`:

```js
div.parentNode.insertBefore(div2, div.nextSibling);
```

<ol>
<li>Для вставки нам нужен будущий родитель. Мы, возможно, не знаем, где точно находится `div` (или не хотим зависеть от того, где он), но если нужно вставить рядом с `div`, то родителем определённо будет `div.parentNode`.</li>
<li>Мы хотели бы вставить *после* `div`, но метода `insertAfter` нет, есть только `insertBefore`, поэтому вставляем *перед* его правым соседом `div.nextSibling`.</li>
</ol>


## Удаление узлов: removeChild  

Для удаления узла есть два метода:

<dl>
<dt>`parentElem.removeChild(elem)`</dt>
<dd>Удаляет `elem` из списка детей `parentElem`.</dd>
<dt>`parentElem.replaceChild(elem, currentElem)`</dt>
<dd>Среди детей `parentElem` заменяет `currentElem` на `elem`.</dd>
</dl>

Оба этих метода возвращают удаленный узел. Если нужно, его можно вставить в другое место DOM тут же или в будущем.

[smart]
Если вы хотите *переместить* элемент на новое место -- не нужно его удалять со старого.

**Все методы вставки автоматически удаляют вставляемый элемент со старого места.**

Конечно же, это очень удобно.

Например, поменяем элементы местами:

```html
<!--+ run height=150 -->
<div>Первый</div>
<div>Второй</div>
<script>
  var first = document.body.children[0];
  var last = document.body.children[1];

  // нет необходимости в предварительном removeChild(last)
  document.body.insertBefore(last, first); // поменять местами
</script>
```

[/smart]


[smart header="Метод `remove`"]

В современном стандарте есть также метод [elem.remove()](https://dom.spec.whatwg.org/#dom-childnode-remove), который удаляет элемент напрямую, не требуя ссылки на родителя. Это зачастую удобнее, чем `removeChild`.

Он поддерживается во всех современных браузерах, кроме IE11-. Впрочем, легко подключить или даже сделать полифилл.
[/smart]

### Удаление сообщения

Сделаем так, что через секунду сообщение пропадёт:

```html
<!--+ run -->
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<body>
  <h3>Сообщение пропадёт через секунду</h3>
</body>

<script>
  var div = document.createElement('div');
  div.className = "alert alert-success";
  div.innerHTML = "<strong>Ура!</strong> Вы прочитали это важное сообщение.";

  document.body.appendChild(div);

*!*
  setTimeout(function() {
    div.parentNode.removeChild(div);
  }, 1000);
*/!*
</script>
```

## Текстовые узлы для вставки текста

При работе с сообщением мы использовали только узлы-элементы и `innerHTML`. 

Но и текстовые узлы тоже имеют интересную область применения! 

Если текст для сообщения нужно показать именно как текст, а не как HTML, то можно обернуть его в текстовый узел.

Например:

```html
<!--+ run -->
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  var div = document.createElement('div');
  div.className = "alert alert-success";
  document.body.appendChild(div);

*!*
  var text = prompt("Введите текст для сообщения", "Жили были <a> и <b>!");

  // вставится именно как текст, без HTML-обработки
  div.appendChild(document.createTextNode(text));
*/!*
</script>
```

В современных браузерах (кроме IE8-) в качестве альтернативы можно использовать присвоение `textContent`.


## Итого

Методы для создания узлов:

<ul>
<li>`document.createElement(tag)` -- создает элемент</li>
<li>`document.createTextNode(value)` -- создает текстовый узел</li>
<li>`elem.cloneNode(deep)` -- клонирует элемент, если `deep == true`, то со всеми потомками, если `false` -- без потомков.</li>
</ul>

Вставка и удаление узлов:
<ul>
<li>`parent.appendChild(elem)`</li>
<li>`parent.insertBefore(elem, nextSibling)`</li>
<li>`parent.removeChild(elem)`</li>
<li>`parent.replaceChild(elem, currentElem)`</li>
</ul>

Все эти методы возвращают `elem`.

**Запомнить порядок аргументов очень просто: новый(вставляемый) элемент -- всегда первый.**

Методы для изменения DOM также описаны в спецификации <a href="http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html">DOM Level 1</a>.







