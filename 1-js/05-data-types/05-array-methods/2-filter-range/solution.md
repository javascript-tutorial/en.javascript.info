```js run demo
function filterRange(arr, a, b) {
  // yaxshiroq o'qilishi uchun ifoda atrofida qavslar qo'shildi
  return arr.filter((item) => a <= item && item <= b);
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert(filtered); // 3,1 (mos keladigan qiymatlar)

alert(arr); // 5,3,8,1 (o'zgartirilmagan)
```
