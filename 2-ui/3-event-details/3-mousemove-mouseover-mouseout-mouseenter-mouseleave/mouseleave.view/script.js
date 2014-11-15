
function log(event) {
  text.value += event.type+' [target: '+event.target.className+']\n';
  text.scrollTop = text.scrollHeight;
}