/**
 * Возвращает по дате номер TD в таблице
 * Использование:
 *  var td = table.find('td').eq(getCellByDate(date))
 */
function getCellByDate(date) {
  var date1 = new Date(date.getFullYear(), date.getMonth(), 1);

  return getDay(date1) + date.getDate() - 1;
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
 * @param year
 * @param month
 */
function renderCalendarTable(year, month) {

  var d = new Date(year, month);

  var table = ['<table class="calendar-table"><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>'];

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