/**
 * options:
 * yearFrom {number} начальный год в селекторе
 * yearTo {number} конечный год в селекторе
 * value {Date} текущая выбранная дата
 */
function DateSelector(options) {
  var self = this;

  var monthNames = 'января февраля марта апреля мая июня июля августа сентября октября ноября декабря'.split(' ');

  var value = options.value;

  var elem;
  var yearSelect, monthSelect, daySelect;

  function render() {
    var tmpl = _.template(options.template);
    elem = $('<div class="date-selector"/>').html(tmpl({
      yearFrom: options.yearFrom,
      yearTo: options.yearTo,
      dayTo: getLastDayOfMonth(value.getFullYear(), value.getMonth()),
      monthNames: monthNames
    }));

    yearSelect = elem.find('.year');
    monthSelect = elem.find('.month');
    daySelect = elem.find('.day');

    elem.on('change', onChange); // обычно оно не всплывает, но jQuery эмулирует всплытие
    self.setValue(value, true);
  }

  this.getValue = function() {
    return value;
  };

  this.setValue = function(newValue, quiet) {
    value = newValue;

    yearSelect.val(value.getFullYear());
    monthSelect.val(value.getMonth());
    daySelect.val(value.getDate());

    if (!quiet) {
      $(self).triggerHandler({
        type: "select",
        value: value
      });
    }
  };

  this.getElement = function() {
    if (!elem) render();
    return elem;
  };

  function onChange(e) {

    var selectType = e.target.className;

    if (selectType == "month" || selectType == "year") {
      // поправить день с учетом месяца и, возможно, високосного года
      adjustDayOptions(+yearSelect.val(), +monthSelect.val());
    }

    readValue(); // для простоты -- получим значения из всех селектов

    $(self).triggerHandler({
      type: "select",
      value: value
    });
  }

  function readValue() {
    // если я сделаю сначала value.setMonth(),
    // то может получится некорректная дата типа 31 марта -> 31 февраля,
    // которая автоскорректируется в 2 марта, т.е месяц не поставится.
    // поэтому сначала именно setDate, и так далее.
    value.setDate(daySelect.val());
    value.setMonth(monthSelect.val());
    value.setFullYear(yearSelect.val());
  }

  function getLastDayOfMonth(year, month) {
    var date = new Date(year, month + 1, 0);
    return date.getDate();
  }

  function adjustDayOptions(year, month) {
    var maxDay = getLastDayOfMonth(year, month);

    // укоротить селект, если дней стало меньше
    daySelect.children().filter(function() {
      return this.value > maxDay;
    }).remove();

    // добавить дни, если новый месяц дольше
    for (var i = +daySelect.last().val(); i <= maxDay; i++) {
      daySelect.append(new Option(i, i));
    }
  }

}