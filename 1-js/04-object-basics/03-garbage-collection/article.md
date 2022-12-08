# Garbage collection (Axlat yig'ish)

JavaScriptda xotirani boshqaruv avtomatik ravishda va bizga ko'rinmas holda amalga oshiriladi. Biz primitivlar, ob'ektlar, funktsiyalarni yaratamiz ... Bularning barchasi xotiradan joy oladi.

Agar biror narsa keraksiz bo'lib qolsa nima sodir bo'ladi? JavaScript mexanizmi buni qanday topadi va tozalaydi?

## Qabul qilish imkoniyati

JavaScriptda xotirani boshqarishning asosiy kontseptsiyasi bu *erishish imkoniyati*dir.

Sodda qilib aytkanda, "erishib bo'ladigan" qiymatlar qandaydir ma'noda kirsa va foydalansa bo'ladigan qiymatlardir. Ular xotiraga joylanishi kafolatlanadi. 

1. Ajralmaydigan, foydalansa bo'ladigan qiymatlar to'plami bor, va ularni ma'lum sabablarga ko'ra o'chirib yuborish mumkin emas. 

    Misol uchun:

    - Joriy bajarilayotgan funksiya, uning mahalliy o'zgaruvchilari va parametrlari.
    - Joriy ichki chaqiruvlar zanjiridagi boshqa funktsiyalar, ularning mahalliy o'zgaruvchilari va parametrlari.
    - Xalqaro o'zgaruvchilar.
    - (Shuningdek boshqa ichki qismlar ham bor)

    Bu qiymatlar *root* (ildiz)lar deb ataladi.

2. Har qanday boshqa qiymat, agar u root dan havola yoki havolalar zanjiri orqali erishish mumkin bo'lsa, erishsa bo'ladigan deb hisoblanadi.

    Misol uchun, agar global o'zgaruvchida ob'ekt mavjud bo'lsa va bu ob'ekt boshqa ob'ektga havola qiluvchi xususiyatga ega bo'lsa, *ushbu* ob'ekt kirish mumkin deb hisoblanadi. Shuningdek u murojaat qilganlar ham kirsa bo'ladigandir. Quyidagilar batafsil misollar.

JavaScript enginesida [garbage collector](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)) deb nomlangan fon jarayoni mavjud. U barcha ob'ektlarni kuzatib boradi va erishib bo'lmaydiganlarini olib tashlaydi.

## Oddiy misol

Quyidagi eng oddiy misol:

```js
// foydalanuvchi ob'ekt uchun havolaga ega
let user = {
  name: "John"
};
```

![](memory-user-john.svg)

Bu yerda strelka ob'ekt havolasini ko'rsatadi. Global oʻzgaruvchi `“user”` `{name: "John"}` obyektiga ishora qiladi (qisqa qilib uni John dep ataymiz). Jonning `"name"` xususiyati primitiveni saqlaydi, shuning uchun u ob'ektning ichida bo'yalgan.

Agar `user` qiymati ustiga yozilgan bo'lsa, havola yo'qoladi:

```js
user = null;
```

![](memory-user-john-lost.svg)

Endi Jonga erishib bo'lmaydigan bo'lib qoladi. Unga kirishning hech qanday usuli yo'q, unga havolalar ham yo'q. Chiqindilarni yig'uvchi ma'lumotlarni yo'q qiladi va xotirani bo'shatadi.

## Ikkita havola

Endi, faraz qilaylik biz havolani `foydalanuvchi`dan `admin`ga nusxa qildik:

```js
// foydalanuvchi ob'ekt uchun havolaga ega
let user = {
  name: "John"
};

*!*
let admin = user;
*/!*
```

![](memory-user-john-admin.svg)

Yana xuddi shunday qilsak:
```js
user = null;
```

...Keyin ob'ektga `admin` global o'zgaruvchisi orqali yana kirish mumkin, shuning uchun ham u xotirada. Agar biz `admin`ni ham ustiga yozsak, uni olib tashlash mumkin bo'lib qoladi.

## O'zaro bog'langan ob'ektlar

Endi murakkabroq misol. Oila:

```js
function marry(man, woman) {
  woman.husband = man;
  man.wife = woman;

  return {
    father: man,
    mother: woman
  }
}

let family = marry({
  name: "John"
}, {
  name: "Ann"
});
```

