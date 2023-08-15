
Har qanday `setTimeout` faqat joriy kod tugagandan so'ng ishlaydi.

`i` oxirgisi bo'ladi: `100000000`.

```js run
let i = 0;

setTimeout(() => alert(i), 100); // 100000000

// bu funksiyani bajarish vaqti >100ms deb faraz qilaylik
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
