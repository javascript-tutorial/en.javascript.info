```js run
function User(name, birthday) {
  let age = calcAge();

  function calcAge() {
    new Date().getFullYear() - birthday.getFullYear();
  }

  this.sayHi = function() {
    alert(name + ', age:' + age);
  };
}

let user = new User("John", new Date(2000,0,1));
user.sayHi(); // John
```
