function getLocalDay(date) {

  let day = date.getDay();

  if (day == 0) { // weekday 0 (Sunday) is 7 in Europe
    day = 7;
  }

  return day;
}
