table.onmouseover = function(event) {
  let target = event.target;
  target.style.background = 'pink';

  text.value += `over -> ${target.tagName}\n`;
  text.scrollTop = text.scrollHeight;
};

table.onmouseout = function(event) {
  let target = event.target;
  target.style.background = '';

  text.value += `out <- ${target.tagName}\n`;
  text.scrollTop = text.scrollHeight;
};
