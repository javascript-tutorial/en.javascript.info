function TreeDragZone(elem) {
  DragZone.apply(this, arguments);
}

extend(TreeDragZone, DragZone);

TreeDragZone.prototype._makeAvatar = function() {
  return new TreeDragAvatar(this, this._elem);
};