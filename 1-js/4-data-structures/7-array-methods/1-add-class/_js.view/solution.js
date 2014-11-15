function addClass(obj, cls) {
  var classes = obj.className ? obj.className.split(' ') : [];

  for(var i=0; i<classes.length; i++) {
    if (classes[i] == cls) return; // класс уже есть
  }

  classes.push(cls); // добавить
   
  obj.className = classes.join(' '); // и обновить свойство
}