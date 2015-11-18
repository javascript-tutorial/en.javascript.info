# Function expressions

In JavaScript a function is a value. Just like a string or a number.

Let's output it using `alert`:

```js
//+ run
function sayHi() {
  alert( "Hello" );
}

*!*
alert( sayHi ); // shows the function code
*/!*
```

Note that there are no brackets after `sayHi` in the last line. The function is not called there. 

The code above only shows the string representation of the function, that is it's source code.

[cut]


As the function is a value, we can copy it to another variable:

```js
//+ run no-beautify
function sayHi() {   // (1)
  alert( "Hello" ); 
}

let func = sayHi;    // (2)
func(); // Hello     // (3)

sayHi = null;        // (4)
sayHi();             // error 
```

<ol>
<li>Function declaration `(1)` creates the function and puts it into the variable `sayHi`"</li>
<li>Line `(2)` copies it into variable `func`. 

Please note again: there are no brackets after `sayHi`. If they were, then the call `let func = sayHi()` would write a *result* of `sayHi()` into `func`, not the function itself.</li>
<li>At the moment `(3)` the function can be called both as `sayHi()` and `func()`.</li>
<li>...We can overwrite `sayHi` easily. As well as `func`, they are normal variables. Naturally, the call attempt would fail in the case `(4)`.</li>
</ol>

[smart header="A function is an \"action value\""]
Regular values like strings or numbers represent the *data*.

A function can be perceived as an *action*.

A function declaration creates that action and puts it into a variable of the given name. Then we can run it via brackets `()` or copy into another variable.
[/smart]

## Function Expression [#function-expression]

There is an alternative syntax for creating a function. It much more clearly shows that a function is just a kind of a value.

It is called "Function Expression" and looks like this:

```js
//+ run
let func = function(parameters) {
  // body
};
```

For instance:

```js
//+ run
let sayHi = function(person) {
  alert( `Hello, ${person}` );
};

sayHi('John'); // Hello, John
```

The function created in the example above is fully functional and identical to:

```js
function sayHi(person) {
  alert( `Hello, ${person}` );
}
```


## Comparison with Function Declaration

The "classic" syntax of the function that looks like `function name(params) {...}` is called a "Function Declaration".

We can formulate the following distinction:
<ul>
<li>*Function Declaration* -- is a function, declared as a separate code statement.

```js
// Function Declaration
function sum(a, b) {
  return a + b;
}
```

</li>
<li>*Function Expression* -- is a function, created in the context of an another expression, for example, an assignment.

```js
// Function Expression
let sum = function(a, b) {
  return a + b;
}
```
</li>
</ul>

The main difference between them is the creation time.

**Function Declarations are processed before the code begins to execute.**

In other words, when JavaScript prepares to run the code block, it looks for Function Declarations in it and creates the functions. We can think of it as an "initialization stage". Then it runs the code.

As a side-effect, functions declared as Function Declaration can be called before they are defined.

For instance, this works:

```js
//+ run refresh untrusted
*!*
sayHi("John"); // Hello, John
*/!*

function sayHi(name) {
  alert( `Hello, ${name}` );
}
```

...And if there were Function Expression, then it wouldn't work:

```js
//+ run refresh untrusted
*!*
sayHi("John"); // error! 
*/!*

let sayHi = function(name) {  // (*)
  alert( `Hello, ${name}` );
};
```

Function Expressions are created in the process of evaluation of the expression with them.

So, in the code above, the function is created and assigned to sayHi only when the execution reaches line `(*)`.

Usually this is viewed as a bonus of the Function Declaration. Convenient, isn't it? Gives more freedom in how to organize our code.

## Anonymous functions

As a function is a value, it can be created on-demand and passed to another place of the code.

For instance, let's consider the following task, coming from a real-life. 

Function `ask(question, yes, no)` should accept a question and two other functions: `yes` and `no`. It asks a question and, if the user responds positively, executes `yes()`, otherwise `no()`.

It could look like this:
```js
//+ run
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
```

In real-life `ask` is usually much more complex. It draws a nice windows instead of the simple `confirm` to ask a question. But that would make it much longer, so here we skip this part.

So, how do we use it?

If we had only Function Declarations in our toolbox, we could declare `showOk/showCancel` as actions and pass them:


```js
function showOk() {
  alert( "Ok, proceeding." );
}

function showCancel() {
  alert( "Execution canceled." );
}

// usage
ask("Should we proceed?", showOk, showCancel);
```

...But Function Expressions allow us to solve the task much more elegantly:

```js
ask("Should we proceed?", 
  function() { alert( "Ok, proceeding." ); },
  function() { alert( "Execution canceled." ); },
);
```

So, we can declare a function in-place, right when we need it.

Such functions are sometimes called "anonymous" meaning that they are defined without a name. 

And here, if we don't plan to call the function again, why should we give it a name? Let's just declare it where needed and pass on.

That's very natural and in the spirit of JavaScript.

## new Function

Существует ещё один способ создания функции, который используется очень редко, но упомянем и его для полноты картины.

Он позволяет создавать функцию полностью "на лету" из строки, вот так:

```js
//+ run
let sum = new Function('a,b', ' return a+b; ');

let result = sum(1, 2);
alert( result ); // 3
```

То есть, функция создаётся вызовом `new Function(params, code)`:
<dl>
<dt>`params`</dt>
<dd>Параметры функции через запятую в виде строки.</dd>
<dt>`code`</dt>
<dd>Код функции в виде строки.</dd>
</dl>

Таким образом можно конструировать функцию, код которой неизвестен на момент написания программы, но строка с ним генерируется или подгружается динамически во время её выполнения. 

Пример использования -- динамическая компиляция шаблонов на JavaScript, мы встретимся с ней позже, при работе с интерфейсами.

## Итого

Функции в JavaScript являются значениями. Их можно присваивать, передавать, создавать в любом месте кода.

<ul>
<li>Если функция объявлена в *основном потоке кода*, то это Function Declaration.</li>
<li>Если функция создана как *часть выражения*, то это Function Expression.</li>
</ul>

Между этими двумя основными способами создания функций есть следующие различия:

<table class="table-bordered">
<tr>
<th></th>
<th>Function Declaration</th>
<th>Function Expression</th>
</tr>
<tr>
<td>Время создания</td>
<td>До выполнения первой строчки кода.</td>
<td>Когда управление достигает строки с функцией.</td>
</tr>
<tr>
<td>Можно вызвать до объявления </td>
<td>`Да` (т.к. создаётся заранее)</td>
<td>`Нет`</td>
</tr>
<tr>
<td>Условное объявление в `if`</td>
<td>`Не работает`</td>
<td>`Работает`</td>
</tr>
</table>

Иногда в коде начинающих разработчиков можно увидеть много Function Expression. Почему-то, видимо, не очень понимая происходящее, функции решают создавать как `let func = function()`, но в большинстве случаев обычное объявление функции -- лучше.

**Если нет явной причины использовать Function Expression -- предпочитайте Function Declaration.**

Сравните по читаемости:

```js
//+ no-beautify
// Function Expression 
let f = function() { ... }

// Function Declaration 
function f() { ... }
```

Function Declaration короче и лучше читается. Дополнительный бонус -- такие функции можно вызывать до того, как они объявлены.

Используйте Function Expression только там, где это действительно нужно и удобно. 
