function makeArmy() {

  var shooters = [];

  for(var i=0; i<10; i++) {

    var shooter = (function(x) {

      return function() {
        alert( x ); 
      };

    })(i);

    shooters.push(shooter);   
  }

  return shooters; 
}
