libs:
  - lodash

---

# Function bind method to fix this

When using `setTimeout` with object methods or passing object methods along, there's a known problem: "loosing `this`".

Suddenly, `this` just stops working right. The situation is typical for novice developers, but happens with experienced ones as well. 

[cut]

## Loosing "this": demo

Let's see the problem on example. 

Normally, `setTimeout` plans the function to execute after the delay.

Here it says "Hello" after 1 second:

```js run
setTimeout(() => alert("Hello, John!"), 1000);
```

Now let's do the same with an object method:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(user.sayHi, 1000); // Hello, undefined!
*/!*
```

As we can see, the output shows not "John" as `this.firstName`, but `undefined`!

That's because `setTimeout` got the function `user.sayHi`, separately from the object. The last line can be rewritten as:

```js
let f = user.sayHi;
setTimeout(f, 1000); // lost user context
```

The method `setTimeout` is a little special: it sets `this=window` for the function call. So for `this.firstName` it tries to get `window.firstName`, which does not exist. In other similar cases as we'll see, usually `this` just becomes `undefined`. 

The task is quite typical -- we want to pass an object method somewhere else where it will be called. How to make sure that it will be called in the right context?

There are few ways we can go.

## Solution 1: a wrapper

The simplest solution is to use an wrapping function:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(function() {
  user.sayHi(); // Hello, John!
}, 1000);
*/!*
```

Now it works, because it receives `user` from the outer lexical environment, and then calls the method normally.

The same function, but shorter:

```js
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

Looks fine, but a slight vulnerability appears in our code structure.

What is before `setTimeout` triggers (one second delay!) `user` will get another value. Then, suddenly, the it will call the wrong object!

Surely, we could write code more carefully. But it would be better if we could just guarantee the right context, no matter what.

## Solution 2: bind

Functions provide a built-in method [bind](mdn:js/Function/bind) that allows to fix `this`.

The syntax is:

```js
// more complex syntax will be little later
let bound = func.bind(context);
````

The result of `func.bind` is a special "exotic object", that is essentially a function, but instead of having its own body, it transparently passes the call to `func` with given arguments and `this=context`.

For instance, here `funcUser` passes a call to `func` with `this=user`:

```js run  
let user = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

*!*
let funcUser = func.bind(user);
funcUser(); // John  
*/!*
```

We can think of `func.bind(user)` as a "bound" variant of `func`, with fixed `this=user`.

The example below demonstrates that arguments are passed "as is" to `func`:


```js run  
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

let funcUser = func.bind(user); // funcUser passes all calls to func with this=user 
*!*
funcUser("Hello"); // Hello, John (argument "Hello" is passed as is)
*/!*
```

Now let's try with an object method:


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
let sayHi = user.sayHi.bind(user); // (*)
*/!*

sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!
```

In the line `(*)` we take the method `user.sayHi` and bind it to `user`. The `sayHi` is a "bound" function, that can be called alone or passed to `setTimeout` -- doesn't matter, the context will be right.

It fixes only `this`, arguments are passed "as is":

```js run
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Hello"); // Hello, John ("Hello" argument is passed to say)
say("Bye"); // Bye, John ("Bye" is passed to say)
```

````smart header="Convenience method: `bindAll`"
If an object has many methods and we plan to actively pass it around, then we could bind them all in a loop:

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

Javascript libraries also provide functions for convenient mass binding , e.g. [_.bindAll(obj)](http://lodash.com/docs#bindAll) in lodash.
````

## Partial application

Till now we were only talking about binding `this`. Now let's make a step further.

We can bind not only `this`, but also arguments. That's more seldom used, but can also be handy.

The full syntax of `bind`:

```js
let bound = func.bind(context, arg1, arg2, ...);
```

It allows to bind context as `this` and starting arguments of the function.

For instance, we have a multiplication function `mul(a, b)`:

```js
function mul(a, b) {
  return a * b;
}
```

Let's use `bind` to create a function, doubling the value:

```js run
*!*
let double = mul.bind(null, 2); 
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

The call to `mul.bind(null, 2)` creates a new function `double` that passes calls to `mul`, fixing `null` as the context and `2` as the first argument. Further arguments are passed "as is".

That's called [partial function application](https://en.wikipedia.org/wiki/Partial_application) -- we create a new function by fixing some parameters of the existing one.

Please note that here we actually don't use the `this` context. But `bind` requires it first, so we need to pass something like `null`.

The function `triple` in the code below triples the value:

```js run
*!*
let triple = mul.bind(null, 3); 
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

Why to make a partial function? 

Here our benefit is that we created an independent function with a readable name (`double`, `triple`). We can use it and don't write the first argument of every time, cause it's fixed with `bind`.

In other cases, partial application is useful when we have a very generic function, and want a less universal variant of it for convenience.

For instance, we have a function `send(from, to, text)`. Then, inside a `user` object we may want to use a partial variant of it: `sendTo(to, text)` that sends from the current user.

## Функция ask для задач [todo]

В задачах этого раздела предполагается, что объявлена следующая "функция вопросов" `ask`:

```js
function ask(question, answer, ok, fail) {
  var result = prompt(question, '');
  if (result.toLowerCase() == answer.toLowerCase()) ok();
  else fail();
}
```

Её назначение -- задать вопрос `question` и, если ответ совпадёт с `answer`, то запустить функцию `ok()`, а иначе -- функцию `fail()`.

Несмотря на внешнюю простоту, функции такого вида активно используются в реальных проектах. Конечно, они будут сложнее, вместо `alert/prompt` -- вывод красивого  JavaScript-диалога с рамочками, кнопочками и так далее, но это нам сейчас не нужно.

Пример использования:

```js run
*!*
ask("Выпустить птичку?", "да", fly, die);
*/!*

function fly() {
  alert( 'улетела :)' );
}

function die() {
  alert( 'птичку жалко :(' );
}
```


## Currying [todo]

Sometimes people mix up partial function application mentioned above with another thing named "currying".

todo: _.partial that fixes argument, not context

Currying is a transform that makes function of multiple arguments `f(a, b, c)` callable as `f(a)(b)(c)`, for instance:

```js run
function log(date, importance, message) {
  console.log(`${date.getTime()} [${importance}] ${message}`);
}

log(new Date(), "DEBUG", "3-arg call");

log = _.curry(log);

// still works this way
log(new Date(), "DEBUG", "3-arg call");

// but also can call it like this:
log(new Date())("DEBUG")("3-arg call");

// or get a convenience function:
let todayLog = log(new Date());

todayLog("INFO", "2-arg call");

// or get a convenience function:
let todayDebug = todayLog("DEBUG");

todayDebug("1-arg call");
```









## Summary

To safely pass an object method to `setTimeout`, we can bind the context to it.

The syntax:

```js
let bound = func.bind(context, arg1, arg2...)
```

The result is an "exotic object" that passes all calls to `func`, fixing context and arguments (if provided).

We can use it to fix the context (most often case), or also some of the arguments.
