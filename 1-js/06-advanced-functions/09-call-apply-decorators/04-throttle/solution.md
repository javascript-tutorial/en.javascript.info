```js demo
function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;

    func.apply(this, arguments); // (1)

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
```

`throttle(func, ms)` ni chaqirish `wrapper` qaytaradi.

1. Birinchi chaqiruv paytida `wrapper` shunchaki `func` ni ishga tushiradi va sovutish holatini o'rnatadi (`isThrottled = true `).
2. Bu holatda barcha chaqiruvlar `savedArgs/savedThis` da yodlanadi. E'tibor bering, kontekst ham, dalillar ham bir xil darajada muhim va ularni eslab qolish kerak. chaqiruvni takrorlash uchun bizga ular bir vaqtning o'zida kerak.
3. `ms` millisekundlar o'tgandan so'ng, `setTimeout` ishga tushadi. Sovutish holati o'chiriladi (`isThrottled = false`) va agar biz chaqiruvlarni e'tiborsiz qoldirgan bo'lsak, `o'rash` oxirgi eslab qolgan argumentlar va kontekst bilan bajariladi.

3-qadam `func` emas, balki `wrapper` bilan ishlaydi, chunki biz nafaqat `func`ni bajarishimiz, balki yana sovutish holatiga kirishimiz va uni qayta o‘rnatish uchun kutish vaqtini sozlashimiz kerak.
