# Intl: интернационализация в JavaScript

Общая проблема строк, дат, чисел в JavaScript -- они "не в курсе" языка и особенностей стран, где находится посетитель.

В частности:
<dl>
<dt>Строки</dt>
<dd>При сравнении сравниваются коды символов, а это неправильно, к примеру, в русском языке оказывается, что `"ё" > "я"` и `"а" > "Я"`, хотя всем известно, что `я` -- последняя буква алфавита и это она должна быть больше любой другой.</dd>
<dt>Даты</dt>
<dd>В разных странах принята разная запись дат. Где-то пишут 31.12.2014 (Россия), а где-то 12/31/2014 (США), где-то иначе.</dd>
<dt>Числа</dt>
<dd>В одних странах выводятся цифрами, в других -- иероглифами, длинные числа разделяются где-то пробелом, где-то запятой.</dd>
</dl>

Все современные браузеры, кроме IE10- (но есть библиотеки и для него) поддерживают стандарт [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf), предназначенный решить эти проблемы навсегда.

[cut]

## Основные объекты

<dl>
<dt>`Intl.Collator`</dt>
<dd>Умеет правильно сравнивать и сортировать строки.</dd>
<dt>`Intl.DateTimeFormat`</dt>
<dd>Умеет форматировать дату и время в соответствии с нужным языком.</dd>
<dt>`Intl.NumberFormat`</dt>
<dd>Умеет форматировать числа в соответствии с нужным языком.</dd>
</dl>

## Локаль 

*Локаль* -- первый и самый важный аргумент всех методов, связанных с интернационализацией.

Локаль описывается строкой из трёх компонентов, которые разделяются дефисом:
<ol>
<li>Код языка.</li>
<li>Код способа записи.</li>
<li>Код страны.</li>
</ol>

На практике не всегда указаны три, обычно меньше:
<ol>
<li>`ru` -- русский язык, без уточнений.</li>
<li>`en-GB` -- английский язык, используемый в Англии (`GB`).</li>
<li>`en-US` -- английский язык, используемый в США (`US`).</li>
<li>`zh-Hans-CN` -- китайский язык (`zh`), записываемый упрощённой иероглифической письменностью (`Hans`), используемый в китае.</li>
</ol>

Также через суффикс `-u-*` можно указать расширения локалей, например `"th-TH-u-nu-thai"` -- тайский язык (`th`), используемый в Тайланде (`TH`), с записью чисел тайскими буквами (๐, ๑, ๒, ๓, ๔, ๕, ๖, ๗, ๘, ๙) .

