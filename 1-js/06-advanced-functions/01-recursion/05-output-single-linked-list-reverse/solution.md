# Rekursiyadan foydalanish

Bu yerda rekursiv mantiq biroz qiyin.

Biz avval ro'yxatning qolgan qismini chiqarishimiz va *then* joriyini chiqarishimiz kerak:

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

function printReverseList(list) {

  if (list.next) {
    printReverseList(list.next);
  }

  alert(list.value);
}

printReverseList(list);
```

# Sikldan foydalanish

Sikl varianti ham to'g'ridan-to'g'ri chiqishga qaraganda biroz murakkabroq.

Bizning `list`imizda oxirgi qiymatni olishning hech qanday usuli yo'q. Biz ham "qayta olmaymiz".

Shunday qilib, biz qila oladigan narsa, avval elementlarni to'g'ridan-to'g'ri tartibda ko'rib chiqish va ularni massivda eslab qolish va keyin biz eslab qolgan narsalarni teskari tartibda chiqarishdir:

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

function printReverseList(list) {
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}

printReverseList(list);
```

E'tibor bering, rekursiv yechim aslida xuddi shunday qiladi: u ro'yxatni kuzatib boradi, ichki chaqiruvlar zanjiridagi elementlarni eslab qoladi (bajarish kontekstida) va keyin ularni chiqaradi.
