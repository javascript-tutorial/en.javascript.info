
First, let's see how *not* to do it:

```js
function clear(elem) {
  for (let i=0; i < elem.childNodes.length; i++) {
      elem.childNodes[i].remove();
  }
}
```

That won't work, because the call to `remove()` shifts the collection `elem.childNodes`, so elements start from the index `0` every time. But `i` increases, and some elements will be skipped.

The `for..of` loop also does the same.

The right variant could be:

```js
function clear(elem) {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
}
```

And also there's a simpler way to do the same:

```js
function clear(elem) {
  elem.innerHTML = '';
}
```
