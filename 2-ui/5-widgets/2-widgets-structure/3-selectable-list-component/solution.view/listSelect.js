function ListSelect(options) {
  var elem = options.elem;

  var lastClickedLi = null;

  elem.onmousedown = function() {
    return false;
  };

  elem.onclick = function(e) {
    var li = e.target.closest('li');
    if (!li) return;

    if (e.metaKey || e.ctrlKey) { // для Mac проверяем Cmd, т.к. Ctrl + click там контекстное меню
      toggleSelect(li);
    } else if (e.shiftKey) {
      selectFromLast(li);
    } else {
      selectSingle(li);
    }

    lastClickedLi = li;
  }

  function deselectAll() {
    [].forEach.call(elem.children, function(child) {
      child.classList.remove('selected')
    });
  }

  function toggleSelect(li) {
    li.classList.toggle('selected');
  }

  function selectSingle(li) {
    deselectAll();
    li.classList.add('selected');
  }

  function selectFromLast(target) {
    var startElem = lastClickedLi || elem.children[0];

    target.classList.add('selected');
    if (startElem == target) {
      // клик на том же элементе, что и раньше
      // это особый случай
      return;
    }

    var isLastClickedBefore = startElem.compareDocumentPosition(target) & 4;

    if (isLastClickedBefore) {
      for (var elem = startElem; elem != target; elem = elem.nextElementSibling) {
        elem.classList.add('selected');
      }
    } else {
      for (var elem = startElem; elem != target; elem = elem.previousElementSibling) {
        elem.classList.add('selected');
      }
    }
  }

  this.getSelected = function() {
    return [].map.call(elem.querySelectorAll('.selected'), function(li) {
      return li.innerHTML;
    });
  };
}