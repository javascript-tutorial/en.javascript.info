var dragManager = new function() {

  var dragZone, avatar, dropTarget;
  var downX, downY;

  var self = this;

  function onMouseDown(e) {

    if (e.which != 1) { // не левой кнопкой
      return false;
    }

    dragZone = findDragZone(e);

    if (!dragZone) {
      return;
    }

    // запомним, что элемент нажат на текущих координатах pageX/pageY
    downX = e.pageX;
    downY = e.pageY;

    return false;
  }

  function onMouseMove(e) {
    if (!dragZone) return; // элемент не зажат

    if (!avatar) { // элемент нажат, но пока не начали его двигать
      if (Math.abs(e.pageX - downX) < 3 && Math.abs(e.pageY - downY) < 3) {
        return;
      }
      // попробовать захватить элемент
      avatar = dragZone.onDragStart(downX, downY, e);

      if (!avatar) { // не получилось, значит перенос продолжать нельзя
        cleanUp(); // очистить приватные переменные, связанные с переносом
        return;
      }
    }

    // отобразить перенос объекта, перевычислить текущий элемент под курсором
    avatar.onDragMove(e);

    // найти новый dropTarget под курсором: newDropTarget
    // текущий dropTarget остался от прошлого mousemove
    // *оба значения: и newDropTarget и dropTarget могут быть null
    var newDropTarget = findDropTarget(e);

    if (newDropTarget != dropTarget) {
      // уведомить старую и новую зоны-цели о том, что с них ушли/на них зашли
      dropTarget && dropTarget.onDragLeave(newDropTarget, avatar, e);
      newDropTarget && newDropTarget.onDragEnter(dropTarget, avatar, e);
    }

    dropTarget = newDropTarget;

    dropTarget && dropTarget.onDragMove(avatar, e);

    return false;
  }

  function onMouseUp(e) {

    if (e.which != 1) { // не левой кнопкой
      return false;
    }

    if (avatar) { // если уже начали передвигать

      if (dropTarget) {
        // завершить перенос и избавиться от аватара, если это нужно
        // эта функция обязана вызвать avatar.onDragEnd/onDragCancel
        dropTarget.onDragEnd(avatar, e);
      } else {
        avatar.onDragCancel();
      }

    }

    cleanUp();
  }

  function cleanUp() {
    // очистить все промежуточные объекты
    dragZone = avatar = dropTarget = null;
  }

  function findDragZone(event) {
    var elem = event.target;
    while (elem != document && !elem.dragZone) {
      elem = elem.parentNode;
    }
    return elem.dragZone;
  }

  function findDropTarget(event) {
    // получить элемент под аватаром
    var elem = avatar.getTargetElem();

    while (elem != document && !elem.dropTarget) {
      elem = elem.parentNode;
    }

    if (!elem.dropTarget) {
      return null;
    }

    return elem.dropTarget;
  }

  document.ondragstart = function() {
    return false;
  }

  document.onmousemove = onMouseMove;
  document.onmouseup = onMouseUp;
  document.onmousedown = onMouseDown;
};