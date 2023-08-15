function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) {
      // sovugandan keyin chaqiruv qilish uchun oxirgi argumentlarni eslatib qo'ying
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    // aks holda sovutish holatiga o'ting
    func.apply(this, arguments);

    isThrottled = true;

    // kechikishdan keyin isThrottledni qayta tiklashni rejalashtiring
    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        // agar chaqiruvlar bo'lsa, savedThis/savedArgs oxirgisi bor
        // rekursiv chaqiruv funksiyani ishga tushiradi va yana sovutishni o'rnatadi
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}