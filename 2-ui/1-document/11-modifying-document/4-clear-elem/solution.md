
First, let's see how not to do it:

```js
function clear(elem) {
  for (let i=0; i < elem.childNodes.length; i++) {
      elem.childNodes[i].remove();
  }
}
```

That won't work, because the call to `remove()` shifts the collection `elem.childNodes` every time, so elements every time start from index `0`. So `i` should not increase in the loop at all.

The `for..of` loop also does the same.

The right variant would be:

```js
function clear(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}
```

And also there's a simpler variant:

```js
function clear(elem) {
  elem.innerHTML = '';
}
```
