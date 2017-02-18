importance: 2

---

# Two functions -- one object

Is it possible to create functions `A` and `B` such as `new A()==new B()`?

```js no-beautify
function A() { ... }
function B() { ... }

var a = new A;
var b = new B;

alert( a == b ); // true
```

If it is, then provide an example of their code.
