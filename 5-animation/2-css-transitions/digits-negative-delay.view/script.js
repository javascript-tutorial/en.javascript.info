stripe.onclick = function() {
  var sec = new Date().getSeconds() % 10;
  stripe.style.transitionDelay = '-' + sec + 's';
  stripe.classList.add('animate');
};