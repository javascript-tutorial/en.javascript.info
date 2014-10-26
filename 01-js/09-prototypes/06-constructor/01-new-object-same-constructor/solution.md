Да, можем, но только если уверены, что кто-то позаботился о том, чтобы значение `constructor` было верным.

В частности, без вмешательства в прототип код точно работает, например:

```js
//+ run
function User(name) { 
  this.name = name;
}

var obj = new User('Вася');
var obj2 = new obj.constructor('Петя');

alert(obj2.name); // Петя (сработало)
```

Сработало, так как `User.prototype.constructor == User`. 

Но если кто-то, к примеру, перезапишет `User.prototype` и забудет указать `constructor`, то такой фокус не пройдёт.