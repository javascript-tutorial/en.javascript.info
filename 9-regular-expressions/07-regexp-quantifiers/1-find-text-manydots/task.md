importance: 5

---

#  How to find an ellipsis "..." ?

Create a regexp to find ellipsis: 3 (or more?) dots in a row.

Check it:

```js
let reg = /your regexp/g;
alert( "Hello!... How goes?.....".match(reg) ); // ..., .....
```
