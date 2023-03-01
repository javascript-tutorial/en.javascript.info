# Rekursiya va stack

Keling, funktsiyalarga qaytaylik va ularni chuqurroq o'rganamiz.

Birinchi mavzuimiz *rekursiya* bo'ladi.

Agar siz dasturlashda yangi bo'lmasangiz, u tanish bo'lishi mumkin va siz ushbu bobni o'tkazib yuborishingiz mumkin.

Rekursiya - bu vazifa tabiiy ravishda bir xil, ammo soddaroq bo'lgan bir nechta vazifalarga bo'linishi mumkin bo'lgan holatlarda foydali bo'lgan dasturlash naqshidir. Yoki vazifani oson harakatga va bir xil vazifaning oddiy variantiga soddalashtirish mumkin bo'lganda. Yoki, biz tez orada ko'rib turganimizdek, ma'lum ma'lumotlar tuzilmalari bilan shug'ullanish uchun.

Funktsiya vazifani hal qilganda, jarayonda u boshqa ko'plab funktsiyalarni chaqirishi mumkin. Buning qisman holati funksiya *o'zini* chaqirishidir. Bu *rekursiya* deb ataladi.

## Ikki fikrlash usuli

Boshlash uchun oddiy narsa uchun -- keling, `x` ni `n` tabiiy kuchiga oshiradigan `pow(x, n)` funksiyasini yozaylik. Boshqacha qilib aytganda, `x` ni o'ziga `n` marta ko'paytiradi.

```js
pow(2, 2) = 4
pow(2, 3) = 8
pow(2, 4) = 16
```

Uni amalga oshirishning ikki yo'li mavjud.

1. Takroriy fikrlash: `for` sikli:

    ```js run
    function pow(x, n) {
      let result = 1;

      // natijani siklda x n marta ko'paytiring
      for (let i = 0; i < n; i++) {
        result *= x;
      }

      return result;
    }

    alert( pow(2, 3) ); // 8
    ```

2. Rekursiv fikrlash: vazifani soddalashtiring va o'zingizni chaqiring:

    ```js run
    function pow(x, n) {
      if (n == 1) {
        return x;
      } else {
        return x * pow(x, n - 1);
      }
    }

    alert( pow(2, 3) ); // 8
    ```

Iltimos, rekursiv variant qanday qilib tubdan farq qilishiga e'tibor bering.

`pow(x, n)` chaqirilsa, ijro ikki tarmoqqa bo'linadi:

```js
              if n==1  = x
             /
pow(x, n) =
             \
              else     = x * pow(x, n - 1)
```

