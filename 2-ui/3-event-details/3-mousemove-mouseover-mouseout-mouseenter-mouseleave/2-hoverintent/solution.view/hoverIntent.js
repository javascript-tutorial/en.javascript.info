function HoverIntent(options) {

  options = Object.create(options); // not to modify the object
  options.interval = options.interval || 100;

  // скорость меньше 1px/ms  считается остановкой над элементом
  options.sensitivity = options.sensitivity || 0.1;
  var elem = options.elem;

  // instantiate variables
  // cX, cY = current X and Y position of mouse, updated by mousemove event
  // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
  var cX, cY, pX, pY, cTime, pTime;
  var checkSpeedInterval;
  var isOverElement;
  var isHover;

  // A private function for handling mouse 'hovering'
  elem.addEventListener("mouseover", function(event) {

    if (isOverElement) {
      // если мы и так над элементом, то это всплывший переход внутри него
      // мы и так уже замеряем скорость, поэтому этот переход лишний
      return;
    }

    isOverElement = true;

    // при каждом движении мыши mousemove мы будем вычислять расстояние между
    // предыдущими и текущими координатами курсора 
    // если оно меньше sensivity, то скорость маленькая и это наведение на элемент
    // pX, pY - "предыдущие" координаты
    pX = event.pageX;
    pY = event.pageY;
    pTime = Date.now();

    elem.addEventListener('mousemove', onMouseMove);
  });

  elem.addEventListener("mouseout", function(event) {
    // если ушли вовне элемента
    if (event.relatedTarget && !elem.contains(event.relatedTarget)) {
      isOverElement = false;
      elem.removeEventListener('mousemove', onMouseMove);
      if (isHover) {
        // если была остановка над элементом
        options.out.call(elem, event);
        isHover = false;
      }
    }
  });

  function onMouseMove(event) {
    cX = event.pageX;
    cY = event.pageY;
    cTime = Date.now();

    if (pTime == cTime) return; // когда mousemove вместе с mouseover

    var speed = Math.sqrt(Math.pow(pX - cX, 2) + Math.pow(pY - cY, 2)) / (cTime - pTime);

    if (speed < options.sensitivity) {
      // если с предыдущей позиции меньше sensivity дистанция, то "остановка на элементе"
      elem.removeEventListener("mousemove", onMouseMove);
      isHover = true;
      options.over.call(elem, event);
    } else {
      // следующее измерение с текущей точки
      pX = cX;
      pY = cY;
      pTime = cTime;
    }
  }

}