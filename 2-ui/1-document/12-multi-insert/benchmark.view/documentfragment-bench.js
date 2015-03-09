var DocumentFragmentTest = new function() {
  var benchList = document.getElementById('bench-list');

  var items = [];
  for (var i = 0; i < 100; i++) {
    var li = document.createElement('li');
    li.innerHTML = i;
    items.push(li);
  }

  this.insertPlain = new function() {

    this.setup = function() {
      while (benchList.firstChild) {
        benchList.removeChild(benchList.firstChild);
      }
    }

    this.work = function() {
      for (var i = 0; i < items.length; i++) {
        benchList.appendChild(items[i]);
      }
    }

  };

  this.insertDocumentFragment = new function() {

    this.setup = function() {
      // очистить всё
      while (benchList.firstChild) {
        benchList.removeChild(benchList.firstChild);
      }
    }

    this.work = function() {
      var docFrag = document.createDocumentFragment();
      for (var i = 0; i < items.length; i++) {
        docFrag.appendChild(items[i]);
      }
      benchList.appendChild(docFrag);
    }

  };
}