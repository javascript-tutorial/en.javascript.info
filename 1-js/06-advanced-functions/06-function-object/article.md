
# Function object, NFE

Biz bilganimizdek, JavaScriptdagi funksiya qiymatdir.

JavaScriptdagi har bir qiymat o'z turiga ega. Funktsiya qanday turga kiradi?

JavaScriptda funksiyalar ob'ektlardir.

Funktsiyalarni tasavvur qilishning yaxshi usuli - bu chaqiriladigan "harakat ob'ektlari". Biz ularni nafaqat qo'ng'iroq qilishimiz, balki ularni ob'ekt sifatida ham ko'rib chiqishimiz mumkin: xususiyatlarni qo'shish/o'chirish, ma'lumotnoma orqali o'tish va h.k.


## "Name" xususiyati

Funktsiya ob'ektlarida ba'zi foydalanish mumkin bo'lgan xususiyatlar mavjud.

Masalan, funksiya nomiga “name” xususiyati sifatida kirish mumkin:

```js run
function sayHi() {
  alert("Hi");
}

alert(sayHi.name); // sayHi
```

Qanday kulgili, nom berish mantiqi aqlli. Shuningdek, u funksiyasiz yaratilgan bo'lsa ham, unga to'g'ri nom beradi va keyin darhol tayinlanadi:

```js run
let sayHi = function() {
  alert("Hi");
};

alert(sayHi.name); // sayHi (name bor!)
```

Agar topshiriq standart qiymat orqali bajarilsa, u ham ishlaydi:

```js run
function f(sayHi = function() {}) {
  alert(sayHi.name); // sayHi (ishladi!)
}

f();
```

Spetsifikatsiyada bu xususiyat "kontekstli nom" deb ataladi. Agar funktsiya bittasini ta'minlamasa, u holda topshiriqda kontekstdan aniqlanadi.

Ob'ekt metodlarining ham nomlari bor:

```js run
let user = {

  sayHi() {
    // ...
  },

  sayBye: function() {
    // ...
  }

}

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye
```

Hech qanday sehr yo'q. To'g'ri ismni aniqlashning iloji bo'lmagan holatlar mavjud. Bunday holda, name xususiyati bo'sh bo'ladi, masalan:

```js run
// massiv ichida yaratilgan funksiya
let arr = [function() {}];

alert( arr[0].name ); // <bo'sh string>
// to'g'ri nomni o'rnatish uchun hech qanday yo'l yo'q
```

Biroq, amalda ko'pchilik funktsiyalarning nomi bor.

## "length" xususiyati

Funksiya parametrlari sonini qaytaradigan yana bir o'rnatilgan xususiyat "length" mavjud, masalan:

```js run
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```

Bu yerda biz rest parametrlari hisobga olinmasligini ko'rishimiz mumkin.

