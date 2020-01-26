importance: 4

---

# Is variable visible?

What will be the result of this code?

```js
let x = 1;

function func() {
  console.log(x); // ?

  let x = 2;
}

func();
```

P.S. There's a pitfall in this task. The solution is not obvious.
