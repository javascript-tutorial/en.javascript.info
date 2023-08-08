# O'zaro muloqot : alert, prompt, confirm

Biz brauzerdan namoyish muhiti (demo versiya) sifatida foydalanayotkanimiz bois, keling foydalanuvchi bilan o'zaro a'loqa qilish uchun bir-ikkita funksiyalarni ko'rib chiqmiz: `alert`, `prompt` and `confirm`

## alert

Biz bu allaqochan ko'rib chiqqanmiz. U habarni ko'rsatadi va foydalanuvchini "ok" tugmasini bosishini kutib turadi. 

Miol uchun:

```js run
alert("Hello");
```

Xabar ko'rsatilgan kichik-oyna (mini-window) *modal oyna* (modal window) deb ataladi. Bu yerda *modal* so'zi  tashriv buyuruvchi shu oyna bilan shug'ullanmasan turib, sahifaning qolgann qismlari bilan o'zaro a'loqa qila olmaydi, boshqa tugmalarni bosa olmaydi va shunga o'xshash narsalarni amalga oshirolmasligini bildiradi. Bu vaziyatda esa --- ular "OK" tugmasini bosmagangacha. 

## prompt

`prompt` funksiyasi ikkita argumentni qabul qiladi:

```js no-beautify
result = prompt(title, [default]);
```

U xabar mantniga ega bo'lgan oynani, kiritish maydonini va OK/Cancel tugmalarini tashrif buyuruvchiga ko'rsatadi.

`title` (sarlavha)
: Tashrif buyuruvchiga ko'rsatish uchun matn.

`default`
: Ixtiyoriy ikkinchi parametr, kiritish maydoni uchun dastlabki qiymat.

```smart header="The square brackets in syntax `[...]`"
Yuqoridagi sintaksisdagi `default` atrofida joylashgan kvadrat kavslar parametr majburuy emas, balki ixtiyoriy ekanligini bildiradi. 
```

Tashrif buyuruvchi so'rov kiritish maydoniga biror narsa yozib, OK tugmasini bosishi mumkin. Keyin, `result` (natija) qismida matnni olamiz. Yoki, ular Cancel yoki `key:Esc` tugmasini bosish orqali bekor qilishi ham mumkin, so'ng biz natija sifatida `null` ni qabul qilamiz. 

"Jumla"(prompt) ni chaqiruv matnni kiritish maydonidan qaytaradi, yoki agar kiritish bekor qilingan bo'lsa, `null` ni 

Misol uchun:

```js run
let age = prompt('SIz nechchi yoshdasiz?', 100);

alert(`Siz ${age} yoshdasiz!`); // Siz 100 yoshdasiz!
```

````warn header="In IE: always supply a `default`"
Ikkinchi parametr ixtiyoriy, ammo agar biz uni taqdim qilmasak, Internet explorer uni so'rovga `"undefined"` (aniqlanmagan) deb kiritadi.
Internet explorerda quyidagilarni ko'rish uchun ushbu kodni ishga tushiring:

```js run
let test = prompt("Test");
```

Shunday qilib, so'rovlarni IE da yaxshi ko'rinishi uchun, har doim ikkinchi argumentni taqdim qilishingizni tavsiya qilamiz:

```js run
let test = prompt("Test", ''); // <-- for IE
```
````

## tasdiqlash

Sintaksis:

```js
natija = (savol)ni tasdiqlash;
```

`confirm` (tasdiqlov) funksiyasi `question` (savol)li modal oynani hamda ikkita tugma: Ok va Cancel larni ko'rsatadi.

Natija `true` to'g'ri bo'ladi Ok tugmasi bosilgan holda, aks holda `false` xato.

Masalan:

```js run
let isBoss = tasdiqlash("Siz xo'jayinmisiz?");

alert( isBoss ); // Agar OK tugmasi bosilsa, to'g'ri
```

## Xulosa

Biz tashrif buyuruvchilar bilan o'zaro a'loqaga kirishish uchun uchta brauzerga xos funksiyalarni ko'rib chiqdik:

`alert`
: xabarni ko'rsatadi.

`prompt`
: foydalanuvchidan matn kiritishni so'ragan xabarni ko'rsatadi. U xabarni qaytaradi, yoki agar Cancel yo `key:Esc` tugmalari bosilsa, `null` ni taqdim etadi.  

`confirm`
: xabarni ko'rsatadi, va foydalanuvchini "OK" yo "Cancel" tugmalarini bosishini kutib turadi. OK da `true`(to'g'ri) ni  va Cancel/`key:Esc` da `false`(xato) ni qaytaradi.

Bu usullarning barchasi modal hisoblanadi: Ular script bajarilishini to'xtatishadi va oyna o'chirilmaguncha foydalanuvchiga sahifaning boshqa qismi bilan a'loqa qilish imkonini bermaydi. 

Yuqorida ta'kidlab o'tilgan modallarga xos ikkita cheklov mavjud:

1. Modal oynaning aniq joylashuvi brauzer tomonidan aniqlanadi. Odatda, u markazda bo'ladi. 
2. Oynanig aniq ko'rinishi ham brauzerga bog'liq. Biz uni o'zgartira olmaymiz. 

Bular soodalik hisobiga keldi. Yaxshiroq oynani hamda tashrif buyuruvchi bilan kuchliroq a'loqani ta'minlaydigan boshqa yo'llar ham mavjud, lekin agar sizning qo'shimcha jihatlarga ehtiyojingiz bo'lmasa, bu usullarning o'zi ham ancha yaxshi ishlaydi.  