`marry` funksiyasi ikkita ob'ektni bir biriga havola berish orqali uyg'unlashtiradi va ikkisini ham o'z ichiga olgan yangi ob'ektga qaytadi. 

Natijadagi xotira tuzilishi:

![](family.svg)

Hozirdan boshlab barcha ob'ektlarga kirish mumkin.

Endi ikkita havolani olib tashlaymiz:

```js
delete family.father;
delete family.mother.husband;
```

![](family-delete-refs.svg)

Ushbu ikkita havoladan faqat bittasini o'chirishning o'zi etarli emas, chunki barcha ob'ektlarga hali ham kirsa bo'ladi.

Ammo ikkalasini ham o'chirib tashlasak, Jonning boshqa kiruvchi havolasi yo'qligini ko'rishimiz mumkin:

![](family-no-father.svg)

Chiquvchi havolalar ahamiyat kasb etmaydi. Faqarkina kiruvchilari obyektlarni kirish mumkin qila oladi. Shunday uchun, Jon endi mavjud emas va unga kirish imkoni bo'lmagan barcha ma'lumotlari bilan birga xotiradan o'chiriladi. 

Axlat yig'ilgandan keyin:

![](family-no-father-2.svg)

## Yetib bo'lmaydigan orol

O'zaro bog'langan ob'ektlarning butun oroli yetib bo'lmaydigan holga kelishi va xotiradan olib tashlanishi ham mumkin.

Manba ob'ekti yuqoridagi bilan bir xil. Keyin:

```js
family = null;
```

Ichki xotira ko'rinishi quyidagi holatka kelib qolishi mumkin:

![](family-no-family.svg)

Ushbu misol erishish mumkinligi tushunchasi qay darajada muhimligini ko'rsatadi.

Jon va Enn hali ham bog'langanligi aniq va ikkalasida ham kiruvchi havolalar bor. Lekin bu yetarli emas.

The former `"family"` object has been unlinked from the root, there's no reference to it any more, so the whole island becomes unreachable and will be removed.
Oldingi `"family"` obyekti root (ildiz)dan uzildi, va endi unga havola yo'q, shuning uchun butun orolga kirish imkonsiz bo'lib qoladi va olib tashlanadi.

## Ichki algoritmlar

Axlat yig'ishning asosiy algoritmi "belgilash va tozalash" deb ataladi.

Quyidagi "axlat yig'ish" bosqichlari muntazam ravishda amalga oshiriladi:

- Axlat yig'uvchi root (ildiz)lar oladi va ularni "belgilaydi" (eslab qoladi).
- Keyin u tashrif buyuradi va ulardan barcha havolalarni "belgilaydi".
- Keyin u belgilangan ob'ektlarga tashrif buyuradi va *ularning* havolalarini belgilaydi. Kelajakda bir xil ob'ektga ikki marta tashrif buyurmaslik uchun barcha tashrif buyurilgan ob'ektlar eslab qolinadi.
- ...Va shunga o'xshash davom etadi, har bir erishish mumkin bo'lgan (ildizlardan) havolalar tashrif buyurilmagangacha.
- Belgilanganlardan tashqari barcha ob'ektlar o'chiriladi.

Masalan, bizning ob'ekt tuzilishimiz quyidagicha ko'rinsin:

![](garbage-collection-1.svg)

O'ng tomonda "yetib bo'lmas orol"ni aniq ko'rishimiz mumkin. Endi keling, "belgilash va supurish" axlat yig'uvchisi bu muammoni qanday hal qilishini ko'rib chiqamiz.

Birinchi qadam root (ildiz)larni belgilaydi:

![](garbage-collection-2.svg)

Keyin ularning havolalari belgilanadi:

![](garbage-collection-3.svg)

...Va iloji bo'lganda ularning havolalari:

![](garbage-collection-4.svg)

Endi jarayonda tashrif buyurib bo'lmaydigan ob'ektlarga kirish imkonsiz deb hisoblanadi va olib tashlanadi:

![](garbage-collection-5.svg)

Shungdek jarayonni, ildizlaran bitta katta chelakdagi bo'yoqni to'kilib, barcha havolalar orqali oqishi va barcha yetishish mumkin bo'lgan ob'ektlarni belgilaydi kabi faraz qilishimiz mumkin. Keyin belgilanmaganlar olib tashlanadi.

