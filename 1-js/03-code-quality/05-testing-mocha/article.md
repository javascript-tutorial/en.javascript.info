# Mocha bilan avtomatik tekshiruv

Avtomatik tekshiruv qo'shimcha topshiriqlarda va haqiqiy loyihalarda keng ishlatiladi. 

## Nima uchun bizga testlar kerak?

Funksiya yozganimizda, uni nima ish bajarish kerakligini tasavvur qilamiz: qaysi parametrlar qaysi natijalarni beradi.

Dasturlash davomida, biz funksiyani ishga tushirish va uning natijasini kutilgan natija bilan taqqoslash orqali tekshira olamiz. Masalan, bu ishni konsolda qilsa bo'ladi. 

Agar biror joyda xatolik mavjud bo'lsa -- u holda kodni to'g'rlaymiz, natijani tekshiramiz -- va ishlaguncha shu kabi davom etamiz. 

Lekin bu kabi qo'l bilan boshqariladigan "qayyatadan ishga tushirish" mukammal emas. 

**Kodni qo'lda qayta ishga tushirayotkada, biror narsani o'tkazib yuborish oson.** 

Misol uchun, biz `f` funksiyasini yaratyapmiz. Bir nechta kodlar yozildi, tekishirish. `f(1)` ishlayapti, `f(2)` ishlamadi. Kodni to'g'irlaymiz va `f(2)` endi ishlaydi. Tugallanganday tuyilyaptimi? Biz `f(1)`ni qayta tekshirishni unuttik. Bu narsa xatolikka olib kelishi mumkin.   

Bu juda oddiy hol. Biz biror narsani dasturlaganimizda, juda ko'p foydalanilish ehtimoli bor narsalarni miydada saqlab turamiz. Lekin har o'zgarishdan keyin, dasturchi uchun har birini qo'lda tekshirib chiqish juda qiyin. Shuning uchun, birini tuzatib, ikkinchisini buzish qo'yish juda oson. 

**Avtomatik tekshirish deganda testalar kodga qo'shimcha tarzda alohida-alohida yoziladi. Ular funksiyalarnimizni har xil yo'llarda ishga tushiradi va natijani kutilgan natija bilan taqqoslaydi.** 

## Xulq-atvorga asoslangan dastur (BDD)

