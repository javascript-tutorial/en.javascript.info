# Function parameters

The syntax of function parameters is very versatile.

It allows:

- To specify values if the parameter if missing.
- To gather parameters into an array and deal with it instead of variables.
- To destructurize the object into parameters.
- And more.

All these features aim to help us in writing good-looking and concise code.

## Default values

A function can be called with any number of arguments. If a parameter is not provided, but listed in the declaration, then its value becomes `undefined`.

For instance, the aforementioned function `showMessage(from, text)` can be called with a single argument:

```js
showMessage("Ann");
```

That's not an error. Such call would output `"Ann: undefined"`, because `text === undefined`.

If we want to track when the function is called with a single argument and use a "default" value in this case, then we can check if `text` is defined, like here:

```js run
function showMessage(from, text) {
*!*
  if (text === undefined) {
    text = 'no text given';
  }
*/!*

  alert( from + ": " + text );
}

showMessage("Ann", "Hello!"); // Ann: Hello!
*!*
showMessage("Ann"); // Ann: no text given
*/!*
```

There are also other ways to supply "default values" for missing arguments:

- Use operator `||`:

    ```js
    function showMessage(from, text) {
      text = text || 'no text given';
      ...
    }
    ```

    This way is shorter, but the argument is considered missing even if it exists, but is falsy, like an empty line, `0` or `null`.

- Specify the default value after `=`:

    ```js run
    function showMessage(from, *!*text = 'no text given'*/!*) {
      alert( from + ": " + text );
    }

    showMessage("Ann"); // Ann: no text given
    ```

    Here `'no text given'` is a string, but it can be a more complex expression, which is only evaluated and assigned if the parameter is missing. So, this is also possible:

    ```js run
    function showMessage(from, text = anotherFunction()) {
      // anotherFunction() is executed if no text given
    }
    ```

## Arbitrary number of arguments

To support any number of arguments, we can use the rest operator `...`, similar to [destructuring](info:destructuring):

```js run
function sumAll(...args) {
  let sum = 0;

  for(let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
```

We also can put few first arguments into variables and gather only the rest:

```js run
function showName(firstName, lastName, ...rest) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // the rest = ["Consul", "of the Roman Republic"]
  alert( rest[0] ); // Consul
  alert( rest[1] ); // of the Roman Republic
}

showName("Julius", "Caesar", "Consul", "of the Roman Republic");
```

````warn header="The rest operator … must be at the end"
The rest operator `…` gathers all remaining arguments, so the following has no sense:

```js
function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
  // error
}
```

The `...rest` must always be the last.
````

````smart header="The `arguments` variable"

In old times, there was no rest operator. But there is a special variable named `arguments` that contains all arguments by their index. It is still supported and can be used like this:

```js run
function showName() {
  alert( arguments[0] ); 
  alert( arguments[1] ); 
  alert( arguments.length ); 

  // for..of works too
  // for(let arg of arguments) alert(arg); 
}

// shows: Julius, Caesar, 2
showName("Julius", "Caesar");

// shows: Ilya, undefined, 1
showName("Ilya"); 
```

The downside is that though `arguments` looks like an array, but it's not. It does not support many useful array methods that we'll study later, and if they're needed, then the rest operator should be used.
````

## Destructuring parameters

There are times when a function may have many parameters, most of which are optional. That's especially true for user interfaces. Imagine a function that creates a menu. It may have a width, a height, a title, items list and so on.

Here's a bad way to write such function:

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

The real-life problem is how to remember the order of arguments. Usually IDEs try to help us, especially if the code is well-documented, but still... Another problem is how to call a function when most parameters are ok by default. 

Like this?

```js
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

That's ugly. And becomes unreadable when we deal with more parameters.

Destructuring comes to the rescue!

We can pass parameters as an object, and the function immediately destructurizes them into variables:

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
*/!*
  alert( title + ' ' + width + ' ' + height ); // My Menu 100 200
  alert( items ); // Item1, Item2
}

showMenu(options);
```

We can also use the more complex destructuring with nestings and colon mappings:

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled", 
  width:w = 100,  // width goes to w
  height:h = 200, // height goes to h
  items: [item1, item2] // items first element goes to item1, second to item2
}) {
*/!*
  alert( title + ' ' + w + ' ' + h ); // My Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options); 
```

The syntax is the same as for a destructuring assignment:
```js
function({
  incoming property: parameterName = defaultValue
  ...
})
```

Please note that such destructuring assumes that `showMenu()` does have an argument. If we want all values by default, then we should specify an empty object:

```js
showMenu({});

// that would give an error
showMenu();
```

We can fix this of course, by making `{}` a value by default for the whole destructuring thing:


```js run
// simplified parameters a bit for clarity
function showMenu(*!*{ title="Menu", width=100, height=200 } = {}*/!*) {
  alert( title + ' ' + width + ' ' + height ); 
}

showMenu(); // Menu 100 200
```

In the code above, the whole arguments object is `{}` by default, so there's always something to destructurize.

## The spread operator [#spread-operator]

As we've seen before, the rest operator `...` allows to gather parameters in the array.

But there's a reverse named "the spread operator". It also looks like `...` and works at call-time.

The spread operator allows to convert an array into a list of parameters, like this:

```js run
let fullName = ["Gaius", "Julius", "Caesar"];

function showName(firstName, secondName, lastName) {
  alert(firstName);
  alert(secondName);
  alert(lastName);
}

// The spread operator ... passes an array as a list of arguments
showName(...fullName);
```

Let's see a more real-life example. 

There exist a built-in function [Math.max](mdn:js/Math/max) that takes a list of values and returns the greatest one:

```js run
alert( Math.max(5, 7, -8, 1) ); // 7
```

Imagine we have an array and want to select a maximum from it. Unfortunately, `Math.max` works with a list of parameters, not with arrays, so a direct call `Math.max(arr)` won't work. But we can use the spread operator `...` to pass the array as the list:


```js run
let arr = [5, 7, -8, 1];

alert( Math.max(...arr) ); // 7
```

In short:
- When `...` occurs in function parameters, it's called a "rest operator" and gathers parameters into the array.
- When `...` occurs in a function call, it's called a "spread operator" and converts an array into the list.

Together they help to travel between a list and an array of parameters with ease.


## Summary TODO

[todo]
Основные улучшения в функциях:

- Можно задавать параметры по умолчанию, а также использовать деструктуризацию для чтения приходящего объекта.
- Оператор spread (троеточие) в объявлении позволяет функции получать оставшиеся аргументы в массив: `function f(arg1, arg2, ...rest)`.
- Тот же оператор spread в вызове функции позволяет передать её массив как список аргументов (вместо `apply`).
- У функции есть свойство `name`, оно содержит имя, указанное при объявлении функции, либо, если его нет, то имя свойства или переменную, в которую она записана. Есть и некоторые другие ситуации, в которых интерпретатор подставляет "самое подходящее" имя.
- Объявление Function Declaration в блоке `{...}` видно только в этом блоке.
- Появились функции-стрелки:
    - Без фигурных скобок возвращают выражение `expr`: `(args) => expr`.
    - С фигурными скобками требуют явного `return`.
    - Не имеют своих `this` и `arguments`, при обращении получают их из окружающего контекста.
    - Не могут быть использованы как конструкторы, с `new`.



