 
function TreeDropTarget(elem) {
  TreeDropTarget.parent.constructor.apply(this, arguments);
}

extend(TreeDropTarget, DropTarget);

TreeDropTarget.prototype._showHoverIndication = function() {
  this._targetElem && this._targetElem.classList.add('hover');
};

TreeDropTarget.prototype._hideHoverIndication = function() {
  this._targetElem && this._targetElem.classList.remove('hover');
};

TreeDropTarget.prototype._getTargetElem = function(avatar, event) {
  var target = avatar.getTargetElem();
  if (target.tagName != 'SPAN') {
    return;
  }

  // проверить, может быть перенос узла внутрь самого себя или в себя?
  var elemToMove = avatar.getDragInfo(event).dragZoneElem.parentNode;

  var elem = target;
  while(elem) {
    if (elem == elemToMove) return; // попытка перенести родителя в потомка
    elem = elem.parentNode;
  }

  return target;
};

TreeDropTarget.prototype.onDragEnd = function(avatar, event) {

  if (!this._targetElem) {
    // перенос закончился вне подходящей точки приземления
    avatar.onDragCancel();
    return;
  }

  this._hideHoverIndication();

  // получить информацию об объекте переноса
  var avatarInfo = avatar.getDragInfo(event);

  avatar.onDragEnd(); // аватар больше не нужен, перенос успешен

  // вставить элемент в детей в отсортированном порядке
  var elemToMove = avatarInfo.dragZoneElem.parentNode; // <LI>
  var title = avatarInfo.dragZoneElem.innerHTML; // переносимый заголовок

  // получить контейнер для узлов дерева, соответствующий точке преземления
  var ul = this._targetElem.parentNode.getElementsByTagName('UL')[0];
  if (!ul) { // нет детей, создадим контейнер
    ul = document.createElement('UL');
    this._targetElem.parentNode.appendChild(ul);
  }

  // вставить новый узел в нужное место среди потомков, в алфавитном порядке
  var li = null;
  for(var i=0; i < ul.children.length; i++) {
    li = ul.children[i];
    var childTitle = li.children[0].innerHTML;
    if (childTitle > title) {
      break;
    }
  }

  ul.insertBefore(elemToMove, li);

  this._targetElem = null;
};
