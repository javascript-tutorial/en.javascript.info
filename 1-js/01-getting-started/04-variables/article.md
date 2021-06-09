# Variables

Depending on our application, scripts need to store and manipulate different kinds of data.

For example:

- An online shop -- the data includes goods being sold and the shopping cart content.
- A chat application -- the data includes users, messages, etc.

A [variable](https://en.wikipedia.org/wiki/Variable_(computer_science)) is a "named storage" for data. 

To create a variable in JavaScript, use the `let` keyword.

The statement below creates (in formal terms: *declares*) a variable with the name "message":

```js
let message;
```

Now we can store some data into it by using the assignment `=`:

```js
let message;

*!*
message = "Hello"; // store the string "Hello"
*/!*
```

The string is now saved into the memory area associated with the variable. We can access it using the variable name:

```js run
let message;
message = "Hello!";

*!*
console.log(message); // shows the variable content
*/!*
```

To be concise, we can combine the variable declaration and assignment into a single line:

```js run
*!*
let message = "Hello!"; // declare the variable and assign the value to it
*/!*

console.log(message); // Hello!
```

One can also declare multiple variables in one line:

```js no-beautify
let user = "John", age = 25, message = "Hello";
```

That might seem shorter, but we don't recommend it. For the sake of better readability, it's better to use a single line per variable.

The multiline variant is a bit longer, but easier to read:

```js
let user = "John";
let age = 25;
let message = "Hello";
```

## A real-life analogy

We can easily grasp the concept of a "variable" if we imagine it as a "box" for data, with a named sticker on it.

For instance, the variable `message` can be imagined as a box labeled `"message"` with the value `"Hello!"` in it:

![](variable.svg)

We can put any value in the box.

We can also change it as many times as we want:

```js run
let message;

message = "Hello!";

message = "World!"; // value changed

console.log(message);
```

When the value is changed, the old data is removed from the variable:

![](variable-change.svg)

We can also declare two variables and copy data from one into the other.

```js run
let hello = "Hello!";

let message;

*!*
// copy "Hello!" from hello into message
message = hello;
*/!*

// now two variables hold the same data
console.log(hello); // Hello!
console.log(message); // Hello!
```

Now we have two variables, both store the same string:

![](variable-copy-value.svg)


````warn header="Re-declaration triggers an error"
A variable can be declared only once.

A repeated declaration of the same variable is an error:

```js run
let message = "One";

// repeated 'let' leads to an error
let message = "Two"; // SyntaxError: 'message' has already been declared
```
So, we should declare a variable once and then refer to it without `let`.
````

## Variable naming

Technically, a variable name can be any word.

There's just a couple of limitations:

1. The name must be made of letters, digits, or symbols `$` and `_`.
2. The first character must not be a digit.

Examples of valid names:

```js
let userName;

let test123;
```

When the name contains multiple words, [camelCase](https://en.wikipedia.org/wiki/CamelCase) is commonly used. That is: words go one after another, each word after the first one starting with a capital letter: `myVeryLongName`.

What's interesting -- the dollar sign `'$'` and the underscore `'_'` can also be used in names. They are regular symbols, just like letters, without any special meaning.

These names are valid:

```js run untrusted
let $ = 1; // declared a variable with the name "$"
let _ = 2; // and now a variable with the name "_"

console.log($ + _); // 3
```

Examples of incorrect variable names:

```js no-beautify
let 1a; // cannot start with a digit

let my-name; // hyphens '-' aren't allowed in the name
```

```smart header="Case matters"
Variables named `apple` and `AppLE` are two different variables.
```

````smart header="Non-Latin letters are allowed, but not recommended"
It is possible to use any language, including cyrillic letters or even hieroglyphs, like this:

```js
let имя = '...';
let 我 = '...';
```

Technically, there is no error here. Such names are allowed, but there is an international convention to use English in variable names. Even if you're writing a small script, it may have a long life ahead. People from other countries may need to read it in the future.
````

````warn header="Reserved names"
There is a [list of reserved words](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords), which cannot be used as variable names because they are used by the language itself.

For example: `let`, `class`, `return`, and `function` are reserved.

The code below gives a syntax error:

```js run no-beautify
let let = 5; // can't name a variable "let", error!
let return = 5; // also can't name it "return", error!
```
````

## Constants

There are information pieces that aren't expected to change.

For example, a date of birth is a fixed point of time.

To declare a variable that isn't expected to change, use `const` instead of `let`:

```js
const myBirthdate = '18.04.1982';
```

Variables declared using `const` are called "constants". They cannot be reassigned. An attempt to do so would cause an error:

```js run
const myBirthdate = '18.04.1982';

myBirthdate = '01.01.2001'; // error, can't reassign the constant!
```

Here's why using `const` for such variables is a good thing.

1. It gives a hint to every person who reads the code, that the value isn't going to change. So that they can safely eye-jump while reading the code and assume it's still the same.
2. It insures against programming mistakes: if we (or another person who supports our code) attempt to change it, there'll be an error.


## Uppercase constants

There is a widespread practice to use constants as aliases for difficult-to-remember values that are known prior to execution.

Such constants are named using capital letters and underscores.

For instance, let's make constants for hexadecimal color codes (these codes are used in web programming and other areas):

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...when we need to pick a color: 
let color = COLOR_ORANGE; // (instead of the hexadecimal code)

console.log(color); // #FF7F00
```

Benefits:

- `COLOR_ORANGE` is much easier to remember than `"#FF7F00"`.
- It is much easier to mistype `"#FF7F00"` than `COLOR_ORANGE`, so it's also more reliable.
- When reading the code, `COLOR_ORANGE` is much more meaningful than `#FF7F00`.

When should we use capitals for a constant and when should we name it normally? Let's make that clear.

Being a "constant" just means that a variable's value never changes. But there are constants that are known prior to execution (like a hexadecimal value for the orange color) and there are constants that are *calculated* in run-time, during the execution, but do not change after their initial assignment.

For instance:
```js
const currentDate = /* assign the current date here */;
```

The value of `currentDate` is a constant because it doesn't change after assignment, but it may differ from day to day. So it's lowercased.

In other words, capital-named constants are only used as aliases for "hard-coded" values, known prior to execution.  

## Name things right

Talking about variables, there's one more extremely important thing.

A variable name should have a clean, obvious meaning, describing the data that it stores.

Variable naming is one of the most important and complex skills in programming. A quick glance at variable names can reveal which code was written by a beginner versus an experienced developer.

In a real project, most of the time is spent modifying and extending an existing code base rather than writing something completely new from scratch. When we look at someone else's code, and even if we return to our code after  a while, it's much easier to find information that is well-labeled. Or, in other words, when the variables have good names.

Please spend time thinking about the right name for a variable before declaring it. Doing so will repay you handsomely.

Some good-to-follow rules are:

- Use human-readable names like `userName` or `shoppingCart`.
- Stay away from abbreviations or short names like `a`, `b`, `c`, unless you really know what you're doing.
- Make names maximally descriptive and concise. Examples of bad names are `data` and `value`. Such names say nothing. It's only okay to use them if the context of the code makes it exceptionally obvious which data or value the variable is referencing.
- Agree on terms within your team and in your own mind. If a site visitor is called a "user" then we should name related variables `currentUser` or `newUser` instead of `currentVisitor` or `newManInTown`.

Sounds simple? Indeed it is, but creating descriptive and concise variable names in practice is not. Go for it.

```smart header="Create, don't reuse"
And the last note. There are some lazy programmers who, instead of declaring new variables, tend to reuse existing ones, write new values into them.

As a result, their variables are like boxes into which people throw different things without changing their stickers. What's inside the box now? Who knows? We need to come closer and check.

Such programmers save a little bit when writing code, but lose ten times more when reading it.

An extra variable is good, not evil.

Modern JavaScript tools and browsers optimize code well enough, so it won't create performance issues. Using different variables for different values can even help the engine optimize your code.
```
