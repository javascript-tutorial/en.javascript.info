function removeClass(obj, cls) {
  var classes = obj.className.split(' ');

  for (i = 0; i < classes.length; i++) {
    if (classes[i] == cls) {
      classes.splice(i, 1); // удалить класс  
      i--;
    }
  }
  obj.className = classes.join(' ');
}