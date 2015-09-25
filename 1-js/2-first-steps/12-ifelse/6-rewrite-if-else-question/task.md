# Rewrite 'if..else' into '?'

[importance 5]

Rewrite `if..else` using multiple ternary operators `'?'`. 

For readability, please let the code span several lines.

```js
let message;

if (login == 'Employee') {
  message = 'Hello';
} else if (login == 'Director') {
  message = 'Greetings';
} else if (login == '') {
  message = 'No login';
} else {
  message = '';
}
```

