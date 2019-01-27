

```js run
let styles = ["Jazz", "Blues"];
styles.push("Rock-n-Roll");
styles[Math.floor((styles.length - 1) / 2)] = "Classics"; 
or
styles.splice(styles.length/2,1);
styles.splice(styles.length/2,0,"Classics");
alert( styles.shift() );
styles.unshift("Rap", "Reggae");
```

