
# Modules

As our application grows bigger, we want to split it into multiple files, so called 'modules'.
A module usually contains a class or a library of useful functions. Then, for browsers we bundle them together with a special tool such as [webpack](https://webpack.js.org/) and deploy to the production server.

For a long time, Javascript existed without a language-level module syntax. That wasn't a problem, because initially scripts were small and simple. So there was no need.

But eventually scripts became more and more complex, so the community invented a variety of ways to organize code into modules.

For instance:

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- one of the most ancient module systems, initially implemented by the library [require.js](http://requirejs.org/).
- [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) -- the module system created for Node.JS server.
- [UMD](https://github.com/umdjs/umd) -- one more module system, suggested as a universal one, compatible with AMD and CommonJS.

Now all these slowly become a part of history, but we still can find them in old scripts.

The language-level module system appeared in the standard in 2015, gradually evolved since then, and is now supported by all major browsers and in Node.js.

## What is a module?

A module is just a file. One single script, as simple as that.

Directives `export` and `import` allow to  interchange functionality between modules:

- `export` keyword labels variables and functions that should be accessible from outside the file.
- `import` allows to import functionality from other modules.

For instance, if we have a file `sayHi.js` exporting a function:

```js
// 📁 sayHi.js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

...Then another file may import and use it:

```js
// 📁 main.js
import {sayHi} from './sayHi.js';

alert(sayHi); // function...
sayHi('John'); // Hello, John!
```

So, one Javascript file ("module") may import functionality from other ones. Not any functionality, but only what's intended (exported).








**Each module has its own top-level scope.**

In other words, global variables from one file are only seen in that file, they do not get into other files. If we want something to be available for other modules -- let's export it.

For browser scripts, that's something new, so modules require a special tag `<script type="module">` to function properly. In the next chapter we'll see that in more detail.

**A module code is evaluated only the first time when imported.**

Let's see what it means on examples.

First, if executing a module has side-effects, like showing a message, and we import it multiple times -- from one or many other modules, the message is printed only once:

```js
// 📁 alert.js
alert("Module is evaluated!");
```

```js
// 📁 1.js
import ... from `./alert.js`; // Module is evaluated!

// 📁 2.js
import ... from `./alert.js`; // (nothing)
```

So, top-level module code is mostly used for initialization. We create data structures, pre-fill them, and if we want something to be reusable -- export it.

Another example. Let's say, a module exports an object:

```js
// 📁 admin.js
export let admin = {
  name: "John",
  password: "*****"
};
```

Now, if this module is imported from multiple files, the module is only evaluated the first time, `admin` object is created, and then passed to all further importers.

All importers get exactly the one and only `admin` object, with all modifications in it:

```js
// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

*!*
// Both 1.js and 2.js imported the same object
// Changes made in 1.js are visible in 2.js
*/!*
```

This feature is quite essential to modules that require configuration. We can set required properties on the first import, and then in further imports it's already ready.

For instance, `admin` module may export additional functionality that uses the object:

```js
// 📁 admin.js
export let admin = { ... };

export function sayHi() {
  alert(`Ready to serve, ${admin.name}!`);
}
```

Now if we set `admin.name` once in `init.js`, everyone will see it, including calls made from inside `admin.js` itself:

```js
// 📁 init.js
import {admin} from './admin.js';
admin.name = "Pete";
```

```js
// 📁 other.js (after init.js)
import {admin, sayHi} from './admin.js';

alert(admin.name); // *!*Pete*/!*

sayHi(); // Ready to serve, *!*Pete*/!*!
```

To summarize, the core concepts are:

1. A module is a file. To make a file treated properly, browsers need `<script type="module">`, we'll cover that later.
2. Modules have their own, local top-level scope and interchange functionality via `import/export`.
3. Module code is executed only once. Exports are created once and shared between importers.

## Export and Import

We can label any declaration as exported by placing `export` before it, be it a variable, function or a class.

For instance, here all exports are valid:

```js
// export an array
*!*export*/!* let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// export a constant
*!*export*/!* const MODULES_BECAME_STANDARD_YEAR = 2015;

// export a class
*!*export*/!* class User {
  constructor(name) {
    this.name = name;
  }
}
```

````smart header="No semicolons after export class/function"
Please note that `export` before a class or a function does not make it a [function expression](info:function-expressions-arrows). It's still a function declaration, albeit exported.

Most Javascript style guides recommend semicolons after statements, but not after function and class declarations.

That's why there should bes no semicolons at the end of `export class` and `export function`.

```js
export function sayHi(user) {
  alert(`Hello, ${user}!`);
} *!* // no ; at the end */!*
```

````

### export after declarations

Also, we can put `export` separately.

Here we first declare, and then export:

```js  
// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

*!*
export {sayHi, sayBye}; // a list of exported variables
*/!*
```

### import *

Usually, we put a list of what to import into `import {...}`, like this:

```js
// 📁 main.js
*!*
import {sayHi, sayBye} from './say.js';
*/!*

sayHi('John'); // Hello, John!
sayBye('John'); // Bye, John!
```

But if the list is long, we can import everything as an object using `import * as <obj>`, for instance:

```js
// 📁 main.js
*!*
import * as say from './say.js';
*/!*

say.sayHi('John');
say.sayBye('John');
```

At first sight, "import everything" seems such a cool thing, short to write, why should we ever explicitly list what we need to import?

Well, there are few reasons.

1. Modern build tools ([webpack](http://webpack.github.io) and others) bundle modules together and optimize them to speedup loading and remove unused stuff.

    Let's say, we added a 3rd-party library `lib.js` to our project with many functions:
    ```js
    // 📁 lib.js
    export function sayHi() { ... }
    export function sayBye() { ... }
    export function becomeSilent() { ... }
    ```

    Now if we in fact need only one of them in our project:
    ```js
    // 📁 main.js
    import {sayHi} from './lib.js';
    ```
    ...Then the optimizer will automatically detect it and totally remove the other functions from the bundled code, thus making the build smaller. That is called "tree-shaking".

2. Explicitly listing what to import gives shorter names: `sayHi()` instead of `lib.sayHi()`.
3. Explicit imports give better overview of the code structure: what is used and where. It makes code support and refactoring easier.

## import "as"

We can also use `as` to import under different names.

For instance, let's import `sayHi` into the local variable `hi` for brevity, and same for `sayBye`:

```js
// 📁 main.js
*!*
import {sayHi as hi, sayBye as bye} from './say.js';
*/!*

hi('John'); // Hello, John!
bye('John'); // Bye, John!
```

## export "as"

The similar syntax exists for `export`.

Let's export functions as `hi` and `bye`:

```js
// 📁 say.js
...
export {sayHi as hi, sayBye as bye};
```

Now `hi` and `bye` are official names for outsiders:

```js
// 📁 main.js
import * as say from './say.js';

say.hi('John'); // Hello, John!
say.bye('John'); // Bye, John!
```

## Named and default exports

So far, we've seen how to import/export multiple things, optionally "as" other names.

In practice, modules contain either:
- A library, pack of functions, like `lib.js`.
- Or an entity, like `class User` is descirbed in `user.js`, the whole module has only this class.

Mostly, the second approach is preferred, so that every 'thing' resides in its own module.

Naturally, that requires a lot of files, as everything wants its own module, but that's not a problem at all. Actually, code navigation becomes easier, if files are well-named and structured into folders.

Modules provide special `export default` syntax to make "one thing per module" way look better.

It requires following `export` and `import` statements:

1. Put `export default` before the "main export" of the module.
2. Call `import` without curly braces.

For instance, here `user.js` exports `class User`:

```js
// 📁 user.js
export *!*default*/!* class User { // just add "default"
  constructor(name) {
    this.name = name;
  }
}
```

...And `main.js` imports it:

```js
// 📁 main.js
import *!*User*/!* from './user.js'; // not {User}, just User

new User('John');
```

Imports without curly braces look nicer. A common mistake when starting to use modules is to forget curly braces at all. So, remember, `import` needs curly braces for named imports and doesn't need them for the default one.

| Named export | Default export |
|--------------|----------------|
| `export class User {...}` | `export default class User {...}` |
| `import {User} from ...` | `import User from ...`|

Naturally, there may be only one "default" export per file.

We may have both default and named exports in a single module, but in practice people usually don't mix them. A module has either named exports or the default one.

**Another thing to note is that named exports must (naturally) have a name, while `export default` may be anonymous.**

For instance, these are all perfecly valid default exports:

```js
export default class { // no class name
  constructor() { ... }
}

export default function(user) { // no function name
  alert(`Hello, ${user}!`);
}

// export a single value, without making a variable
export default ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
```

That's fine, because `export default` is only one per file, so `import` always knows what to import.
 Contrary to that, omitting a name for named imports would be an error:

```js
export class { // Error! (non-default export needs a name)
  constructor() {}
}
```     

When importing, to keep the code consistent, teams usually employ the rule that local variables should be named after files, e.g:

```js
import User from './user.js';
import LoginForm from './loginForm.js';
import func from '/path/to/func.js';
...
```

## The "default" alias

The "default" word is a kind of "alias" for the default export, for scenarios when we need to reference it somehow.

For example, if we already have a function declared, that's how to `export default` it:

```js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

export {sayHi as default}; // same as if we added "export default" before the function
```

Or, imagine a file `user.js` exporting one main "default" thing and a few named ones (rarely the case, but happens):

```js
// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}
```

Here's how to import the default export along with a named one:

```js
// 📁 main.js
import {*!*default as User*/!*, sayHi} from './user.js';

new User('John');
```

Or, if we consider importing `*` as an object, then the `default` property is exactly the default export:

```js
// 📁 main.js
import * as user from './user.js';

let User = user.default;
new User('John');
```

## Re-export

"Re-export" syntax `export ... from ...` allows to import things and immediately export them (possibly under another name), like this:

```js
export {sayHi} from './say.js';
export {default as User} from './user.js';
```

What's the point, why that's needed? Let's see a practical use case.

Imagine, we're writing a "package": a folder with a lot of modules, mostly needed internally, with some of the functionality exported outside (tools like NPM allow to publish and distribute packages, but here it doesn't matter).

A directory structure could be like this:
```
auth/
  index.js  
  user.js
  helpers.js
  tests/
    login.js
  providers/
    github.js
    facebook.js
    ...
```

We'd like to expose the package functionality via a single entry point, the "main file" `auth/index.js`, to be used like this:

```js
import {login, logout} from 'auth/index.js'
```

The idea is that outsiders, developers who use our package, should not meddle with its internal structure. They should not search for files inside our package folder. We export only what's necessary in `auth/index.js` and keep the rest hidden from prying eyes.

Now, as the actual exported functionality is scattered among the package, we can gather and "re-export" it in `auth/index.js`:

```js
// 📁 auth/index.js
import {login, logout} from './helpers.js';
export {login, logout};

import User from './user.js';
export {User};

import Githib from './providers/github.js';
export {Github};
...
```

"Re-exporting" is just a shorter notation for that:

```js
// 📁 auth/index.js
export {login, logout} from './helpers.js';
// or, to re-export all helpers, we could use:
// export * from './helpers.js';

export {default as User} from './user.js';

export {default as Githib} from './providers/github.js';
...
```

````warn header="Re-exporting default is tricky"
Please note: `export User from './user.js'` won't work. It's actually a syntax error.

To re-export the default export, we must mention it explicitly `{default as ...}`, like in the example above.

Also, there's another oddity: `export * from './user.js'` re-exports only named exports, exluding the default one. Once again, we need to mention it explicitly.

For instance, to re-export everything, two statements will be necessary:
```js
export * from './module.js'; // to re-export named exports
export {default} from './module.js'; // to re-export default
```

The issue arises only when re-exporting: `import * as obj` works fine, it imports the default export as  `obj.default`.
````

## Summary

There are following types of `export`:

- Before declaration: `export [default] class/function/variable ...`
- Standalone: `export {x [as y]}`.
- Re-export: `export {x [as y]} from ...`, `export * from ...`.

There

  export var v;	null	null	"v"	"v"
  export default function f(){};	null	null	"f"	"default"
  export default function(){};	null	null	"*default*"	"default"
  export default 42;	null	null	"*default*"	"default"
  export {x};	null	null	"x"	"x"
  export {x as v};	null	null	"x"	"v"
  export {x} from "mod";	"mod"	"x"	null	"x"
  export {x as v} from "mod";	"mod"	"x"	null	"v"
  export * from "mod";	"mod"	"*"	null	null





## Modules in the browser

In this tutorial we concentrate on the language itself, but now let's see some demos, and we're going to use browser modules for that. So let's see how to use modules in the browser. You may want to skip this section if you have no idea about browser Javascript, and still be able to understand the rest.

To use modules in the browser, in `<script>` we must set the attribute `type='module'`, like this:

```html
<script type='module'>
  import {sayHi, sayBye} from './say.js';

  sayHi('John'); // Hello, John!
  sayBye('John'); // Bye, John!
</script>
```

Scripts with `type='module'` have several important differences:

1. They always have enabled `use strict`. So e.g. assigning to undeclared variables will give an error:
    ```html
    <script type='module'>
      a = 5; // error
    </script>
    ```
2. Scripts are always deferred, same effect as `defer` attribute (described in the chapter [](info:onload-ondomcontentloaded)), for both external and inline scripts. Or, to put it short, they always run after the HTML is fully downloaded and rendered.
    ```html run
    <script type='module'>
      alert(button); // this script can 'see' elements below
      // as modules are deferred, they runs after the whole page is loaded
    </script>

    <script>
      alert(button); // Error: button is undefined,
      // the script runs immediately, before the rest of the page can be seen
      // that's regular behavior for inline scripts, 'defer' attribute is ignored on them
    </script>

    <button id='button'>Button</button>
    ```
3. Async attribute `<script async type='module'>` is allowed on both inline and external scripts. Async scripts run immediately when and imported modules are processed, independantly of other scripts or the HTML document.
3. External scripts with same `src` run only once:
    ```html
    <!-- the script my.js is fetched and executed only once -->
    <script type='module' src='my.js'></script>
    <script type='module' src='my.js'></script>
    ```
4. External scripts that are fetched from another domain require [CORS](mdn:Web/HTTP/CORS) headers. In other words, if a module script is fetched from another domain, the remote server must supply a header `Access-Control-Allow-Origin: *` (may use fetching domain instead of `*`) to indicate that the fetch is allowed.
    ```html
    <!-- the server another-site.com must supply Access-Control-Allow-Origin -->
    <!-- otherwise, the script won't execute -->
    <script type='module' src='*!*http://another-site.com*/!*/their.js'></script>
    ```
5. And, probably, the most notable difference: modules have their own global scope. In other words, top-level variables and functions from modules are not seen in other scripts.

    ```html
    <script type='module'>
      let user = 'John';
    </script>

    <script type='module'>
      *!*
      alert(user); // Error: user is not defined
      */!*
    </script>
    ```
    That's natural: modules are expected to `export` what they want to be accessible from outside. And interact via export/import. If we really need the shared `window` scope, then we can use `window.user`, but that should be an exception requiring a good reason.

If you look at the list, all items are a 'good thing', leading to correct coding practices.

## export default

As we've just seen, a module can export individual variables.

But it's quite common for a file to implement a single thing. For instance, a file `user.js` describes `class User`, a file `login.js` -- `function login()` for authorization, and so on. One file -- one entity.

There's a special `export default` statement to better implement that approch. Only one may exist per module, and it labels the export as 'the default one', that may be imported directly without figure brackets.

For instance, `user.js`:

```js
*!*export default*/!* class User {
  constructor(name) {
    this.name = name;
  }
};
```

...And in `login.js`:

```js
import User from './user';

new User('John');
```

The default export is technically just a syntax sugar. We can live without it.

If `user.js` had the regular `export` without `default`, then `login.js` would need to import with figure brackets:

```js
// if user.js had
// export class User { ... }

// …then to import it we'd need figuree brackets:
import {User} from './user';

new User('John');
```

In practice, such 'sugar' is very convenient, it allows to easily see what exactly is exported and omit extra characters while importing.

Please note that default exports may be unnamed:
```js
// that's allowed:
export default function() {}
```

We can also export a regular value, like an array with days of week:
```js
// weekdays.js
export default ['Monday', 'Tuesday', ..., 'Sunday'];
```

That's fine, as the default export is only one per module, so `import` knows what to get:

```js
// assuming export default is used
import weekdays from './weekdays';

alert(weekdays[0]); // Monday
```

Usually, there's a rule that the default export is imported under the name of the module itself, or under the name of the corresponding entity. Like `import weekdays from './weekdays'` or `import User from './user'`.


## Использование

Современный стандарт ECMAScript описывает, как импортировать и экспортировать значения из модулей, но он ничего не говорит о том, как эти модули искать, загружать и т.п.

Такие механизмы предлагались в процессе создания стандарта, но были убраны по причине недостаточной проработанности. Возможно, они появятся в будущем.

Сейчас используются системы сборки, как правило, в сочетании с Babel.JS.

Система сборки обрабатывает скрипты, находит в них `import/export` и заменяет их на свои внутренние JavaScript-вызовы. При этом, как правило, много файлов-модулей объединяются в один или несколько скриптов, смотря как указано в конфигурации сборки.

Ниже вы можете увидеть полный пример использования модулей с системой сборки [webpack](http://webpack.github.io).

В нём есть:

- `nums.js` -- модуль, экспортирующий `one` и `two`, как описано выше.
- `main.js` -- модуль, который импортирует `one`, `two` из `nums` и выводит их сумму.
- `webpack.config.js` -- конфигурация для системы сборки.
- `bundle.js` -- файл, который создала система сборки из `main.js` и `nums.js`.
- `index.html` -- простой HTML-файл для демонстрации.

[codetabs src='nums']

## Итого

Современный стандарт описывает, как организовать код в модули, экспортировать и импортировать значения.

Экспорт:

- `export` можно поставить прямо перед объявлением функции, класса, переменной.
- Если `export` стоит отдельно от объявления, то значения в нём указываются в фигурных скобках: `export {…}`.
- Также можно экспортировать 'значение по умолчанию' при помощи `export default`.

Импорт:

- В фигурных скобках указываются значения, а затем -- модуль, откуда их брать: `import {a, b, c as d} from 'module'`.
- Можно импортировать все значения в виде объекта при помощи `import * as obj from 'module'`.
- Без фигурных скобок будет импортировано 'значение по умолчанию': `import User from 'user'`.

На текущий момент модули требуют системы сборки на сервере. Автор этого текста преимущественно использует webpack, но есть и другие варианты.
