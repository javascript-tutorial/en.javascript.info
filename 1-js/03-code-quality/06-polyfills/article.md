
# Polyfills and transpilers

JavaScript tili muntazam rivojlanib boradi. Tilga yangi takliflar doimiy ravishda berib boriladi, ular analiz qilinadi va agar munosib topilsa, <https://tc39.github.io/ecma262/> da ro'yxatga va [specification](http://www.ecma-international.org/publications/standards/Ecma-262 da rivojlanishga qo'shiladi.  
The JavaScript language steadily evolves. New proposals to the language appear regularly, they are analyzed and, if considered worthy, are appended to the list at <https://tc39.github.io/ecma262/> and then progress to the [specification](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/).

JavaScript engine-ni ortidagi jamoalarning birinchi o'rinda nimani amalga oshirish borasida o'zlarining g'oyalari bor. Ular rejadagi takliflarni amalga oshirishga va allaqachon qo'llanmada paydo bo'lgan narsalarni kechiktirishga qaror qilishi mumkin, chunki ular u darajada ham qiziqarli emas yoki bajarish mushkul. 

Shu sabab engineni standardning faqat bir qismini amalga oshirishini ko'rish ko'p uchraydigan holat. 
So it's quite common for an engine to implement only part of the standard.

Tilning xususiyatlariga bo'lgan qo'llab-quvvatlashning joriy holatini ko'rishga yaxshi sahifa <https://kangax.github.io/compat-table/es6/> (u katta, o'rganadigan narsa hali ko'p).

Dastuchi sifatida, biz eng so'ngi xususiyatlardan foydalanishni xoxlaymiz. Yaxshi narsalarn qanchalik ko'p bo'lsa - shuncha yaxshi! 

Boshqa tomondan olib qaraganda, zamonaviy kodlarimizni hali so'ngi xususiyatlarni tushunmaydigan eski enginelarda qanday ishlatish mumkin?
Buning uchun ikkita vosita mavjud:
1. Transpilers.
2. Polyfills.

Bu bo'limda, bizning maqsadimiz ular qanday ishlash mohiyatini va ularning web developmentdagi o'rnini bilib olish.  

## Transpilers

