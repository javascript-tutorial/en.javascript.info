# Возврат this

[importance 5]

Что выведет `alert` в этом коде? Почему?

```js
var name = "";

var user = {
  name: "Василий",

  export: function() {
    return this;
  }

};

alert( user.export().name );
```

