# Ob'ekt usullari, "this"

Ob'ektlar odatda foydalanuvchilar, buyurtmalar va boshqalar kabi haqiqiy hayotdagi alohida birliklarni ifodalashda yaratiladi:

```js
let user = {
  name: "John",
  age: 30
};
```

Haqiqiy hayotda foydalanuvchi *harakat qila oladi*: savatdan biror narsani tanlash, tizimga kirish, chiqish va h.k.

Amallar JavaScript-da xususiyatlardagi funksiyalari orqaki ifodalanadi.

## Uslublararga misollar

Boshlanishiga, `foydalanuvchi`ga salom aytishni o'rgatamiz:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
user.sayHi = function() {
  alert("Hello!");
};
*/!*

user.sayHi(); // Hello!
```

Bu yerda, funksiya yaratish va uni obyektning `user.sayHi` xususiyatiga belgilash uchun Funktsiya ifodasidan foydalandik.

Endi uni “user.sayHi()” deb atash mumkin. Foydalanuvchi endi gapira oladi!

Ob'ektning xossasi bo'lgan funksiya uning *uslub*i deb ataladi.

Shunday qilib, bizda `foydalanuvchi` obyektining `sayHi` usuli mavjud.

Albatta, oldindan e'lon qilingan funktsiyani usul sifatida ishlatish mumkin, misol uchun:

```js run
let user = {
  // ...
};

*!*
// first, declare
function sayHi() {
  alert("Hello!");
}

// then add as a method
user.sayHi = sayHi;
*/!*

user.sayHi(); // Hello!
```

```smart header="Obyektga yo'naltirilgan dasturlash"
Mustaqil birliklarni ko'rsatish uchun ob'ektlar yordamida kod yozganimizda, bu [obyektga yo'naltirilgan dasturlash](https://en.wikipedia.org/wiki/Object-oriented_programming) deb ataladi, qisqa qilib: "OOP".

OOP - bu katta narsa, va o'ziga xos qiziqarli fandir. To'g'ri birliklarni qanday tanlash mumkin? Ular orasida o'zaro ta'sirini qanday tashkil qilish kerak? Bu arxitektura va bu mavzu bo'yicha bir nechta juda yaxshi kitoblar mavjud, misol uchun "Dizayn tamoyillari": Qayta foydalanish mumkin bo'lgan ob'ektga yo'naltirilgan dasturiy ta'minot elementlari" E. Gamma, R. Helm, R.Johnson, J. Vissides lar tomonidan yoki G. Boochning "Ob'ektga yo'naltirilgan tahlil va ilovalar bilan loyihalash" va boshqalar.
```
### Metodning qisqartmasi

Ob'ekt asl ma'nolaridagi uslublar uchun qisqaroq sintaksis mavjud:

```js
// bu ob'ektlar xuddi shu ishni bajaradi

user = {
  sayHi: function() {
    alert("Hello");
  }
};

// Uslub qisqartmasi yaxshiroq ko'rinyapti, to'g'rimi?
user = {
*!*
  sayHi() { // "sayHi: function(){...}" bilan bir xil
*/!*
    alert("Hello");
  }
};
```

Ko'rsatilgandek, `funksiya` ni tushirib qoldirib, shunchaki `sayHi(` yozishimiz mumkin.

Aslini olganda, yozuvlar tizimi to'liq bir xil emas. Ob'ektni meros qilib olish bilan bog'liq bazi nozik farqlar mavjud (keyinroq muhokama qilinadi), ammo hozircha ular muhim emas. Deyarli barcha hollarda qisqaroq sintaksisga ustunlik beriladi.
To tell the truth, the notations are not fully identical. There are subtle differences related to object inheritance (to be covered later), but for now they do not matter. In almost all cases, the shorter syntax is preferred.



## usullarda "this"

Ob'ekt usuli o'z ishini bajarish uchun ob'ektda saqlangan ma'lumotlarga kirishi kerakligi- bu odatiy holdir.

Masalan, `user.sayHi()` ichidagi kod `foydalanuvchi` nomini talab qilishi mumkin.

**Ob'ektga kirish uchun usul `this` kalit so'zma foydalanishi mumkin.**

T`this` qiymati "nuqtadadan oldin"gi ob'ekt bo'lib, u uslubni chaqirishda ishlatiladi.

Misol uchun:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    // "this" bu "joriy ob'ekt"
    alert(this.name);
*/!*
  }

};

user.sayHi(); // John
```

Bu yerda `user.sayHi()` bajarilayotganda `this` qiymati `user` vazifasini bajaradi.

Aslini olganda, ob'ektga tashqi o'zgaruvchi orqali havola qilish orqali "this"siz ham kirish mumkin:

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(user.name); // "this" o'rniga "user"

*/!*
  }

};
```

...But such code is unreliable. If we decide to copy `user` to another variable, e.g. `admin = user` and overwrite `user` with something else, then it will access the wrong object. ...Ammo bunday kod ishonchsiz. Agar biz `user`ni boshqa o'zgaruvchiga nusxalashni hohlasak, masalan. `admin = user` va `user` ni boshqa biror narsa bilan yozsak, keyin u noto'g'ri ob'ektga kirib qoladi.


Bu quyida ko'rsatilgan:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert( user.name ); // xatoga olib keladi
*/!*
  }

};


let admin = user;
user = null; // narsalarni ravshan qilish uchun ustiga yozing

*!*
admin.sayHi(); // TypeError: nullning "name" xususiyatini o'qib bo'lmaydi
*/!*
```

