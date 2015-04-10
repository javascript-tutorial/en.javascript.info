Решение:

```js
//+ run
function User() {

  var firstName, surname;

  this.setFirstName = function(newFirstName) {
    firstName = newFirstName;
  };

  this.setSurname = function(newSurname) {
    surname = newSurname;
  };

  this.getFullName = function() {
    return firstName + ' ' + surname;
  }
}

var user = new User();
user.setFirstName("Петя");
user.setSurname("Иванов");

alert( user.getFullName() ); // Петя Иванов
```

Обратим внимание, что для "геттера" `getFullName` нет соответствующего свойства объекта, он конструирует ответ "на лету". Это нормально. Одна из целей существования геттеров/сеттеров -- как раз и есть изоляция внутренних свойств объекта, чтобы можно было их как угодно менять, генерировать "на лету", а внешний интерфейс оставался тем же.