Oddiy yechim bo'lishi mumkin:

```js run
*!*
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
*/!*

let arr = [1, 2, 3];
shuffle(arr);
alert(arr);
```

Bu biroz ishlaydi, chunki `Math.random() - 0,5` tasodifiy son bo'lib, musbat yoki manfiy bo'lishi mumkin, shuning uchun saralash funksiyasi elementlarni tasodifiy tartibda qayta tartiblaydi.

Lekin saralash funksiyasi shu tarzda qo'llanilmaganligi sababli, barcha almashtirishlar bir xil ehtimolga ega emas.

Misol uchun, quyidagi kodni ko'rib chiqing. U 1000000 marta `shuffle`ni ishga tushiradi va barcha mumkin bo'lgan natijalarning ko'rinishini hisoblaydi:

```js run
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// barcha mumkin bo'lgan almashtirishlar uchun ko'rinishlarni sanaydi
let count = {
  123: 0,
  132: 0,
  213: 0,
  231: 0,
  321: 0,
  312: 0,
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join("")]++;
}

// barcha mumkin bo'lgan almashtirishlar sonini ko'rsatish
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

An example result (depends on JS engine):

```js
123: 250706
132: 124425
213: 249618
231: 124880
312: 125148
321: 125223
```

Biz betartiblikni aniq ko'ramiz: `123` va `213` boshqalarga qaraganda ancha tez-tez ko'rinadi.

Kodning natijasi JavaScript dvigatellari orasida farq qilishi mumkin, ammo biz allaqachon yondashuv ishonchsiz ekanligini ko'rishimiz mumkin.

Nega u ishlamayapti? Umuman olganda, `sort` bu “qora quti”: biz unga massiv va taqqoslash funksiyasini joylashtiramiz va massiv tartiblanishini kutamiz. Ammo taqqoslashning mutlaqo tasodifiyligi tufayli qora quti aqldan ozadi va uning qanday aqldan ozishi dvigatellar o'rtasida farq qiladigan aniq amalga oshirishga bog'liq.

Vazifani bajarishning boshqa yaxshi usullari mavjud. Masalan, [Fisher-Yates shuffle] (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) deb nomlangan ajoyib algoritm mavjud. G'oya ß massiv bo'ylab teskari tartibda yurish va har bir elementni oldidagi tasodifiy element bilan almashtirishdir:

```js
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // 0 dan i gacha bo'lgan tasodifiy indeks

    // massiv[i] va massiv[j] elementlarini almashtirish
    // Bunga erishish uchun biz "destructuring assignment" sintaksisidan foydalanamiz
    // keyingi boblarda ushbu sintaksis haqida batafsil ma'lumot topasiz
    // xuddi shu quyidagicha yozilishi mumkin:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}
```

Keling, xuddi shu tarzda sinab ko'raylik:

```js run
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// barcha mumkin bo'lgan almashtirishlar uchun ko'rinishlar soni
let count = {
  123: 0,
  132: 0,
  213: 0,
  231: 0,
  321: 0,
  312: 0,
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join("")]++;
}

// barcha mumkin bo'lgan almashtirishlar sonini ko'rsatish
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

Natija misoli:

```js
123: 166693
132: 166647
213: 166628
231: 167517
312: 166199
321: 166316
```

Hozir yaxshi ko'rinadi: barcha almashtirishlar bir xil ehtimollik bilan paydo bo'ladi.

Bundan tashqari, ishlash nuqtai nazaridan, Fisher-Yates algoritmi ancha yaxshi, "saralash" uchun ortiqcha yuk yo'q.
