Javobi: **John**.

```js run no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

f(); // John
```

`f.bind(...)` tomonidan qaytarilgan ekzotik [bog`langan funktsiya](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects) obyekti kontekstni eslab qoladi (va agar argumentlar bo'lsa) taqdim etilgan) faqat yaratilish vaqtida.

Funktsiyani qayta bog'lab bo'lmaydi.