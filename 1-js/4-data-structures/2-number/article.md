# Numbers

All numbers in JavaScript are stored in 64-bit format [IEEE-754](http://en.wikipedia.org/wiki/IEEE_754-1985) also known as "double precision".

Let's recap what we know about them and add a little bit more.

## Advanced ways to write

Imagine, we need to write a billion. The obvious way is:

```js
let billion = 1000000000;
```

But in real life we usually dislike writing many zeroes. It's easy to mistype. Also we are lazy. We we usually write something like `"1bn"` for a billion or `"7.3bn"` for 7 billions 300 millions. The similar is true for other big numbers.

In JavaScript, we can do almost the same by appending the letter `e` to the number and specifying the zeroes count:

```js run
let billion = 1e9;  // 1 billion, literally: 1 and 9 zeroes

alert( 7.3e9 );  // 7.3 billions (7,300,000,000)
```

In other words, `e` multiplies the number by `1` with the given zeroes count.

```js
1e3 = 1 * 1000
1.23e6 = 1.23 * 1000000 
```


Now let's write something very small. Say, 1 microsecond is one millionth of a second: 

```js
let ms = 0.000001;
```

Also the same `e` can help. If we'd like not to write down the zeroes explicitly, the same number is:

```js
let ms = 1e-6; // six zeroes to the left from 1 
```

If we count the zeroes in `0.000001`, there are 6 of them. So naturally it's `1e-6`.  

In other words, a negative number after `e` means a division by 1 with the given number of zeries:

```js
// -3 divides by 1 with 3 zeroes
1e-3 = 1 / 1000 (=0.001)

// -6 divides by 1 with 6 zeroes
1.23e-6 = 1.23 / 1000000 (=0.00000123)
```

## Hex, binary and octal numbers

Hexadecimal numbers are widely used in JavaScript: to represent colors, encode characters and for many other things. So there exists a short way to write them: `0x` and then the number.

For instance:

```js run
alert( 0xff ); // 255
alert( 0xFF ); // the same, letters can be uppercased, doesn't matter
```

Binary and octal numeral systems are rarely used, but also possible to write them right way:

```js run
let a = 0b11111111; // binary form of 255
let b = 0o377; // octal form of 255

alert( a == b ); // true, the same number 255 at both sides
```

So as you can see, we prepend the number with `0x` for a hex, `0b` for a binary and `0o` for an octal.

## toString(base)

There is also a "reverse" method `num.toString(base)` that returns a string representation of `num` in the given `base`.

For example:
```js run
let num = 255;

alert( num.toString(2) );  // 11111111
alert( num.toString(8) ); // 377
```

The `base` can vary from `2` to `36`.

Most often use cases are:

- **16**, because hexadecimal numeral system is used for colors, character encodings etc, digits can be `0..9` or `A..F`.
- **2** is mostly for debugging bitwise operations, digits can be only `0` or `1`.
- **36** is the maximum, digits can be `0..9` or `A..Z`. The whole latin alphabet is used to represent a number.

    A funny, but useful case for `36` is when we need to turn a long numeric identifier into something shorter, for example to make a short url. The base-36 notation is an easy way to go:

```js run
alert( 123456..toString(36) ); // 2n9c
```

```warn header="Two dots to call a method"
If we want to call a method directly on a number, like `toString` in the example above, then we need to place two dots `..` after it.

If we place a single dot: `123456.toString(36)`, then there will be an error, because JavaScript awaits the decimal part after the dot. And if we place one more dot, then JavaScript knows that the number has finished and we mean the method.
```

## Rounding

One of most often operations with numbers is the rounding.

There are following built-in functions for rounding:

`Math.floor`
: Rounds down: `3.1` becomes `3`, and `-1.1` becomes `-2`.

`Math.ceil`
: Rounds up: `3.1` becomes `4`, and `-1.1` becomes `-1`.

`Math.round`
: Rounds to the nearest integer: `3.1` becomes `3`, `3.6` becomes `4` and `-1.1` becomes `-1`.

`Math.trunc` (not supported by Internet Explorer)
: Removes the decimal part: `3.1` becomes `3`, `-1.1` becomes `-1`.


Looks simple, right? Indeed it is.

Here's the table to make edge cases more obvious:

|   | `floor` | `ceil` | `round` | `trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |


These functions cover all possible ways to deal with the decimal part.

But what if we'd like to round the number to `n-th` digit after the point?

For instance, we have `1.2345` and want to round it to 2 digits, getting only `1.23`.

There are two ways to do so.

1. Multiply-and-divide.

    For instance, to round the number to the 2nd digit after the point, we can multiply the number by `100`, call the rounding function and then divide back.
    ```js run
    let num = 1.23456;

    alert( Math.floor(num * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

2. The method [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) rounds the number to `n` digits after the point and returns a string representation of the result.
        
    ```js run
    let num = 12.34;
    alert( num.toFixed(1) ); // "12.3"
    ```

    The rounding goes to the nearest value, similar to `Math.round`:

    ```js run
    let num = 12.36;
    alert( num.toFixed(1) ); // "12.4"
    ```

    The resulting string is zero-padded to the required precision if needed:

    ```js run
    let num = 12.34;
    alert( num.toFixed(5) ); // "12.34000", added zeroes to make exactly 5 digits 
    ```

    Let's note once again that the result is a string. We can convert it to a number using the unary plus or a `Number()` call.

## Imprecise calculations

Internally, each number occupies 64 bits, 52 of them are used to store the digits, 11 of them store the location of the point (to allow fractions) and 1 is the sign.

If a number is too big, it would overflow the storage, potentially giving an infinity:

```js run
alert( 1e500 ); // Infinity 
```

But what happens much more often is the loss of precision. 

Consider this:

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

Yes, you got that right, the sum of `0.1` and `0.2` is not `0.3`. What is it then?

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

Imagine you're making an e-shopping site and the visitor puts `$0.10` and `$0.20` goods into his chart. The order total will be `$0.30000000000000004`. That would surprise anyone.

Why does it work like that?

A number is stored in memory in it's binary form, as a sequence of ones and zeroes. But decimal fractions like `0.1`, `0.2` are actually unending fractions in their binary form.

In other words, what is `0.1`? It is one divided by ten.

But in the binary numeral system, we can only get "clean" division by the powers of two:

```js
// binary numbers
10 = 1 * 2
100 = 1 * 4
1000 = 1 * 8
...
// now the reverse
0.1 = 1 / 2
0.01 = 1 / 4
0.001 = 1 / 8
...
```

So, there's just no way to store *exactly 0.1* or *exactly 0.2* as a binary fraction. Just like there is no way to store one-third as a decimal fraction.

The numeric format "fixes" that by storing the nearest possible number. There are rounding rules that normally don't allow us to see that "tiny precision loss", but it still exists.

We can see it like this:
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

And when we sum two numbers, then their "precision losses" sum up too.

That's why `0.1 + 0.2` is not exactly `0.3`.

```smart header="Not only JavaScript"
The same problem exists in many other programming languages.

PHP, Java, C, Perl, Ruby give exactly the same result, because they are based on the same numeric format. 
```

Can we work around the problem? Sure, there's a number of ways:

1. We can round the result with the help of a method [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed):

    ```js run
    let sum = 0.1 + 0.2;
    alert( sum.toFixed(2) ); // 0.30
    ```

    Please note that `toFixed` always returns a string. It ensures that it has 2 digits after the decimal point. That's actually convenient if we have an e-shopping and need to show `$0.30`. For other cases we can use the unary plus to coerce it into a number:

    ```js run
    let sum = 0.1 + 0.2;
    alert( +sum.toFixed(2) ); // 0.3
    ```

2. We can temporarily turn numbers into integers for the maths and then go back. That would looks like this:

    ```js run
    alert( (0.1*10 + 0.2*10) / 10 ); // 0.3
    ```

    It works, because `0.1*10 = 1` and `0.2 * 10 = 2` are integers. The rounding rules of the format fix the precision loss in the process of multiplication. Now the resulting integer numbers can now be exactly represented in the binary format. 

3. If it's a shop, then the most radical solution would be to store all prices in cents. No fractions at all. But what if we apply a discount of 30%? In practice, totally evading fractions is rarely feasible, so the solutions listed above are here to help.

````smart header="The funny thing"
Hello! I'm a self-increasing number!

```js run
alert( 9999999999999999 ); // shows 10000000000000000
```

The reason is the same: loss of precision. There are 64 bits for the number, 52 of them can be used to store digits, and that's not enough. So the least significant digits disappear.

JavaScript doesn't trigger an error in such case. It does the best to fit the number into the format. Unfortunately, the format is not big enough.
````

                ## parseInt and parseFloat

                We already know the easiest way to convert a value into a number. It's the unary plus!

                But in web-programming we sometimes meet values that 


## Tests: isFinite and isNaN

Remember those two special numeric values?

- `Infinite` (and `-Infinite`) is a special numeric value that is greater (less) than anything.
- `NaN` represends an error.

There are special functions to check for them:


- `isNaN(value)` converts its argument to a number and then tests if for being `NaN:

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("str") ); // true
    ```

    But can't we just use `===` here? Funny, but no. The value `NaN` is unique. It does not equal anything including itself:

    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(value)` converts its argument to a number and returns `true` if it's a regular number, not `NaN/Infinity/-Infinity`:

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false, because a special value: NaN
    alert( isFinite(Infinity) ); // false, because a special value: Infinity
    ```

Sometimes `isFinite` is used to validate the string value for being a regular number:


```js run
let num = +prompt("Enter a number", '');

// isFinite will be true only for regular numbers
alert(`num:${num}, isFinite:${isFinite(num)}`);
```

Please note that an empty or a space-only string is treated as `0` in the described case. If it's not what's needed, then additional checks are required. 

## parseInt and parseFloat

Regular numeric conversion is harsh. If a value is not exactly a number, it fails:

```js run
alert( +"100px" ); // NaN
```

The sole exception is spaces before and after the line, they are ignored.

But in real life we often have values in units, like `"100px"` or `"12pt"` in CSS. Also in many countries the currency symbol goes after the amount, so we have `"19€"` and would like to extract a numeric value out of that.

That's what `parseInt` and `parseFloat` are for.

They "read" a number from a string until they can. In case of an error, the gathered number is returned. Function `parseInt` reads an integer number, `parseFloat` reads any number:

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, only integer part
alert( parseFloat('12.3.4') ); // 12.3, the second point stops the reading
```

Of course, there are situations when `parseInt/parseFloat` return `NaN`. It happens when no digits could be read:

```js run
alert( parseInt('a123') ); // NaN, the first symbol stops he process
```

````smart header="The second argument of `parseInt(str, radix)`"
The `parseInt()` function has an optional second parameter. It specifies the base of the numeral system, so `parseInt` can also parse strings of hex numbers, binary numbers and so on:

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, without 0x also works

alert( parseInt('2n9c', 36) ); // 123456
```
````

## Other math functions

JavaScript has a built-in [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object which contains a small library of mathematical functions and constants.

A few examples:

`Math.random()`
: Returns a random number from 0 to 1 (not including 1)

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (any random numbers)
    ```

`Math.max(a, b, c...)` / `Math.min(a, b, c...)`
: Return the greatest/smallest from the arbitrary number of arguments.

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2 ); // 1
    ```

`Math.pow(n, power)`
: Returns `n` raised the given power

    ```js run
    alert( Math.pow(2, 10) ); // 2 in power 10 = 1024
    ```


You can find the full list of functions in the docs for the [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) object.

## Summary

To write big numbers:

- Append `e` with the zeroes count to the number. Like: `123e6` is `123` with 6 zeroes.
- A negative number after `e` causes the number to be divided by 1 with given zeroes. That's for one-millionth or such.

For different numeral systems:

- Can write numbers directly in hex (`0x`), octal (`0o`) and binary (`0b`) systems
- `parseInt(str, base)` parses an integer from any numeral system with base: `2 ≤ base ≤ 36`.
- `num.toString(base)` converts a number to a string in the numeral system with the given `base`.

For converting values like `12pt` and `100px` to a number:

- Use `parseInt/parseFloat` for the "soft" conversion, which reads a number from a string until it can. 

For fractions:

- Round using `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` or `num.toFixed(precision)`.
- Remember about the loss of precision when comparing or doing maths.

Mathematical functions:

- See the [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math) manual when you need them. The library is very small, but can cover basic needs.


