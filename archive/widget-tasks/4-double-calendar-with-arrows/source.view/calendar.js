/**
 * options:
 *   value Date или объект {year,month,day}} -- дата, для которой показывать календарь
 *     если в объекте указаны только {year,month}, то день не выбран
 */
function Calendar(options) {
  var self = this;

  var monthNames = 'Январь Февраль Март Апрель Май Июнь Июль Август Сентябрь Октябрь Ноябрь Декабрь'.split(' ');

  var elem;
  var year, month, day;

  var showYear, showMonth;

  parseValue(options.value);

  // -----------------------

  this.getElement = function() {
    if (!elem) {
      render();
    }
    return elem;
  };

  this.getValue = function() {
    return day ? new Date(year, month, day) : null;
  };

  function parseValue(value) {
    if (value instanceof Date) {
      year = value.getFullYear();
      month = value.getMonth();
      day = value.getDate();
    } else {
      year = value.year;
      month = value.month;
      day = value.day;
    }
  }

  /**
   * Установить значение календаря
   * @param newValue {Date или объект {year,month[,day]} Новое значение
   * @param quiet Если true, то событие не генерируется
   */
  this.setValue = function(newValue, quiet) {
    parseValue(newValue);

    if (elem) {
      clearSelected();
      render();
    }

    if (!quiet) {
      $(self).triggerHandler({
        type: "select",
        value: new Date(year, month, day)
      });
    }
  };

  this.clearValue = function() {
    day = null;
    clearSelected();
  };

  function render() {
    if (!elem) {
      elem = $('<div class="calendar"/>')
        .on('click', '.date-cell', onDateCellClick);
    }

    if (showYear != year || showMonth != month) {
      elem.html(renderCalendarTable(year, month));
      elem.find('caption').html(monthNames[month] + ' ' + year);
      showYear = year;
      showMonth = month;
    }

    if (day) {
      var num = getCellByDate(new Date(year, month, day));
      elem.find('td').eq(num).addClass("selected");
    }

  }

  function clearSelected() {
    elem.find('.selected').removeClass('selected');
  }


  function onDateCellClick(e) {
    day = $(e.target).html();
    self.setValue({
      year: year,
      month: month,
      day: day
    });
  }


  /**
   * Возвращает по дате номер TD в таблице
   * Использование:
   *  var td = table.getElementsByTagName('td')[getCellByDate(date)]
   */
  function getCellByDate(date) {
    var dateDayOne = new Date(date.getFullYear(), date.getMonth(), 1);

    return getDay(dateDayOne) + date.getDate() - 1;
  }

  /**
   * получить номер дня недели для date, от 0(пн) до 6(вс)
   * @param date
   */
  function getDay(date) { //
    var day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
  }

  /**
   * Генерирует таблицу для календаря заданного месяца/года
   */
  function renderCalendarTable(year, month) {

    var d = new Date(year, month);

    var table = ['<table class="calendar-table"><caption></caption><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>'];

    for (var i = 0; i < getDay(d); i++) {
      table.push('<td></td>');
    }

    // ячейки календаря с датами
    while (d.getMonth() == month) {
      table.push('<td class="date-cell">' + d.getDate() + '</td>');

      if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
        table.push('</tr><tr>');
      }

      d.setDate(d.getDate() + 1);
    }

    // добить таблицу пустыми ячейками, если нужно
    if (getDay(d) != 0) {
      for (var i = getDay(d); i < 7; i++) {
        table.push('<td></td>');
      }
    }

    table.push('</tr></table>');

    return table.join('\n')
  }

}