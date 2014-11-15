

```js
function throttle(func, ms) {
    
  var isThrottled = false,
    savedArgs,
    savedThis;
        
  function wrapper() {
        
    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
            
    func.apply(this, arguments);  // (1)
      
    isThrottled = true;
        
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

Шаги работы этой функции:
<ol>
<li>Декоратор `throttle` возвращает функцию-обёртку `wrapper`, которая при первом вызове запускает `func` и переходит в состояние "паузы" (`isThrottled = true`).</li>
<li>В этом состоянии все новые вызовы запоминаются в замыкании через `savedArgs/savedThis`. Обратим внимание, что и контекст вызова и аргументы для нас одинаково важны и запоминаются одновременно. Только зная и то и другое, можно воспроизвести вызов правильно.</li>
<li>Далее, когда пройдёт таймаут `ms` миллисекунд -- пауза будет снята, а `wrapper` -- запущен с последними аргументами и контекстом (если во время паузы были вызовы).</li>
</ol>

Шаг `(3)` запускает именно не саму функцию, а снова `wrapper`, так как необходимо не только выполнить `func`, но и снова поставить выполнение на паузу. Получается последовательность "вызов - пауза.. вызов - пауза .. вызов - пауза ...", каждое выполнение в обязательном порядке сопровождается паузой после него. Это удобно описывается рекурсией.
