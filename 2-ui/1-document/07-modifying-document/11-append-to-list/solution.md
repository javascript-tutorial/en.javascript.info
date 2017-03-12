
When we need to insert a piece of HTML somewhere, `insertAdjacentHTML` is the best fit.
  
The solution:

```js
one.insertAdjacentHTML('afterend', '<li>2</li><li>3</li>');
```
