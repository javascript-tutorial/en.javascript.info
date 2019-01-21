importance: 2

---

# Chaining

There's a `ladder` object that allows to go up and down:

```js
let ladder = {
  step: 0,
  up() { 
    this.step++;
  },
  down() { 
    this.step--;
  },
  showStep: function() { // shows the current step
    alert( this.step );
  }
};
```

Now, if we need to make several calls in sequence, can do it like this:

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
```

Modify the code of `up`, `down` and `showStep` to make the calls chainable, like this:

```js
ladder.up().up().down().showStep(); // 1
```

Such approach is widely used across JavaScript libraries.
