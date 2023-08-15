muhimlik: 5

---

# Spy dekorator

Barcha chaqiruvlarni o'zining `calls` xususiyatida ishlashi uchun saqlaydigan o'rovchini qaytarishi kerak bo'lgan `spy(func)` dekoratorini yarating.

Har bir chaqiruv argumentlar qatori sifatida saqlanadi.

Masalan:

```js
function work(a, b) {
  alert( a + b ); // ish arbitrar funksiya yoki metoddir
}

*!*
work = spy(work);
*/!*

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}
```

P.S. Ushbu dekorator ba'zan unit-testing uchun foydalidir. Uning kengaytirilgan shakli [Sinon.JS](http://sinonjs.org/) kutubxonasidagi `sinon.spy`dir.
