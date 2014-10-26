function Menu(options) {
  var elem;

  function getElem() {
    if (!elem) render();
    return elem;
  }

  function render() {
    elem = $('<div class="menu"></div>');
    elem.append( $('<span/>', { class: "title", text: options.title }))

    elem.on('mousedown selectstart', false);

    elem.on('click', '.title', onTitleClick);
  }

  function renderItems() {
    var items = options.items || [];
    var list = $('<ul/>');
    $.each(items, function(i, item) {
      list.append( $('<li>').text(item) );
    })
    list.appendTo(elem);
  }

  function onTitleClick(e) {
    toggle();
  }

  function open() {
    if (!elem.find('ul').length) {
      renderItems();
    }
    elem.addClass('open');
  };

  function close() {
    elem.removeClass('open');
  };

  function toggle() {
    if (elem.hasClass('open')) close();
    else open();
  };

  this.getElem = getElem;
  this.toggle = toggle;
  this.close = close;
  this.open = open;
}