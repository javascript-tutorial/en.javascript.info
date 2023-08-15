function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // shooter funksiyasi
      alert( i ); // raqamini ko'rsatishi kerak
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

/*
let army = makeArmy();

army[0](); // 0-raqamli shooter 10 ni ko'rsatadi
army[5](); // va 5 raqami ham 10 ni chiqaradi ...
// ... barcha shooterlar 0, 1, 2, 3... oʻrniga 10 ni koʻrsatadilar...
*/
