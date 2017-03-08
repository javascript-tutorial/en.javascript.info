table.onmouseenter = table.onmouseleave = log;

function log(event) {
  text.value += event.type + ' [target: ' + event.target.tagName + ']\n';
  text.scrollTop = text.scrollHeight;
}