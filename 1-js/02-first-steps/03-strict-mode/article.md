# Zamonaviy "use strict"

Uzoq vaqt davomida JavaScript bir-biriga to'g'ri kelish muammosisiz rivojlanib keldi. Tilga yangi funksiyalar qo‘shildi, eski funksiyalar esa o‘zgarmadi.

Buning foydali jihati, mavjud kod hech qachon buzilmadi. Ammo salbiy tomoni shunda ediki, JavaScript yaratuvchilari tomonidan qilingan har qanday xato yoki nomukammal qaror tilda abadiy qolib ketgan.

2009 yil ya'ni ECMAScript 5 (ES5) paydo bo'lgunga qadar shunday bo'lgan. U tilga yangi xususiyatlarni qo'shdi va ba'zi mavjudlarini o'zgartirdi. Eski kodning ishlashini ta'minlash uchun bunday o'zgartirishlarning aksariyati to'g'ridan to'gri o'chirib qo'yilgan. Siz ularni `"use strict"` maxsus ko'rsatmasi yordamida faollashtirishingiz kerak.

## "use strict"

Ko'rsatma string ga o'xshaydi: `"use strict"` yoki `'use strict'`. Agar u skriptning yuqori qismida joylashgan bo'lsa, butun skript "zamonaviy" usulda ishlaydi.

Misol uchun:
```js
"use strict";

// bu kod zamonaviy usulda ishlaydi
...
```

Tez orada biz funktsiyalar (buyruqlarni guruhlash usuli) ni o'rganamiz, shuning uchun funksiya boshida `"use strict"` ni qo'yishimiz mumkinligini oldindan aytib o'tamiz. Buni bajarish faqat ushbu funktsiyadagina qat'iy rejimni yoqadi. Lekin odatda odamlar uni butun skript uchun ishlatishadi.

```warn header=`"Iltimos \"use strict"\ skriptlaringizning yuqori qismida ekanligiga ishonch hosil qiling, aks holda qat'iy rejim yoqilmasligi mumkin."

Bu yerda qat'iy rejim yoqilmagan:

```js no-strict
alert("some code");
// quyidagi "use strict" e'tiborga olinmaydi -- u yuqorida bo'lishi kerak

"use strict";

// qat'iy rejim yoqilmagan
```

Faqat `"use strict"`ni ustidagi izohlar ko'rinishi mumkin.

```warn header="`use strict`ni bekor qilishning hech qanday usuli yo'q"
Engine ni eski holatiga qaytaradigan "no use strict" kabi hech qanday ko'rsatma mavjud emas.

Qattiq rejimga kirganimizdan so'ng, orqaga qaytish yo'q.


## Brauzer konsoli

Kodni ishga tushurish uchun [developer console](info:devtools) dan foydalanganingizda, `use strict` to'g'ridan to'gri ishlamasligiga e'tibor bering.

Ba'zan, `use strict` ni qo'llashdagi o'zgarishlar orqali siz noto'g'ri natijalarga erishishingiz mumkin.

Xo'sh, aslida konsolda "qat'iy rejim" dan qanday foydalanish kerak?

Birinchi, bir nechta satrlarni kiritish uchun `key:Shift+Enter` tugmalarini bosishga va yuqorisiga `use strict` ni qo'yishga urinib ko'ring, masalan:

```js
'use strict'; <Shift+Enter yangi satr uchun>
//  ...sizning kodingiz
<Enter ishga tushirish uchun>
```

U ko'pgina brauzerlarda, jumladan Firefox va Chrome larda ishlaydi.

Agar bunday bo'lmasa, masalan, eski brauzerda, "use strict" ni ta'minlashning yomon, ammo ishonchli usuli mavjud. Uni shunday o'ramga ichiga soling:

```js
(function() {
  'use strict';

  // ...bu yerga sizning kodingiz...
})()
```

## "use strict" dan foydalanishimiz kerakmi?

Savol aniq tuyulishi mumkin, ammo aslida unday emas.

Skriptlarni `"use strict"`.... bilan boshlashni tavsiya qilish mumkin. Lekin nima ajoyib ekanini bilasizmi?

Zamonaviy JavaScript "sinflar" va "modullar" - ilg'or til tuzilmalarini (biz ularga albatta etib boramiz) qo'llab quvvatlaydi, ular "use strict" ni avtomatik ravishda yoqadi. Shunday qilib, agar biz ulardan foydalansak, "use strict" ni qo'shishimiz shart bo'lmaydi.

**Demak, hozircha `"use strict";` shunchaki, skriptlaringizning yuqori qismidagi mehmon. Keyinchalik, kodingiz sinflar va modullar ichida joylashganda, uni olib tashlashingiz mumkin.**

Hozircha, "use strict" haqida umumiy ma'lumotga ega bo'ldik.

Keyingi boblarda, til xususiyatlarini o'rganar ekanmiz, biz qat'iy va eski rejimlar o'rtasidagi farqni ko'rib chiqamiz. Yaxshiyamki, ular ko'p emas va aslida hayotimizni yaxshilashga xizmat qiladi.

Agar boshqacha ko'rsatilmagan bo'lsa (juda kamdan-kam hollarda), ushbu qo'llanmadagi barcha misollar qat'iy rejimni nazarda tutadi.
