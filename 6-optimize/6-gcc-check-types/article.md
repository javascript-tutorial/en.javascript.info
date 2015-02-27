# GCC: статическая проверка типов 

Google Closure Compiler, как и любой кошерный компилятор, старается проверить правильность кода и предупредить о возможных ошибках.

Первым делом он, разумеется, проверяет структуру кода и сразу же выдает такие ошибки как пропущенная скобка или лишняя запятая. 

Но, кроме этого, он умеет проверять типы переменных, используя как свои собственные знания о встроенных javascript-функциях и преобразованиях типов, 
так и информацию о типах из JSDoc, указываемую javascript-разработчиком.

Это обеспечивает то, чем так гордятся компилируемые языки -- статическую проверку типов, что позволяет избежать лишних ошибок во время выполнения.
[cut]

Для вывода предупреждений при проверки типов используется флаг `--jscomp_warning checkTypes`.

## Задание типа при помощи аннотации

Самый очевидный способ задать тип -- это использовать аннотацию. Полный список аннотаций вы найдете в <a href="http://code.google.com/intl/ru/closure/compiler/docs/js-for-compiler.html">документации</a>.

В следующем примере параметр <code>id</code> функции <code>f1</code> присваивается переменной <code>boolVar</code> другого типа:

```js
/** @param {number} id */
function f(id) {
  /** @type {boolean} */
  var boolVar;

  boolVar = id; // (!)
}
```

Компиляция с флагом `--jscomp_warning checkTypes` выдаст предупреждение:

```
f.js:6: WARNING - assignment
found   : number
required: boolean
        boolVar = id; // (!)
        ^
```

Действительно: произошло присвоение значения типа <code>number</code> переменной типа <code>boolean</code>.

Типы отслеживаются по цепочке вызовов.

Еще пример, на этот раз вызов функции с некорректным параметром:

```js
/** @param {number} id */
function f1(id) {
  f2(id); // (!)
}

/** @param {string} id */
function f2(id) { }
```

Такой вызов приведёт к предупреждению со стороны минификатора:

```
f2.js:3: WARNING - actual parameter 1 of f2 does not match formal parameter
found   : number
required: string
  f2(id); // (!)
     ^
```

Действительно, вызов функции <code>f2</code> произошел с числовым типом вместо строки. 

**Отслеживание приведений и типов идёт при помощи графа взаимодействий и выведению (infer) типов, который строит GCC по коду.**

## Знания о преобразовании типов

Google Closure Compiler знает, как операторы javascript преобразуют типы. Такой код уже не выдаст ошибку:

```js
/** @param {number} id */
function f1(id) {
  /** @type {boolean} */
  var boolVar;

  boolVar = !!id
}
```

Действительно - переменная преобразована к типу boolean двойным оператором НЕ.
А код <code>boolVar = 'test-'+id</code> выдаст ошибку, т.к. конкатенация со строкой дает тип <code>string</code>.

## Знание о типах встроенных функций, объектные типы

Google Closure Compiler содержит описания большинства встроенных объектов и функций javascript вместе с типами параметров и результатов.

Например, объектный тип <code>Node</code> соответствует узлу DOM. 

Пример некорректного кода:

```js
/** @param {Node} node */
function removeNode(node) {
  node.parentNode.removeChild(node)
}
document.onclick = function() {
  removeNode("123")
}
```

Выдаст предупреждение

```
f3.js:7: WARNING - actual parameter 1 of removeNode does not match formal parameter
found   : string
required: (Node|null)
  removeNode("123")
             ^
```

Обратите внимание - в этом примере компилятор выдает <code>required: Node|null</code>. Это потому, что указание объектного типа (не элементарного) подразумевает, что в функцию может быть передан <code>null</code>.

В следующем примере тип указан жестко, без возможности обнуления:

```js
*!*
/** @param {!Node} node */
*/!*
function removeNode(node) {
	node.parentNode.removeChild(node)
}
```

Восклицательный знак означает, что параметр обязатален.

Найти описания встроенных типов и объектов javascript вы можете в файле экстернов: <code>externs.zip</code> находится в корне архива <code>compiler.jar</code>, или в соответствующей директории SVN: <a href="http://closure-compiler.googlecode.com/svn/trunk/externs/">http://closure-compiler.googlecode.com/svn/trunk/externs/</a>.

## Интеграция с проверками типов из Google Closure Library

В Google Closure Library есть функции проверки типов: <code>goog.isArray</code>, <code>goog.isDef</code>, <code>goog.isNumber</code> и т.п.

Google Closure Compiler знает о них и понимает, что внутри следующего <code>if</code> переменная может быть только функцией:

```js
var goog = {
  isFunction: function(f) { return typeof f == 'function' }
}

if (goog.isFunction(func)) {
  func.apply(1, 2)
}
```

Сжатие с проверкой выдаст предупреждение:

```
f.js:6: WARNING - actual parameter 2 of Function.apply does not match formal parameter
found   : number
required: (Object|null|undefined)
  func.apply(1, 2)
                ^      ^
```

То есть, компилятор увидел, что код, использующий <code>func</code> находится в `if (goog.isFunction(func))` и сделал соответствующий вывод, что это в этой ветке `func` является функцией, а значит вызов `func.apply(1,2)` ошибочен (второй аргумент не может быть числом).

Дело тут именно в интеграции с Google Closure Library. Если поменять `goog` на `g` -- предупреждения не будет. 

## Резюме

Из нескольких примеров, которые мы рассмотрели, должна быть понятна общая логика проверки типов.

Соответствующие различным типам и ограничениям на типы аннотации вы можете найти в <a href="http://code.google.com/intl/ru/closure/compiler/docs/js-for-compiler.html">Документации Google</a>. В частности, возможно указание нескольких возможных типов, типа <code>undefined</code> и т.п.

Также можно указывать количество и тип параметров функции, ключевого слова <code>this</code>, объявлять классы, приватные методы и интерфейсы.

Проверка типов javascript, предоставляемая Google Closure Compiler - пожалуй, самая продвинутая из существующих на сегодняшний день.

C ней аннотации, документирующие типы и параметры, становятся не просто украшением, а реальным средством проверки, уменьшающим количество ошибок на production.

Очень подробно проверка типов описана в книге [Closure: The Definitive Guide](http://www.ozon.ru/context/detail/id/6089988/), автора Michael Bolin.