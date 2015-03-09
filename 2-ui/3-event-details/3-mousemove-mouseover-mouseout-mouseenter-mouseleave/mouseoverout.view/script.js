document.body.onmouseover = document.body.onmouseout = handler;

function handler(event) {

  function str(el) {
    if (!el) return "null"
    return el.className || el.tagName;
  }

  log.value += event.type + ': ' +
    'target=' + str(event.target) +
    ', relatedTarget=' + str(event.relatedTarget) + "\n";
  log.scrollTop = 1e9;

  if (event.type == 'mouseover') {
    event.target.style.background = 'pink'
  }
  if (event.type == 'mouseout') {
    event.target.style.background = ''
  }
}