Agar biz "ogohlantirish" ichida "user.name" o'rniga "thhis.name" dan foydalansak, kod ishlaydi.

## "this" bog'lanmagan

JavaScript da `this` kalit so'zi boshqa dasturlash tillaridan farqli ravishda ishlaydi. U ob'ektning usuli bo'lmasa ham, har qanday funktsiyada ishlatilishi mumkin.


Quyidagi misolda sintaksis xatosi yo'q:

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

`Bu` qiymati kontekstga qarab ish vaqti davomida baholanadi.

Misol uchun, bu yerda bir xil funktsiya ikki xil ob'ektga tayinlangan va chaqiruvlarda har xil "this" mavjud:

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

*!*
// use the same function in two objects
user.f = sayHi;
admin.f = sayHi;
*/!*

// these calls have different this
// "this" inside the function is the object "before the dot"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (dot or square brackets access the method – doesn't matter)
```

Qoida oddiy: agar `obj.f()` chaqirilsa, u holda `f` chaqiruvi paytida `this` `obj` bo'ladi. Shunday qilib, yuqoridagi misolda u yoki `user`yo  `admin`.

````smart header="Calling without an object: `this == aniqlanmagan`"
Funktsiyani ob'ektsiz ham chaqirishimiz mumkin:

```js run
function sayHi() {
  alert(this);
}

sayHi(); // aniqlanmagan
```

Bu holda `this` qat'iy rejimda `aniqlanmagan`. Agar `this.name` ga kirishga harakat qilsak, xatolik yuz beradi.

Qattiq bo'lmagan rejimda "this"ning qiymati *global ob'ekt* bo'ladi. (brauzerdagi `window`, biz unga [](info:global-object) bobida keyinroq kiramiz). Bu tarixiy xatti-harakatlar bo'lib, `"qat'iy` tuzatishlardan foydalanadi.

Odatda bunday chaqiruv dasturlash xatosi hisoblanadi. Agar funktsiya ichida "this" bo'lsa, u ob'ekt kontekstida chaqirilishini kutadi.
````

```smart header="`bog'lanmagan this` ning oqibati"
Agar siz boshqa dasturlash tilidan kelgan bo'lsangiz, ehtimol siz "bog'langan "bu" g'oyasiga o'rganib qolgansiz, bunda ob'ektda aniqlangan usullar har doim o'sha ob'ektga ishora qiluvchi `this` ga ega.

JavaScript-da `this` “bepul”, uning qiymati chaqiruv vaqtida baholanadi va usul qayerda e'lon qilinganiga bog'liq emas, balki qaysi ob'ekt "nuqtadan oldin" ekanligiga bog'liq.

`this` baholangan ish vaqti tushunchasi ham ijobiy, ham kamchiliklarga ega. Bir tomondan, funksiya turli ob'ektlar uchun qayta ishlatilishi mumkin. Boshqa tomondan, katta moslashuvchanlik xatolar uchun ko'proq imkoniyatlar yaratadi.

Bu yerda bizning vazifamiz til dizayn qarori yaxshi yomonligini aniqlashda emas. Ulardan qanday foydalanishni, foyda olishni va muammolardan chetda turishni o'rganamiz. 

```

## Ko'rsatkich funksiyalarida "this" yo'q

O'q funktsiyalari maxsusdir: ularda o'zlarining `this`lari yo'q. Agar biz bunday funktsiyadan `this` ga murojaat qilsak, u tashqi "normal" funktsiyadan olinadi.

Masalan, bu yerda `arrow()` tashqi `user.sayHi()` usulidan `this` foydalanadi:

```js run
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya
```

Bu ko'rsatkich funksiyalarining o'ziga xos hususiyati bo'lib, u bizga alohida `this` emas, o'rniga uni tashqi kontextsdan olmoqchi bo'lganimizda foydali bo'ladi. Keyinchalik <info:arrow-functions> bobida biz ko'rsatkich funksiyalariga chuqurroq kirib boramiz.

## Xulosa

- Ob'ekt xususiyatlarida saqlanadigan funktsiyalar "usullar" deb ataladi.
- Usullar ob'ektlarga "object.doSomething()" kabi "harakat qilish" imkonini beradi.
- Usullar ob'ektga "this" deb murojaat qilishi mumkin.

"this" qiymati ish vaqtida aniqlanadi.
- Funktsiya e'lon qilinganda, u "this" dan foydalanishi mumkin, lekin bu `this` funksiya chaqirilmaguncha hech qanday qiymatga ega bo'lmaydi.
- Funktsiyani ob'ektlar o'rtasida nusxalash mumkin.
- "Usul" sintaksisida funksiya chaqirilganda: `object.method()`, chaqiruv paytida `this` qiymati `object` bo'ladi.

E'tibor bering, ko'rsatkich funktsiyalari maxsusdir: ularda "this" yo'q. `This` ga ko'rsatkich funksiyasi ichida kirilsa, u tashqaridan olinadi.

