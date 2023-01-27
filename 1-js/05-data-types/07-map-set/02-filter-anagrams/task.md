muhimlik: 4

---

# Anagramlarni filtrlash

[Anagrammalar](https://en.wikipedia.org/wiki/Anagram) bir xil harflar soni bir xil, lekin boshqa tartibda bo'lgan so'zlar..

Masalan:

```
nap - pan
ear - are - era
cheaters - hectares - teachers
```

Anagramlardan tozalangan massivni qaytaruvchi `aclean(arr)` funksiyasini yozing.

Masalan:

```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert(aclean(arr)); // "nap,teachers,ear" yoki "PAN,cheaters,era"
```

Har bir anagram guruhidan qaysi biri bo'lishidan qat'i nazar, faqat bitta so'z qolishi kerak.
