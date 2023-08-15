O'qilgan xabarlarni `WeakSet` da saqlaylik:

```js run
let messages = [
  { text: "Hello", from: "John" },
  { text: "How goes?", from: "John" },
  { text: "See you soon", from: "Alice" },
];

let readMessages = new WeakSet();

// ikkita xabar o'qildi
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages 2 ta elementga ega

// ...birinchi xabarni yana o'qib chiqamiz!
readMessages.add(messages[0]);
// readMessages hali ham 2 ta noyob elementga ega

// javob: xabar [0] o'qilganmi?
alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// endi readMessagesda 1 ta element mavjud (xotirani texnik jihatdan keyinroq tozalash mumkin)
```

`WeakSet` xabarlar to'plamini saqlash va unda xabar mavjudligini osongina tekshirish imkonini beradi.

U o'zini avtomatik ravishda tozalaydi. Bitim shundaki, biz uni takrorlay olmaymiz, undan to'g'ridan-to'g'ri "barcha o'qilgan xabarlarni" ololmaymiz. Lekin biz buni barcha xabarlarni takrorlash va to'plamdagilarni filtrlash orqali amalga oshirishimiz mumkin.

Xabar o‘qilgandan so‘ng unga `message.isRead=true` kabi xususiyatni qo‘shish boshqa, boshqacha yechim bo‘lishi mumkin. Xabarlar ob'ektlari boshqa kod bilan boshqariladiganligi sababli, bu odatda tavsiya etilmaydi, ammo biz ziddiyatlarni oldini olish uchun ramziy xususiyatdan foydalanishimiz mumkin.

Quyidagicha:

```js
// ramziy xususiyat faqat bizning kodimizga ma'lum
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

Endi uchinchi tomon kodi bizning qo'shimcha mulkimizni ko'rmasligi mumkin.

Belgilar muammolar ehtimolini kamaytirishga imkon bersa-da, `WeakSet` dan foydalanish arxitektura nuqtai nazaridan yaxshiroqdir.
