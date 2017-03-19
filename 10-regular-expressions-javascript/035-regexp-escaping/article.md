
# Special characters

As we've seen, a backslash `"\"` is used to denote character classes. So it's a special character.

There are other special characters as well, that have special meaning in a regexp. They are used to do more powerful searches.

Here's a full list of them: `pattern:[ \ ^ $ . | ? * + ( )`.

Don't try to remember it -- when we deal with each of them separately, you'll know it by heart automatically.

## Escaping

To use a special character as a regular one, prepend it with a backslash.

That's also called "escaping a character".

For instance, we need to find a dot `pattern:'.'`. In a regular expression a dot means "any character except a newline", so if we really mean "a dot", let's put a backslash before it: `pattern:\.`.

```js run
alert( "Chapter 5.1".match(/\d\.\d/) ); // 5.1
```

Brackets are also special characters, so if we want them, we should use `pattern:\(`. The example below looks for a string `"g()"`:

```js run
alert( "function g()".match(/g\(\)/) ); // "g()"
```

If we're looking for a backslash `\`, then we should double it:

```js run
alert( "1\2".match(/\\/) ); // '\'
```

## A slash

The slash symbol `'/'` is not a special character, but in Javascript it is used to open and close the regexp: `pattern:/...pattern.../`, so we should escape it too.

Here's what a search for a slash `'/'` looks like:

```js run
alert( "/".match(/\//) ); // '/'
```

From the other hand, the alternative `new RegExp` syntaxes does not require escaping it:

```js run
alert( "/".match(new RegExp()/\//) ); // '/'
```
