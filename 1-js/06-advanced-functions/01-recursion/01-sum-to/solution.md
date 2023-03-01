Sikl yordamida yechim:

```js run
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

alert( sumTo(100) );
```

Rekursiya yordamida yechim:

```js run
function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}

alert( sumTo(100) );
```

Formula yordamida yechim: `sumTo(n) = n*(n+1)/2`:

```js run
function sumTo(n) {
  return n * (n + 1) / 2;
}

alert( sumTo(100) );
```

P.S. Tabiiyki, formula eng tezkor yechimdir. U har qanday `n` raqami uchun faqat 3 ta amaldan foydalanadi. Matematika yordam beradi!

Loop varianti tezlik bo'yicha ikkinchi o'rinda turadi. Rekursiv va tsikl variantida biz bir xil raqamlarni yig'amiz. Ammo rekursiya ichki qo'ng'iroqlar va ijro stekini boshqarishni o'z ichiga oladi. Bu ham resurslarni talab qiladi, shuning uchun u sekinroq.

P.P.S. Ba'zi dvigatellar "tail call"ni optimallashtirishni qo'llab-quvvatlaydi: agar rekursiv qo'ng'iroq funktsiyaning eng oxirgisi bo'lsa, boshqa hisoblar bajarilmasa, tashqi funktsiyani bajarishni davom ettirish kerak bo'lmaydi, shuning uchun vosita eslab qolishga hojat yo'q. uning bajarilishi konteksti. Bu xotiradagi yukni olib tashlaydi. Ammo JavaScript dvigateli qo'ng'iroqlarni optimallashtirishni qo'llab-quvvatlamasa (ularning ko'pchiligi yo'q), xatolik yuz beradi: maksimal stek hajmi oshib ketdi, chunki odatda stekning umumiy hajmida cheklov mavjud.