function log(event) {
  text.value += event.type + ' [target: ' + event.target.id + ']\n';
  text.scrollTop = text.scrollHeight;
}