`Length` xususiyati baʼzan boshqa funksiyalarda ishlaydigan funksiyalarda [introspection](https://en.wikipedia.org/wiki/Type_introspection) uchun ishlatiladi.

Masalan, quyidagi kodda `ask` funksiyasi so'rash uchun `question`ni va chaqirish uchun ixtiyoriy sonli `handler` funksiyalarini qabul qiladi.

Foydalanuvchi o'z javobini bergandan so'ng, funktsiya ishlov beruvchilarni chaqiradi. Biz ikki turdagi ishlov beruvchilarni o'tkazishimiz mumkin:

- Nol argumentli funksiya, u faqat foydalanuvchi ijobiy javob berganida chaqiriladi.
- Ikkala holatda ham chaqiriladigan va javob qaytaradigan argumentli funksiya.

`handler` ni to'g'ri chaqirish uchun `handler.length` xususiyatini tekshiramiz.

Fikr shundan iboratki, bizda ijobiy holatlar uchun oddiy, argumentsiz handler sintaksisi mavjud (eng tez-tez uchraydigan variant), lekin universal ishlov beruvchilarni ham qo'llab-quvvatlashga qodir:

```js run
function ask(question, ...handlers) {
  let isYes = confirm(question);

  for(let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }

}

// ijobiy javob uchun ikkala handler ham chaqiriladi
// salbiy javob uchun, faqat ikkinchisi
ask("Question?", () => alert('You said yes'), result => alert(result));
```

Bu [polymorphism] (https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) deb ataladigan alohida holat -- argumentlarni ularning turiga qarab har xil ko'rib chiqish yoki bizning holatlarimizda `length` ga qarab. Ushbu g'oya JavaScript kutubxonalarida qo'llaniladi.

## Maxsus xususiyatlar

Shuningdek, biz o'z xususiyatlarini qo'shishimiz mumkin.

Bu yerda biz umumiy qo'ng'iroqlar sonini kuzatish uchun `counter` xususiyatini qo'shamiz:

```js run
function sayHi() {
  alert("Hi");

  *!*
  // necha marta ishga tushirganimizni hisoblaylik
  sayHi.counter++;
  */!*
}
sayHi.counter = 0; // boshlang'ich qiymati

sayHi(); // Hi
sayHi(); // Hi

alert( `Called ${sayHi.counter} times` ); // 2 marta chaqirildi
```
``warn header="Xususiyat o'zgaruvchi emas"
`sayHi.counter = 0` kabi funksiyaga tayinlangan xususiyat uning ichidagi `counter` mahalliy o'zgaruvchini *aniqlamaydi*. Boshqacha qilib aytganda, `counter` xususiyati va `let counter` o‘zgaruvchisi bir-biriga bog‘liq bo‘lmagan ikkita narsadir.

Biz funktsiyani ob'ekt sifatida ko'rib chiqishimiz, undagi xususiyatlarni saqlashimiz mumkin, ammo bu uning bajarilishiga ta'sir qilmaydi. O'zgaruvchilar funksiya xossalari emas va aksincha. Bu shunchaki parallel dunyolar.
`

Funktsiya xususiyatlari ba'zan yopishlarni almashtirishi mumkin. Masalan, funktsiya xususiyatidan foydalanish uchun <info:closure> bobidagi hisoblagich funksiyasi misolini qayta yozishimiz mumkin:
``
````js run
function makeCounter() {
  // instead of:
  // let count = 0

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
````

Endi `count` funksiyaning tashqi leksik muhitida emas, balki bevosita funksiyada saqlanadi.

Closuredan ko'ra yaxshiroqmi yoki yomonmi?

Asosiy farq shundaki, agar "count" qiymati tashqi o'zgaruvchida yashasa, tashqi kod unga kira olmaydi. Faqat icha-ich funktsiyalar uni o'zgartirishi mumkin. Va agar u funktsiyaga bog'langan bo'lsa, unda bunday narsa mumkin:

```js run
function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

*!*
counter.count = 10;
alert( counter() ); // 10
*/!*
```

Shunday qilib, amalga oshirishni tanlash bizning maqsadlarimizga bog'liq.

## Nomlangan function expression

Nomlangan function expression yoki NFE - bu nomga ega bo'lgan funksiya ifodalari uchun atama.

Masalan, oddiy funktsiya ifodasini olaylik:

```js
let sayHi = function(who) {
  alert(`Hello, ${who}`);
};
```

Va unga nom qo'shamiz:

```js
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};
```

Biz bu yerda biror narsaga erishdikmi? Ushbu qo'shimcha `"func"` nomidan maqsad nima?

Avval shuni ta'kidlaymizki, bizda hali ham Function Expression mavjud. `function` dan keyin `"func"` nomini qo'shish uni Funktsiya deklaratsiyasiga aylantirmadi, chunki u hali ham topshiriq ifodasining bir qismi sifatida yaratilgan.

Bunday nomni qo'shish ham hech narsani buzmadi.

Funktsiya hali ham `sayHi()` sifatida mavjud:

```js run
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};

sayHi("John"); // Hello, John
```

`func` nomi bilan bog'liq ikkita o'ziga xos narsa bor, bu uning sabablari:

1. Bu funktsiyaga o'ziga ichki havola qilish imkonini beradi.
2. Funktsiyadan tashqarida ko'rinmaydi.

Masalan, quyida keltirilgan `sayHi` funksiyasi `who` ko‘rsatilmagan bo‘lsa, `Guest` bilan yana o‘zini chaqiradi:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // o'zini qayta chaqirish uchun func dan foydalaning
*/!*
  }
};

sayHi(); // Hello, Guest

// Lekin bu ishlamaydi:
func(); // Error, func is not defined (funktsiyadan tashqarida ko'rinmaydi)
```

Nima uchun biz `func` dan foydalanamiz? Balki ichki chaqiruv uchun `sayHi` dan foydalaning?

