function Menu(options) {
  var elem;

  function getElem() {
    if (!elem) render();
    return elem;
  }

  function render() {
    var elemHtml = options.template({title: options.title});

    elem = $(elemHtml);

    elem.on('mousedown selectstart', false);

    elem.on('click', '.title', onTitleClick);
  }

  function renderItems() {
    if (elem.find('ul').length) return;
    
    var listHtml = options.listTemplate({items: options.items});
    elem.append(listHtml);
  }

  function onTitleClick(e) {
    toggle();
  }

  function open() {
    renderItems();
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