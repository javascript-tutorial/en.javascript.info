function CustomSelect(options) {
  var elem = options.elem;

  elem.onclick = function(event) {
    if (event.target.className == 'title') {
      toggle();
    } else if (event.target.tagName == 'LI') {
      setValue(event.target.innerHTML, event.target.dataset.value);
      close();
    }
  }

  var isOpen = false;

  // ------ обработчики ------

  // закрыть селект, если клик вне его
  function onDocumentClick(event) {
    if (!elem.contains(event.target)) close();
  }

  // ------------------------

  function setValue(title, value) {
    elem.querySelector('.title').innerHTML = title;

    var widgetEvent = new CustomEvent('select', {
      bubbles: true,
      detail: {
        title: title,
        value: value
      }
    });

    elem.dispatchEvent(widgetEvent);

  }

  function toggle() {
    if (isOpen) close()
    else open();
  }

  function open() {
    elem.classList.add('open');
    document.addEventListener('click', onDocumentClick);
    isOpen = true;
  }

  function close() {
    elem.classList.remove('open');
    document.removeEventListener('click', onDocumentClick);
    isOpen = false;
  }

}