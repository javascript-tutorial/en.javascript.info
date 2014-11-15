menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  var href = event.target.getAttribute('href');
  alert(href);

  return false; // prevent url change
};