Bu axlat yig'uvchi qanday ishlashi tushunchasi. JavaScript enginlari tezroq ishlashi va amalga ta'sir qilmasligi uchun ko'plab optimallashtirisharlarni qo'llaydi. 

Ba'zi optimallashtirishlar:

- **Avlodlar to'plami** -- ob'ektlar ikkita guruhga bo'linadi: "yangilar" va "eskilar". Ko'p ob'ektlar paydo bo'ladi, o'z ishlarini bajaradi va tezda g'oyib bo'ladi, ular agressiv tarzda tozalanishi mumkin. Yetarlicha uzoq umr ko'rganlar esa "eski" bo'lib, kamroq tekshiriladi.
- **Qo'shimcha yig'ish** -- agar ob'ektlar ko'p bo'lsa va bir vaqtning o'zida butun ob'ektni yurishga va belgilashga harakat qilsak, bu biroz vaqt talab qilishi va bajarilishida ko'rinib turuvchi kechikishlarni kiritishi mumkin. Shu tufayli, enjin axlat yig'ishni qismlarga bo'lishga harakat qiladi. Keyin qismlar birma-bir, alohida-alohida bajariladi. Bu o'zgarishlarni kuzatish uchun ular o'rtasida qo'shimcha buxgalteriya hisobini talab qiladi, ammo bizda katta kechikishlar o'rniga juda ko'p kichik kechikishlar mavjud.
- **Bo'sh vaqtlar to'plami** -- axlat yig'uvchi faqat protsessor ishlamay qolganda ishlashga harakat qiladi, bu amalga mumkin bo'lgan ta'sirni kamaytiradi.

Axlat yig'ish algoritmlarining boshqa optimallashtirishlari va tushunchalari mavjud. Ularni bu yerda tasvirlashni istardim, lekin to'xtab turishim kerak, chunki turli enjinelar turli xil sozlash va texnikani amalga oshiradi.Va bundan ham muhimi, enjinelar rivojlanishi bilan hamma narsa o'zgaradi, shuning uchun haqiqiy ehtiyojlarsiz "oldindan" chuqurroq o'rganish bunga arzimaydi emas. Agar, albatta, bu haqiqiy qiziqish masalasi bo'lmasa, quyida siz uchun ba'zi havolalar bo'ladi.

## Xulosa

Bilish kerak bo'lgan asosiy narsalar:

- Chiqindilarni yig'ish avtomatik ravishda amalga oshiriladi. Biz buni majburlay olmaymiz yoki oldini ololmaymiz.
- Ob'ektlar kirish mumkin bo'lganda xotirada saqlanadi.
- Havola qilish bu erishsa bo'lish bilan bir xil emas (ildizdan): bir qancha o'zaro bog'langan obyektlar umuman erishsa bo'lmaydigan holga kelib qoliahi mumkin. 

Zamonaviy enjinlar axlat yig'ishning ilg'or algoritmlarini amalga oshiradi.

"Axlat yig'ish bo'yicha qo'llanma: Xotirani avtomatik boshqarish san'ati" (R. Jones va boshqalar) umumiy kitobi ulardan ba'zilarini qamrab oladi.

Agar siz past darajadagi dasturlash bilan tanish bo'lsangiz, V8 axlat yig'uvchisi haqida batafsil ma'lumot  [A tour of V8: Garbage Collection](http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection) maqolada.

[V8 blog](https://v8.dev/) shuningdek vaqti-vaqti bilan xotira boshqaruvidagi o'zgarishlar haqida ham maqolalar chop etib turadi. Tabiiyki, axlat yig'ishni o'rganish uchun siz V8 ichki qurilmalari haqida umumiy ma'lumotga ega bo'lishingiz va V8 muhandislaridan biri bo'lib ishlagan  [Vyacheslav Egorov](http://mrale.ph) blogini o'qib chiqishingiz kerak. Men aytmoqchimanki: "V8", chunki u Internetdagi maqolalar bilan eng yaxshi yoritilgan. Boshqa enjinelar uchun ko'plab yondashuvlar o'xshash, ammo axlat yig'ish ko'p jihatdan farq qiladi.

Enjinelarni chuqur bilish past darajadagi optimallashtirish kerak bo'lganda yaxshi bo'ladi. Buni til bilan tanishganingizdan keyingi qadam sifatida rejalashtirish oqilona bo'lardi.
