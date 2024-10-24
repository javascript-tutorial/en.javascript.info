```js run demo
function filterRangeInPlace(arr, bottomLimit, upperLimit) {
    arr.map((element, index) => {
        if (!(arr >= bottomLimit && arr <= upperLimit)) {
            arr.splice(index, 1);
        }
    });
};

let arr = [5, 3, 8, 1];
filterRangeInPlace(arr, 1, 4); // removed the numbers except from 1 to 4
alert( arr ); // [3, 1]
```
