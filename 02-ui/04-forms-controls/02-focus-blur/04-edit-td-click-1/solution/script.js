
var table = document.getElementById('bagua-table');

table.onclick = function(event) {
  var target = event.target;

  while(target != table) {
    if (target.nodeName == 'TD') {
       if (target.firstChild.tagName == 'TEXTAREA') { // already editing
         return;
       }
       makeTdEditable(target);
       return;
    }
    target = target.parentNode;
  }
}

function makeTdEditable(td) {
  var textArea = document.createElement('textarea');
  textArea.className = 'edit-area';
  textArea.value = td.innerHTML;
  textArea.onkeydown = function(e) {
    if (e.keyCode == 13 && e.shiftKey) {
      finishTdEditing(td);
    }
  }
  td.innerHTML = '';
  td.appendChild(textArea);
  textArea.focus();
}

function finishTdEditing(td) {
  td.innerHTML = td.firstChild.value;
}