

```js
//+ run
function makeBuffer() {
  var text = '';

  function buffer(piece) {
    if (arguments.length == 0) { // вызов без аргументов
      return text;
    }
    text += piece;
  };

  buffer.clear = function() {
    text = "";
  }

  return buffer;
};

var buffer = makeBuffer();

buffer("Тест");
buffer(" тебя не съест ");
alert( buffer() ); // Тест тебя не съест

*!*
buffer.clear();
*/!*

alert( buffer() ); // ""
```

