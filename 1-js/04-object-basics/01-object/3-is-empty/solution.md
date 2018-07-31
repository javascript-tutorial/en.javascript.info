Just loop over the object and `return false` immediately if there's at least one property.

```js
function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}
```
