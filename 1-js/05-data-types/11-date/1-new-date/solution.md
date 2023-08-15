`new Date` konstruktori mahalliy vaqt mintaqasidan foydalanadi. Shunday qilib, eslash kerak bo'lgan yagona muhim narsa - oylar noldan boshlanadi.

Shunday qilib, fevralda 1-raqam bor.

Sana komponentlari sifatida raqamlar bilan bir misol:

```js run
//yangi sana (yil, oy, sana, soat, daqiqa, soniya, millisekund)
let d1 = new Date(2012, 1, 20, 3, 12);
alert(d1);
```

Shuningdek, qatordan sana yaratishimiz mumkin, masalan:

```js run
//new Date(datastring)
let d2 = new Date("2012-02-20T03:12");
alert(d2);
```
