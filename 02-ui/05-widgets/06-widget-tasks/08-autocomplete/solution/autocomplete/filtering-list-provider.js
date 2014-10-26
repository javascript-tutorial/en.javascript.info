function FilteringListProvider(strings) {

  this.get = function(index) {
    return strings[index];
  };

  this.filterByStart = function(stringStart) {
    if (stringStart.length < 2) return [];

    var stringStartLC = stringStart.toLowerCase();

    return strings.filter(function(str) {
      var strLC = str.toLowerCase();

      return strLC.slice(0, stringStartLC.length) == stringStartLC && strLC != stringStartLC;
    });
  }


}