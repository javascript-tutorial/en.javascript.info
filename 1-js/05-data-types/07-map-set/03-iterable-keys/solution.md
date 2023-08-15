Buning sababi, `map.keys()` massivni emas, takrorlanuvchini qaytaradi.

Biz uni `Array.from` yordamida massivga aylantirishimiz mumkin:

```js run
let map = new Map();

map.set("name", "John");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("more");

alert(keys); // ism, va boshqalar
```
