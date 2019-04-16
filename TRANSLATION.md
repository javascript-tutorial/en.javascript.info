# Translation Style Guide

This document describes rules that should be applied to **all** languages.

NOTE TO MAINTAINERS: You may want to translate this guide so that it can be more accessible to your translators.

## General

The translation doesn't have to be word-by-word precise.

It should be technically correct and explain well.

If you feel the original text could be improved, please send a PR.

## Text in Code Blocks

- Translate comments in code blocks.
- Don't translate strings, variable names, ids, classes, etc.

Example:

```js
// Example
const text = "Hello, world";
document.querySelector('.hello').innerHTML = text;
```

✅ DO (translate comment):

```js
// Ejemplo
const text = 'Hello, world';
document.querySelector('.hello').innerHTML = text;
```

❌ DON'T (translate string or class):

```js
// Ejemplo
const text = 'Hola mundo';
// ".hello" is a class
// DO NOT TRANSLATE
document.querySelector('.hola').innerHTML = text;
```

## External Links

If an external link is to Wikipedia, e.g. https://en.wikipedia.org/wiki/JavaScript, and a version of that article exists in your language that is of decent quality, consider linking to that version instead.

Example:

```md
[JavaScript](https://en.wikipedia.org/wiki/JavaScript) is a programming language.
```

✅ OK (en -> es):

```md
[JavaScript](https://es.wikipedia.org/wiki/JavaScript) es un lenguaje de programación.
```

For links to MDN, that are only partially translated, also use the language-specific version.

If a linked article has no translated version, leave the link "as is".
