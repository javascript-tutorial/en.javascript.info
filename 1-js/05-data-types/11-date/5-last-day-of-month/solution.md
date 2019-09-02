Let's create a date using the next month, but pass zero as the day:
```js run demo
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28
```

Normally, dates start from 1, but technically we can pass any number, the date will autoadjust itself. So when we pass 0, then it means "one day before 1st day of the month", in other words: "the last day of the previous month".
