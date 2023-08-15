function spy(func) {

  function wrapper(...args) {
    // "haqiqiy" massivni wrapper.call'da saqlash uchun argumentlar o'rniga ...argsdan foydalanish
    wrapper.calls.push(args);
    return func.apply(this, args);
  }

  wrapper.calls = [];

  return wrapper;
}
