function getLocalDay(date) {

  var day = date.getDay();

  if (day == 0) { // день 0 становится 7
    day = 7;
  }

  return day;
}