function Menu(options) {
  var elem;

  function getElem() {
    if (!elem) render();
    return elem;
  }

  function render() {
    var html = options.template({
      title: options.title
    });

    elem = document.createElement('div');
    elem.innerHTML = html;
    elem = elem.firstElementChild;

    elem.onmousedown = function() {
      return false;
    }

    elem.onclick = function(event) {
      if (event.target.closest('.title')) {
        toggle();
      }

      if (event.target.closest('a')) {
        event.preventDefault();
        select(event.target.closest('a'));
      }

    }
  }

  function renderItems() {
    if (elem.querySelector('ul')) return;

    var listHtml = options.listTemplate({
      items: options.items
    });
    elem.insertAdjacentHTML("beforeEnd", listHtml);
  }

  function select(link) {
    var widgetEvent = new CustomEvent("select", {
      bubbles: true,
      detail: link.getAttribute('href').slice(1)
    });
    elem.dispatchEvent(widgetEvent);
  }

  function open() {
    renderItems();
    elem.classList.add('open');
  };

  function close() {
    elem.classList.remove('open');
  };

  function toggle() {
    if (elem.classList.contains('open')) close();
    else open();
  };

  this.getElem = getElem;
  this.toggle = toggle;
  this.close = close;
  this.open = open;
}