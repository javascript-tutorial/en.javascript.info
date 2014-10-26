# GCC: интеграция с Google Closure Library

Google Closure Compiler содержит ряд специальных возможностей для интеграции с Google Closure Library. 

Здесь важны две вещи.
<ol>
<li>Для их использования возможно использовать минимум от Google Closure Library. Например, взять одну или несколько функций из библиотеки.</li>
<li>GCC -- расширяемый компилятор, можно добавить к нему свои "фазы оптимизации" для интеграции с другими инструментами и фреймворками.</li>
</ol>
[cut]

Интеграция с Google Closure Library подключается флагом <code>--process_closure_primitives</code>, который по умолчанию установлен в <code>true</code>. То есть, она включена по умолчанию.

Этот флаг запускает специальный проход компилятора, описанный классом <code>ProcessClosurePrimitives</code> и подключает дополнительную проверку типов <code>ClosureReverseAbstractInterpreter</code>. 

Мы рассмотрим все действия, которые при этом происходят, а также некоторые опции, которые безопасным образом используют символы Google Closure Library  без объявления флага.

## Преобразование основных символов

Следующие действия описаны в классе <code>ProcessClosurePrimitives</code>.

### Замена константы <code>COMPILED</code>

В Google Closure Library есть переменная:

```js
/**
 * @define {boolean} ...
 */
var COMPILED = false;
```

Проход <code>ProcessClosurePrimitives</code> переопределяет ее в <code>true</code> и использует это при оптимизациях, удаляя ветки кода, не предназначены для запуска на production.

Такие функции существуют, например, в ядре Google Closure Library. К ним в первую очередь относятся вызовы, предназначенные для сборки и проверки зависимостей. Они содержат код, обрамленный проверкой <code>COMPILED</code>, например:

```js
goog.require = function(rule) {
   // ...
  if (!COMPILED) {
     // основное тело функции
  }
}
```

Аналогично может поступить и любой скрипт, даже без использования Google Closure Library:

```js
/** @define {boolean} */
var COMPILED = false

Framework = { }

Framework.sayCompiled = function() {
	if (!COMPILED) {
		alert("Not compressed")
	} else {
		alert("Compressed")
	}
}
```

Для того, чтобы сработало, нужно сжать в продвинутом режиме:

```js
Framework = {};
Framework.sayCompiled = Framework.a = function() {
  alert("Compressed");
};
```

Компилятор переопределил <code>COMPILED</code> в <code>true</code> и произвел соответствующие оптимизации. 

### Автоподстановка локали

В Google Closure Compiler есть внутренняя опция <code>locale</code>

Эта опция переопределяет переменную <code>goog.LOCALE</code> на установленную при компиляции.

Для использования опции <code>locale</code>, на момент написания статьи, ее нужно задать в Java коде компилятора, т.к. соответствующего флага нет.

Как и <code>COMPILED</code>, константу <code>goog.LOCALE</code> можно и использовать в своем коде без библиотеки Google Closure Library.

### Проверка зависимостей

Директивы <code>goog.provide</code>, <code>goog.require</code>, <code>goog.addDependency</code> обрабатываются особым образом.

Все зависимости проверяются, а сами директивы проверки -- удаляются из сжатого файла.

### Экспорт символов

Вызов <code>goog.exportSymbol</code> задаёт экспорт символа.

Если подробнее, то код <code>goog.exportSymbol('a',myVar)</code> эквивалентен 
`window['a'] = myVar`.


### Автозамена классов CSS

Google Closure Library умеет преобразовывать классы CSS на более короткие по списку, который задаётся при помощи `goog.setCssNameMapping`.

Например, следующая функция задает такой список.

```js
 
goog.setCssNameMapping({
   "goog-menu": "a",
   "goog-menu-disabled": "a-b",
   "CSS_LOGO": "b",
   "hidden": "c"
});
```

Тогда следующий вызов преобразуется в "a a-b":

```js
goog.getCssName('goog-menu') + ' ' + goog.getCssName('goog-menu', 'disabled')
```

Google Closure Compiler производит соответствующие преобразования в сжатом файле и удаляет вызов <code>setCssNameMapping</code> из кода.

Чтобы это сжатие работало, в HTML/CSS классы тоже должны сжиматься. По всей видимости, в приложениях Google это и происходит, но соответствующие инструменты закрыты от публики.

### Генерация списка экстернов

При объявлении внутренней опции <code>externExportsPath</code>, содержащей путь к файлу, в этот файл будут записаны все экспорты, описанные через <code>goog.exportSymbol</code>/<code>goog.exportProperty</code>.

В дальнейшем этот файл может быть использован как список экстернов для компиляции.

Эта опция может быть полезна для создания внешних библиотек, распространяемых со списком экстернов.

Для её использования нужна своя обёртка вокруг компилятора на Java. Соответствующий проход компилятора описан в классе <code>ExternExportsPass</code>.

### Проверка типов

В Google Closure Library есть ряд функций для проверки типов. Например: <code>goog.isArray</code>, <code>goog.isString</code>, <code>goog.isNumber</code>, <code>goog.isDef</code> и т.п.

Компилятор использует их для проверки типов, более подробно см. [](/gcc-check-types)

Эта логика описана в классе <code>ClosureReverseAbstractInterpreter</code>. Названия функций, определяющих типы, жестко прописаны в Java-коде, поменять их на свои без модификации исходников нельзя. 

### Автогенерация экспортов из аннотаций

Для этого в Google Closure Compiler есть внутренняя опция <code>generateExports</code>.

Эта недокументированная опция добавляет проход компилятора, описанный классом <code>GenerateExports</code>.

Он читает аннотации <code>@export</code> и создает из них экспортирующие вызовы <code>goog.exportSymbol/exportProperty</code>. Название экспортирующих функций находится в классе соглашений кодирования, каким по умолчанию является <code>GoogleCodingConvention</code>.

Например:

```js
/** @export */
function Widget() {
}
/** @export */
Widget.prototype.hide = function() {
  this.elem.style.display = 'none'
}
```

После компиляции в продвинутом режиме:

```js
function a() {
}
goog.d("Widget", a);
a.prototype.a = function() {
  this.b.style.display = "none"
};
goog.c(a.prototype, "hide", a.prototype.a);
```

Свойства благополучно экспортированы. Удобно.

### Резюме

Google Closure Compiler содержит дополнительные фичи, облегчающие интеграцию с Google Closure Library. Некоторые из них весьма полезны, но требуют создания своего Java-файла, который ставит внутренние опции.

При обработке символов компилятор не смотрит, подключена ли библиотека, он находит обрабатывает их просто по именам. Поэтому вы можете использовать свою реализацию соответствующих функций.

Google Closure Compiler можно легко расширить, добавив свои опции и проходы оптимизатора, для интеграции с вашими инструментами.

