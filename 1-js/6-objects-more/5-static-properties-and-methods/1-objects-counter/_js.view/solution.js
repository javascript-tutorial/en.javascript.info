function Article() {
  this.created = new Date;

  Article.count++; // увеличиваем счетчик при каждом вызове
  Article.last = this.created; // и запоминаем дату
}
Article.count = 0; // начальное значение 

Article.showStats = function() {
  alert('Всего: ' + this.count + ', Последняя: ' + this.last);
};