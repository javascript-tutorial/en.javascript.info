function unique(arr) {
  var obj = {};

  for(var i=0; i<arr.length; i++) {
    var str = arr[i];
    obj[str] = true; // запомнить строку в виде свойства объекта
  }
 
  return Object.keys(obj); // или собрать ключи перебором для IE8-
}