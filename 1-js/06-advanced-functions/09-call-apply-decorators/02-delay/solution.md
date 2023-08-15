Yechimi:

```js run demo
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let f1000 = delay(alert, 1000);

f1000("test"); // 1000ms dan keyin "test" ni ko'rsatadi
```

Iltimos, bu yerda arrow funksiyasidan qanday foydalanilganiga e'tibor bering. Ma’lumki, arrow funksiyalarining o‘ziga xos `this` va `arguments` yo‘q, shuning uchun `f.apply(this, arguments)` o‘rovchidan `this` va `arguments`ni oladi.

Agar biz oddiy funktsiyadan o'tsak, `setTimeout` uni argumentlarsiz va `this=window` (brauzerda bo'lgan holda) chaqiradi.

Biz hali ham oraliq o'zgaruvchidan foydalanib, to'g'ri `this` ni o'tkazishimiz mumkin, ammo bu biroz og'irroq:

```js
function delay(f, ms) {

  return function(...args) {
    let savedThis = this; // buni oraliq o'zgaruvchiga saqlang
    setTimeout(function() {
      f.apply(savedThis, args); // bu yerda ishlating
    }, ms);
  };

}
```
