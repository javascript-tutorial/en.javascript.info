

```js run
let styles = ["Jazz", "Blues"];
styles.push("Rock-n-Roll");
styles.splice(styles.length/2,1);
styles.splice(styles.length/2,0,"Classics");
alert( styles.shift() );
styles.unshift("Rap", "Reggae");
console.log(styles)
```

