importance: 3

---

# What toString "typeof"?

What will each of these return?

```js
let s = Object.prototype.toString;

alert( s.call(String) );
alert( s.call(new String) );

alert( s.call(Object) );
alert( s.call(new Object) );

alert( s.call(Symbol) );
alert( s.call(Symbol()) );
```
