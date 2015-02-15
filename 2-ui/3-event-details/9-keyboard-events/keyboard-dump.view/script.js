
kinput.onkeydown = kinput.onkeyup = kinput.onkeypress = handle;

var lastTime = Date.now();

function handle(e) {
  if (form.elements[e.type + 'Ignore'].checked) return;
   
  var text = event.type + 
    ' keyCode=' + e.keyCode + 
    ' which=' + e.which + 
    ' charCode=' + e.charCode +
    ' char=' + String.fromCharCode(e.keyCode || e.charCode) +
    (e.shiftKey ? ' +shift' : '') +
    (e.ctrlKey ? ' +ctrl' : '') +
    (e.altKey ? ' +alt' : '') +
    (e.metaKey ? ' +meta' : '') + "\n";

  if (area.value && Date.now() - lastTime > 250) {
    area.value += new Array(81).join('-') + '\n';
  }
  lastTime = Date.now();

  area.value += text;

  if (form.elements[e.type + 'Stop'].checked) {
    e.preventDefault();
  }
}
