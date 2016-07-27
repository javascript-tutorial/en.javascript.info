

```js run
function delay(f, ms) {

*!*
  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };
*/!*

}

function f(x) {
  alert(x);
}

let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // shows "test" after 1000ms
f1500("test"); // shows "test" after 1500ms
```

Arrow function makes it easy, because `setTimeout` uses arguments and context of the wrapper .