1. Agar `n == 1` bo'lsa, unda hamma narsa ahamiyatsiz. U rekursiyaning asosi* deb ataladi, chunki u darhol aniq natija beradi: `pow(x, 1)` teng `x`.
2. Aks holda, `pow(x, n)` ni `x * pow(x, n - 1)` shaklida ifodalashimiz mumkin. Matematikada <code>x<sup>n</sup> = x * x<sup>n-1</sup></code> yozish mumkin. Bu *rekursiv qadam* deb ataladi: biz vazifani oddiyroq harakatga (`x` ga ko'paytirish) va bir xil vazifaning oddiy chaqiruviga (pastki `n` bilan` pow`) aylantiramiz. Keyingi qadamlar `n` `1` ga yetguncha uni yanada soddalashtiradi.

Aytishimiz mumkinki, `pow` *` n == 1`gacha o'zini* rekursiv chaqiradi.

![powning rekursiv diagrammasi](recursion-pow.svg)


Masalan, `pow(2, 4)` ni hisoblash uchun rekursiv variant quyidagi amallarni bajaradi:

1. `pow(2, 4) = 2 * pow(2, 3)`
2. `pow(2, 3) = 2 * pow(2, 2)`
3. `pow(2, 2) = 2 * pow(2, 1)`
4. `pow(2, 1) = 2`

Shunday qilib, rekursiya funktsiya chaqiruvini oddiyroqga qisqartiradi, keyin esa -- yanada soddaroq va natija aniq bo'lmaguncha davom etadi.

``smart header="Rekursiya odatda qisqaroq"
Rekursiv yechim odatda iterativga qaraganda qisqaroq bo'ladi.

Bu yerda `pow(x, n)` ni yanada aniqroq va baribir o'qilishi mumkin bo'lishi uchun `if` o'rniga `?` shartli operatoridan foydalanib qayta yozishimiz mumkin:

````js run
function pow(x, n) {
  return (n == 1) ? x : (x * pow(x, n - 1));
}
`````
````
``
Ichki qo'ng'iroqlarning maksimal soni (shu jumladan birinchisi) *rekursiya chuqurligi* deb ataladi. Bizning holatda, bu aniq `n` bo'ladi.

Maksimal rekursiya chuqurligi JavaScript dvigateli tomonidan cheklangan. Biz uning 10000 ekanligiga ishonishimiz mumkin, ba'zi dvigatellar ko'proq ruxsat beradi, lekin 100000 ularning aksariyati uchun chegaradan tashqarida. Buni engillashtirishga yordam beradigan avtomatik optimallashtirishlar mavjud ("quyruq qo'ng'iroqlarini optimallashtirish"), lekin ular hali hamma joyda qo'llab-quvvatlanmaydi va faqat oddiy holatlarda ishlaydi.

Bu rekursiyani qo'llashni cheklaydi, lekin u hali ham juda keng bo'lib qolmoqda. Rekursiv fikrlash usuli oddiyroq kodni beradi, saqlash osonroq bo'lgan ko'plab vazifalar mavjud.

## Bajarish konteksti va stack

Endi rekursiv chaqiruvlar qanday ishlashini ko'rib chiqamiz. Buning uchun biz funksiyalar qopqog'ini ko'rib chiqamiz.

Ishlayotgan funktsiyani bajarish jarayoni haqidagi ma'lumotlar uning *bajarish kontekstida* saqlanadi.

[bajarish konteksti](https://tc39.github.io/ecma262/#sec-execution-contexts) funksiyaning bajarilishi haqidagi tafsilotlarni o'z ichiga olgan ichki ma'lumotlar strukturasidir: boshqaruv oqimi hozir qaerda, joriy o'zgaruvchilar. , `this` qiymati (biz uni bu yerda ishlatmaymiz) va boshqa bir nechta ichki tafsilotlar.

Bitta funktsiya chaqiruvi u bilan bog'langan aynan bitta bajarish kontekstiga ega.

Funktsiya ichki qo'ng'iroqni amalga oshirganda, quyidagilar sodir bo'ladi:

- Joriy funktsiya to'xtatildi.
- U bilan bog'liq bajarilish konteksti *ijro etuvchi kontekstli stack* deb nomlangan maxsus ma'lumotlar strukturasida eslab qolinadi.
- Ichki qo'ng'iroq amalga oshiriladi.
- U tugagandan so'ng, eski ijro konteksti stackdan olinadi va tashqi funktsiya u to'xtagan joydan davom ettiriladi.

Keling, `pow(2, 3)` chaqiruvi paytida nima sodir bo'lishini ko'rib chiqaylik.

### pow(2, 3)

`pow(2, 3)` chaqiruvining boshida ijro konteksti o'zgaruvchilarni saqlaydi: `x = 2, n = 3`, bajarilish oqimi funksiyaning `1` qatorida.

Biz uni quyidagicha chizishimiz mumkin:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Kontekst: { x: 2, n: 3, at line 1 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

O'shanda funktsiya bajarila boshlaydi. `n == 1` sharti noto'g'ri, shuning uchun oqim `if` ning ikkinchi tarmog'ida davom etadi:

```js run
function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
*!*
    return x * pow(x, n - 1);
*/!*
  }
}

alert( pow(2, 3) );
```


O'zgaruvchilar bir xil, lekin qator o'zgaradi, shuning uchun kontekst hozir:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Kontekst: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

`x * pow(x, n - 1)` ni hisoblash uchun biz yangi `pow(2, 2)` argumentlari bilan `pow` ga qo`shimcha chaqiruv qilishimiz kerak.

### pow(2, 2)

Ichki chaqiruvni amalga oshirish uchun JavaScript *ijro kontekst stekidagi* joriy bajarilish kontekstini eslab qoladi.

Bu erda biz bir xil funktsiyani `pow` deb ataymiz, lekin bu mutlaqo muhim emas. Jarayon barcha funktsiyalar uchun bir xil:

1. Joriy kontekst stekning tepasida "eslab qolinadi".
2. Qo'ng'iroq uchun yangi kontekst yaratiladi.
3. Qo'ng'iroq tugagach -- oldingi kontekst stackdan chiqariladi va uning bajarilishi davom etadi.

