/**
 * Зона, из которой можно переносить объекты
 * Умеет обрабатывать начало переноса на себе и создавать "аватар" 
 * @param elem DOM-элемент, к которому привязана зона
 */
function DragZone(elem) {
  elem.dragZone = this;
  this._elem = elem;
}

/**
 * Создать аватар, соответствующий зоне.
 * У разных зон могут быть разные типы аватаров
 */
DragZone.prototype._makeAvatar = function() {
  /* override */
};

/**
 * Обработать начало переноса.
 *
 * Получает координаты изначального нажатия мышки, событие.
 *
 * @param downX Координата изначального нажатия по X
 * @param downY Координата изначального нажатия по Y
 * @param event текущее событие мыши
 *
 * @return аватар или false, если захватить с данной точки ничего нельзя
 */
DragZone.prototype.onDragStart = function(downX, downY, event) {

  var avatar = this._makeAvatar();

  if (!avatar.initFromEvent(downX, downY, event)) {
    return false;
  }

  return avatar;
};