A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) maxsus software bo'lagi bo'lib, u bir kod manbasini boshqa bir kod manbasiga tarjima qiladi. U zamonaviy kodni tahlil qila oladi (o'qidi va tushunadi) va eskirgan enginelarda ham ishlashi uchun uni eski sintaksis tuzilmasida qaytadan yozib chiqadi.  

Misol uchun, JavaScript 2020 yildan avval "nolga teng birlashtiruvchi operator" yo'q edi `??`. Shuning uchun, agar tashriv buyuruvchi eskirgan brauzerdan foydalansa, u `height = height ?? 100` ga o'xshagan kodlarni tushunmasligi mumkin. 

Transpiler kodimizni analiz qiladi va `height ?? 100` ni `(height !== undefined && height !== null) ? height : 100` ning ichiga qayta yozib chiqadi.

```js
// transpiler ni amalga oshirishdan avval
height = height ?? 100;

// transpiler ni amalga oshirgandan keyin
height = (height !== undefined && height !== null) ? height : 100;
```

Endi, yozilgan kod eski JavaScript enginelariga mos keladi.  

Odatda dasturchi transpilerni o'z komputerida ishga tushiradi, va transpile bo'lgan koddan serverda foydalanadi. 

Nomlar bo'yicha gapirilganda, [Babel](https://babeljs.io) eng mashhur transpirlerlardan biri. 

[webpack](https://webpack.js.org/) kabi zamonaviy proyekt qurish tizimlari transpilerni barcha kod o'zgarishlarida avtomatik ishga tushirish uchun vositalar bilan ta'minlaydi, shuning uchun ularni dasturlash jarayoniga biriktirish juda ososn.  
Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there.

Modern project build systems, such as [webpack](https://webpack.js.org/), provide a means to run a transpiler automatically on every code change, so it's very easy to integrate into the development process.

## Polyfills

Yangi til xususiyatlari nafaqat sintaksis tuzilmalar va operatorlarni, balki ichki funksiyalarni ham o'z ichiga olishi mumkin. 

Misol uchun, `Math.trunc(n)` sonning oʻnlik qismini “kesuvchi” funksiyadir, masalan. `Math.trunc(1.23)`  `1` ga qaytadi.

Ba'zi (juda eskirgan) JavaScript enginelarida `Math.trunc` funksiyasi mavjud emas, shuning uchun bunday kod ishlamaydi. 

Gap sintaksis o‘zgarishlari emas, balki yangi funksiyalar haqida ketayotgan ekan, bu yerda biror narsani tranpile qilishning hojati yo'q. Biz faqat yetishmayotgan funktsiyani e'lon qilishimiz kerak.

Yangi funksiyalr qo'shadigan va ularni yangilaydigan script "polyfill" deb ataladi. U bo'shliqni "to'ldiradi" va yetishmayotkan amallarni qo'shadi. 

Aynan bu holat uchun,  `Math.trunc` uchun polyfill uni amalga oshiradigan scriptdair, quyidagi kabi:

```js
if (!Math.trunc) { // agar bunday funksiya bo'lmasa
  // uni amalga oshiradi
  Math.trunc = function(number) {
    // Math.ceil va Math.floor exist xatto qadimgi JavaScript enginelarida ham mavjud
    // Ular qo'llanmada keyinroq o'rganib chiqiladi
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript juda o'zgaruvchan til hisoblanadi, scriptlar istalgan funksiyani qo'shishi/o'zgartirishi mumkin, xatto ichki funksiyalarni ham. 

Polyfillning ikkita qiziqarli kutubxonsi: 
- [core js](https://github.com/zloirock/core-js) ko'p narsani qo'llab-quvvatlaydi, faqat kerakli xususiyatlarni kiritish imkonini beradi.
- [polyfill.io](http://polyfill.io) xususiyatlar va foydalanuvchi brauzeriga qarab, polifill ga ega skript bilan ta'minlaydigan xizmat.
JavaScript is a highly dynamic language. Scripts may add/modify any function, even built-in ones.

Two interesting polyfill libraries are:
- [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
- [polyfill.io](https://polyfill.io/) service that provides a script with polyfills, depending on the features and user's browser.


## Xulosa

Bu bo'limda sizni zamonaviy va xatto eng so'nggi til xususiyatlarini o'rganishingizga undaymiz, agar ular hali JavaScript enginelari tomonidan qo'llab quvvatlanmasa ham. 

Transpiler dan foydalanish yodingizdan chiqmasin (agar zamonaviy sintaksis yoki operatorlar ishlatilsangiz) va polyfillardan (yetishmayotkan funksiyalarni qo'shish uchun). Bular kod ishlashini kafolatlaydi. 

Masalan, keyinroq JavaScript bilan tanishib chiqqaningizda, siz kod qurish tizimini [webpack](https://webpack.js.org/)ga asoslangan holda [babel-loader](https://github.com/babel/babel-loader) plugini bilan tashkil etishingiz mumkin bo'ladi. 
Just don't forget to use a transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). They'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](https://webpack.js.org/) with the [babel-loader](https://github.com/babel/babel-loader) plugin.

Turli funktsiyalarni qo'llab-quvvatlovini hozirgi holatini ko'rsatadigan yaxshi manbalar:
- <https://kangax.github.io/compat-table/es6/> -faqat JavaScript uchun.
- <https://caniuse.com/> - brauzerga oid funksiyalar uchun.

P.S. Google Chrome odatda til funksiyalari bo'yicha eng soʻnggisi hisoblanadi, agar oʻquv qoʻllanma versiyasi muvaffaqiyatsiz boʻlsa, uni sinab koʻring. Ko'pgina o'quv versiyalari har qanday zamonaviy brauzer bilan ishlaydi.