Mana biz `pow(2, 2)` qo'ng'iroqqa kirganimizda kontekst to'plami:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Kontekst: { x: 2, n: 2, at line 1 }</span>
    <span class="function-execution-context-call">pow(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Kontekst: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Yangi joriy ijro konteksti tepada (va qalin) va oldingi eslab qolingan kontekstlar quyida joylashgan.

Qo'ng'iroqni tugatganimizda -- oldingi kontekstni davom ettirish oson, chunki u ikkala o'zgaruvchini ham, kodning to'xtagan joyini ham saqlaydi.

``smart
Bu yerda rasmda biz "chiziq" so'zidan foydalanamiz, chunki bizning misolimizda faqat bitta qo'shimcha qo'ng'iroq mavjud, lekin odatda bitta kod satrida `pow(…) + pow(...) + somethingElse(...)` kabi bir nechta qo'shimcha qo'ng'iroqlar bo'lishi mumkin.

Shunday qilib, qatl "qo'ng'iroqdan keyin darhol" davom etadi, deb aytish aniqroq bo'ladi.
```
```
### pow(2, 1)

Jarayon takrorlanadi: yangi qo'ng'iroq `5` qatorida amalga oshiriladi, endi `x=2`, `n=1` argumentlari bilan.

Yangi ijro konteksti yaratiladi, avvalgisi stack ustiga suriladi:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Kontekst: { x: 2, n: 1, at line 1 }</span>
    <span class="function-execution-context-call">pow(2, 1)</span>
  </li>
  <li>
    <span class="function-execution-context">Kontekst: { x: 2, n: 2, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Kontekst: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

Hozirda 2 ta eski kontekst mavjud va 1 tasi hozirda `pow(2, 1)` uchun ishlaydi.

### Chiqish

`pow(2, 1)` bajarilayotganda, avvalgidan farqli o'laroq, `n == 1` sharti haqiqatdir, shuning uchun `if` ning birinchi bo`limi ishlaydi:

```js
function pow(x, n) {
  if (n == 1) {
*!*
    return x;
*/!*
  } else {
    return x * pow(x, n - 1);
  }
}
```

Endi ichki qoʻngʻiroqlar yoʻq, shuning uchun funksiya tugaydi va `2`ni qaytaradi.

Funktsiya tugashi bilan uning ijro konteksti endi kerak emas, shuning uchun u xotiradan o'chiriladi. Avvalgisi stekning yuqori qismidan tiklanadi:


<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Kontekst: { x: 2, n: 2, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 2)</span>
  </li>
  <li>
    <span class="function-execution-context">Kontekst: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

`pow(2, 2)` ijrosi qayta tiklandi. U `pow(2, 1)` qo'shimcha chaqiruvining natijasiga ega, shuning uchun u `x * pow(x, n - 1)` baholashni yakunlab, `4` qiymatini qaytara oladi.

Keyin oldingi kontekst tiklanadi:

<ul class="function-execution-context-list">
  <li>
    <span class="function-execution-context">Kontekst: { x: 2, n: 3, at line 5 }</span>
    <span class="function-execution-context-call">pow(2, 3)</span>
  </li>
</ul>

U tugagach, bizda `pow(2, 3) = 8` natijasi bo'ladi.

Bu holatda rekursiya chuqurligi: **3**.

Yuqoridagi rasmlardan ko'rib turganimizdek, rekursiya chuqurligi stackdagi kontekstning maksimal soniga teng.

Xotira talablariga e'tibor bering. Kontekst xotirani oladi. Bizning holatda, `n` ning kuchiga ko'tarish aslida `n` kontekstlari uchun, `n` ning barcha pastki qiymatlari uchun xotirani talab qiladi.

Siklga asoslangan algoritm xotirani tejaydi:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Takrorlanuvchi `pow` jarayonda `i` va `natija`ni o‘zgartiruvchi yagona kontekstdan foydalanadi. Uning xotira talablari kichik, qat'iy va `n` ga bog'liq emas.

**Har qanday rekursiyani sikl sifatida qayta yozish mumkin. Sikl variantini odatda samaraliroq qilish mumkin.**

...Ammo ba'zida qayta yozish ahamiyatsiz bo'ladi, ayniqsa, funktsiya shartlarga qarab turli xil rekursiv qo'ng'iroqlarni ishlatganda va ularning natijalarini birlashtirganda yoki tarmoqlanish yanada murakkab bo'lsa. Va optimallashtirish keraksiz bo'lishi mumkin va bu harakatlarga mutlaqo arzimaydi.

Rekursiya qisqaroq kod berishi mumkin, tushunish va qo'llab-quvvatlash osonroq. Optimallashtirish hamma joyda talab qilinmaydi, asosan bizga yaxshi kod kerak, shuning uchun u ishlatiladi.

## Rekursiv o'tishlar

Rekursiyaning yana bir ajoyib qo'llanilishi bu rekursiv o'tishdir.

Tasavvur qiling, bizning kompaniyamiz bor. Xodimlar tuzilishi ob'ekt sifatida taqdim etilishi mumkin:

```js
let company = {
  sales: [{
    name: 'John',
    salary: 1000
  }, {
    name: 'Alice',
    salary: 1600
  }],

  development: {
    sites: [{
      name: 'Peter',
      salary: 2000
    }, {
      name: 'Alex',
      salary: 1800
    }],

    internals: [{
      name: 'Jack',
      salary: 1300
    }]
  }
};
```

Boshqacha aytganda, kompaniyada bo'limlar mavjud.

- Bo'limda bir qator xodimlar bo'lishi mumkin. Masalan, `sales` bo'limida 2 nafar xodim bor: Jon va Elis.
- Yoki bo'lim kichik bo'limlarga bo'linishi mumkin, masalan, `development` ikkita filialga ega: `sites` va `internals`. Ularning har biri o'z xodimlariga ega.
- Bundan tashqari, bo'lim o'sib ulg'ayganida, u kichik bo'limlarga (yoki jamoalarga) bo'linishi mumkin.

    Masalan, kelajakda `sites` bo'limi `siteA` va `siteB` uchun guruhlarga bo'linishi mumkin. Va ular, ehtimol, ko'proq bo'linishi mumkin. Bu rasmda yo'q, faqat yodda tutish kerak bo'lgan narsa.

Aytaylik, biz barcha maoshlarning yig'indisini oladigan funktsiyani xohlaymiz. Buni qanday qilishimiz mumkin?

Iterativ yondashuv oson emas, chunki struktura oddiy emas. Birinchi g'oya, 1-darajali bo'limlar ustida joylashgan pastki loop bilan `company` ustidan `for` siklini yaratish bo'lishi mumkin. Ammo keyin bizga `sites` kabi 2-darajali bo'limlarda xodimlarni takrorlash uchun ko'proq ichki ichki tizimlar kerak bo'ladi... Va keyin kelajakda paydo bo'lishi mumkin bo'lgan 3-darajali bo'limlar ichida yana bir pastki loop kerakmi? Agar biz bitta ob'ektni aylanib o'tish uchun kodga 3-4 ta ichki pastadir qo'ysak, u juda xunuk bo'lib qoladi.

Keling, rekursiyani sinab ko'raylik.

Ko'rib turganimizdek, bizning funktsiyamiz bo'limni yig'ish uchun olganida, ikkita mumkin bo'lgan holat mavjud:

1. Yoki bu "oddiy" bo'lim bo'lib, odamlarning * massividan iborat bo'ladi -- keyin biz maoshlarni oddiy tsiklda yig'ishimiz mumkin.
2. Yoki bu `N` bo'limlari bo'lgan *ob'ekt* -- keyin biz har bir kichik bo'lim uchun summani olish va natijalarni birlashtirish uchun "N" rekursiv qo'ng'iroqlarni amalga oshirishimiz mumkin.

1-holat rekursiyaning asosi, massivni olganimizda trivial holat.

Ob'ektni olganimizda ikkinchi holat rekursiv qadamdir. Murakkab vazifa kichikroq bo'limlar uchun kichik vazifalarga bo'lingan. Ular o'z navbatida yana bo'linishi mumkin, lekin ertami-kechmi bo'linish (1) da tugaydi.

Algoritmni koddan o'qish osonroq bo'lishi mumkin:


```js run
let company = { // qisqalik uchun siqilgan bir xil ob'ekt
  sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 1600 }],
  development: {
    sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
    internals: [{name: 'Jack', salary: 1300}]
  }
};

// Vazifani bajarish funksiyasi
*!*
function sumSalaries(department) {
  if (Array.isArray(department)) { // hol (1)
    return department.reduce((prev, current) => prev + current.salary, 0); // massivni yig'ish
  } else { // hol (2)
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // rekursiv bo'limlarni chaqiring, natijalarni jamlash
    }
    return sum;
  }
}
*/!*

alert(sumSalaries(company)); // 7700
```

Kod qisqa va tushunarli (umid qilamanki?). Bu rekursiyaning kuchi. Shuningdek, u har qanday darajadagi bo'limlarni joylashtirish uchun ishlaydi.

Mana qo'ng'iroqlar diagrammasi:

![recursive salaries](recursive-salaries.svg)

Biz printsipni osongina ko'rishimiz mumkin: `{...}` ob'ekt uchun qo'shimcha chaqiruvlar amalga oshiriladi, `[...]` massivlar rekursiya daraxtining "barglari" bo'lsa, ular darhol natija beradi.

E'tibor bering, kod biz ilgari ko'rib chiqqan aqlli xususiyatlardan foydalanadi:

- Massiv yig'indisini olish uchun `arr.reduce` usuli <info:array-methods> bobida tushuntirilgan.
- Ob'ekt qiymatlari ustidan takrorlash uchun `for(val of Object.values(obj))` sikli: `Object.values` ularning massivini qaytaradi.


## Rekursiv tuzilmalar

Rekursiv (rekursiv belgilangan) ma'lumotlar strukturasi o'zini qismlarga bo'lib takrorlaydigan tuzilmadir.

Biz buni yuqoridagi kompaniya tuzilishi misolida ko‘rdik.

Kompaniya *bo'limi* bu:
- Yoki bir massiv odamlar.
- Yoki *bo'limlari* bo'lgan ob'ekt.

Veb-ishlab chiquvchilar uchun ko'proq mashhur misollar mavjud: HTML va XML hujjatlari.

HTML hujjatida *HTML-tegi* quyidagilar ro'yxatini o'z ichiga olishi mumkin:
- Matn qismlari.
- HTML-kommentlar.
- Boshqa *HTML-teglar* (ular o'z navbatida matn qismlari/sharhlari yoki boshqa teglar va hokazolarni o'z ichiga olishi mumkin).

Bu yana bir bor rekursiv ta'rif.

Yaxshiroq tushunish uchun biz ba'zi hollarda massivlar uchun yaxshiroq alternativ bo'lishi mumkin bo'lgan "Bog'langan ro'yxat" deb nomlangan yana bir rekursiv tuzilmani ko'rib chiqamiz.

### Bog'langan ro'yxat

Tasavvur qiling, biz ob'ektlarning tartiblangan ro'yxatini saqlamoqchimiz.

Tabiiy tanlov massiv bo'ladi:

```js
let arr = [obj1, obj2, obj3];
```

...Ammo massivlarda muammo bor. "Elementni o'chirish" va "elementni kiritish" operatsiyalari qimmat. Masalan, `arr.unshift(obj)` operatsiyasi yangi `obj` uchun joy ochish uchun barcha elementlarni qayta raqamlashi kerak va agar massiv katta bo'lsa, bu vaqt talab etadi. `arr.shift()` bilan ham xuddi shunday.

Ommaviy raqamlashni talab qilmaydigan yagona tuzilmaviy modifikatsiyalar qatorning oxiri bilan ishlaydiganlardir: `arr.push/pop`. Shunday qilib, biz boshi bilan ishlashimiz kerak bo'lganda, katta navbatlar uchun massiv juda sekin bo'lishi mumkin.

Shu bilan bir qatorda, agar bizga tezda qo'shish/o'chirish kerak bo'lsa, biz [bog'langan ro'yxat] (https://en.wikipedia.org/wiki/Linked_list) deb nomlangan boshqa ma'lumotlar strukturasini tanlashimiz mumkin.

*Bog'langan ro'yxat elementi* rekursiv ravishda ob'ekt sifatida belgilanadi:
- `value`.
- `next` keyingi *bog'langan ro'yxat elementiga* havola qiluvchi xususiyat yoki agar bu oxiri bo'lsa, "null".

Masalan:

```js
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
```

Ro'yxatning grafik ko'rinishi:

![linked list](linked-list.svg)

Yaratish uchun muqobil kod:

```js no-beautify
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };
list.next.next.next.next = null;
```

Bu erda biz bir nechta ob'ektlar mavjudligini yanada aniqroq ko'rishimiz mumkin, ularning har biri qo'shniga ishora qiluvchi `value` va `next` ga ega. `list` o'zgaruvchisi zanjirdagi birinchi ob'ektdir, shuning uchun `next` ko'rsatkichlardan keyin biz istalgan elementga kira olamiz.

Ro'yxat osongina bir nechta qismlarga bo'linishi va keyinroq birlashtirilishi mumkin:

```js
let secondList = list.next.next;
list.next.next = null;
```

![linked list split](linked-list-split.svg)

Qo'shish uchun:

```js
list.next.next = secondList;
```

Va, albatta, biz istalgan joyga narsalarni kiritishimiz yoki olib tashlashimiz mumkin.

Masalan, yangi qiymatni qo'shish uchun biz ro'yxat boshini yangilashimiz kerak:

```js
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };

*!*
// ro'yxatga yangi qiymatni qo'shing
list = { value: "new item", next: list };
*/!*
```

![linked list](linked-list-0.svg)

Qiymatni o'rtadan olib tashlash uchun oldingisining `next` ni o'zgartiring:

```js
list.next = list.next.next;
```

![linked list](linked-list-remove-1.svg)

Biz `list.next` ni `1` dan `2` qiymatiga o‘tkazdik. Endi `1` qiymati zanjirdan chiqarib tashlandi. Agar u boshqa joyda saqlanmasa, u avtomatik ravishda xotiradan o'chiriladi.

Massivlardan farqli o'laroq, ommaviy qayta raqamlash yo'q, biz elementlarni osongina o'zgartirishimiz mumkin.

Tabiiyki, ro'yxatlar har doim ham massivlardan yaxshiroq emas. Aks holda, hamma faqat ro'yxatlardan foydalanadi.

Asosiy kamchilik shundaki, biz elementga uning raqami bo'yicha osongina kira olmaymiz. Bu oson massivda: `arr[n]` to'g'ridan-to'g'ri havola. Lekin ro'yxatda biz birinchi elementdan boshlashimiz va N-elementni olish uchun `keyingi` `N` marta borishimiz kerak.

...Ammo bizga bunday operatsiyalar har doim ham kerak emas. Misol uchun, bizga navbat yoki hatto [deque] (https://en.wikipedia.org/wiki/Double-ended_queue) kerak bo'lganda -- elementlarni ikkala uchidan juda tez qo'shish/o'chirish imkonini beradigan tartiblangan tuzilma, lekin uning o'rtasiga kirish kerak emas.

Ro'yxatlar kengaytirilishi mumkin:
- Oldingi elementga osongina orqaga o'tish uchun `next` ga qo'shimcha ravishda `prev` xususiyatini qo'shishimiz mumkin.
- Roʻyxatning oxirgi elementiga havola qiluvchi `tail` nomli oʻzgaruvchini ham qoʻshishimiz mumkin (va oxiridan elementlarni qoʻshish/oʻchirishda uni yangilash).
- ...Ma'lumotlar tuzilishi bizning ehtiyojlarimizga qarab farq qilishi mumkin.

## Xulosa

Shartlar:
- *Rekursiya* dasturlash atamasi boʻlib, funksiyani oʻzidan chaqirishni anglatadi. Rekursiv funksiyalar vazifalarni nafis usullar bilan hal qilish uchun ishlatilishi mumkin.

    Funktsiya o'zini chaqirganda, bu *rekursiya qadami* deb ataladi. Rekursiyaning *asoslari funksiya argumentlari bo'lib, vazifani shu qadar sodda qiladiki, funktsiya boshqa chaqiruvlarni amalga oshirmaydi.

- [Recursively-defined](https://en.wikipedia.org/wiki/Recursive_data_type) maʼlumotlar strukturasi oʻzi yordamida aniqlanishi mumkin boʻlgan maʼlumotlar strukturasidir.

    Masalan, bog'langan ro'yxatni ro'yxatga (yoki null) havola qiluvchi ob'ektdan iborat ma'lumotlar strukturasi sifatida aniqlash mumkin.

    ```js
    list = { value, next -> list }
    ```

    Ushbu bobdagi HTML elementlari daraxti yoki boʻlim daraxti kabi daraxtlar ham tabiiy ravishda rekursivdir: ularning shoxlari bor va har bir filialda boshqa shoxchalar boʻlishi mumkin.

    Rekursiv funksiyalar ularni boshqarish uchun ishlatilishi mumkin, chunki biz `sumSalary` misolida ko'rganmiz.

Har qanday rekursiv funksiya iterativ funksiyaga qayta yozilishi mumkin. Va bu ba'zan narsalarni optimallashtirish uchun talab qilinadi. Ammo ko'p vazifalar uchun rekursiv yechim etarlicha tez va yozish va qo'llab-quvvatlash osonroq.
