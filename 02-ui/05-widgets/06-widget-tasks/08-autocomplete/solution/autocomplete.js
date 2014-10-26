function Autocomplete(options) {
  var self = this;

  var elem = options.elem;
  
  var input = $('input', elem);
  var list;

  input.on({
    focus: onInputFocus,
    blur: onInputBlur,
    keydown: onInputKeyDown
  });

  var inputCheckTimer;

  // ------------------

  function onInputKeyDown(e) {
    var KEY_ARROW_UP = 38;
    var KEY_ARROW_RIGHT = 39;
    var KEY_ARROW_DOWN = 40;
    var KEY_ENTER = 13;
    var KEY_ESC = 27;

    switch(e.keyCode) {
      case KEY_ARROW_UP:
        list.up();
        return false;
        break;

      case KEY_ARROW_RIGHT:
        if (list.get()) {
          self.setValue( list.get(), true );
        }
        break;

      case KEY_ENTER:
        self.setValue( list.get() || input.val() );
        input.blur();
        break;

      case KEY_ESC:
        list.clear();
        break;

      case KEY_ARROW_DOWN:
        list.down();
        return false;
        break;
    }

  }

  function initList() {
    list = new AutocompleteList(options.provider);
    list.render().appendTo(elem);
    $(list).on('update', onListUpdate);
  }

  function onListUpdate(e) {
    if (e.values.length) {
      elem.addClass('open');
    } else {
      elem.removeClass('open');
    }
  }

  function onInputFocus() {
    var inputValue = input.val();
    function checkInput() {
      if (inputValue != input.val()) {

        if (!list) {
          initList();
        } 

        list.update(input.val());
        inputValue = input.val();
      }
    }

    inputCheckTimer = setInterval(checkInput, 30);
  }

  function onInputBlur() {
    clearInterval(inputCheckTimer);
    if (list) {
      list.clear();
    }
  }

  this.setValue = function(value, quiet) {
    input.val(value);
    if (!quiet) {
      $(self).triggerHandler({
        type: 'change',
        value: value
      });
    }
  }

}