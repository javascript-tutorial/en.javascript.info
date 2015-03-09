function TreeDragAvatar(dragZone, dragElem) {
  DragAvatar.apply(this, arguments);
}

extend(TreeDragAvatar, DragAvatar);

TreeDragAvatar.prototype.initFromEvent = function(downX, downY, event) {
  if (event.target.tagName != 'SPAN') return false;

  this._dragZoneElem = event.target;
  var elem = this._elem = this._dragZoneElem.cloneNode(true);
  elem.className = 'avatar';

  // создать вспомогательные свойства shiftX/shiftY
  var coords = getCoords(this._dragZoneElem);
  this._shiftX = downX - coords.left;
  this._shiftY = downY - coords.top;

  // инициировать начало переноса
  document.body.appendChild(elem);
  elem.style.zIndex = 9999;
  elem.style.position = 'absolute';

  return true;
};

/**
 * Вспомогательный метод
 */
TreeDragAvatar.prototype._destroy = function() {
  this._elem.parentNode.removeChild(this._elem);
};

/**
 * При любом исходе переноса элемент-клон больше не нужен
 */
TreeDragAvatar.prototype.onDragCancel = function() {
  this._destroy();
};

TreeDragAvatar.prototype.onDragEnd = function() {
  this._destroy();
};