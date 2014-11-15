Текущее значение текста удобно хранить в замыкании, в локальной переменной `makeBuffer`:

```js
//+ run
function makeBuffer() {
  var text = ''; 
    
  return function(piece) {
    if (arguments.length == 0) { // вызов без аргументов
      return text;
    }
    text += piece; 
  };
};

var buffer = makeBuffer();

// добавить значения к буферу
buffer('Замыкания'); 
buffer(' Использовать'); 
buffer(' Нужно!'); 
alert( buffer() ); // 'Замыкания Использовать Нужно!'

var buffer2 = makeBuffer();
buffer2(0); buffer2(1); buffer2(0);

alert( buffer2() ); // '010'
```

Начальное значение `text = ''` -- пустая строка. Поэтому операция `text += piece` прибавляет `piece` к строке, автоматически преобразуя его к строковому типу, как и требовалось в условии.
