importance: 4

---

# Extract the money

We have a cost in the form `"$120"`. That is: the dollar sign goes first, and then the number.

Create a function `extractCurrencyValue(str)` that would extract the numeric value from such string and return it. 

The example:

```js
alert( extractCurrencyValue('$120') === 120 ); // true
```

