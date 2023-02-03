muhimlik: 4

---

# Nisbiy sanani formatlash

`date`ni quyidagicha formatlashi kerak bo‘lgan `formatDate(sana)` funksiyasini yozing:

- Agar `date` 1 soniyadan kamroq vaqt o'tgan bo'lsa, `aynan hozir`.
- Aks holda, agar `date` 1 daqiqadan kamroq vaqt o'tgan bo'lsa, u holda `"n soniya oldin"`.
- Aks holda, agar bir soatdan kam bo'lsa, u holda `"m min. oldin"`.
- Aks holda, to'liq sana `"DD.MM.YY HH:mm"` formatida. Ya'ni: `"kun.oy.yil soat:daqiqalar"`, hammasi 2 xonali formatda, masalan. `31.12.16 10:00`.

Masalan:

```js
alert(formatDate(new Date(new Date() - 1))); // "aynan hozir"

alert(formatDate(new Date(new Date() - 30 * 1000))); // "30 sek. oldin"

alert(formatDate(new Date(new Date() - 5 * 60 * 1000))); // "5 min. oldin"

// kechagi sana 31.12.16 20:00 kabi
alert(formatDate(new Date(new Date() - 86400 * 1000)));
```
