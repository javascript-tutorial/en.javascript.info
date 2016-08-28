function formatDate(date) {
  var diff = new Date() - date; // number of ms till now

  if (diff < 1000) { // less than a second
    return 'right now';
  }

  var sec = Math.floor(diff / 1000);  // get seconds

  if (sec < 60) {
    return sec + ' sec. ago';
  }

  var min = Math.floor(diff / 60000); // get minutes
  if (min < 60) {
    return min + ' min. ago';
  }

  // format the date, take into account that months start from zero
  var d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ];

  for (var i = 0; i < d.length; i++) {
    d[i] = d[i].slice(-2); // remove extra zeroes
  }

  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}
