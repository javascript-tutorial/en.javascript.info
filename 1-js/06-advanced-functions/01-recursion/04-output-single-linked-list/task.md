muhimlik: 5

---

# Bitta bog'langan ro'yxatni chiqaring

Aytaylik, bizda bitta bog'langan ro'yxat bor (<info:recursion> bobida tasvirlanganidek):

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

Roʻyxat elementlarini birma-bir chiqaradigan `printList(list)` funksiyasini yozing.

Yechimning ikkita variantini yarating: tsikldan foydalanish va rekursiyadan foydalaning.

Qaysi biri yaxshiroq: rekursiya bilan yoki usiz?
