/**
 * options:
 *   value Date или объект {year,month,day}} -- дата, для которой показывать календарь
 *     если в объекте указаны только {year,month}, то день не выбран
*/
function DatePicker(options) { 
  var elem;
  var calendarLeft;
  var calendarRight;
  var calendarCache = {};

  var showYear, showMonth;
  var selectedYear, selectedMonth, selectedDay;

  var self = this;

  parseValue(options.value);
  showYear = selectedYear;
  showMonth = selectedMonth;

  // -------------

  this.getElement = function() {
    if (!elem) render();
    return elem;
  };

  this.getValue = function() {
    if (!selectedDay) return null;

    return new Date(selectedYear, selectedMonth, selectedDay);
  };

  function parseValue(value) {
    if (value instanceof Date) {
      selectedYear = value.getFullYear();
      selectedMonth = value.getMonth();
      selectedDay = value.getDate();
    } else {
      selectedYear = value.year;
      selectedMonth = value.month;
      selectedDay = value.day;
    }
  }

  function getCalendar(year, month) {

    var key = '' + year + month;
    var calendar;

    if (!calendarCache[key]) {
      calendar = calendarCache[key] = new Calendar({
        value: {year: year, month: month}
      });
      $(calendar).on("select", onCalendarSelect);
    } else {
      calendar = calendarCache[key];
    }

    var value = {
      year: year,
      month: month,
      // если календарь отображает текущий выбранный месяц, то передать и день для выбора
      day: (year == selectedYear && month == selectedMonth) ? selectedDay : null
    };

    calendar.setValue(value, true);

    return calendar;
  }

  function onCalendarSelect(e) {
    parseValue(e.value);
    if (e.target == calendarLeft) {
      calendarRight.clearValue();
    } else {
      calendarLeft.clearValue();
    }

    $(self).triggerHandler({
      type: "select", 
      value: e.target.getValue()
    });
  }


  function render() {
    elem = $('<div class="datepicker"/>').html(
      _.template(options.template)()
    );

    elem.on('mousedown', '.next-link', onNextLinkMouseDown);
    elem.on('mousedown', '.prev-link', onPrevLinkMouseDown);
    renderCalendars();
  }

  function renderCalendars() {
    calendarLeft = getCalendar(showYear, showMonth);
    // использую children().detach() вместо empty(), 
    // т.к. empty() убивает обработчики на календаре
    elem.find('.calendar-left-holder').children().detach().end()
      .append(calendarLeft.getElement());

    var dateNextMonth = new Date(showYear, showMonth + 1);
    calendarRight = getCalendar(dateNextMonth.getFullYear(), dateNextMonth.getMonth());
    elem.find('.calendar-right-holder').children().detach().end()
      .append(calendarRight.getElement());
  }

  function onNextLinkMouseDown() {
    showMonth++;
    if (showMonth > 11) {
      showMonth = 0;
      showYear++;
    }
    renderCalendars();
    return false;
  }

  function onPrevLinkMouseDown() {
    showMonth--;
    if (showMonth < 0) {
      showMonth = 11;
      showYear--;
    }
    renderCalendars();
    return false;
  }

}
