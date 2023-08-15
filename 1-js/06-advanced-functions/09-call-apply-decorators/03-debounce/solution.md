```js demo
function debounce(func, ms) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}
```

`Debounce` qo‘ng‘irog‘i o‘rovchini qaytaradi. Chaqirilganda, u berilgan `ms` dan keyin asl funktsiya chaqiruvini rejalashtiradi va oldingi bunday kutish vaqtini bekor qiladi.
