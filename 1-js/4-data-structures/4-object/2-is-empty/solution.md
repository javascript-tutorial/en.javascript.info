There are many ways to solve that.

Here are two of them:

```js
function isEmpty(obj) 
  return Object.keys(obj).length == 0;
}
```

```js
function isEmpty(obj) 
  for(let key in obj) {
    return false;
  }
  return true;
}
```

The second one is probably more performant.