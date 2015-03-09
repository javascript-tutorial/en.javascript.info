function AutocompleteList(provider) {
  var elem;

  var filteredResults;
  var currentIndex = 0;

  this.render = function() {
    elem = $('<ol/>');
    return elem;
  };

  this.update = function(value) {
    filteredResults = provider.filterByStart(value);

    if (filteredResults.length) {
      elem.html('<li>' + filteredResults.join('</li><li>') + '</li>');
    } else {
      elem.empty();
    }

    currentIndex = 0;
    renderCurrent();

    // это событие, как и всё обновление,
    // может быть асинхронным (при получении списка с сервера)
    $(this).triggerHandler({
      type: 'update',
      values: filteredResults
    });

  };

  function renderCurrent() {
    elem.children().eq(currentIndex).addClass('selected');
  }

  function clearCurrent() {
    elem.children().eq(currentIndex).removeClass('selected');
  }

  this.get = function() {
    return filteredResults[currentIndex];
  };

  this.down = function() {
    if (currentIndex == filteredResults.length - 1) return;
    clearCurrent();
    currentIndex++;
    renderCurrent();
  };

  this.up = function() {
    if (currentIndex == 0) return;
    clearCurrent();
    currentIndex--;
    renderCurrent();
  };

  this.clear = function() {
    this.update('');
  };
}