
function ListSelect(options) {
  var elem = options.elem;

  var lastClickedLi = null;

  elem.on('click', 'li', onLiClick);
  elem.on('selectstart mousedown', false);

  function onLiClick(e) {
    var li = $(this);

    if(e.metaKey || e.ctrlKey) { // для Mac проверяем Cmd, т.к. Ctrl + click там контекстное меню
      toggleSelect(li);
    } else if (e.shiftKey) {
      selectFromLast(li);
    } else {
      selectSingle(li);
    }

    lastClickedLi = li;
  }

  function deselectAll() {
    elem.children().removeClass('selected');
  }    

  function toggleSelect(li) {
    li.toggleClass('selected');
  }

  function selectSingle(li) {
    deselectAll();
    li.addClass('selected');
  }

  function selectFromLast(target) {
    var startElem = lastClickedLi || elem.children().first();

    target.addClass('selected');
    if (startElem[0] == target[0]) {
      // клик на том же элементе, что и раньше
      // это особый случай
      return; 
    }

    var isLastClickedBefore = startElem.index() < target.index();

    if (isLastClickedBefore) {
      startElem.nextUntil(target).add(startElem).addClass('selected');
    } else {
      startElem.prevUntil(target).add(startElem).addClass('selected');
    }
  }

  this.getSelected = function() {
    return elem.children('.selected').map(function() {
      return this.innerHTML;
    }).toArray();
  };
}
