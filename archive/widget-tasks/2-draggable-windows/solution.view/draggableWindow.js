// если начать перенос и передвинуть мышь максимально вверх -- верхний край окна не должен вылетать за край страницы.
// в другие стороны

// чтобы даже при резких движениях мыши -- окно прилипало к краю но не вылезало за край
// исключение -- максимальная нижняя позиция окна -- это когда только заголовок виден

// позиция мыши смещается
function DraggableWindow(options) {
  var self = this;

  var title = options.title;
  var template = typeof options.template == 'function' ? // компиляция, если строка
    options.template : _.template(options.template);

  var elem, contentElem;

  var mouseDownShift;

  function render() {
    elem = $('<div/>', {
      "class": "window",
      html: template({
        title: title
      })
    });

    $('form', elem).on('submit', onSubmit);

    titleElem = elem.find('.window-title');

    titleElem.on('selectstart dragstart', false);
    titleElem.on('mousedown', onTitleMouseDown);

    contentElem = elem.find('.window-content'); // = children[1]
  }

  this.getElement = function() {
    if (!elem) render();
    return elem;
  }

  function onTitleMouseDown(e) {
    startDrag(e.pageX, e.pageY);
    return false;
  };

  function startDrag(mouseDownX, mouseDownY) {
    // запомнить координаты нажатия
    var coords = elem.offset();
    mouseDownShift = {
      x: mouseDownX - coords.left,
      y: mouseDownY - coords.top
    };

    // двигать
    $(document).on({
      'mousemove.draggablewindow': onDocumentMouseMove,
      'mouseup.draggablewindow': onDocumentMouseUp
    });

    elem.addClass('window-moving');
  }

  function onDocumentMouseUp() {
    $(document).off('.draggablewindow');
    elem.removeClass('window-moving');
  }

  function onDocumentMouseMove(e) {
    moveWindowAtCursor(e.pageX, e.pageY);
  }

  function moveWindowAtCursor(pageX, pageY) {
    var newLeft = pageX - mouseDownShift.x;
    var newTop = pageY - mouseDownShift.y;

    // проверим, не вылезем ли мы за границы экрана
    var windowLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var windowTop = window.pageYOffset || document.documentElement.scrollTop;
    var windowRight = windowLeft + document.documentElement.clientWidth;
    var windowBottom = windowTop + document.documentElement.clientHeight;

    // тут не if..else, а if т.к., возможно, обе координаты надо поправить
    if (newLeft < windowLeft) {
      newLeft = windowLeft;
    }
    if (newLeft > windowRight - elem.outerWidth()) {
      newLeft = windowRight - elem.outerWidth(); // внешняя ширина с учетом рамки внешней
    }
    if (newTop < windowTop) {
      newTop = windowTop;
    }
    if (newTop > windowBottom - titleElem.outerHeight()) {
      newTop = windowBottom - titleElem.outerHeight();
      // внизу заголовок будет немного залезать за край, т.к. нужно мерять вместе с рамкой верхней на самом деле
      // но здесь это не страшно
    }

    elem.css({
      left: newLeft,
      top: newTop
    });
  };

  function onSubmit(e) {
    // принять события, совершить обработку события, связанную с формой
    var form = e.currentTarget;
    var value = form.elements.message.value;
    form.elements.message.value = '';
    if (value) {
      submit(value); // логика по отправке сообщения
    }
    return false;
  }

  function submit(message) {
    // добавить
    var newMessageElem = $('<div>', {
      text: message
    }).appendTo(contentElem);

    // прокрутить к новому сообщению
    contentElem.prop('scrollTop', 999999999);
  }


}