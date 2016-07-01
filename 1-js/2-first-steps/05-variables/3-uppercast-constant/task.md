importance: 4

---

# Uppercase const?

Examine the following code:

```js
const birthday = '18.04.1982';

const age = calculateAgeBasedOn(birthday);
```

Here we have a constant `birthday` date and the `age` is calculated with the help of a function (its code is not provided cause it doesn't matter here).

Would it be right to name both constants using the upper case? Like this:

```js
const BIRTHDAY = '18.04.1982';

const AGE = calculateAgeBasedOn(BIRTHDAY);
```

...Or we should use the upper case for only one of them? Or just use lower case everywhere?

