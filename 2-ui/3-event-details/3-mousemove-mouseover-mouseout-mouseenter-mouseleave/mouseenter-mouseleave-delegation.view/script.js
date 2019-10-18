table.onmouseover = function(event) {
  let target = event.target;
  target.style.background = 'pink';

  text.value += `OVER -> ${target.tagName}.${target.className}\n`;
  text.scrollTop = text.scrollHeight;
};

table.onmouseout = function(event) {
  let target = event.target;
  target.style.background = '';

  text.value += `OUT <- ${target.tagName}.${target.className}\n`;
  text.scrollTop = text.scrollHeight;
};
