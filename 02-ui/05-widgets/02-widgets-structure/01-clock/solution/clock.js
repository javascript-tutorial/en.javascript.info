function Clock(options) {
  var elem = options.elem;

  var timer;

  function render() {
    var date = new Date();

    var hours = date.getHours();
    if (hours < 10) hours = '0' + hours;
    $('.hour', elem).html(hours);

    var min = date.getMinutes();
    if (min < 10) min = '0' + min;
    $('.min', elem).html(min);

    var sec = date.getSeconds();
    if (sec < 10) sec = '0' + sec;
    $('.sec', elem).html(sec);
  }

  this.stop = function() {
    clearInterval(timer);
  };

  this.start = function() {
    render();
    timer = setInterval(render, 1000);
  }

}
