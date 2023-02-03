`Date` dan hozirgacha bo'lgan vaqtni olish uchun -- sanalarni ayiraylik.

```js run demo
function formatDate(date) {
  let diff = new Date() - date; // tmillisekundlardagi farq

  if (diff < 1000) {
    // 1 soniyadan kam
    return "right now";
  }

  let sec = Math.floor(diff / 1000); // farqni soniyalarga aylantirish

  if (sec < 60) {
    return sec + " sec. ago";
  }

  let min = Math.floor(diff / 60000); // farqni daqiqaga aylantirish
  if (min < 60) {
    return min + " min. ago";
  }

  // sanani formatlash
  // bir xonali kun/oy/soat/daqiqaga bosh nollarni qo'shish
  let d = date;
  d = [
    "0" + d.getDate(),
    "0" + (d.getMonth() + 1),
    "" + d.getFullYear(),
    "0" + d.getHours(),
    "0" + d.getMinutes(),
  ].map((component) => component.slice(-2)); // Har bir komponentning oxirgi 2 raqamini olish

  // komponentlarni sanaga qo'shish
  return d.slice(0, 3).join(".") + " " + d.slice(3).join(":");
}

alert(formatDate(new Date(new Date() - 1))); // "aynan hozir"

alert(formatDate(new Date(new Date() - 30 * 1000))); // "30 sek. oldin"

alert(formatDate(new Date(new Date() - 5 * 60 * 1000))); // "5 min. oldin"

// kechagi sana 31.12.2016 20:00 kabi
alert(formatDate(new Date(new Date() - 86400 * 1000)));
```

Alternativ yechim:

```js run
function formatDate(date) {
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let diffMs = new Date() - date;
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = diffSec / 60;
  let diffHour = diffMin / 60;

  // formatting
  year = year.toString().slice(-2);
  month = month < 10 ? "0" + month : month;
  dayOfMonth = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth;
  hour = hour < 10 ? "0" + hour : hour;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  if (diffSec < 1) {
    return "aynan hozir";
  } else if (diffMin < 1) {
    return `${diffSec} sek. oldin`;
  } else if (diffHour < 1) {
    return `${diffMin} min. oldin`;
  } else {
    return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`;
  }
}
```
