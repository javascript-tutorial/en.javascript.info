To get the number of milliseconds till tomorrow, we can from "tomorrow 00:00:00" substract the current date.

First, we generate that "tomorrow", and then do it:

```js run
function getSecondsToTomorrow() {
  let now = new Date();

  // tomorrow date
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let diff = tomorrow - now; // difference in ms
  return Math.round(diff / 1000); // convert to seconds
}
```
