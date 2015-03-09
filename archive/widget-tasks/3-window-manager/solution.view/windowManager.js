var WindowManager = new function() {

  var windows = [];
  var activeWindow;

  var template;

  this.setTemplate = function(newTemplate) {
    template = _.template(newTemplate);
  };

  this.addWindow = function(options) {

    var win = new DraggableWindow({
      title: options.title,
      template: template
    });

    $(win).on("focus", function() {
      activateWindow(this);
    });

    win.getElement().appendTo('body');

    windows.push(win);
    activateWindow(win);

    return win;
  }

  function activateWindow(win) {
    if (activeWindow == win) return;
    activeWindow = win;
    sortWindows();
  }

  /**
   * пересортировать окна
   */
  function sortWindows() {
    windows.sort(function(a, b) {
      if (activeWindow == a) return 1; // активное окно больше всех
      if (activeWindow == b) return -1; // активное окно больше всех
      return a.getZIndex() - b.getZIndex(); // порядок среди остальных - оставляем "как есть"
    });
    for (var i = 0; i < windows.length; i++) {
      windows[i].setZIndex(i + 1);
    }

  }

}