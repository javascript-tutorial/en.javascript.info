function Slider(options) {
  var elem = options.elem;

  var thumbElem = elem.querySelector('.thumb');

  var max = options.max || 100;
  var sliderCoords, thumbCoords, shiftX, shiftY;

  // [<*>----------------]
  //   |...............|
  // first            last
  var pixelsPerValue = (elem.clientWidth - thumbElem.clientWidth) / max;

  elem.ondragstart = function() {
    return false;
  };

  elem.onmousedown = function(event) {
    if (event.target.closest('.thumb')) {
      startDrag(event.clientX, event.clientY);
      return false; // disable selection start (cursor change)
    }
  }

  function startDrag(startClientX, startClientY) {
    thumbCoords = thumbElem.getBoundingClientRect();
    shiftX = startClientX - thumbCoords.left;
    shiftY = startClientY - thumbCoords.top;

    sliderCoords = elem.getBoundingClientRect();

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  }

  function moveTo(clientX) {
    // вычесть координату родителя, т.к. position: relative
    var newLeft = clientX - shiftX - sliderCoords.left;

    // курсор ушёл вне слайдера
    if (newLeft < 0) {
      newLeft = 0;
    }
    var rightEdge = elem.offsetWidth - thumbElem.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    thumbElem.style.left = newLeft + 'px';

    elem.dispatchEvent(new CustomEvent('slide', {
      bubbles: true,
      detail: positionToValue(newLeft)
    }));
  }

  function valueToPosition(value) {
    return pixelsPerValue * value;
  }

  function positionToValue(left) {
    return Math.round(left / pixelsPerValue);
  }

  function onDocumentMouseMove(e) {
    moveTo(e.clientX);
  }

  function onDocumentMouseUp() {
    endDrag();
  }

  function endDrag() {
    document.removeEventListener('mousemove', onDocumentMouseMove);
    document.removeEventListener('mouseup', onDocumentMouseUp);

    elem.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      detail: positionToValue(parseInt(thumbElem.style.left))
    }));
  }

  function setValue(value) {
    thumbElem.style.left = valueToPosition(value) + 'px';
  }

  this.setValue = setValue;
}