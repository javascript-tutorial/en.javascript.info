function makeArmy() {

  var shooters = [];

  for (var i = 0; i < 10; i++) {
    var shooter = function() { // функция-стрелок
      alert(i); // выводит свой номер
    };
    shooters.push(shooter);
  }

  return shooters;
}