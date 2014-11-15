function Menu(options) {
  var elem = options.elem;

  // отмена выделения при клике на меню
  elem.on('mousedown selectstart', false);

  elem.on('click', '.title', function() {
    elem.toggleClass('open');
  });

}
