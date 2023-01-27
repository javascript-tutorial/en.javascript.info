```js run demo
function filterRangeInPlace(arr, a, b) {
  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];

    // agar intervaldan tashqarida bo'lsa, olib tashlang
    if (val < a || val > b) {
      arr.splice(i, 1);
      i--;
    }
  }
}

let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // 1 dan 4 gacha bo'lgan raqamlardan tashqari raqamlar olib tashlandi

alert(arr); // [3, 1]
```
