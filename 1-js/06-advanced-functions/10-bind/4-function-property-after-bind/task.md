importance: 5

---

# Function property after bind

There's a value in the property of a function. Will it change after `bind`? Why, or why not?

```js run
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

*!*
let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // what will be the output? why?
*/!*
```

