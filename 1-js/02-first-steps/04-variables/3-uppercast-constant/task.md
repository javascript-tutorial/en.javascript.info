importance: 4

---

# Uppercase const?

Examine the following code:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

Here we have a constant `birthday` date and the `age` is calculated from `birthday` with the help of `someCode()` (which is a function that's not provided for shortness, and because details don't matter here. But don't worry, we will cover functions in the chapter <info:function-basics>).

Would it be right to use upper case for `birthday`? For `age`? Or even for both?

```js
const BIRTHDAY = '18.04.1982'; // make uppercase?

const AGE = someCode(BIRTHDAY); // make uppercase?
```
