function Clock(options) {
  var elem = options.elem;

  var timer;

  function render() {
    var date = new Date();

    var hours = date.getHours();
    if (hours < 10) hours = '0' + hours;
    elem.querySelector('.hour').innerHTML = hours;

    var min = date.getMinutes();
    if (min < 10) min = '0' + min;
    elem.querySelector('.min').innerHTML = min;

    var sec = date.getSeconds();
    if (sec < 10) sec = '0' + sec;
    elem.querySelector('.sec').innerHTML = sec;
  }

  this.stop = function() {
    clearInterval(timer);
  };

  this.start = function() {
    render();
    timer = setInterval(render, 1000);
  };

}