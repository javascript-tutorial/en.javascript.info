# Мышонок на "клавиатурном" приводе

[importance 4]

Кликните по мышонку. Затем нажимайте клавиши со стрелками, и он будет двигаться.

<style>
##mousie:focus {
  outline: none;
  border: 1px dashed black;
}
</style>

<div style="position:relative;top:20px;width:100px;height:100px">
  <div style="width:41px; height:48px;background:url(http://js.cx/clipart/mousie.gif)" id="mousie" tabindex="0"></div>
</div>

<script>
mousie.onclick = function() {
  var coords = getCoords(this);
  this.style.position = 'absolute';
  this.style.left = coords.left + 'px';
  this.style.top = coords.top + 'px';

  if (this.parentNode != document.body) {
    document.body.appendChild(this);
    this.focus();
  }
};


mousie.onkeydown = function(e) {
  e = e || event;

  switch(e.keyCode) {
  case 40: // вниз
    this.style.top = parseInt(this.style.top) + this.offsetHeight + 'px';
    return false;
  case 39: // вправо
    this.style.left = parseInt(this.style.left) + this.offsetWidth + 'px';
    return false;
  case 38: // вверх
    this.style.top = parseInt(this.style.top) - this.offsetHeight + 'px';
    return false;
  case 37: // влево
    this.style.left = parseInt(this.style.left) - this.offsetWidth + 'px';
    return false;
  }
};


// -----------------------


function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docElem = document.documentElement;

    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}

</script>

Учтите при решении, что мышонок изначально находится где-то в глубине документа, в `DIV'е` с `position:relative`.

