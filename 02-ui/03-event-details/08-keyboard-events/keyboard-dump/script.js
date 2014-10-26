
kinput.onkeydown = kinput.onkeyup = kinput.onkeypress = handle;

function handle(e) {
  if (form.elements[e.type + 'Ignore'].checked) return;
   
  var evt = e.type
  while (evt.length < 10) evt += ' '
  text.value += evt + 
    ' keyCode=' + e.keyCode + 
    ' which=' + e.which + 
    ' charCode=' + e.charCode +
    ' char=' + String.fromCharCode(e.keyCode || e.charCode) +
    (e.shiftKey ? ' +shift' : '') +
    (e.ctrlKey ? ' +ctrl' : '') +
    (e.altKey ? ' +alt' : '') +
    (e.metaKey ? ' +meta' : '') + "\n";
    
  
  if (form.elements[e.type + 'Stop'].checked) {
    e.preventDefault();
  }
}
