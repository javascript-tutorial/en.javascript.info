function Tree(options) {
  var self = this;

  var template = options.template;

  var data = options.data;

  this.getElement = function() {
    if (!this.elem) render();
    return this.elem;
  }

  function onTogglerClick(e) {
    self.toggle($(e.currentTarget.parentNode));
  }

  function onCheckboxChange(e) {
    var checked = e.target.checked;
    var id = e.target.value;
    var node = $(e.currentTarget.parentNode);

    if (checked) {
      self.open(node);
    }

    node.find('input').prop('checked', checked);
  }

  this.toggle = function(node) {
    ensureChildrenRendered(node);
    node.toggleClass("tree-open tree-closed");
  };

  this.open = function(node) {
    ensureChildrenRendered(node);
    node.addClass("tree-open").removeClass("tree-closed");
  }

  this.close = function(node) {
    ensureChildrenRendered(node);
    node.addClass("tree-closed").removeClass("tree-open");
  }

  function ensureChildrenRendered(node) {
    var ul = node.children('ul');

    if (!ul.length) {
      renderChildren(node.data('id')).appendTo(node);

      if (node.children('input').is(':checked')) {
        node.find('input').prop('checked', true);
      }
    }
  }

  function renderChildren(id) {
    return $(template({
      children: data[id].children,
      data: data
    }));
  }

  function render() {

    self.elem = renderChildren(0)
      .addClass('tree');

    self.elem.on('click', '.tree-toggler', onTogglerClick);

    self.elem.on('change', 'input', onCheckboxChange);
  }

}