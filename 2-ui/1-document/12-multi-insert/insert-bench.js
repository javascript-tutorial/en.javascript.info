/* 1. Вставляет TBODY в документ сразу. а затем элементы */
var appendFirst = new function() {
  var benchTable;

  this.setup = function() {
    // очистить всё
    benchTable = document.getElementById('bench-table')
    while (benchTable.firstChild) {
      benchTable.removeChild(benchTable.firstChild);
    }
  }

  this.work = function() {
    // встаить TBODY и элементы
    var tbody = document.createElement('TBODY');
    benchTable.appendChild(tbody);

    for (var i = 0; i < 20; i++) {
      var tr = document.createElement('TR');
      tbody.appendChild(tr);
      for (var j = 0; j < 20; j++) {
        var td = document.createElement('td');
        td.appendChild(document.createTextNode('' + i.toString(20) + j.toString(20)));
        tr.appendChild(td);
      }
    }
  }

}

/* 2. Полностью делает TBODY, а затем вставляет в документ */
var appendLast = new function() {
  var benchTable;

  this.setup = function() {
    // очистить всё
    benchTable = document.getElementById('bench-table');
    while (benchTable.firstChild) {
      benchTable.removeChild(benchTable.firstChild);
    }
  }

  this.work = function() {
    var tbody = document.createElement('TBODY');

    for (var i = 0; i < 20; i++) {
      var tr = document.createElement('TR');
      tbody.appendChild(tr);
      for (var j = 0; j < 20; j++) {
        var td = document.createElement('td');
        tr.appendChild(td);
        td.appendChild(document.createTextNode('' + i.toString(20) + j.toString(20)));
      }
    }

    benchTable.appendChild(tbody);
  }

}