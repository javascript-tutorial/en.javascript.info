
```js run
*!*
let ask = (question, yes, no) => (confirm(question) ? yes() : no());
*/!*

ask(
  "Do you agree?",
*!*
  () => alert("You agreed."),
  () => alert("You canceled the execution.")
*/!*
);
```

Looks short and clean, right?
