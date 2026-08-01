importance: 5

---

# Deposit calculator

Create an interface that allows user to enter their bank deposit and interest percentage, then calculates how much the balance will be after a given period of time.

Here's the demo:

[iframe src="solution" height="350" border="1"]

Any input change should be processed immediately.

The formula is:
```js
// initial: the initial money(deposit)
// interest: e.g. 5% per year means 0.05
// years: how many years to wait
let result = Math.round(initial * (1 + interest) ** years);
```