Стандарт, который описывает локали -- [RFC 5464](http://tools.ietf.org/html/rfc5646), языки описаны в [IANA language registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry).

Все методы принимают локаль в виде строки или массива, содержащего несколько локалей в порядке предпочтения.

Если локаль не указана или `undefined` -- берётся локаль по умолчанию, установленная в окружении (браузере).

### Подбор локали localeMatcher

`localeMatcher` -- вспомогательная настройка, которую тоже можно везде указать, она определяет способ подбора локали, если желаемая недоступна.

У него два значения:
<ul>
<li>`"lookup"` -- означает простейший порядок поиска путём обрезания суффикса, например `zh-Hans-CN` -> `zh-Hans` -> `zh` -> локаль по умолчанию.</li>
<li>`"best fit"` -- использует встроенные алгоритмы и предпочтения браузера (или другого окружения) для выбора подходящей локали.</li>
</ul>

**По умолчанию стоит `"best fit"`.**

Если локалей несколько, например `["zh-Hans-CN", "ru-RU"]` то `localeMatcher` пытается подобрать наиболее подходящую локаль для первой из списка (китайская), если не получается -- переходит ко второй (русской) и так далее. Если ни одной не нашёл, например на компьютере не совсем поддерживается ни китайский ни русский, то используется локаль по умолчанию.

Как правило, `"best fit"` является здесь наилучшим выбором.


## Строки, Intl.Collator [#intl-collator]

Синтаксис:

```js
// создание 
var collator = new Intl.Collator([locales, [options]])
```

Параметры:
<dl>
<dt>`locales`</dt>
<dd>Локаль, одна или массив в порядке предпочтения.</dd>
<dt>`options`</dt>
<dd>Объект с дополнительными настройками:
<ul>
<li>`localeMatcher` -- алгоритм выбора подходящей локали.</li>
<li>`usage` -- цель сравнения: сортировка `"sort"` или поиск `"search"`, по умолчанию `"sort"`.</li>
<li>`sensitivity` -- чувствительность: какие различия в символах учитывать, а какие -- нет, варианты:
<ul>
<li>`base` -- учитывать только разные символы, без диакритических знаков и регистра, например: `а ≠ б`, `е = ё`, `а = А`.</li>
<li>`accent` -- учитывать символы и диакритические знаки, например: `а ≠ б`, `е ≠ ё`, `а = А`.</li>
<li>`case` --  учитывать символы и регистр, например: `а ≠ б`, `е = ё`, `а ≠ А`.</li>
<li>`variant` -- учитывать всё: символ, диакритические знаки, регистр, например: `а ≠ б`, `е ≠ ё`, `а ≠ А`, используется по умолчанию.</li>
</ul>
</li>
<li>`ignorePunctuation` -- игнорировать знаки пунктуации: `true/false`, по умолчанию `false`.</li>
<li>`numeric` -- использовать ли численное сравнение: `true/false`, если `true`, то будет `12 > 2`, иначе `2 < 12`.</li>
<li>`caseFirst` -- в сортировке должны идти первыми прописные или строчные буквы,  варианты: `"upper"` (прописные), `lower` (строчные) или `false` (стандартное для локали, также является значением по умолчанию). Не поддерживается IE11-.</li>
</ul>
</dd>
</dl>

В подавляющем большинстве случаев подходят стандартные параметры, то есть `options` указывать не нужно.

Использование:

```js
var result = collator.compare(str1, str2);
```

Результат `compare` имеет значение `1` (больше), `0` (равно) или `-1` (меньше).

Например:

```js
//+ run
var collator = new Intl.Collator();

alert( "ёжик" > "яблоко" ); // true (ёжик больше, что неверно)
alert( collator.compare("ёжик", "яблоко") ); // -1 (ёжик меньше, верно)
```

Выше были использованы полностью стандартные настройки. Они различают регистр символа, но это различие можно убрать, если настроить чувствительность `sensitivity`:

```js
//+ run
var collator = new Intl.Collator();
alert( collator.compare("ЁжиК", "ёжик") ); // 1, разные

var collator = new Intl.Collator(undefined, {
  sensitivity: "accent"
});
alert( collator.compare("ЁжиК", "ёжик") ); // 0, одинаковые
```

## Даты, Intl.DateFormatter [#intl-dateformatter]

Синтаксис:

```js
// создание 
var formatter = new Intl.DateFormatter([locales, [options]])
```

Первый аргумент -- такой же, как и в `Collator`, а в объекте `options` мы можем определить, какие именно части даты показывать (часы, месяц, год...) и в каком формате.

Полный список свойств `options`:
<table>
<thead>
<tr>
    <th>Свойство</th>
    <th>Описание</th>
    <th>Возможные значения</th>
    <th>По умолчанию</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>`localeMatcher` </td>
    <td> Алгоритм подбора локали</td>
    <td>
      `lookup`,`best fit`
    </td>
    <td>
      `best fit`
    </td>
  </tr>
  <tr>
    <td>`formatMatcher` </td>
    <td>
      Алгоритм подбора формата
    </td>
    <td> `basic`, `best fit` </td>
    <td> `best fit` </td>
  </tr>
  <tr>
    <td>`hour12`</td>
    <td>Включать ли время в 12-часовом формате</td>
    <td>`true` -- 12-часовой формат, `false` -- 24-часовой</td>
    <td></td>
  </tr>
  <tr>
    <td>`timeZone`</td>
    <td>Временная зона</td>
    <td>Временная зона, например `Europe/Moscow`</td>
    <td>`UTC`</td>
  </tr>
  <tr>
    <td>`weekday`</td>
    <td>День недели</td>
    <td>`narrow`, `short`, `long`</td>
    <td></td>
  </tr>
  <tr>
    <td>`era`</td>
    <td>Эра</td>
    <td>`narrow`, `short`, `long`</td>
    <td></td>
  </tr>
  <tr>
    <td>`year`</td>
    <td>Год</td>
    <td>`2-digit`, `numeric`</td>
    <td>`undefined` или `numeric`</td>
  </tr>
  <tr>
    <td>`month`</td>
    <td>Месяц</td>
    <td>`2-digit`, `numeric`, `narrow`, `short`, `long` </td>
    <td>`undefined` или `numeric`</td>
  </tr>
  <tr>
    <td>`day`</td>
    <td>День</td>
    <td>`2-digit`, `numeric`</td>
    <td>`undefined` или `numeric`</td>
  </tr>
  <tr>
    <td>`hour`</td>
    <td>Час</td>
    <td> `2-digit`, `numeric` </td>
    <td></td>
  </tr>
  <tr>
    <td>`minute`</td>
    <td>Минуты </td>
    <td> `2-digit`, `numeric` </td>
    <td></td>
  </tr>
  <tr>
    <td>`second`
    </td>
    <td>Секунды</td>
    <td>`2-digit`, `numeric`</td>
    <td></td>
  </tr>
  <tr>
    <td>`timeZoneName`</td>
    <td>Название таймзоны (нет в IE11)</td>
    <td>`short`, `long`</td>
    <td></td>
  </tr>
  </tbody>
</table>

**Все локали обязаны поддерживать следующие наборы настроек:**

<ul>
<li>weekday, year, month, day, hour, minute, second</li>
<li>weekday, year, month, day</li>
<li>year, month, day</li>
<li>year, month</li>
<li>month, day</li>
<li>hour, minute, second</li>
</ul>

Если указанный формат не поддерживается, то настройка `formatMatcher` задаёт алгоритм подбора наиболее близкого формата: `basic` -- по [стандартным правилам](http://www.ecma-international.org/ecma-402/1.0/#BasicFormatMatcher) и `best fit` -- по умолчанию, на усмотрение окружения (браузера).


Использование:

```js
var dateString = formatter.format(date);
```

Например:

```js
//+ run
var date = new Date(2014, 11, 31, 12, 30, 0);

var formatter = new Intl.DateTimeFormat("ru");
alert( formatter.format(date) ); // 31.12.2014

var formatter = new Intl.DateTimeFormat("en-US");
alert( formatter.format(date) ); // 12/31/2014
```

Длинная дата, с настройками:

```js
//+ run
var date = new Date(2014, 11, 31, 12, 30, 0);

var formatter = new Intl.DateTimeFormat("ru", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});

alert( formatter.format(date) ); // среда, 31 декабря 2014 г.
```

Только время:

```js
//+ run
var date = new Date(2014, 11, 31, 12, 30, 0);

var formatter = new Intl.DateTimeFormat("ru", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
});

alert( formatter.format(date) ); // 12:30:00
```

## Числа: Intl.NumberFormat

Форматтер `Intl.NumberFormat` умеет красиво форматировать не только числа, но и валюту, а также проценты.

Синтаксис:

```js
var formatter = new Intl.NumberFormat([locales[, options]]);

formatter.format(number); // форматирование
```

Параметры, как и раньше -- локаль и опции.

Список опций:

<table>
<tr>
    <th>Свойство </th>
    <th>Описание </th>
    <th>Возможные значения </th>
    <th>По умолчанию </th>
  </tr>
  <tr>
    <td> `localeMatcher` </td>
    <td>Алгоритм подбора локали </td>
    <td> `lookup`, `best fit` </td>
    <td> `best fit` </td>
  </tr>
  <tr>
    <td> `style` </td>
    <td>Стиль форматирования </td>
    <td> `decimal`, `percent`, `currency` </td>
    <td> `decimal` </td>
  </tr>
  <tr>
    <td> `currency` </td>
    <td> Алфавитный код валюты</td>
    <td> См. [Список кодов валюты](http://www.currency-iso.org/en/home/tables/table-a1.html), например `USD` </td>
    <td> </td>
  </tr>
  <tr>
    <td> `currencyDisplay` </td>
    <td>Показывать валюту в виде кода, локализованного символа или локализованного названия
    </td>
    <td> `code`, `symbol`, `name` </td>
    <td> `symbol` </td>
  </tr>
  <tr>
    <td> `useGrouping` </td>
    <td>Разделять ли цифры на группы</td>
    <td> `true`, `false` </td>
    <td> `true` </td>
  </tr>
  <tr>
    <td>`minimumIntegerDigits`</td>
    <td>Минимальное количество цифр целой части</td>
    <td>от `1` до `21`
    </td>
    <td>`21`</td>
  </tr>
  <tr>
    <td>`minimumFractionDigits` </td>
    <td>Минимальное количество десятичных цифр
    </td>
    <td>от `0` до `20` </td>
    <td>для чисел и процентов `0`, для валюты зависит от кода.</td>
  </tr>
  <tr>
    <td>`maximumFractionDigits`</td>
    <td>Максимальное количество десятичных цифр </td>
    <td>от `minimumFractionDigits` до `20`. </td>
    <td>для чисел `max(minimumFractionDigits, 3)`, для процентов `0`, для валюты зависит от кода.</td>
  </tr>
  <tr>
    <td>`minimumSignificantDigits`</td>
    <td>Минимальное количество значимых цифр</td>
    <td>от `1` до `21`</td>
    <td>`1`</td>
  </tr>
  <tr>
    <td>`maximumSignificantDigits`</td>
    <td>Максимальное количество значимых цифр</td>
    <td>от `minimumSignificantDigits` до `21`</td>
    <td>`minimumSignificantDigits`</td>
  </tr>
</table>

Пример без опций:

```js
//+ run
var formatter = new Intl.NumberFormat("ru");
alert( formatter.format(1234567890.123) ); // 1 234 567 890,123
```

С ограничением значимых цифр (важны только первые 3):

```js
//+ run
var formatter = new Intl.NumberFormat("ru", {
  maximumSignificantDigits: 3
});
alert( formatter.format(1234567890.123) ); // 1 230 000 000
```

C опциями для валюты:

```js
var formatter = new Intl.NumberFormat("ru", {
  style: "currency",
  currency: "GBP"
});

alert( formatter.format(1234.5) ); // 1 234,5 £
```

С двумя цифрами после запятой:

```js
var formatter = new Intl.NumberFormat("ru", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2
});

alert( formatter.format(1234.5) ); // 1 234,50 £
```

## Методы в Date, String, Number

Методы форматирования также поддерживаются в обычных строках, датах, числах:

<dl>
<dt>`String.prototype.localeCompare(that [, locales [, options]])`</dt>
<dd>Сравнивает строку с другой, с учётом локали, например:

```js
//+ run
var str = "ёжик";

alert( str.localeCompare("яблоко", "ru") ); // -1
```

</dd>
<dt>`Date.prototype.toLocaleString([locales [, options]])`</dt>
<dd>Форматирует дату в соответствии с локалью, например:

```js
//+ run no-beautify
var date = new Date(2014, 11, 31, 12, 00);

alert( date.toLocaleString("ru", { year: 'numeric', month: 'long' }) ); // Декабрь 2014
```

</dd>
<dt>`Date.prototype.toLocaleDateString([locales [, options]])`</dt>
<dd>То же, что и выше, но опции по умолчанию включают в себя год, месяц, день</dd>
<dt>`Date.prototype.toLocaleTimeString([locales [, options]])`</dt>
<dd>То же, что и выше, но опции по умолчанию включают в себя часы, минуты, секунды</dd>
<dt>`Number.prototype.toLocaleString([locales [, options]])`</dt>
<dd>Форматирует число, используя опции `Intl.NumberFormat`.</dd>
</dl>

Все эти методы при запуске создают соответствующий объект `Intl.*` и передают ему опции, можно рассматривать их как укороченные варианты вызова.

## Старые IE

В IE10- рекомендуется использовать полифилл, например библиотеку [](https://github.com/andyearnshaw/Intl.js).


