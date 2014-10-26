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
    elem.on('click', 'a', onItemClick)
  }


  function renderItems() {
    if (elem.find('ul').length) return;
    
    var listHtml = options.listTemplate({items: options.items});
    elem.append(listHtml);
  }

  function onItemClick(e) {
    alert(e.currentTarget.getAttribute('href').slice(1));
    e.preventDefault();
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