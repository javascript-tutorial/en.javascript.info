# Вопрос по управлению памятью

[importance 5]

Посмотрите внимательно на код ниже.

```js
//+ run
function Donkey() {
   var name = "Ослик Иа";

   this.sayHi = function() {
     alert(name);
   };

   this.yell = function() {
     alert('И-а, и-а!');
   };
}

var donkey = new Donkey();
donkey.sayHi();
```

Удалится ли переменная `name` из памяти, если выполнить `delete donkey.sayHi`? 

<ol>
<li>Да.</li>
<li>Нет.</li>
<li>Зависит от браузера.</li>
<li>Зависит от положения звёзд.</li>
</ol>
