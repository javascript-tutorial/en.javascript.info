# Значение this в объявлении объекта

[importance 5]

Что выведет `alert` в этом коде? Почему?

```js
var name = "";

var user = {
  name: "Василий",
        
  export: this
};  

alert(user.export.name);
```

