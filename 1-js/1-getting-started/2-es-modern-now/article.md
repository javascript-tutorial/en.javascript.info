
# Modern JavaScript now

The [latest standard](http://www.ecma-international.org/publications/standards/Ecma-262.htm) was approved in June 2015.

As it includes a lot of new features, most browsers implement them partially. You can find the current state of the support at [](https://kangax.github.io/compat-table/es6/).

Sometimes the project is targeted to a single JavaScript engine, like Node.JS (V8). Then we can use only the features supported by V8 (quite a lot).

But what if we're writing a cross-browser application?

## Babel.JS

[Babel.JS](https://babeljs.io) is a [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler). It rewrites the modern JavaScript code into the previous standard.

Actually, there are two parts in Babel:

<ol>
<li>The transpiler itself, which rewrites the code.</li>
<li>An additional JavaScript library which adds the support for modern JavaScript functions to the browser.</li>
</ol>

The transpiler runs on a developer's computer. It rewrites the code, which is then bundled by a project build system (like [webpack](http://webpack.github.io/) or [brunch](http://brunch.io/)). Most build systems can support Babel easily. One just needs to setup the build system itself.

Most syntax-level language features 
The JavaScript library if required if


Настройка такой конвертации тривиальна, единственно -- нужно поднять саму систему сборки, а добавить к ней Babel легко, плагины есть к любой из них.

Если же хочется "поиграться", то можно использовать и браузерный вариант Babel.

Это выглядит так:

```html
<!--+ run -->
*!*
<!-- browser.js лежит на моём сервере, не надо брать с него -->
<script src="https://js.cx/babel-core/browser.min.js"></script>
*/!*

<script type="text/babel">
  let arr = ["hello", 2]; // let

  let [str, times] = arr; // деструктуризация

  alert( str.repeat(times) ); // hellohello, метод repeat
</script>
```

Сверху подключается браузерный скрипт `browser.min.js` из пакета Babel. Он включает в себя полифилл и транспайлер. Далее он автоматически транслирует и выполняет скрипты с `type="text/babel"`.

Размер `browser.min.js` превышает 1 мегабайт, поэтому такое использование в production строго не рекомендуется.

# Примеры на этом сайте

[warn header="Только при поддержке браузера"]
Запускаемые примеры с ES-2015 будут работать только если ваш браузер поддерживает соответствующую возможность стандарта.
[/warn]

Это означает, что при запуске примеров в браузере, который их не поддерживает, будет ошибка. Это не означает, что пример неправильный! Просто пока нет поддержки...

Рекомендуется [Chrome Canary](https://www.google.com/chrome/browser/canary.html) большинство примеров в нём работает. [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/channel/#developer) тоже неплох в поддержке современного стандарта, но на момент написания этого текста переменные [let](/let-const) работают только при указании `version=1.7` в типе скрипта: `<script type="application/javascript;version=1.7">`. Надеюсь, скоро это требование (`version=1.7`) отменят.

Впрочем, если пример в браузере не работает (обычно проявляется как ошибка синтаксиса) -- почти все примеры вы можете запустить его при помощи Babel, на странице [Babel: try it out](https://babeljs.io/repl/). Там же увидите и преобразованный код.

На практике для кросс-браузерности всё равно используют Babel.

Ещё раз заметим, что самая актуальная ситуация по поддержке современного стандарта браузерами и транспайлерами отражена на странице [](https://kangax.github.io/compat-table/es6/).

Итак, поехали!

