# Dasturchi konsoli

Kodlarda xatoliklar ham bo'lish mumkin.Sizning yanglishishingiz ehtimoli ham anchagina. To'g'rirog'i, agr siz [robot] (https://en.wikipedia.org/wiki/Bender_(Futurama)) emas inson bo'lsangiz, albatta xatolar qilasiz.

Lekin brauzerda xatolarni foydalanuvchilar to'gridan to'g'ri ko'rishmnaydi. Shuning uchun scriptda biror narsa yanglish ketsa, biz nima buzilganligini ko'rmaymiz va uni tuzata olmaymiz. 

Xatoliklarni ko'rish va scriptlar haqida boshqa ma'lumotlar olish uchun brauzerlarga "developer tools" (dasturchi vositalari) o'rnatilgan. 

Ko'p dasturchilar loyihalash (dasturlash)da Chrome yoki Firefox suyanishadi, chunki ularda eng yaxshi dasturchi vositalari bor.Boshqa brauzerlar ham dasturlash vositasi bilan ta'minlay oladi, xatto ba'zida maxsus xususiyatlari ham mavjud, lekin ular Chrome yoki Firefoxga yeta olmaydi.Xullas, dasturchilarni ko'pining o'z "sevimli" brauzerlari bo'ladi va muammosi brauzeri bilan bog'liq bo'lgan holda boshqasiga o'tib ketadi.   

Dasturlash vositalari kuchli ta'sirli bo'lib, ularning xususiyatlari ko'p. Dastlab biz ularni qanday ochishni, xatolarni ko'rib chiqishni hamda JavaScriptda buyruqlarni boshqarishni o'rganib chiqamiz. 

## Google Chrome

[bug.html](bug.html) sahifasini ochasiz.

Bunda JavaScript kodida xatolik mavjud. Oddiy tashrif buyuruvchilar buni ko'rishmaydi, uni ko'rish uchun esa dasturchi vositalarini ochishimiz kerak bo'ladi. 

`key:F12` tugmasini bosing, yoki agar Mac da bo'lsangiz, u holda `key:Cmd+Opt+J`.

Dasturchi vositalari kamchiliklar oynasini to'g'ridan to'g'ri ochib beradi. 

Quyidagiga o'xshash narsa paydo bo'ladi:

![chrome](chrome.png)

Dasturchi vositalarining aniq ko'rinishi sizdagi Chrome ning versiyasiga bog'iq. U vaqti-vaqti bilan o'zgarib turasa ham,, har safar ular bir-biriga o'xshash bo'ladi. 

- Buyerda biz qizil rangli xato habarni ko'rishimiz mumkin. Ushbu holatda, scriptda noma'lum "lalala" buyrug'i mavjud.
- O'ng tomonda xato mavjud bo'lgan raqamlar qatori bilan `bug.html:12` manbasiga link mavjud.

Quyidagi xato habar hisoblanadi, va bu yerda ko'k belgi `>` bor. Bu biz JavaScript buyrug'larini berishimiz mumkin bo'lgan "buyrug'lar chizig'i" (command line)dir. uni ishga tushirish uchun `key:Enter` tugmasini bosing. 

Endi xatoliklarni ko'rishimiz mumkin, va bu boshlanishiga yetarli .Biz dasturchi vositalariga yana qaytamiz va  <info:debugging-chrome> bo'limida dasturdagi xatoliklarni to'g'irlashni batafsilroq ko'rib chiqamiz.

```smart header="ko'p qatorli kiritilgan ma'lumot" (Multi-line input)
odatda biz bir qator kodlarni komputerga kiritib,`key:Enter` tugmasini bossak, u ishga tushadi. 

Ko'p qatorli kodlarni kiritish uchun `key:Shift+Enter` tugmasini bosasiz. Bu yo'l bilan siz JAvaScript kodining uzun bo'lak(fragment)larini ham kirita olasiz.
```

## Firefox, Edge, va boshqalar

Boshqa ko'plab brauzerlar dasturchi vositalarini topish uchun `key:F12` dan foydalanadi.  

Ularning ko'rinishi va xarakteristikasi juda o'xshash. Ushbu vositalarning bittasidan foydalanishni o'rganib olganingizdan kegin ( Chrome dan boshlashingiz ham mumkin), boshqasiga osongina o'zgartira olasiz. 

## Safari

Safari (Mac brauzer uchun, Windows/Linux da ishlamaydi) bular ichida o'ziga xos. Biz birinchi bo'lib " dastur menyusi" (Develop menu)ni ishga tushurishimiz kerak.

Afzalliklarni oching va "yetakchi" (Advanced) oynasiga o'ting. Bu yerda, pastki qismda tanlash oyasi ko'rinadi:

![safari](safari.png)

Xozir `key:Cmd+Opt+C` ketma-ketligi komputermni boshqa dasturga o'tkaza oladi. Shuningdek bizda  koo'p buyruqli va tanlovli "dastur" (Develop) nomli yangi oyna ham paydo bo'ldi .

## Summary

 -Dasturchi vositalari bizga xatolarni ko'rish, buyruqlarni boshqarish, o'zgarishlarni tekshirish hamda ko'plab boshqa narsalar qilsh imkoniyatini beradi.

- Windowsdagi ko'p bruzerlarda ular`key:F12` tugmasi bilan ochiladi  .Mac dagi Chrome da dastlab `key:Cmd+Opt+J`, Safarida esa: `key:Cmd+Opt+C` bosilishi lozim bo'ladi.

Endi bizda tayyor muhit bor.Keyingi qismda biz JavaScriptni boshlaymiz. 
