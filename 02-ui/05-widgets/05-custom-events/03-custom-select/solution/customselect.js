function CustomSelect(options) {
  var self = this;

  var elem = options.elem;

  elem.on('click', '.customselect-title', onTitleClick);
  elem.on('click', 'li', onOptionClick);

  var isOpen = false;

  // ------ обработчики ------

  function onTitleClick(event) {
    toggle();
  }

  // закрыть селект, если клик вне его
  function onDocumentClick(event) {
    var isInside = $(event.target).closest(elem).length;
    if (!isInside) close();
  }

  function onOptionClick(event) {
    close();

    var name = $(event.target).html(); 
    var value = $(event.target).data('value'); 
        
    setValue(name, value);
  }

  // ------------------------

  function setValue(name, value) {
    elem.find('.customselect-title').html(name);

    $(self).triggerHandler({
      type: 'select',
      name: name,
      value: value
    });
  }

  function toggle() {
    if (isOpen) close()
    else open();
  }

  function open() {
    elem.addClass('customselect-open');
    $(document).on('click', onDocumentClick);
    isOpen = true;
  }

  function close() {
    elem.removeClass('customselect-open');
    $(document).off('click', onDocumentClick);
    isOpen = false;
  }

}
