importance: 5

---

# Why are both hamsters full?

We have two hamsters: `speedy` and `lazy` inheriting from the general `hamster` object. 

When we feed one of them, the other one is also full. Why? How can we fix it?

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// This one found the food
speedy.eat("apple");
alert( speedy.stomach ); // apple

// This one also has it, why? fix please.
alert( lazy.stomach ); // apple
```

