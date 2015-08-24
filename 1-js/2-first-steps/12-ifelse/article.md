# Conditional operators: if, '?'

Sometimes we need to perform different actions basing on a condition. There's an `if` operator for that and also the "question mark" `?` operator for conditional evaluation.

[cut]

## The "if" operator

The "if" operator gets a condition, evaluates it and -- if the result is `true` -- executes the code.

For example:

```js
//+ run
var year = prompt('In which year was ECMAScript-2015 specification published?', '');

*!*
if (year == 2015) alert( 'You are right!' );
*/!*
```

In the example above, the condition is a simple equality: `year == 2015`, but it can be much more complex.

If there's more than one command to execute -- we can use a code block in figure brackets:

```js
if (year == 2015) {
  alert( 'You're so smart!' );
  alert( 'Exactly so!' );
}
```

It is recommended to use figure brackets every time with `if`, even if there's only one command. That improves readability.

## Boolean conversion

The `if (…)` operator evaluates the condition in brackets and converts it to boolean type. 

In the logical context:
<ul>
<li>A number `0`, an empty string `""`, `null`, `undefined` and `NaN` are `false`,</li>
<li>Other values -- `true`.</li>
</ul>

So, the code under this condition would never execute:

```js
if (0) { // 0 is falsy
  ...
}
```

...And this condition -- always works out:

```js
if (1) { // 1 is truthy
  ...
}
```

We can also pass a pre-evaluated logical value to `if`. For example, in a variable like here:

```js
var cond = (year == 2015); // equality evaluates to true or false

if (cond) {
  ...
}
```

## The "else" clause

The `if` operator may contain an optional "else" block. It executes when the condition is wrong.

For example:
```js
//+ run
var year = prompt('In which year was ECMAScript-2015 specification published?', '');

if (year == 2015) {
  alert( 'You guessed it right!' );
} else {
  alert( 'How can you be so wrong?' ); // any value except 2015
}
```

## Several conditions: "else if"

Sometimes we'd like to test several variants of a condition. There's an `else if` clause for that.

For example:

```js
//+ run
var year = prompt('In which year was ECMAScript-2015 specification published?', '');

if (year < 2015) {
  alert( 'Too early...' ); 
} else if (year > 2015) {
  alert( 'Too late' );
} else {
  alert( 'Exactly!' );
}
```

In the code above JavaScript first checks `year < 2015`, if it is falsy then goes to the next condition `year > 2015`. Any number of `else if` may follow with an optional last `else`.


## Ternary operator '?'

Sometimes we need to assign a variable depending on a condition.

For instance:

```js
//+ run no-beautify
var hasAccess;
var age = prompt('How old are you?', '');

*!*
if (age > 14) {
  hasAccess = true;
} else {
  hasAccess = false;
}
*/!*

alert(hasAccess);
```

The so called "ternary" or "question mark" operator allows to do that shorter and simpler.

The operator is represented by a question mark `"?"`.  The formal term "ternary" means that the operator has 3 arguments. It is actually the one and only operator in JavaScript which has 3 arguments.

The syntax is:
```
var result = condition ? value1 : value2
```

The `condition` is evaluated, if it's truthy then `value1` is returned, otherwise -- `value2`.

For example:

```js
var hasAccess = (age > 14) ? true : false;
```

We can omit brackets around `age > 14`, because the question mark operator has a low precedence. It executes after comparisons, so:

```js
// the same
var hasAccess = age > 14 ? true : false;
```

...But brackets make the code more readable. So it's recommended to put them.

[smart]
In the described case it is possible to evade the question mark operator, because the comparison by itself returns `true/false`:

```js
// the same
var hasAccess = age > 14;
```
[/smart]

As we can see, the question mark operator has indeed 3 arguments: a condition and two values. 
## Multiple '?'

A sequence of question mark `"?"` operators allows to return a value depending on more than one condition.

For instance:
```js
//+ run
var age = prompt('age?', 18);

var message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';

alert( message );
```

It may be difficult at first to grasp what's going on. But looking more carefully we note that it's just an ordinary sequence of tests.

The question mark first tests `age < 3`, if true -- returns `'Hi, baby!'`, otherwise -- goes beyound the colon `":"` and tests `age < 18`. If that's true -- returns `'Hello!'`, otherwise tests `age < 100` and `'Greetings!' if that is so`... At last, if all tests are falsy, the `message` becomes `'What an unusual age!'`.

The same with `if..else`:

```js
if (age < 3) {
  message = 'Hi, baby!';
} else if (a < 18) {
  message = 'Hello!';
} else if (age < 100) {
  message = 'Greetings!';
} else {
  message = 'What an unusual age!';
}
```

## Non-traditional use of '?'

Sometimes the question mark `'?'` is used as a replacement for `if`:

```js
//+ run no-beautify
var company = prompt('Which company created JavaScript?', '');

*!*
(company == 'Netscape') ?
   alert('Right!') : alert('Wrong.');
*/!*
```

Depending on the condition `company == 'Netscape'`, either the first or the second part after `"?"` gets evaluated and shows the alert.

We don't assign a result to a variable here, the `alert` doesn't return anything anyway.

**It is not recommended to use a question mark in this way.**

The notation seem to be shorter than `if`, that appeals to some programmers. Although it is less readable.

Here's the same with `if` for comparison:

```js
//+ run no-beautify
var company = prompt('Which company created JavaScript?', '');

*!*
if (company == 'Netscape') {
  alert('Right!');
} else {
  alert('Wrong.');
}
*/!*
```

Our eyes browse the code vertically. The constructs which span several lines are easier to understand than a long horizontal reading here.

The idea of a question mark `'?'` is to return one or another value depending on the condition. Please use it for exactly that. There's `if` to execute different branches of the code.

