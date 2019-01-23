``` js run
    function camelize(str) {
      return str
        .split('-') // my-long-word -> ['my', 'long', 'word']
        .map( 
          (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
        ) // ['my', 'long', 'word'] -> ['my', 'Long', 'Word']
        .join(''); // ['my', 'Long', 'Word'] -> myLongWord
    }

    camelize("background-color") == 'backgroundColor'; // each call,
    camelize("list-style-image") == 'listStyleImage'; // should return
    camelize("-webkit-transition") == 'WebkitTransition'; // true.
```
