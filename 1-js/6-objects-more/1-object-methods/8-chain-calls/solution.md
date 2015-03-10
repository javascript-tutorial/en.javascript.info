Решение состоит в том, чтобы каждый раз возвращать текущий объект. Это делается добавлением `return this` в конце каждого метода:

```js
//+ run
var ladder = {
  step: 0,
  up: function() {
    this.step++;
    return this;
  },
  down: function() {
    this.step--;
    return this;
  },
  showStep: function() {
    alert( this.step );
    return this;
  }
}

ladder.up().up().down().up().down().showStep(); // 1
```

