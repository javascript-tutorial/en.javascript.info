importance: 5

---

# Rewrite the "switch" into an "if"

Write the code using `if..else` which would correspond to the following `switch`:

```js
switch (browser) {
  case 'Edge':
    alert( "У вас браузер Edge!" );
    break;

  case 'Chrome':
  case 'Firefox':
  case 'Safari':
  case 'Opera':
    alert( 'Мы поддерживаем и эти браузеры' );
    break;

  default:
    alert( 'Надеемся, что эта страница выглядит хорошо!' );
}
```
