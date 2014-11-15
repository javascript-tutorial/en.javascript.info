
table.onmouseover = function(event) {
  var target = event.target; 
  target.style.background = 'pink';
  text.value += "mouseover " + target.tagName + "\n";
};

table.onmouseout = function(event) {
  var target = event.target; 
  target.style.background = '';
  text.value += "mouseout " + target.tagName + "\n";
};