Keling [Behavior Driven Development](http://en.wikipedia.org/wiki/Behavior-driven_development) deb nomlangan yoki qisqa qilib aytganda BDD amaliy uslubi bilan boshlaymiz.

**BDD bu uchta narsa bittada: testlar, qo'llanma va misollar**

BDD ni tushinib olish uchun dasturlashning amaliy jarayonini tekshirib chiqamiz.

## "pow" dasturlanishi: qo'llanma

Deylik, `pow(x, n)` nomli funksiya yaratmoqchimiz, u `x`ni buton son ta'siriga ega `n`ga ko'taradi. Uni `n≥0`ga asoslaymiz. Bu mashq shunchaki bir misol: JavaScriptda `**` operatori mavjud va u bu ishni qila oladi, ammo hozir murakkabroq topshiriqlarga ham ishlatilishi mumkin bo'lgan dasturchi oqimiga e'tiborimizni qaratamiz. 

`pow`kodini yaratishdan avval, funksiya nima qilishi va nimani tasvirlashi haqida tasavur qilishimiz mumkin. 

Bunday tavsif *specification* yoki qisqa qilib spec deb nomlanadi, va u foydalanish holatlari tavsiflari bilan birga ular uchun testlarni o'z ichiga oladi, misol uchun:

```js
describe("pow", function() {

  it("raises to n-th power", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```

Spetsifikatsiyada yuqorida ko'rishingiz mumkin bo'lgan uchta asosiy qurilish bloki bor:

`describe("title", function() { ... })`
: Qanday funksiyani tasvirlayabmiz. Hozirgi holatimizda, `pow`funksiyasini tasvirlayabmiz. "ishchilar"ni guruhlashda foydalaniladi -- `it` bloklari.
: What functionality we're describing? In our case we're describing the function `pow`. Used to group "workers" -- the `it` blocks.

`it("foydalanish holati tavsifi", funksiya() { ... })`
: `it` sarlavhasida, *odam o'qiy oladigan tarzda* ma'lum bir foydalanish holatini tavsiflaymiz, va ikkinchi argument buni tekshiruvchi funksiya hisoblanadi. 

`assert.equal(value1, value2)`
: Agar amal to'g'ri bo'lsa, `it` blogi ichidagi kod xatolarsiz ishga tushishi kerak. 

    `assert.*` funksiyalari `pow` ni kutilganidek ishlashi yoki ishlamasligini tekshirishda foydalaniladi. Bu yerning o'zidayoq, ulardan biri -- `assert.equal`dan foydalanyapmiz, u argumentlarni taqqoslaydi va agar ular teng bo'lmasa, xatolik beradi. Bu yerda u `pow(2, 3)` teng `8` ning natijasini tekshiradi. Boshqa taqqoslash va teshirish turlari ham mavjud, biz ularni keyinroq qo'shamiz.    

Spesififikatsiya amalga oshirilishi mumkin, va `it` blogida ko'rsatilgan testni ishga tushiradi. Buni keyiroq ko'rib chiqamiz. 

## Dastur oqimi

Dastur oqimi quyidagiga o'xshash ko'rinishda bo'ladi:

1. Dastlabki spesifikatsiya eng asosiy funsiyalarga moslangan testlar bilan birgalikda yoziladi.
2. Dastlabki amal yaratiladi. 
3. Uni ishlash yoki ishlamasligini tekshirish uchun, biz test tizimini ishga tushiramiz [Mocha](http://mochajs.org/) (tavsilotlar bilan keyirnoq). Funktsionallik tugallanmagan bo'lsa-da, xatolar ko'rsatiladi. Biz hamma narsa ishlamaguncha tuzatishlar kiritamiz.
4. Hozir bizda ishlab turgan testlaarga ega dastlabki amal bor.
5. Spesifikatsiyaga ko'proq foydalanish holatlarini kiritamiz, hali amallar tomonidan qo'llab quvvatlanmasligi mumkin. Testlar muvofaqiyatsiz bo'la boshlaydi. 
6. 3 ga o'tiladi, testlar to'g'ri bermaguncha dasturni yangilanadi. 
7. Funksiya tayyor bo'lgunga qadar 3-6-bosqichlarni takrorlanadi.
1. An initial spec is written, with tests for the most basic functionality.
2. An initial implementation is created.
3. To check whether it works, we run the testing framework [Mocha](https://mochajs.org/) (more details soon) that runs the spec. While the functionality is not complete, errors are displayed. We make corrections until everything works.
4. Now we have a working initial implementation with tests.
5. We add more use cases to the spec, probably not yet supported by the implementations. Tests start to fail.
6. Go to 3, update the implementation till tests give no errors.
7. Repeat steps 3-6 till the functionality is ready.

Demak, rivojlanish *interativ* hisoblanadi. Spesifikatsiyani yozamiz, uni amalga oshiramiz, testlar o'tkaniga ishonch hosil qilamiz, keyin ko'prroq testlar kiritamiz, ular ishlashiga ishonch hosil qilamiz va shu kabi. 

Keling, ushbu rivojlanish oqimini amaliy misolda ham ko'rib chiqamiz.

Birinchi qadam allaqachon tugallangan: Bizda `pow` uchun dastlabki spesifikatsiya mavjud. Amalni bajarishdan avval, testlarni ishga tushirish uchun bir nechta JavaScript kutunxonalaridan foydalanmiz, bu shunchaki ular ishlayotkanini tekshirish uchun (Ular barchasi muvoffaqiyatsiz bo'ladi). 
The first step is already complete: we have an initial spec for `pow`. Now, before making the implementation, let's use a few JavaScript libraries to run the tests, just to see that they are working (they will all fail).

## Harakatdagi spesifikatsiya  

Bu yerda, o'quv qo'llanmada biz testlar uchun quyidagi JavaScript kutubxonalaridan foydalanamiz:

- [Mocha](http://mochajs.org/) -- asosiy (o'zak) tamoyil: u asosiy test funksiyalari, jumladan `describe` (tasvirlash) va `it` (u) kabi, va shuningdek testlarni ishga tushiradigan funksiyalarni taqdim etadi.  
- [Chai](http://chaijs.com) -- ko'p tasdiqlarga ega kutubxona. Bu ko'plab turli xil tasdiqlardan foydalanish imkonini beradi, hozircha faqat `assert.equal` kerak. 
- [Sinon](http://sinonjs.org/) --  Funksiyalar ustidan tekshirish, ichki funksiyalarga taqlid qilish va boshqalarda ishlatiladigan kutubxona, bu ancha keyin kerak bo'ladi.  
- [Mocha](https://mochajs.org/) -- the core framework: it provides common testing functions including `describe` and `it` and the main function that runs tests.
- [Chai](https://www.chaijs.com/) -- the library with many assertions. It allows to use a lot of different assertions, for now we need only `assert.equal`.
- [Sinon](https://sinonjs.org/) -- a library to spy over functions, emulate built-in functions and more, we'll need it much later.

Ushbu kutubxonalar brauzerga ham, server tomonidagi testlar uchun ham mos. Bu yerda brauzer variantini ko'rib chiqamiz.

Ushbu frameworklar va `pow` xususiyatlariga ega to'liq HTML sahifasi:

```html src="index.html"
```

Sahifani beshta qismga ajratish mumkin:

1. `<head>` -- testlar uchun uchinchi tomon kutubxonalari va uslublarini qo'shing.
2. `<script>` test qilish funksiyasi bilan, bizning holatlatimizda -- `pow` uchun kod bilan. 
3. testlar -- bizning holatlatimizda, yuqoridan `describe("pow", ...)` ga ega bo'lgan tashqi `test.js` skripti.
4. `<div id="mocha">` HTML elementi Mocha tomonidan natijalarni chiqarishda ishlatiladi.
5. Sinovlar `mocha.run()` buyrug'i bilan boshlanadi. 

Natja:

[iframe height=250 src="pow-1" border=1 edit]

Hozirda test muvaffaqiyatsiz bo'ladi, xatolik mavjud. Bu mantiqan to'g'ri: Bizda `pow`da bo'sh funksiyalik kod bor, shu tufayli, `pow(2,3)` `8` bo'lish o'rniga `undefined` (aniqlanmagan)ga qaytib keladi. 

Shuni ta'kidlab o'tish kerak-ki, [karma](https://karma-runner.github.io/) va boshqalar kabi ko'proq yuqori darajadagi test ishtirokchilari mavjud bo'lib, ular turli xil testlarni avtomatik ravishda bajarishni osonlashtiradi.

## Dastlabki amalga oshirish

Keling, sinovlardan o'tish uchun oddiy "pow" ni amalga oshiramiz:

```js
function pow(x, n) {
  return 8; // :) we cheat!
}
```

Qoyil, hozir ishlayapti!

[iframe height=250 src="pow-min" border=1 edit]

## spesifikatsiyani yaxshilash

Biz qilgan ish albatta aldash hisoblanadi. Funktsiya ishlamaydi: `pow(3,4)` ni hisoblashga urinish noto'g'ri natija beradi, ammo testlar o'tadi.

...Ammo bu odatiy holat, amalda sodir bo'lib turadi. Testlar o'tadi, lekin funksiya noto'g'ri ishlaydi. Bizning spetsifikatsiyamiz nomukammal. Biz unga ko'proq foydalanish holatlarini qo'shishimiz kerak.

Keling, `pow(3, 4) = 81`ni tekshirish uchun yana bitta test qo'shamiz.

Bu yerda testni tashkillashtirish uchun ikkita usuldan birini tanlashimiz mumkin:

1. Birinchi uslub -- bir xil `it`ning ichiga yana bitta `assert` qo'shing:

    ```js
    describe("pow", function() {

      it("raises to n-th power", function() {
        assert.equal(pow(2, 3), 8);
    *!*
        assert.equal(pow(3, 4), 81);
    */!*
      });

    });
    ```
2. Ikkinchisi -- ikkita test tuzing:

    ```js
    describe("pow", function() {

      it("2 raised to power 3 is 8", function() {
        assert.equal(pow(2, 3), 8);
      });

      it("3 raised to power 4 is 81", function() {
        assert.equal(pow(3, 4), 81);
      });

    });
    ```

Asosiy farq shundaki, `assert` xatoni keltirib chiqarganda, `it` bloki darhol yakunlanadi. Shunday uchun, birinchi variantda birinchi `assert` muvaffaqiyatsiz bo'lsa, ikkinchi `assert` natijasini hech qachon ko'rma olmaymiz.

Nima sodir bo'layotkani haqida ko'proq ma'lumot olish uchun testlarni alohida-alohdia tuzish foydaliroq, shu tufayli ikkinchi uslub yaxshiroq. 

Va bundan tashqari, amal qilish kerak bo'gan yana bitta qoida bor.

**Bitta test bitta narsani tekshiradi.**

Agar testga qaraganimizda ikkita mustaqil tekshiruv ko'rsak, ularni soddaroq ikkita qismga ajratib olish yaxshi fikr. 
Shunday qilib ikkinchi uslub bilan davom etamiz. 

Natija:

[iframe height=250 src="pow-2" edit border="1"]

Kutganimizdek, ikkinchi sinov muvaffaqiyatsiz tugadi. Albatta, funktsiyamiz har doim "8" ni qaytaradi, "assert" esa "81" ni kutadi.

## Amalga oshirishni takomillashtirish

Testlardan o'tish uchun keling, haqiqiyroq narsa yozab ko'ramiz:
```js
funksiya pow(x, n) {
  natijani berish = 1;

  for (let i = 0; i < n; i++) {
    natija *= x;
  }

  natijani qaytarish;
}
```

Funksiya yaxshi ishlashiga ishonch hosil qilish uchun, uni ko'proq qiymatlar bilan tekshirib ko'ramiz. `it` bloklarini qo'lda yozish o'rniga, biz ularni `for` da yaratishimiz mumkin:  

```js
describe("pow", function() {

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} in the power 3 is ${expected}`, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }

});
```

Natija:

[iframe height=250 src="pow-3" edit border="1"]

## Ichki tavsif

Yanada ko'proq testlar qo'shmoqchimiz. Ammo bundan oldin, yordamchi funksiya `maketest` va `for` lar birglikda gruppalashgan bo'lishi kerak. Bizga `makeTest` boshqa testlarda kerak bo'lmaydi, u faqat `for` uchun kerak bo'ladi holos: Ularning umumiy vazifasi "pow"ning berilgan quvvatga qanday ko'tarilishini tekshirishdir. 

Gruppalash ichki `describe`  bilan qilinadi:

```js
describe("pow", function() {

*!*
  describe("raises x to power 3", function() {
*/!*

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} in the power 3 is ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

*!*
  });
*/!*

  // ... Amal qilish kerak bo'lgan ko'proq testlar, ikkisi ham tavsiflaydi, va qo'shilishi mumkin
});
```

Ichki `describe` (ta'riflsh) testlarning yangi "kichik guruhini" belgilaydi. Chiqishda biz sarlavhali chiziqni ko'rishimiz mumkin:

[iframe height=250 src="pow-4" edit border="1"]

Kelajakda, o'zlarinining yordamchi funksiyalari bilan yuqori darajaga ko'proq `it` va `describe` qo'shishimiz mumkin, ular `maketest`ni ko'rmaydi.

````smart header="`before/after (avval/keyin)` va `beforeeach/aftereach` (har biridan oldin/har biridan keyin)"
Biz before/after testlarni amalga oshiruvchi `before/after` funksiyalarnini o'rnatishimiz mumin, va shuningdek before/after *har bir* `it` ni amalga oshiruvchi  `beforeEach/afterEach` funksiyalari ham. 

Misol uchun:

```js no-beautify
describe("test", function() {

  before(() => alert("Test boshkandi– barhcha testlardan oldin"));
  after(() => alert("Test yakunlandi – barcha testlardan keyin"));

  beforeEach(() => alert("Testdan odin – testni kiriting"));
  afterEach(() => alert("Testdan keyin – testdn chiqing"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
```

Ishlash ketma-ketligi:

```
Test boshlandi - barcha testlardan oldin (oldin)
Testdan oldin – test kiriting (har biridan oldin)
1
Testdan keyin – testdan chiqing   (har biridan keyin)
Testdan avval – test kiriting (har biridan oldin)
2
testdan keyin – testdan chiqing   (har biridan keyin)
Test tugadi – barcha testlardan keyin (keyin)
```

[tahrirlash src="beforeafter" title="sandboxdagi misolni oching."]

Odatda, `beforeEach/afterEach` va `before/after`lar ishga tushirishni bajaradi, hisoblagichlarni nolga aylantiradi yoki testlar (yoki test guruhlari) o'rtasida boshqa biror narsa qiladi.
````

## Spetsifikatsiyani kengaytirish

`pow` ning asosiy funksionalligi tugallangan. Dasturning birinchi iteratsiyasi amalga oshiriladi. Bayramni nishonlash va shampan ichishni tugatgandan so'ng -- keling, uni takomillashtiraylik.

Aytilganidek, `pow(x, n)` funksiyasi `n` ijobiy butun son qiymatlari bilan ishlashga mo'ljallangan  

Xatolarni  ko'rsatish uchun, JavaScript funksiyalari odatda `NaN`ga qaytadi. Keling, `n` ning haqiqiy bo'lmagan qiymatlari uchun ham shu ishni qilamiz. 

Keling, birinchi navbatda xatti-harakatni spetsifikatsiyaga qo'shamiz(!):

```js
tasvirlash("pow", funksiya() {

  // ...

  it("salbiy n uchun natija NaN", funksiya() {
*!*
    assert.isNaN(pow(2, -1));
*/!*
  });

  it("butun bo'lmagan n uchun natija NaN", funktsiya() {
*!*
    assert.isNaN(pow(2, 1.5));    
*/!*
  });

});
```

Yangi testlar bilan natija:

[iframe height=530 src="pow-nan" edit border="1"]

Yangi qo'shilgan testlar muvaffaqiyatsiz bo'ladi, chunki bizning amallar ularni qo'llab-quvvatlamaydi. Bu BDDni qanday bajarilishi: dastlab muvaffaqiyatsiz bo'layotkan testlarni yozamiz, va ular uchun amallar tuzamiz. 

```smart header="Other assertions"
Shunga e'tibor bering `assert.isNaN` tasdiqlashi: U `NaN`ni tekshiradi.

Shuningdek boshqa tasdiqlar ham bor [Chai](http://chaijs.com), masalan:

- `assert.equal(qiymat1, qiymat2)` -- tenglikni tekshiradi  `qiymat1 == qiymat2`.
- `assert.strictEqual(qiymat1, qiymat)` -- qat'iy tenglikni tekshiradi `qiymat1 === qiymat2`.
- `assert.notEqual`, `assert.notStrictEqual` -- yuqoridagilarga teskari tekshiruvlar.
- `assert.isTrue(value)` -- shuni tekshiradi `qiymat === to'g'ri`
- `assert.isFalse(value)` -- shuni tekshiradi `qiymat === noto'g'ti`
- ...to'liq ro'yxat [docs](http://chaijs.com/api/assert/) da
There are other assertions in [Chai](https://www.chaijs.com/) as well, for instance:

- `assert.equal(value1, value2)` -- checks the equality  `value1 == value2`.
- `assert.strictEqual(value1, value2)` -- checks the strict equality `value1 === value2`.
- `assert.notEqual`, `assert.notStrictEqual` -- inverse checks to the ones above.
- `assert.isTrue(value)` -- checks that `value === true`
- `assert.isFalse(value)` -- checks that `value === false`
- ...the full list is in the [docs](https://www.chaijs.com/api/assert/)
```

Shunday qilib, "pow" ga bir nechta qator qo'shishimiz kerak:

```js
funksiya pow(x, n) {
*!*
  agar (n < 0) NaN ga qaytsa ;
  agar (Math.round(n) != n) NaN ga qaytsa;
*/!*

  natija bersin = 1;

  (let i = 0; i < n; i++) uchun {
    natija *= x;
  }

  natijani qaytarish;
}
```

Endi ishlaydi, barcha testlar o'tadi:

[iframe height=300 src="pow-full" chegarani tahrirlash="1"]

[tahrirlash src="pow-full" title="Sandboxda to'liq yakuniy misolni oching."]

## Xulosa

BDD da birinchi bo'lib spetsifikatsiya, so'ngra amalga oshirish keladi. Oxirida bizda spetsifikatsiya ham kod ham mavjud.

Spetsifikatsiyadan uchta usulda foydalanish mumkin:

1. **Testlar** sifatida -- ular kodning to'g'ri ishlashini kafolatlaydi.
2. **Doclar** sifatida -- `describe` va `it` sarlavhalari funksiya nima qilishini bildiradi.
3. **Misollar** sifatida -- testlar aslida funktsiyadan qanday foydalanish mumkinligini ko'rsatadigan ishlaydigan misollardir.

Spetsifikatsiya yordamida biz funktsiyani noldan xavfsiz tarzda yaxshilashimiz, o'zgartirishimiz, hatto qayta yozishimiz va uning to'g'ri ishlashiga ishonch hosil qilishimiz mumkin.

Bu ayniqsa katta loyihalarda, funksiya ko'p ishlatiladigan joylarda juda muhim. Bunday funktsiyani o'zgartirganimizda, uni ishlatadigan har bir joy hali ham to'g'ri ishlayotganligini qo'lda tekshirishning iloji yo'q.

Testlarsiz odamlarning ikkita yo'li bor:

1. Nima bo'lishdan qat'iy nazar o'zgartirishni amalga oshirish. Shunda foydalanuvchilarimiz nuqsonlarga duch keladi, chunki biz katta ehtimol bilan biror narsani qo'lda tekshirishda muvaffaqiyatsizlikka uchraymiz. 
2. Yoki xatolar uchun jazo qattiq bo'lsa, testlar bo'lmasa, odamlar bunday funktsiyalarni o'zgartirishdan qo'rqishadi va keyin kod eskirib qoladi, hech kim unga kirishni xohlamaydi. Dasturlash uchun yaxshi emas.

**Avtomatik tekshiruv bu muammolarni oldini olishga yordam beradi!**

Agar loyiha testlar bilan qoplangan bo'lsa, unda bunday muammo bo'lmaydi. Har qanday o'zgarishlardan so'ng biz testlarni o'tkazishimiz va bir necha soniya ichida amalga oshirilgan ko'plab tekshiruvlarni ko'rishimiz mumkin.

**Bundan tashqari, yaxshi sinovdan o'tgan kod yaxshiroq arxitekturaga ega.**

Tabiiyki, buning sababi, avtomatik sinovdan o'tgan kodni o'zgartirish va yaxshilash osonroq. Lekin yana bir sabab ham bor.

Sinovlarni yozish uchun kod shunday tashkil etilishi kerakki, har bir funktsiya aniq tavsiflangan vazifaga, aniq belgilangan kirish va chiqishga ega bo'lishi kerak. Bu boshidan yaxshi arxitektura degannidir.

Haqiqiy hayotda bu ba'zan unchalik oson emas. Ba'zan haqiqiy koddan oldin spetsifikatsiyani yozish qiyin, chunki u qanday harakat qilish kerakligi hali aniq emas. Ammo ,umumiy olib qaraganda, yozish testlari dasturlshni tezroq va barqaror qiladi.

Keyinchalik o'quv qo'llanmasida siz ichki tayyor testlar bilan ko'plab vazifalarni bajarasiz. Bu degani, ko'proq amaliy misollarni ko'rasiz.

Testlari yozish yaxshi JavaScript bilimini talab qiladi. Ammo biz buni endigina o'rganishni boshlayapmiz. Shunday qilib, hamma narsani hal qilish uchun hozir sizdan testlar yozishingiz shart emas, lekin ular ushbu bobdagidan biroz murakkabroq bo'lsa ham ularni allaqachon o'qiy olishingiz kerak.
