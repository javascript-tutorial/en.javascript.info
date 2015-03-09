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