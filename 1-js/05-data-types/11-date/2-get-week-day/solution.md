The method `date.getDay()` returns the number of the weekday, starting from sunday.

Let's make an array of weekdays, so that we can get the proper day name by its number:

```js run demo
function getWeekDay(date) {
  let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3 Jan 2014
alert( getWeekDay(date) ); // FR
```
