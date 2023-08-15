function makeArmy() {

  let shooters = [];

  for(let i = 0; i < 10; i++) {
    let shooter = function() { // shooter funksiyasi
      alert( i ); // raqamini ko'rsatishi kerak
    };
    shooters.push(shooter);
  }

  return shooters;
}
