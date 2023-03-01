# Siklga asoslangan yechim

Yechimning siklga asoslangan varianti:

```js run
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

function printList(list) {
  let tmp = list;

  while (tmp) {
    alert(tmp.value);
    tmp = tmp.next;
  }

}

printList(list);
```

Esda tutingki, biz roʻyxat boʻylab yurish uchun vaqtinchalik `tmp` oʻzgaruvchisidan foydalanamiz. Texnik jihatdan biz o'rniga `list` funksiya parametridan foydalanishimiz mumkin:

```js
function printList(list) {

  while(*!*list*/!*) {
    alert(list.value);
    list = list.next;
  }

}
```

...Lekin bu aqlsizlik bo'lardi. Kelajakda biz funktsiyani kengaytirishimiz, ro'yxat bilan boshqa biror narsa qilishimiz kerak bo'lishi mumkin. Agar biz `list` ni o'zgartirsak, biz bunday qobiliyatni yo'qotamiz.

Yaxshi o'zgaruvchilar nomlari haqida gapiradigan bo'lsak, bu erda `list` ro'yxatning o'zi. Uning birinchi elementi. Va u shunday qolishi kerak. Bu aniq va ishonchli.

Boshqa tomondan, `tmp` roli faqat ro'yxatni aylanib o'tishdir, masalan, `for` tsiklidagi `i`.

# Rekursiv yechim

`printList(ro'yxat)` ning rekursiv varianti oddiy mantiqqa amal qiladi: ro'yxatni chiqarish uchun joriy element `list`ni chiqarishimiz kerak, so'ngra `list.next` uchun ham xuddi shunday qiling:

```js run
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

function printList(list) {

  alert(list.value); // joriy elementni chiqarish

  if (list.next) {
    printList(list.next); // ro'yxatning qolgan qismi uchun ham xuddi shunday qiling
  }

}

printList(list);
```

Endi qaysi yaxshiroq?

Texnik jihatdan, pastadir samaraliroq. Bu ikki variant ham xuddi shunday qiladi, lekin tsikl ichki funksiya chaqiruvlari uchun resurslarni sarflamaydi.

Boshqa tomondan, rekursiv variant qisqaroq va ba'zan tushunish osonroq.
