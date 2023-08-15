muhimlik: 5

---

# Takrorlanadigan kalitlar

Biz oʻzgaruvchida `map.keys()` massivini olishni va keyin unga massivga xos usullarni qoʻllashni istaymiz, masalan. `.push`.

Lekin bu ishlamaydi:

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// Error: keys.push funksiya emas

keys.push("more");
*/!*
```

Nega? `keys.push` ishlashi uchun kodni qanday tuzatishimiz mumkin?
