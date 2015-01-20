# JavaScript Intoduction

Let's see what's so special about JavaScript, what we can achieve with it and what other technologies coexist with it.

## What is JavaScript?   

*JavaScript* was initially created to *make webpages live".

The programs in this language are called *scripts*. They are put directly into HTML and execute automatically as it loads.

**Scripts are provided and executed a plain text.**. 

They don't need a special preparation or compilation to run.

In this aspect, JavaScript is very different from another language called [Java](http://en.wikipedia.org/wiki/Java).

[smart header="Why <u>Java</u>Script?"]
When JavaScript was created, it initially had another name: "LiveScript". But Java language was very popular at that time and it was decided that positioning a new language as a "younger brother" to Java would help.

But as it evolved, JavaScript became a fully independent language, with its specification called [ECMAScript](http://en.wikipedia.org/wiki/ECMAScript), and has no relation to Java altogether.

It has quite a few special features that make mastering it a bit hard at first, but we'll deal with them as the tutorial goes on.
[/smart]

JavaScript can execute not only in the browser, but anywhere, with the help of a special program called [an interpreter]("http://en.wikipedia.org/wiki/Interpreter_(computing)"). The execution process is called "an interpretation".

[smart header="Compilation and interpretation, for programmers"]
There are in fact two main means to execute programs: "compilers" and "interpreters".

<ul>
<li>*Compilers* convert the program text (source code) to another language, usually machine language (binary code) without executing it. The binary code is then distributed to the system which runs it.</li>
<li>*Interpreters*, and in particular the one embedded in the browser -- get the source code and execute it "as is". The source code (script) is distributed to the system.</li>
</ul>

Modern interpreters actually convert the JavaScript to machine language or close to it, and then execute. That's why JavaScript is very fast.
[/smart]

All major browsers have an embedded JavaScript interpreter, that's why they are capable of script execution.

But naturally JavaScript can be used not only in-browser. It's a full-fledged language usable at the server too and even in a washing machine if the interpreter is installed.

[warn header="Let's talk browsers"]
Further in the chapter we talk about capabilities and limitaitons of JavaScript in the browser.
[/warn]

## What JavaScript can do?   

The modern JavaScript is a "safe" general purpose programming language. It does not provide low-level access to memory or CPU, because it was initially created for browsers which do not require it.

Other capabilities depend on the environment which runs JavaScript. In the browser JavaScript is able to do everything related to webpage manipulation, talk to the visitor and, to some extent, talk to the internet.

Or, in more details:

<ul>
<li>To create new HTML tags, remove the existing ones, change styles, hide/show elements...</li>
<li>To react on user actions, run on mouse clicks, pointer movements, key presses...</li>
<li>To send requests over the network to remote servers, download and upload data without reloading the page (a so-called "AJAX" technology)...</li>
<li>To get and set cookies, ask for data, show messages...</li>
<li>...and much much more!</li> 
</ul>

## What JavaScript can NOT do?

JavaScript -- быстрый и мощный язык, но браузер накладывает на его исполнение некоторые ограничения.. 

Это сделано для безопасности пользователей, чтобы злоумышленник не мог с помощью JavaScript получить личные данные или как-то навредить компьютеру пользователя. 

Этих ограничений нет там, где JavaScript используется вне браузера, например на сервере. Кроме того, современные браузеры предоставляют свои механизмы по установке плагинов и расширений, которые обладают расширенными возможностями, но требуют специальных действий по установке от пользователя

**Большинство возможностей JavaScript в браузере ограничено текущим окном и страницей.**

<img src="limitations.svg" width="530" height="400">

<ul>
<li>JavaScript не может читать/записывать произвольные файлы на жесткий диск, копировать их или вызывать программы. Он не имеет прямого доступа к операционной системе.

Современные браузеры могут работать с файлами, но эта возможность ограничена специально выделенной директорией -- *"песочницей"*. Возможности по доступу к устройствам также прорабатываются в современных стандартах и частично доступны в некоторых браузерах.
</li>
<li>JavaScript, работающий в одной вкладке, не может общаться с другими вкладками и окнами, за исключением случая, когда он сам открыл это окно или несколько вкладок из одного источника (одинаковый домен, порт, протокол).

Есть способы это обойти, и они раскрыты в учебнике, но они требуют специального кода на оба документа, которые находятся в разных вкладках или окнах. Без него, из соображений безопасности, залезть из одной вкладки в другую при помощи JavaScript нельзя. 
</li>
<li>Из JavaScript можно легко посылать запросы на сервер, с которого пришла страница. Запрос на другой домен тоже возможен, но менее удобен, т.к. и здесь есть ограничения безопасности. 
</li>
</ul>

## В чем уникальность JavaScript?   

Есть как минимум *три* замечательных особенности JavaScript:

[compare]
+Полная интеграция с HTML/CSS.
+Простые вещи делаются просто.
+Поддерживается всеми распространенными браузерами и включен по умолчанию.
[/compare]

**Этих трёх вещей одновременно нет больше ни в одной браузерной технологии.** 

Поэтому JavaScript и является самым распространенным средством создания браузерных интерфейсов.

## Тенденции развития

Перед тем, как вы планируете изучить новую технологию, полезно ознакомиться с ее развитием и перспективами. Здесь в JavaScript всё более чем хорошо.

### HTML 5

*HTML 5* -- эволюция стандарта HTML, добавляющая новые теги и, что более важно, ряд новых возможностей браузерам.

Вот несколько примеров:
<ul>
<li>Чтение/запись файлов на диск (в специальной "песочнице", то есть не любые).</li>
<li>Встроенная в браузер база данных, которая позволяет хранить данные на компьютере пользователя.</li>
<li>Многозадачность с одновременным использованием нескольких ядер процессора.</li>
<li>Проигрывание видео/аудио, без Flash.</li>
<li>2d и 3d-рисование с аппаратной поддержкой, как в современных играх.</li>
</ul>

Многие возможности HTML5 всё ещё в разработке, но браузеры постепенно начинают их поддерживать.

[summary]Тенденция: JavaScript становится всё более и более мощным и возможности браузера растут в сторону десктопных приложений.[/summary]

### EcmaScript 6

Сам язык JavaScript улучшается. Современный стандарт EcmaScript 5 включает в себя новые возможности для разработки, EcmaScript 6 будет шагом вперёд в улучшении синтаксиса языка.

Современные браузеры улучшают свои движки, чтобы увеличить скорость исполнения JavaScript, исправляют баги и стараются следовать стандартам.

[summary]Тенденция: JavaScript становится всё быстрее и стабильнее, в язык добавляются новые возможности.[/summary]

Очень важно то, что новые стандарты HTML5 и ECMAScript сохраняют максимальную совместимость с предыдущими версиями. Это позволяет избежать неприятностей с уже существующими приложениями.

Впрочем, небольшая проблема "супер-современными штучками" всё же есть. Иногда браузеры стараются включить новые возможности, которые еще не полностью описаны в стандарте, но настолько интересны, что разработчики просто не могут ждать.  

...Однако, со временем стандарт меняется и браузерам приходится подстраиваться к нему, что может привести к ошибкам в уже написанном, основанном на старой реализации, JavaScript-коде. Поэтому следует дважды подумать перед тем, как применять на практике такие "супер-новые" решения.

При этом все браузеры сходятся к стандарту, и различий между ними уже гораздо меньше, чем всего лишь несколько лет назад.

[summary]Тенденция: всё идет к полной совместимости со стандартом.[/summary]


## Альтернативные браузерные технологии

Современный JavaScript используется во многих областях. Если говорить о браузерах, то вместе с JavaScript на страницах используются и другие технологии.

Самые извеcтные -- это Flash, Java, ActiveX/NPAPI. Связка с ними может помочь достигнуть более интересных результатов в тех местах, где браузерный JavaScript пока не столь хорош, как хотелось бы. 

### Java   

Java -- язык общего назначения, на нем можно писать самые разные программы. Для интернет-страниц есть особая возможность - написание *апплетов*.

*Апплет* -- это программа на языке Java, которую можно подключить к HTML при помощи тега `applet`, выглядит это примерно так:

```html
<!--+ run -->
<applet code="BTApplet.class" codebase="/files/tutorial/intro/alt/">
  <param name="nodes" value="50,30,70,20,40,60,80,35,65,75,85,90">
  <param name="root" value="50">
</applet>
```

Такой тег загружает Java-программу из файла `BTApplet.class` и выполняет ее с параметрами `param`. Апплет выполняется в отдельной части страницы, в прямоугольном "контейнере". Все действия пользователя внутри него обрабатывает апплет. Контейнер, впрочем, может быть и спрятан, если апплету нечего показывать.

Конечно, для этого на компьютере должна быть установлена и включена среда выполнения Java, включая браузерный плагин. Кроме того, апплет должен быть подписан сертификатом издателя (в примере выше апплет без подписи), иначе Java заблокирует его.

**Чем нам, JavaScript-разработчикам, может быть интересен Java?**

В первую очередь тем, что подписанный Java-апплет может всё то же, что и обычная программа, установленая на компьютере посетителя. Конечно, для этого понадобится согласие пользователя при открытии такого апплета.

[compare]
+Java может делать *всё* от имени посетителя, совсем как установленная программа. Потенциально опасные действия требуют подписанного апплета и согласия пользователя.
-Java требует больше времени для загрузки.
-Среда выполнения Java, включая браузерный плагин, должна быть установлена на компьютере посетителя и включена.
-Java-апплет не интегрирован с HTML-страницей, а выполняется отдельно. Но он может вызывать функции JavaScript.
[/compare]


### Плагины и расширения для браузера

Все современные браузеры предоставляют возможность написать плагины. Для этого можно использовать JavaScript (Chrome, Opera, Firefox), так и язык С (ActiveX для Internet Explorer).

Эти плагины могут как отображать содержимое специального формата (плагин для проигрывания музыки, для показа PDF), так и взаимодействовать со страницей.

Как и в ситуации с Java-апплетом, у них широкие возможности, но посетитель поставит их в том случае, если вам доверяет.

### Adobe Flash   

Adobe Flash -- кросс-браузерная платформа для мультимедиа-приложений, анимаций, аудио и видео. 

*Flash-ролик* -- это скомпилированная программа, написанная на языке ActionScript. Ее можно подключить к HTML-странице и запустить в прямоугольном контейнере.

В первую очередь Flash полезен тем, что позволяет **кросс-браузерно** работать с микрофоном, камерой, с буфером обмена, а также поддерживает продвинутые возможности по работе с сетевыми соединениями. 

[compare]
+Сокеты, UDP для P2P и другие продвинутые возможности по работе с сетевыми соединениями
+Поддержка мультмедиа: изображения, аудио, видео. Работа с веб-камерой и микрофоном.
-Flash должен быть установлен и включен. А на некоторых устройствах он вообще не поддерживается.
-Flash не интегрирован с HTML-страницей, а выполняется отдельно.
-Существуют ограничения безопасности, однако они немного другие, чем в JavaScript.
[/compare]

Из Flash можно вызывать JavaScript и наоборот, поэтому обычно сайты используют JavaScript, а там, где он не справляется -- можно подумать о Flash.


## Языки поверх JavaScript


Синтаксис JavaScript устраивает не всех: одним он кажется слишком свободным, другим -- наоборот, слишком ограниченным, третьи хотят добавить в язык дополнительные возможности, которых нет в стандарте...

Это нормально, ведь требования и проекты у всех разные. 

В последние годы появилось много языков, которые добавляют различные возможности "поверх" JavaScript, а для запуска в браузере -- при помощи специальных инструментов "трансляторов" превращаются в обычный JavaScript-код.

Это преобразование происходит автоматически и совершенно прозрачно, при этом неудобств в разработке и отладке практически нет.

При этом разные языки выглядят по-разному и добавляют совершенно разные вещи:

<ul>
<li>Язык [CoffeeScript](http://coffeescript.org/) -- это "синтаксический сахар" поверх JavaScript, он сосредоточен на большей ясности и краткости кода. Как правило, его особенно любят программисты на Ruby.</li>
<li>Язык [TypeScript](http://www.typescriptlang.org/) сосредоточен на добавлении строгой типизации данных, он предназначен для упрощения разработки и поддержки больших систем. Его разрабатывает MicroSoft.</li>
<li>Язык [Dart](https://www.dartlang.org/) предложен компанией Google как замена JavaScript, но другие ведущие интернет-компании объявили о своей незаинтересованности в Dart. Возможно, в будущем он может составить конкуренцию JS.</li>
</ul>

[smart header="ES6 и ES7 прямо сейчас"]
Существуют также трансляторы, которые берут код, использующий возможности будущих стандартов JavaScript, и преобразуют его в более старый вариант, который понимают все браузеры.

Например, [6to5](https://6to5.org/).

Благодаря этому, мы можем использовать многие возможности будущего уже сегодня.
[/smart]


## Итого

Язык JavaScript уникален благодаря своей полной интеграции с HTML/CSS. Он работает почти у всех посетителей.

...Но хороший JavaScript-программист не должен забывать и о других технологиях.

Ведь наша цель -- создание хороших приложений, и здесь Flash, Java, ActiveX/NPAPI и браузерные расширения имеют свои уникальные возможности, которые можно использовать вместе с JavaScript.

Что же касается CoffeeScript, TypeScript и других языков, построенных над JavaScript -- они могут быть очень полезны, рекомендуется посмотреть их, хотя бы в общих чертах, но, конечно, после освоения самого JavaScript.

