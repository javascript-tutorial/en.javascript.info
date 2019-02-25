importance: 5

---

# Extended clock

We've got a `Clock` class. As of now, it prints the time every second:

```js run
// clock.js

class Clock {
  constructor({ template }) {
    this._template = template;
  }

  _render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = this._template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);
  }

  stop() {
    clearInterval(this._timer);
  }

  start() {
    this._render();
    this._timer = setInterval(() => this._render(), 1000);
  }
}

let clock = new Clock({
  template: 'h:m:s',
});

clock.start();

```
Create a new class `ExtendedClock` that inherits from `Clock` and adds the parameter `precision` -- the number of `ms` between "ticks". Should be `1000` (1 second) by default.

- Your code should be in the file `extended-clock.js`
- Don't modify the original `clock.js`. Extend it.