Aslida, ko'p hollarda quyidagicha bajarishimiz mumkin:

```js
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest");
*/!*
  }
};
```

Ushbu kod bilan bog'liq muammo shundaki, `sayHi` tashqi kodda o'zgarishi mumkin. Agar funktsiya o'rniga boshqa o'zgaruvchiga tayinlansa, kod xatoliklarni bera boshlaydi:

```js run
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest"); // Error: sayHi is not a function
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Error, ichma-ich sayHi qo'ng'irog'i endi ishlamaydi!
```

Buning sababi, funktsiya `sayHi` ni tashqi leksik muhitdan oladi. Mahalliy `sayHi` yo'q, shuning uchun tashqi o'zgaruvchi ishlatiladi. Va qo'ng'iroq paytida tashqi `sayHi` `null` hisoblanadi.

Funktsiya ifodasiga qo'yishimiz mumkin bo'lgan ixtiyoriy nom aynan shu turdagi muammolarni hal qilish uchun mo'ljallangan.

Kodimizni tuzatish uchun foydalanamiz:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // Endi hammasi yaxshi
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest (ichma-ich qo'ng'iroq ishlaydi)
```

Endi ishlaydi, chunki `"func"` nomi funktsiya-lokaldir. U tashqaridan olinmaydi (va u yerda ko'rinmaydi). Spetsifikatsiya har doim joriy funktsiyaga murojaat qilishini kafolatlaydi.

Tashqi kodda hali ham `sayHi` yoki `welcome` o'zgaruvchisi mavjud. Va `func` bu "ichki funktsiya nomi" bo'lib, funktsiya o'zini ishonchli tarzda chaqirishi mumkin.

```smart header="Funktsiya deklaratsiyasi uchun bunday narsa yo'q"
Bu yerda tasvirlangan “ichki nom” funksiyasi funksiya deklaratsiyasi uchun emas, faqat Funktsiya ifodalari uchun mavjud. Funktsiya deklaratsiyasida "ichki" nom qo'shish uchun sintaksis mavjud emas.

Ba'zan, bizga ishonchli ichki nom kerak bo'lganda, bu funktsiya deklaratsiyasini Nomlangan funktsiya ifodasi shakliga qayta yozish uchun sabab bo'ladi.
```

## Xulosa

Funktsiyalar ob'ektlardir.

Bu yerda biz ularning xususiyatlarini ko'rib chiqdik:

- `name` -- funksiya nomi. Odatda funksiya taʼrifidan olinadi, lekin agar yoʻq boʻlsa, JavaScript uni kontekstdan (masalan, topshiriq) taxmin qilishga harakat qiladi.
- `length` -- funksiya ta'rifidagi argumentlar soni. Dam olish parametrlari hisobga olinmaydi.

Agar funktsiya Function Expression sifatida e'lon qilingan bo'lsa (asosiy kod oqimida emas) va u nomga ega bo'lsa, u Nomlangan Funktsiya ifodasi deb ataladi. Ism o'ziga havola qilish uchun, rekursiv chaqiruvlar yoki shunga o'xshashlar uchun ishlatilishi mumkin.

Bundan tashqari, funktsiyalar qo'shimcha xususiyatlarga ega bo'lishi mumkin. Ko'pgina taniqli JavaScript kutubxonalari bu xususiyatdan juda yaxshi foydalanadi.

Ular "asosiy" funksiyani yaratadilar va unga boshqa ko'plab "yordamchi" funksiyalarni biriktiradilar. Masalan, [jQuery](https://jquery.com) kutubxonasi `$` nomli funktsiyani yaratadi. [lodash](https://lodash.com) kutubxonasi `_` funksiyasini yaratadi va unga `_.clone`, `_.keyBy` va boshqa xususiyatlarni qo`shadi (qarang: [docs](https:/ /lodash.com/docs) ular haqida ko'proq bilmoqchi bo'lganingizda). Aslida, ular buni global makonning ifloslanishini kamaytirish uchun qiladilar, shunda bitta kutubxona faqat bitta global o'zgaruvchini beradi. Bu nomlashdagi ziddiyatlar imkoniyatini kamaytiradi.


Shunday qilib, funktsiya o'z-o'zidan foydali ishni bajarishi mumkin va xususiyatlarda boshqa bir qator funktsiyalarni ham olib yurishi mumkin.
